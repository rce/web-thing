const React = require("karet")
const Kefir = require("kefir")
const U = require("karet.util")
const R = require("ramda")

const FaceitClient = require("./Faceit.js")
const {Spinner} = require("./Common.jsx")

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
  const match = matchId.flatMapLatest(matchId => FaceitClient.getMatch(matchId)).toProperty()

  const team1 = U.view(["teams", "faction1"], match)
  const team2 = U.view(["teams", "faction2"], match)

  const winOrLoss = U.when(match,
    Kefir.combine([match], [playerId], (match, playerId) => {
      return hasPlayer(playerId, winner(match))
        ? <span className="win">WIN</span>
        : <span className="loss">LOSS</span>
    }))

  const TeamName = mkTeamName(playerId)
  return (
    <div className="match">
      {U.ifElse(
        R.isNil(match),
        <Spinner />,
        <div>
          <p>
            <TeamName team={team1} /> vs <TeamName team={team2} /> ({U.view("competition_name", match)})
          </p>
          <p>{winOrLoss}</p>
          <p>{U.view(["started_at", formatTime], match)}</p>
        </div>)}
    </div>
  )
}

const winner = match => match.teams[match.results.winner]

const hasPlayer = (playerId, team) =>
  team.roster.map(R.prop("player_id")).includes(playerId)

const formatTime = date => date.toRelative()

const mkTeamName = playerId => ({team, className}) => {
  const isHomeTeam = team => Kefir.combine([team], [playerId],
    (team, playerId) => team.roster.map(R.prop("player_id")).includes(playerId))
  return <span className={U.cns(className, U.ifElse(isHomeTeam(team), "home-team", "enemy-team"))}>{U.view("name", team)}</span>
}

module.exports = MatchList
