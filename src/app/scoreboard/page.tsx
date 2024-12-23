import Links from "../../../projectLinks/links";
import BoxScoreMain from "./boxscore-main";
import schedules from "../../../interface-definition/scoreboard-interface";
import { todayScoreboards } from "../../../interface-definition/scoreboard-interface";

async function getSchedule(): Promise<schedules> {

    const res = await fetch('https://cdn.nba.com/static/json/staticData/scheduleLeagueV2_32.json',{
        headers:{
            "referer": "https://www.nba.com/",
        },
        cache: "no-store",
    })
    if(!res.ok){
        throw new Error('Failed to fetch schedule')
    }
    const data = await res.json()
    const schedule = data.leagueSchedule.gameDates
    return schedule
}

async function getTodayScoreboard(): Promise<todayScoreboards> {

    const res = await fetch('https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json',{
        headers:{
            "referer": "https://www.nba.com/",
        },
        next: {
            revalidate: 15
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
    
    const schedules = await getSchedule()
    const todayScoreboards = await getTodayScoreboard()
    const teamLogos = Links.TEAM_LOGO as Record<string, string>

    return(
        <BoxScoreMain schedules={schedules} todayScoreboard={todayScoreboards} teamLogos={teamLogos}/>
    )
}


