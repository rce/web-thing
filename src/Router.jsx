const React = require("karet")
const {Atom} = require("kefir.atom")
const R = require("ramda")
const pathToRegexp = require("path-to-regexp")

const RouterContext = React.createContext()

const getCurrentLocation = () => window.location.hash

// This atom provides the location info for the app
// Currently it is simply the hash part
const Location = new Atom(getCurrentLocation())

Location.onValue(hash => {
  console.log("Sync Atom -> window.location")
  window.location.hash = hash
})

window.onhashchange = () => {
  console.log("Sync window.location -> Atom")
  Location.set(getCurrentLocation())
}

const navigate = hash => Location.set(hash)

const BrowserRouter = ({children}) => {
  return (
    <RouterContext.Provider value={Location}>
      {children}
    </RouterContext.Provider>
  )
}

const prepareRegex = hash => {
  let keys = []
  const regex = pathToRegexp(hash, keys)
  const paramNames = keys.map(R.prop("name"))
  return [regex, paramNames]
}

const Route = ({hash, Component}) => {
  const [regex, paramNames] = prepareRegex(hash)

  return (
    <RouterContext.Consumer>
      {location => <React.Fragment>
        {location.map(hash => {
          const match = regex.exec(hash)
          if (match) {
            const paramMatches = R.tail(match)
            const params = R.zipObj(paramNames, paramMatches)
            return <Component key="1" params={params} location={location} />
          }
        })}
      </React.Fragment>}
    </RouterContext.Consumer>
  )
}

const Link = ({href, ...props}) =>
  <RouterContext.Consumer>
    {location => <a href={href} onClick={onClick(href, location)} {...props} />}
  </RouterContext.Consumer>

const onClick = (href, location) => () =>
  location.view("pathname").set(href)


module.exports = {BrowserRouter, Route, Link, navigate}
