const React = require("karet")
const {Atom} = require("kefir.atom")
const R = require("ramda")
const U = require("karet.util")
const Kefir = require("kefir")

const FaceitClient = require("./Faceit.js")
const {Spinner} = require("./Common.jsx")
const {isAwaiting} = require("./Util.js")

const Search = ({selection}) => {
  const nameInput = new Atom("somnium")
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

const SearchResultPlayer = React.forwardRef(({result, className, ...props}, ref) => (
  <li {...props} ref={ref} className={U.cns("search-result", className)}>
    <img className="avatar" src={U.view("avatar", result)} />
    <span className="nickname">{U.view("nickname", result)}</span>
  </li>
))

const scrollVisible = element =>
  element && element.scrollIntoView({ block: "nearest" })

const lengthAtLeast = n => R.compose(R.lte(n), R.length)

module.exports = {Search}
