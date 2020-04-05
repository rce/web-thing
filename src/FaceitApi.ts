import {from, observable, Observable} from "rxjs"
import {flatMap} from "rxjs/operators";

const API_KEY = "82592226-3fb7-41cf-941c-7098de7d84c7"

type QueryParams = { [key: string]: string }

export interface GetSearchPlayersResponse {
  items: Array<GetSearchPlayersResponse$Player>
  start: number
  end: number
}

export interface GetSearchPlayersResponse$Player {
  player_id: string
  nickname: string
  status: string
  games: Array<{
    name: string
    skill_level: string
  }>
  country: string
  verified: boolean
  avatar: string
}

export function searchPlayer(nickname: string, offset: number, limit: number): Observable<GetSearchPlayersResponse> {
  return callApi("GET", "/search/players", {
    nickname,
    game: "csgo",
    offset: String(offset),
    limit: String(limit),
  })
    .pipe(flatMap(response => from(response.json())))
}

export interface GetPlayerResponse {
  player_id: string
  nickname: string
  avatar: string
  country: string
  cover_image: string
  cover_featured_image: string
  infractions: {
    last_infraction_date: string
    afk: number
    leaver: number
    qm_not_checkeding: number
    qm_not_voted: number
  }
  platforms: {
    steam: string
  }
  games: {
    [key: string]: GetPlayerResponse$Game
  }
  settings: {
    language: string
  }
  bans: unknown[]
  new_steam_id: string
  steam_id_64: string
  steam_nickname: string
  membership_type: string
  memberships: string[]
  faceit_url: string
}

export interface GetPlayerResponse$Game {
  game_profile_id: string
  region: string
  regions: {
    [region: string]: {
      selected_ladder_id: string
    }
  }
  skill_level_label: string
  game_player_id: string
  skill_level: number
  faceit_elo: number
  game_player_name: string
}

export function getPlayer(playerId: string): Observable<GetPlayerResponse> {
  return callApi("GET", `/players/${playerId}`)
    .pipe(flatMap(response => from(response.json())))
}

export interface GetMatchHistoryResponse {
  items: Array<GetMatchHistoryResponse$Match>
  start: number
  end: number
  from: number
  to: number
}

export interface GetMatchHistoryResponse$Match {
  match_id: string
  game_id: string
  region: string
  match_type: string
  game_mode: string
  max_players: number
  teams_size: number
  teams: {
    faction1: GetMatchHistoryResponse$Faction
    faction2: GetMatchHistoryResponse$Faction
  }
  playing_players: string[]
  competition_id: string
  competition_name: string
  organizer_id: string
  status: string
  started_at: number
  finished_at: number
  results: {
    winner: 'faction1' | 'faction2'
    score: {
      faction1: number
      faction2: number
    }
  }
  faceit_url: string
}

export interface GetMatchHistoryResponse$Faction {
  team_id: string
  nickname: string
  avatar: string
  type: string
  players: Array<{
    player_id: string
    nickname: string
    avatar: string
    skill_level: number
    game_player_id: string
    game_player_name: string
    faceit_url: string
  }>
}

export function getMatchHistory(playerId: string, game: string): Observable<GetMatchHistoryResponse> {
  return callApi("GET", `/players/${playerId}/history`, { game })
    .pipe(flatMap(response => from(response.json())))
}

export type GetMatchResponse = GetMatchResponse$MatchV1 | GetMatchResponse$MatchV2

export interface GetMatchResponse$MatchV1 {
  version: 1
  match_id: string
}

export interface GetMatchResponse$MatchV2 {
  version: 2
  match_id: string
  game: string
  region: string
  competition_id: string
  competition_type: string
  competition_name: string
  organizer_id: string
  teams: {
    faction1: GetMatchResponse$MatchV2$Faction
    faction2: GetMatchResponse$MatchV2$Faction
  }
  voting: {
    voted_entity_types: string[]
    [entity_type: string]: string[] | {
      entities: Array<{
        class_name: string
        game_map_id: string
        guid: string
        image_ld: string
        image_sm: string
        name: string
      }>
      pick: string[]
    }
  }
  calculate_elo: boolean
  configured_at: number
  started_at: number
  finished_at: number
  demo_url: string[]
  chat_room_id: string
  best_of: number
  results: {
    winner: "faction1" | "faction2"
    score: {
      faction1: number
      faction2: number
    }
  }
  status: string
  faceit_url: string
}

export interface GetMatchResponse$MatchV2$Faction {
  faction_id: string
  leader: string
  avatar: string
  roster: Array<GetMatchResponse$MatchV2$Faction$Player>
  substituted: boolean
  name: string
  type: string
}

export interface GetMatchResponse$MatchV2$Faction$Player {
  player_id: string
  nickname: string
  avatar: string
  membership: string
  game_player_id: string
  game_player_name: string
  game_skill_level: number
  anticheat_required: boolean
}

export function getMatch(matchId: string): Observable<GetMatchResponse> {
  return callApi("GET", `/matches/${matchId}`)
    .pipe(flatMap(response => from(response.json())))
}

export function getMatchStats(matchId: string): Observable<any> {
  return callApi("GET", `/matches/${matchId}/stats`)
    .pipe(flatMap(response => from(response.json())))
}

function callApi(method: string, path: string, params?: QueryParams): Observable<Response> {
  const url = params
    ? `https://open.faceit.com/data/v4${path}?${mkQueryString(params)}`
    : `https://open.faceit.com/data/v4${path}`
  return new Observable<Response>(observer => {
    const abortController = new AbortController()
    let requestDone = false

    fetch(url, {
      method,
      headers: { "Authorization": `Bearer ${API_KEY}` },
      signal: abortController.signal
    })
    .then(response => {
      requestDone = true
      observer.next(response)
      observer.complete()
    })
    .catch(err => {
      observer.error(err)
      observer.complete()
    })

    return () => {
      if (!requestDone) {
        console.log(`Cancelling request in progress: ${path}`)
        abortController.abort()
      }
    }
  })
}

function mkQueryString(params: QueryParams): string {
  const searchParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) =>
    searchParams.append(key, value))
  return searchParams.toString()
}
