type period = {
    period: number,
    periodType: string,
    score: number,
}

type periods = {
    [key: number]: period
}

type team = {
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

type game = {
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
    homeTeam: team,
    awayTeam: team,
    gameLeaders: gameLeaders,
    pbOdds: pbOdds,
}

export default game