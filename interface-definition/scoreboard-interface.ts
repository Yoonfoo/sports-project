type period = {
    period: number,
    periodType: string,
    score: number,
}

type periods = {
    [key: number]: period
}

type todayTeam = {
    teamId: number,
    teamName: string,
    teamCity: string,
    teamTricode: string,
    wins: number,
    losses: number,
    score: number,
    seed: string | number | null,
    inBonus: string | number | null,
    timeoutsRemaining: number,
    periods: periods,
}

type teamGameLeaders = {
    personId: number,
    name: string,
    jerseyNum: string,
    position: string,
    teamTricode: string,
    playerSlug: string | null,
    points: number,
    rebounds: number,
    assists: number,
}

type gameLeaders = {
    homeTeam: teamGameLeaders,
    awayTeam: teamGameLeaders,
}

type pbOdds = {
    team: string | null,
    odds: number,
    suspended: number,
}

type scoreboard = {
    gameId: string,
    gameCode: string,
    gameStatus: number,
    gameStatusText: string,
    period: number,
    gameClock: string,
    gameTimeUTC: string,
    gameEt: string,
    regulationPeriods: number,
    ifNecessary: boolean,
    seriesGameNumber: number,
    gameLabel: string,
    gameSubLabel: string,
    seriesText: string,
    seriesConference: string,
    poRoundDesc: string,
    gameSubtype: string,
    homeTeam: todayTeam,
    awayTeam: todayTeam,
    gameLeaders: gameLeaders,
    pbOdds: pbOdds,
}

type todayScoreboards = Array<scoreboard>

export type { todayScoreboards, scoreboard }

type broadcasters = {
    nationalTvBroadcasters: Array<string|null>,
    nationalRadioBroadcasters: Array<string|null>,
    nationalOttBroadcasters: Array<string|null>,
    homeTvBroadcasters: Array<string|null>,
    homeRadioBroadcasters: Array<string|null>,
    homeOttBroadcasters: Array<string|null>,
    awayTvBroadcasters: Array<string|null>,
    awayRadioBroadcasters: Array<string|null>,
    awayOttBroadcasters: Array<string|null>,
    intlTvBroadcasters: Array<string|null>,
    intlRadioBroadcasters: Array<string|null>,
    intlOttBroadcasters: Array<string|null>,
}

type team = {
    teamId: number,
    teamName: string,
    teamCity: string,
    teamTricode: string,
    teamSlug: string,
    wins: number,
    losses: number,
    score: number,
    seed: string | number | null,
}

type pointsLeader = {
    personId: number,
    firstName: string,
    lastName: string,
    teamId: number,
    teamCity: string,
    teamName: string,
    teamTricode: string,
    points: number,
}

type game = {
    gameId: string,
    gameCode: string,
    gameStatus: number,
    gameStatusText: string,
    gameSequence: number,
    gameDateEst: string,
    gameDateUtc: string,
    gameTimeUtc: string,
    gameDateTimeUTC: string,
    awayTeamTime: string,
    homeTeamTime: string,
    day: string,
    monthNum: number,
    weekNumber: number,
    weekName: string,
    ifNecessary: boolean,
    seriesGameNumber: string,
    gameLabel: string,
    gameSubLabel: string,
    seriesText: string,
    arenaName: string,
    arenaState: string,
    arenaCity: string,
    postponedStatus: string,
    branchLink: string,
    gameSubtype: string,
    broadcasters: broadcasters,
    homeTeam: team,
    awayTeam: team,
    pointsLeaders: pointsLeader[],
}

type schedule = {
    gameDate: string,
    games: game[],
}

type schedules = Array<schedule>

export type { game, schedule }
export default schedules