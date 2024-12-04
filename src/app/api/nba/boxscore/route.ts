import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {

    const gameID = request.nextUrl.searchParams.get("gameID")
    const url = "https://cdn.nba.com/static/json/liveData/boxscore/boxscore_0021900001.json"

    const res = await fetch(url,{
        method: 'GET',
        headers:{
            "Referer": "https://www.nba.com/",
        }
    })
    const data = await res.json()
    const game_data = data.game
    return Response.json(game_data)
}