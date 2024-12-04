import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {

    const res = await fetch('https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json',{
        headers:{
            "referer": "https://www.nba.com/",
        }
    })

    const data = await res.json()
    const games = data.scoreboard.games
    return Response.json(games)
}
