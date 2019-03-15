const React = require("karet")
const Kefir = require("kefir")
const {Atom} = require("kefir.atom")
const U = require("karet.util")
const R = require("ramda")

const FaceitClient = require("./Faceit.js")
const {Spinner} = require("./Common.jsx")
const {toggle} = require("./Util.js")
const {avatarLens} = require("./Lenses.js")

const MatchList = ({playerId}) => {
  const matches = playerId
    .flatMapLatest(playerId => FaceitClient.getHistory(playerId, "csgo"))
    .toProperty(() => [])

  return <div className="match-history">
    <h2>Match history</h2>
    {U.mapElemsWithIds("match_id", (match, id) =>
      <Match key={id} playerId={playerId} matchId={U.view("match_id", match)} />, matches)}
  </div>
}

const Match = ({playerId, matchId}) => {
  const match = matchId.flatMapLatest(matchId => FaceitClient.getMatch(matchId))
    .toProperty(() => undefined)

  return (
    <div className="match">
      {U.cond(
        [match.map(R.isNil), <Spinner />],
        [match.map(m => m.version === 2), <MatchV2 playerId={playerId} match={match} />],
        [match.map(m => m.version === 1), <MatchV1 playerId={playerId} match={match} />],
        [<p>Unknown match version</p>])}
    </div>
  )
}

const MatchV1 = ({match, playerId}) => {
  const getRoster = R.prop("roster_v1")
  const getPlayerId = R.prop("guid")
  const isOpen = new Atom(false)
  const team1 = U.view(["teams", "faction1"], match)
  const team2 = U.view(["teams", "faction2"], match)

  const winOrLoss = U.when(match,
    Kefir.combine([match], [playerId], (match, playerId) => {
      return hasPlayer(getRoster, getPlayerId)(playerId, winner(match))
        ? <span className="win">WIN</span>
        : <span className="loss">LOSS</span>
    }))

  const TeamName = mkTeamName(getRoster, getPlayerId)(playerId)
  return (
    <div>
      <div className="match-header" onClick={toggle(isOpen)}>
        <div className="result">
          <p>{winOrLoss}</p>
        </div>
        <div className="match-name">
          <p>
            <TeamName team={team1} /> vs <TeamName team={team2} />
          </p>
        </div>
        <div className="timestamp">
          <p>{U.view(["started_at", formatTime], match)}</p>
        </div>
        <div className="toggle">
          <p>{U.ifElse(isOpen,
            <i className="fas fa-chevron-down" />,
            <i className="fas fa-chevron-right" />)}</p>
        </div>
      </div>
      {U.when(isOpen, <MatchDetails match={match} getRoster={getRoster} />)}
    </div>
  )
}

const MatchV2 = ({match, playerId}) => {
  const getRoster = R.prop("roster")
  const getPlayerId = R.prop("player_id")
  const isOpen = new Atom(false)
  const team1 = U.view(["teams", "faction1"], match)
  const team2 = U.view(["teams", "faction2"], match)

  const winOrLoss = U.when(match,
    Kefir.combine([match], [playerId], (match, playerId) => {
      return hasPlayer(getRoster, getPlayerId)(playerId, winner(match))
        ? <span className="win">WIN</span>
        : <span className="loss">LOSS</span>
    }))
  const TeamName = mkTeamName(getRoster, getPlayerId)(playerId)
  return (
    <div>
      <div className="match-header" onClick={() => isOpen.modify(R.not)}>
        <div className="result">
          <p>{winOrLoss}</p>
        </div>
        <div className="match-name">
          <p>
            <TeamName team={team1} /> vs <TeamName team={team2} />
          </p>
        </div>
        <div className="timestamp">
          <p>{U.view(["started_at", formatTime], match)}</p>
        </div>
        <div className="toggle">
          <p>{U.ifElse(isOpen,
            <i className="fas fa-chevron-down" />,
            <i className="fas fa-chevron-right" />)}</p>
        </div>
      </div>
      {U.when(U.lift(R.and)(isOpen, match), <MatchDetails match={match} getRoster={getRoster} />)}
    </div>
  )
}

const MatchDetails = ({match, getRoster}) => {
  const showJson = new Atom(false)

  const players = U.lift(team => {
    return (
      <div className="team">
        <img className="avatar" src={U.view(avatarLens, team)} />
        <div className="players">
          <h2>{U.view("name", team)}</h2>
          <ul>
            {U.mapElems(
              (p, i) => <li key={i}>{U.view("nickname", p)}</li>,
              getRoster(team))}
          </ul>
        </div>
      </div>
    )
  })

  return (
    <div className="match-details">
      <div className="teams">
        {players(match.map(R.path(["teams", "faction1"])))}
        {players(match.map(R.path(["teams", "faction2"])))}
      </div>

      <button onClick={toggle(showJson)}>Show JSON</button>
      {U.when(showJson, <pre>{U.stringify(match, null, 2)}</pre>)}
    </div>
  )
}

const winner = match => match.teams[match.results.winner]

const hasPlayer = (getRoster, getPlayerId) => (playerId, team) =>
  getRoster(team).map(getPlayerId).includes(playerId)

const formatTime = date => date.toRelative()

const mkTeamName = (getRoster, getPlayerId) => playerId => ({team, className}) => {
  const isHomeTeam = team => Kefir.combine([team], [playerId],
    (team, playerId) => getRoster(team).map(getPlayerId).includes(playerId))
  return <span className={U.cns(className, U.ifElse(isHomeTeam(team), "home-team", "enemy-team"))}>{U.view("name", team)}</span>
}

module.exports = MatchList
