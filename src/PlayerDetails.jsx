const React = require("karet")
const R = require("ramda")
const U = require("karet.util")
const {Atom} = require("kefir.atom")

const FaceitClient = require("./Faceit.js")
const MatchList = require("./MatchList.jsx")
const {Spinner} = require("./Common.jsx")
const {toggle} = require("./Util.js")

const PlayerDetails = ({params: {playerId}}) => {
  const player = FaceitClient.getPlayer(playerId).toProperty()
  const showJson = new Atom(false)

  const steamId = U.view("steam_id_64", player)
  return <div>
    {U.ifElse(player.map(R.isNil),
      <Spinner />,
      <div>
        <div className="player">
          <img className="player-avatar" src={U.view("avatar", player)} />
          <div className="player-info">
            <h2>{U.view("nickname", player)} ({U.view("country", player)})</h2>
            <p><a href={U.string`https://www.faceit.com/en/players/${U.view("nickname", player)}`}>FACEIT profile</a></p>
            {U.when(steamId, <p><a href={U.string`https://steamcommunity.com/profiles/${steamId}`}>Steam profile</a></p>)}
            <table>
              <tbody>
                <tr><td>Player ID</td><td>{U.view("player_id", player)}</td></tr>
                <tr><td>Country</td><td>{U.view("country", player)}</td></tr>
                {U.when(player.map(R.path(["games", "csgo", "faceit_elo"])),
                  <tr><td>CSGO elo</td><td>{U.view(["games", "csgo", "faceit_elo"], player)}</td></tr>)}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <button onClick={toggle(showJson)}>Show JSON</button>
          {U.when(showJson, <pre>{U.stringify(player, null, 2)}</pre>)}
        </div>

        <MatchList playerId={U.view("player_id", player)} />
      </div>,
    )}
  </div>
}

module.exports = PlayerDetails
