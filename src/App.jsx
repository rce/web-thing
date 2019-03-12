const React = require("karet")
const {render} = require("react-dom")
const {Atom} = require("kefir.atom")
const R = require("ramda")
const Kefir = require("kefir")
const U = require("karet.util")

require("./style.scss")

const FaceitClient = require("./Faceit.js")
const MatchList = require("./MatchList.jsx")
const {Spinner} = require("./Common.jsx")

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
  const nameInput = new Atom("")
  const selectedIndex = new Atom(0)

  const searchTerm = nameInput.filter(lengthAtLeast(3)).debounce(250).skipDuplicates()
  const searchResults = searchTerm
    .flatMapLatest(name => FaceitClient.searchPlayer(name))
    .toProperty(() => [])
  const loadingResults = isAwaiting(searchTerm, searchResults)

  // Select first result automatically
  searchResults.onValue(() => selectedIndex.set(0))

  Kefir.combine(
    [selectedIndex, searchResults],
    (idx, results) => R.path([idx, "player_id"], results)
  ).onValue(playerId => selection.set(playerId))

  const hasResults = searchResults.map(R.complement(R.isEmpty))

  const upsAndDowns = U.bus()
  const onKeyDown = e => {
    if (["ArrowDown", "ArrowUp"].includes(e.key)) {
      e.preventDefault()
      e.persist()
      upsAndDowns.push(e)
    }
  }
  Kefir.combine([upsAndDowns, searchResults], (e, results) => {
    const mod = e.key === "ArrowUp" ? R.dec : R.inc
    return idx => R.min(R.max(0, mod(idx)), results.length - 1)
  }).onValue(func => selectedIndex.modify(func))

  // Reference to input to keep focus on it
  const inputRef = new Atom()
  inputRef.onValue(ref => ref.focus())

  return <div className="search-form">
    <input
      ref={U.set(inputRef)}
      type="text"
      value={nameInput}
      onKeyDown={onKeyDown}
      onChange={U.getProps({value: nameInput})} />

    {U.when(loadingResults, <Spinner />)}

    {U.ifElse(hasResults,
      <ul className="search-results"
        onMouseDown={e => {
          e.preventDefault()
          inputRef.get().focus()
        }}>
        {U.mapElems((x, idx) => {
          const selected = selectedIndex.map(R.equals(idx))
          const ref = new Atom()
          selected.filter(R.identity).onValue(() => scrollVisible(ref.get()))
          return (
            <SearchResultPlayer result={x}
              ref={U.set(ref)}
              key={idx}
              onClick={() => selectedIndex.set(idx)}
              className={U.cns(U.when(selected, "selected"))} />
          )
        }, searchResults)}
      </ul>,
      <p>No results</p>)}
  </div>
}

const isAwaiting = (stream, derivative) =>
  Kefir.merge([
    stream.map(() => true),
    derivative.map(() => false),
  ])

const SearchResultPlayer = React.forwardRef(({result, className, ...props}, ref) => (
  <li {...props} ref={ref} className={U.cns("search-result", className)}>
    <img className="avatar" src={U.view("avatar", result)} />
    <span className="nickname">{U.view("nickname", result)}</span>
  </li>
))

const scrollVisible = element =>
  element && element.scrollIntoView({ block: "nearest" })

const PlayerDetails = ({selection}) => {
  const player = selection.debounce(500)
    .flatMapLatest(playerId => FaceitClient.getPlayer(playerId))
    .toProperty(() => undefined)

  const loading = Kefir.combine(
    [selection, player.map(R.prop("player_id"))],
    R.complement(R.equals)
  )

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

const lengthAtLeast = n => R.compose(R.lte(n), R.length)

render(<App />, document.getElementById("app"))
