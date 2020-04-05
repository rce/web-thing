import React, {useEffect, useRef, useState} from "react"
import {render} from "react-dom"
import {DateTime} from "luxon"
import {HashRouter, Link, Route, useParams} from "react-router-dom"
import {BehaviorSubject, EMPTY, identity, Observable, of, OperatorFunction, zip} from "rxjs"
import {debounceTime, filter, flatMap, map, scan, startWith, switchMap, tap} from "rxjs/operators"
import {pluckFirst, useObservable, useObservableState, useSubscription} from "observable-hooks"

import DefaultAvatar from "../assets/default_avatar.jpg"

import {
  getMatch,
  getMatchHistory,
  getPlayer,
  GetSearchPlayersResponse$Player,
  searchPlayer,
  GetMatchResponse$MatchV2,
  GetMatchResponse$MatchV2$Faction,
  GetMatchResponse$MatchV1,
  GetPlayerResponse
} from "./FaceitApi.ts"
import {fromScrollEvents, ScrollPosition} from "./InfiniteScroll.ts"
import {DebugValue, tapLog} from "./Util.tsx"

import "./style.scss"

function App() {
  return (
    <HashRouter>
      <Search />
      <div className="main-content">
        <Route path="/player/:playerId">
          <PlayerDetails />
        </Route>
      </div>
    </HashRouter>
  )
}

function Search() {
  const PAGE_SIZE = 100

  const searchResultsElementRef = useRef<HTMLUListElement>(null)

  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>()
  useEffect(() => {
    const sub = fromScrollEvents(searchResultsElementRef)
      .subscribe((e: ScrollPosition) => setScrollPosition(e))
    return () => sub.unsubscribe()
  }, [searchResultsElementRef])

  const [input, setInput] = useState("")
  const searchTerm$: Observable<string> = useObservable(
    inputs$ => inputs$.pipe(
      pluckFirst,
      filter(input => input.length >= 3),
      debounceTime(300),
      tapLog("searchTerm")
    ),
    [input]
  )

  const scrolledNearBottom$ = useObservable(inputs$ =>
    inputs$.pipe(
      pluckFirst,
      // Skip undefined positions
      flatMap(optPosition => optPosition ? of(optPosition) : EMPTY),
      filter(({scrollTop, scrollTopMax}: ScrollPosition) => {
        const distanceToBottomBeforeLoadingMore = 500
        const loadMorePoint = Math.max(0, scrollTopMax - distanceToBottomBeforeLoadingMore)
        return scrollTop >= loadMorePoint
      })
    ),
    [scrollPosition]
  )

  function concatArraysFromStream<T extends unknown>(): OperatorFunction<T[], T[]> {
    return scan((acc: T[], next) => acc.concat(next), [])
  }

  const results$: Observable<GetSearchPlayersResponse$Player[]> = useObservable(
    inputs$ => inputs$.pipe(pluckFirst, flatMap(identity)).pipe(
      // Generate stream of result batches
      switchMap((searchTerm: string): Observable<GetSearchPlayersResponse$Player[]> => {
        // Because fetching more results both consumes and produces offset$ values we have to use BehaviorSubject
        // to be able to push new values from wherever.
        // Simple recursive search with concatMap would work if we always eventually wanted all search results.
        // However here we want to fetch results only once at start and when scrolling near bottom of the list.
        const offset$ = new BehaviorSubject<number>(0)

        const searchTrigger$ = scrolledNearBottom$.pipe(startWith())
        const resultPages$ = zip(offset$, searchTrigger$).pipe(
          // We only care about the offset value
          pluckFirst,
          tapLog("offset"),
          flatMap(offset => searchPlayer(searchTerm, offset, PAGE_SIZE)),
          // Publish next offset or complete the stream if no more results are available
          tap(response => response.items.length === 0 ? offset$.complete() : offset$.next(response.end)),
          tapLog("resultPages")
        )

        //const resultPages$ = searchRecursive(searchTerm, 0)
        return resultPages$.pipe(
          // Concatenate and dediplicate batches
          map(response => response.items),
          concatArraysFromStream(),
          map(deduplicateResults)
        )
      })
    ),
    [searchTerm$]
  )

  const [results, setResults] = useState<GetSearchPlayersResponse$Player[]>([])
  useSubscription(results$, setResults)

  return (
    <div className="search-form">
      <input type="text" onChange={e => void setInput(e.currentTarget.value)} />

      <ul className="search-results" ref={searchResultsElementRef}>
        {results.map((result) => {
          return <SearchResultPlayer result={result} key={result.player_id} />
        })}
      </ul>
    </div>
  )
}

function deduplicateResults(results: GetSearchPlayersResponse$Player[]): GetSearchPlayersResponse$Player[] {
  const idSet = new Set()
  const noDuplicates: GetSearchPlayersResponse$Player[] = []
  results.forEach(r => {
    if (!idSet.has(r.player_id)) {
      idSet.add(r.player_id)
      noDuplicates.push(r)
    }
  })
  return noDuplicates
}

function SearchResultPlayer({ result }: { result: GetSearchPlayersResponse$Player }) {
  return <li className="search-result">
    <Link to={`/player/${result.player_id}`}>
      <img className="avatar" src={result.avatar === "" ? DefaultAvatar : result.avatar} />
      <span className="nickname">{result.nickname}</span>
    </Link>
  </li>

}

