export async function GET() {
    const res = await fetch('https://stats.nba.com/stats/leaguestandingsv3?GroupBy=conf&LeagueID=00&Season=2024-25&SeasonType=Regular%20Season&Section=overall', {
        headers: {
            'host': 'stats.nba.com',
            'referer': 'https://www.nba.com/',
        },
    })
    const data = await res.json()
    const standings = data.resultSets[0].rowSet
    return Response.json(standings)
}