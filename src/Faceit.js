const Kefir = require("kefir")

module.exports = class FaceitClient {
    constructor(apiKey) {
        this.base = "https://open.faceit.com/data/v4"
        this.apiKey = apiKey
        this.authHeaders = {"Authorization": `Bearer ${this.apiKey}`}
    }

    searchPlayer(nickname) {
        return this.callApi("GET", "/search/players", {
            nickname,
            limit: 10,
            game: "csgo",
        })
    }

    getPlayer(playerId) {
        return this.callApi("GET", `/players/${playerId}`)
    }

    callApi(method, path, params) {
        const url = `${this.base}${path}?${this.mkQueryString(params)}`
        return Kefir.fromPromise(
            fetch(url, {
                method,
                headers: this.authHeaders,
            })
            .then(_ => _.json())
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