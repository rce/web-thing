const Kefir = require("kefir")
const R = require("ramda")
const {DateTime} = require("luxon")

const API_KEY = "82592226-3fb7-41cf-941c-7098de7d84c7"

class FaceitClient {
  constructor(apiKey) {
    this.base = "https://open.faceit.com/data/v4"
    this.apiKey = apiKey
    this.authHeaders = {"Authorization": `Bearer ${this.apiKey}`}
  }

  searchPlayer(nickname) {
    return this.callApi("GET", "/search/players", {nickname, limit: "1000", game: "csgo"})
      .map(R.prop("items"))
  }

  getPlayer(playerId) {
    return this.callApi("GET", `/players/${playerId}`)
  }

  getHistory(playerId, game) {
    return this.callApi("GET", `/players/${playerId}/history`, {game})
      .map(R.prop("items"))
  }

  getMatch(matchId) {
    return this.callApi("GET", `/matches/${matchId}`)
      .map(m => R.mergeLeft({
        started_at: DateTime.fromSeconds(m.started_at),
      }, m))
  }

  getMatchStats(matchId) {
    return this.callApi("GET", `/matches/${matchId}/stats`)
  }

  callApi(method, path, params) {
    const url = `${this.base}${path}?${this.mkQueryString(params)}`
    return Kefir.fromPromise(
      fetch(url, {method, headers: this.authHeaders}).then(_ => _.json())
    )
  }

  mkQueryString(paramObject) {
    if (!paramObject) return ""

    const searchParams = new URLSearchParams()
    Object.entries(paramObject).forEach(([key, value]) =>
      searchParams.append(key, String(value)))
    return searchParams.toString()
  }
}

module.exports = new FaceitClient(API_KEY)
