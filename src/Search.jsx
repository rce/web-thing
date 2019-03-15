const React = require("karet")
const {Atom} = require("kefir.atom")
const R = require("ramda")
const U = require("karet.util")
const Kefir = require("kefir")

const FaceitClient = require("./Faceit.js")
const {Spinner} = require("./Common.jsx")
const {isAwaiting} = require("./Util.js")
const {avatarLens} = require("./Lenses.js")

const Search = ({onSelect}) => {
  const nameInput = new Atom("")
  const selectedIndex = new Atom(undefined)

  const searchTerm = nameInput.filter(lengthAtLeast(3)).debounce(250).skipDuplicates()
  const searchResults = searchTerm
    .flatMapLatest(name => FaceitClient.searchPlayer(name))
    .toProperty(() => [])

  const loadingResults = isAwaiting(searchTerm, searchResults)

  // Reset selection on new search results
  searchResults.onValue(() => selectedIndex.set(undefined))

  // Trigger onSelect handler on selection
  Kefir.combine([selectedIndex], [searchResults])
    .onValue(([idx, results]) => isDefined(idx) && onSelect(results[idx]))

  const upsAndDowns = U.bus()
  const onKeyDown = e => {
    if (["ArrowDown", "ArrowUp"].includes(e.key)) {
      e.preventDefault()
      e.persist()
      upsAndDowns.push(e)
    }
  }

  Kefir.combine([upsAndDowns], [selectedIndex, searchResults])
    .onValue(([e, idx, items]) => {
      // If there are no items, nothing can be selected
      if (items.length === 0) {
        return selectedIndex.set(undefined)
      }

      // If there is nothing selected, always select the first item
      if (!isDefined(idx)) {
        return selectedIndex.set(0)
      }

      // Otherwise select the previous/next item unless at the start or end of the list
      const mod = e.key === "ArrowUp" ? R.dec : R.inc
      const newIdx = limitRange(0, items.length)(mod(idx))
      selectedIndex.set(newIdx)
    })

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
    </ul>
  </div>
}

const SearchResultPlayer = React.forwardRef(({result, className, ...props}, ref) => (
  <li {...props} ref={ref} className={U.cns("search-result", className)}>
    <img className="avatar" src={U.view(avatarLens, result)} />
    <span className="nickname">{U.view("nickname", result)}</span>
  </li>
))

const scrollVisible = element =>
  element && element.scrollIntoView({ block: "nearest" })

const lengthAtLeast = n => R.compose(R.lte(n), R.length)

const limitRange = (min, max) => R.pipe(R.min(max), R.max(min))

const isDefined = x => typeof x !== "undefined"

module.exports = {Search}
