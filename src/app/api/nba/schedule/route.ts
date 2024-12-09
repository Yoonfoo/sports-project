export async function GET() {
    const res = await fetch('https://cdn.nba.com/static/json/staticData/scheduleLeagueV2_32.json',{
        headers:{
            "referer": "https://www.nba.com/",
        }
    })

    const data = await res.json()
    const schedule = data.leagueSchedule.gameDates
    return Response.json(schedule)
}