const React = require("karet")
const R = require("ramda")
const U = require("karet.util")
const {Atom} = require("kefir.atom")

const FaceitClient = require("./Faceit.js")
const MatchList = require("./MatchList.jsx")
const {Spinner} = require("./Common.jsx")
const {toggle} = require("./Util.js")
const {avatarLens} = require("./Lenses.js")

const PlayerDetails = ({params: {playerId}}) => {
  const player = FaceitClient.getPlayer(playerId).toProperty()
  const showJson = new Atom(false)

  const steamId = U.view("steam_id_64", player)
  const csgoElo = U.view(["games", "csgo", "faceit_elo"], player)

  return <div>
    {U.ifElse(player.map(R.isNil),
      <Spinner />,
      <div>
        <div className="player">
          <img className="player-avatar" src={U.view(avatarLens, player)} />
          <div className="player-info">
            <h2>{U.view("nickname", player)} ({U.view("country", player)})</h2>
            <ul>
              <li><a href={U.string`https://www.faceit.com/en/players/${U.view("nickname", player)}`}>FACEIT profile</a></li>
              {U.when(steamId, <li><a href={U.string`https://steamcommunity.com/profiles/${steamId}`}>Steam profile</a></li>)}
              {U.when(csgoElo, <li>CS:GO elo {csgoElo}</li>)}
            </ul>
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
