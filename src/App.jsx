const React = require("karet")
const {render} = require("react-dom")

require("./style.scss")

const {BrowserRouter, Route, navigate} = require("./Router.jsx")
const PlayerDetails = require("./PlayerDetails.jsx")
const {Search} = require("./Search.jsx")

const App = () => {
  const onSelect = p => navigate(`#/player/${p.player_id}`)

  return (
    <BrowserRouter>
      <Search onSelect={onSelect} />
      <div className="main-content">
        <Route hash="#/player/:playerId" Component={PlayerDetails} />
      </div>
    </BrowserRouter>
  )
}

render(<App />, document.getElementById("app"))
