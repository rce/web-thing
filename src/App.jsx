const React = require("karet")
const {render} = require("react-dom")
const {Atom} = require("kefir.atom")
const U = require("karet.util")

require("./style.scss")

const PlayerDetails = require("./PlayerDetails.jsx")
const {Search} = require("./Search.jsx")

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

render(<App />, document.getElementById("app"))
