import React, {useRef, useState} from "react"
import {render} from "react-dom"
import {pluckFirst, useObservable, useObservableState, useSubscription} from "observable-hooks"
import {
  debounceTime,
  filter,
  flatMap,
  map,
  mergeMap,
  scan,
  startWith,
  switchMap,
  throttleTime
} from "rxjs/operators"
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
import {DateTime} from "luxon"

import DefaultAvatar from "../assets/default_avatar.jpg"

import "./style.scss"
import {HashRouter, Link, Route, useParams} from "react-router-dom"
import {fromEvent, Observable, OperatorFunction, pipe} from "rxjs"

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

const logObservable = (observable$: Observable<any>, name: string) =>
  useSubscription(observable$, v => console.log(name, v))

function Search() {
  const PAGE_SIZE = 100

  const searhResultsListRef = useRef<HTMLUListElement | null>(null)

  const [input, setInput] = useState('asd')
  const searchTerm$: Observable<string> = useObservable(
    inputs$ => inputs$.pipe(
      pluckFirst,
      filter(input => input.length >= 3),
      debounceTime(300)
    ),
    [input]
  )
  logObservable(searchTerm$, "searchTerm$")

  // TODO real scroll events
  const loadMoreEvents$ = useObservable(inputs$ => inputs$.pipe(
    pluckFirst,
    flatMap(ref => fromEvent(ref.current!, "scroll")),
    map(event => {
      if (!event.target) throw Error("fug")
      const node = event.target as HTMLUListElement
      const distanceToBottomBeforeLoadingMore = 500
      return {
        scrollTop: node.scrollTop,
        loadMorePoint: Math.max(0, node.scrollHeight - node.clientHeight - distanceToBottomBeforeLoadingMore),
      }
    }),
    filter(({ scrollTop, loadMorePoint }) => scrollTop > loadMorePoint),
    throttleTime(1000)
  ), [searhResultsListRef])

  const countEvents = (): OperatorFunction<unknown, number> =>
    pipe(scan((acc, _) => acc + 1, 0), startWith(0))
  const concatEvents = <T extends unknown>(): OperatorFunction<T[], T[]> =>
    scan((acc: T[], next) => acc.concat(next), [])

  const results$ = useObservable(() => searchTerm$.pipe(
    switchMap((searchTerm: string) =>
      loadMoreEvents$.pipe(
        countEvents(),
        mergeMap((page: number): Observable<GetSearchPlayersResponse$Player[]> =>
          searchPlayer(searchTerm, page * PAGE_SIZE, PAGE_SIZE).pipe(map(_ => _.items))
        ),
        concatEvents()
      )
    )
  ))
  logObservable(results$, "results")

  const results = useObservableState(results$, [])

  return (
    <div className="search-form">
      <input type="text" value={input} onChange={e => setInput(e.currentTarget.value)} />

      <ul className="search-results" ref={searhResultsListRef}>
        {results.map((result, idx) => {
          return <SearchResultPlayer result={result} key={result.player_id + idx} />
        })}
      </ul>
    </div>
  )
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
    map(_ => _.items)
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

  const match = useObservableState(match$, undefined)

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

function DebugValue({ name, value }: { name: string, value: any }) {
  return (
    <pre>{name} === {JSON.stringify(value, null, 2)}</pre>
  )
}

render(<App />, document.getElementById("app"))
