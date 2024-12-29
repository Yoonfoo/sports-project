import Links from "../../../projectLinks/links";
import BoxScoreMain from "./boxscore-main";
import { todayScoreboards } from "../../../interface-definition/scoreboard-interface";

async function getTodayScoreboard(): Promise<todayScoreboards> {

    const res = await fetch('https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json',{
        headers:{
            "referer": "https://www.nba.com/",
        },
        cache: "force-cache",
        next:{
            revalidate: 43200,
        }
    })
    if(!res.ok){
        throw new Error('Failed to fetch today scoreboard')
    }
    const data = await res.json()
    const games = data.scoreboard.games
    return games
}


export default async function Scoreboard(){
    
    const todayScoreboards = await getTodayScoreboard()
    const teamLogos = Links.TEAM_LOGO as Record<string, string>

    return(
        <BoxScoreMain todayScoreboard={todayScoreboards} teamLogos={teamLogos}/>
    )
}