function PlayerDetails() {
  const { playerId } = useParams<{ playerId: string }>()

  const player$ = useObservable($inputs => $inputs.pipe(
    pluckFirst,
    switchMap(playerId => getPlayer(playerId))
    ),
    [playerId]
  )

  const [showJson, setShowJson] = useState(false)

  const player: GetPlayerResponse | undefined = useObservableState<GetPlayerResponse>(player$)

  if (!player || player.player_id !== playerId) {
    return (<p>Loading...</p>)
  } else {
    return (
      <>
        <div className="player">
          <img className="player-avatar" src={player.avatar === "" ? DefaultAvatar : player.avatar}/>
          <div className="player-info">
            <h2>{player.nickname} ({player.country})</h2>
            <ul>
              <li><a href={`https://www.faceit.com/en/players/${player.nickname}`}>FACEIT profile</a></li>
              {player.steam_id_64 && <li><a href={`https://steamcommunity.com/profiles/${player.steam_id_64}`}>Steam profile</a></li>}
              {player.games?.csgo?.faceit_elo && <li>CS:GO elo {player.games.csgo.faceit_elo}</li>}
            </ul>
          </div>
        </div>

        <div>
          <button onClick={() => setShowJson(!showJson)}>Show JSON</button>
          {showJson && <DebugValue name="player" value={player} />}
        </div>

        <MatchList playerId={player.player_id} />
      </>
    )
  }
}

function MatchList({ playerId }: { playerId: string }) {
  const matches$ = useObservable(inputs$ => inputs$.pipe(
    pluckFirst,
    switchMap(playerId => getMatchHistory(playerId, "csgo")),
    map(response => response.items)
  ), [playerId])
  const matches = useObservableState(matches$, [])

  return (

    <div className="match-history">
      <h2>Match history</h2>
      {matches.map(match => {
        return <Match key={match.match_id} playerId={playerId} matchId={match.match_id} />
      })}
    </div>
  )
}

function Match({ playerId, matchId }: { playerId: string, matchId: string }) {
  const match$ = useObservable(inputs$ => inputs$.pipe(
    pluckFirst,
    switchMap(matchId => getMatch(matchId))
  ), [matchId])

  const match = useObservableState(match$)

  if (!match || matchId !== match.match_id) {
    return <p>Loading...</p>
  }

  return (
    <div className={"match"}>
      {match.version === 2 && <MatchV2 match={match} playerId={playerId} />}
      {match.version === 1 && <MatchV1 match={match} playerId={playerId} />}

    </div>
  )
}
function MatchV1({ match, playerId }: { match: GetMatchResponse$MatchV1, playerId: string}) {
  return <p>TODO</p>
}

function MatchV2({ match, playerId }: { match: GetMatchResponse$MatchV2, playerId: string }) {
  const isInTeam = (team: GetMatchResponse$MatchV2$Faction, playerId: string) =>
    team.roster.find(p => p.player_id === playerId)
  const TeamName = ({ team }: { team: GetMatchResponse$MatchV2$Faction}) =>
    <span className={isInTeam(team, playerId) ? "home-team" : "enemy-team"}>{team.name}</span>

  const [open, setOpen] = useState(false)

  const winnerTeam = match.teams[match.results.winner]
  const isWinner = isInTeam(winnerTeam, playerId)
  const winOrLoss = isWinner
    ? <span className="win">WIN</span>
    : <span className="loss">LOSS</span>

  return (
    <div>
      <div className="match-header" onClick={() => setOpen(!open)}>
        <div className="result">
          <p>{winOrLoss}</p>
        </div>
        <div className="match-name">
          <p>
            <TeamName team={match.teams.faction1}/> vs <TeamName team={match.teams.faction2}/>
          </p>
        </div>
        <div className="timestamp">
          <p>{formatTime(match.started_at)}</p>
        </div>
        <div className="toggle">
          <p>{open ? <i className="fas fa-chevron-down" /> : <i className="fas fa-chevron-right" />}</p>
        </div>
      </div>
      {open && <MatchV2Details match={match} />}
    </div>
  )
}

function MatchV2Details({ match }: { match: GetMatchResponse$MatchV2 }) {
  const playerList = (team: GetMatchResponse$MatchV2$Faction) =>
    <div className="team">
      <img className="avatar" src={team.avatar === "" ? DefaultAvatar : team.avatar} />
      <div className="players">
        <h2>{team.name}</h2>
        <ul>
          {team.roster.map(p =>
            <li key={p.player_id}>{p.nickname}</li>
          )}
        </ul>
      </div>
    </div>

  const [showJson, setShowJson] = useState(false)

  return (
    <div className="match-details">
      <div className="teams">
        {playerList(match.teams.faction1)}
        {playerList(match.teams.faction2)}
      </div>

      <button onClick={() => setShowJson(!showJson)}>Show JSON</button>
      {showJson && <DebugValue name="match" value={match} />}
    </div>
  )
}

function formatTime(time: number): string {
  return DateTime.fromSeconds(time).toRelative()!
}

render(<App />, document.getElementById("app"))
