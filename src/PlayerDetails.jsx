const React = require("karet")
const R = require("ramda")
const U = require("karet.util")

const FaceitClient = require("./Faceit.js")
const MatchList = require("./MatchList.jsx")
const {Spinner} = require("./Common.jsx")
const {isAwaiting} = require("./Util.js")

const PlayerDetails = ({selection}) => {
  const player = selection
    .flatMapLatest(playerId => FaceitClient.getPlayer(playerId))
    .toProperty()
  const loadingPlayer = isAwaiting(selection, player)

  return <div className="player-details">
    {U.ifElse(loadingPlayer,
      <Spinner />,
      <div>
        <h2>{U.view("nickname", player)} ({U.view("country", player)})</h2>
        <img className="player-avatar" src={U.view("avatar", player)} />
        <table>
          <tbody>
            <tr><td>Player ID</td><td>{U.view("player_id", player)}</td></tr>
            <tr><td>Country</td><td>{U.view("country", player)}</td></tr>
            {U.when(player.map(R.path(["platforms", "steam"])),
              <tr><td>Steam ID</td><td>{U.view(["platforms", "steam"], player)}</td></tr>)}
            {U.when(player.map(R.path(["games", "csgo", "faceit_elo"])),
              <tr><td>CSGO elo</td><td>{U.view(["games", "csgo", "faceit_elo"], player)}</td></tr>)}
          </tbody>
        </table>

        <MatchList playerId={U.view("player_id", player)} />
      </div>,
    )}
  </div>
}

module.exports = PlayerDetails
