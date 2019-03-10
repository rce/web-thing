const React = require("karet")
const {render} = require("react-dom")
const {Atom} = require("kefir.atom")
const R = require("ramda")
const Kefir = require("kefir")
const U = require("karet.util")

require("./style.scss")

const FaceitClient = require("./Faceit.js")

const API_KEY = "82592226-3fb7-41cf-941c-7098de7d84c7"
const client = new FaceitClient(API_KEY)

const App = () => {
  const selectedPlayer = new Atom("")

  return (
    <React.Fragment>
      <Search selection={selectedPlayer} />
      <div className="main-content">
        {U.ifElse(selectedPlayer,
          <PlayerDetails selection={selectedPlayer} />,
          <p>Select a player from search results</p>)}
      </div>
    </React.Fragment>
  )
}
const Search = ({selection}) => {
  const nameInput = new Atom("somnium")

  const searchResults = nameInput
    .filter(lengthAtLeast(3))
    .debounce(250)
    .flatMapLatest(name => client.searchPlayer(name))
    .map(R.prop("items"))
    .toProperty(() => [])

  const hasResults = searchResults.map(R.complement(R.isEmpty))

  return <div className="search-form">
    <p>Input name: <TextInput value={nameInput} /></p>

    {U.ifElse(hasResults,
      <React.Fragment>
        Has {U.view("length", searchResults)} results
        <ul>
          {U.mapElemsWithIds("player_id", (x, playerId) => {
            const selected = selection.map(_ => _ === playerId)
            return (
              <li key={playerId} onClick={() => selection.set(playerId)} className={U.cns(U.when(selected, "selected"))}>
                {U.view("nickname", x)}
              </li>
            )
          }, searchResults)}
        </ul>
      </React.Fragment>,
      <p>No results</p>)}
  </div>
}

const PlayerDetails = ({selection}) => {
  const player = selection
    .flatMapLatest(playerId => client.getPlayer(playerId))
    .toProperty(() => undefined)

  const loading = Kefir.combine([selection, player], (s, p) => {
    return !p || (p.player_id !== s)
  })

  return <div className="player-details">
    {U.ifElse(loading,
      <p>Loading...</p>,
      <div>
        <h2>{U.view("nickname", player)} ({U.view("country", player)})</h2>
        <img className="player-avatar" src={U.view("avatar", player)} />
        <table>
          <tbody>
            <tr><td>Player ID</td><td>{U.view("player_id", player)}</td></tr>
            <tr><td>Country</td><td>{U.view("country", player)}</td></tr>
            {U.when(player.map(_ => _.platforms.steam),
              <tr><td>Steam ID</td><td>{U.view(["platforms", "steam"], player)}</td></tr>)}
            {U.when(player.map(_ => _.games.csgo),
              <tr><td>CSGO elo</td><td>{U.view(["games", "csgo", "faceit_elo"], player)}</td></tr>)}
          </tbody>
        </table>
        <div>
          <h3>Raw</h3>
          <pre>{U.stringify(player, null, 2)}</pre>
        </div>
      </div>,
    )}
  </div>
}

const TextInput = ({value}) =>
  <input type="text" value={value} onChange={U.getProps({value})} />

const lengthAtLeast = n => R.compose(R.lte(n), R.length)

render(<App />, document.getElementById("app"))
