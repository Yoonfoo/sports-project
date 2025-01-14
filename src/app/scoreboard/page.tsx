import Links from "../../../projectLinks/links";
import BoxScoreMain from "./boxscore-main";
import { todayScoreboards, schedule } from "../../../interface-definition/scoreboard-interface";

async function getTodayScoreboard(): Promise<todayScoreboards> {

    const res = await fetch('https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json',{
        headers:{
            "referer": "https://www.nba.com/",
        },
        next: {
            revalidate: 10
        }
    })
    if(!res.ok){
        throw new Error('Failed to fetch today scoreboard')
    }
    const data = await res.json()
    const games = data.scoreboard.games
    return games
}

async function fetchSchedule(): Promise<schedule[]> {
    const res = await fetch('https://cdn.nba.com/static/json/staticData/scheduleLeagueV2_32.json',{
        headers:{
            "referer": "http://www.nba.com/",
        },
        next: {
            revalidate: 3600,
        },
    })
    if(!res.ok){
        throw new Error('Failed to fetch schedule')
    }
    const data = await res.json()
    const schedules = data.leagueSchedule.gameDates
    return schedules
}

export default async function Scoreboard(){
    
    const todayScoreboards = await getTodayScoreboard()
    const schedules = await fetchSchedule()
    const teamLogos = Links.TEAM_LOGO as Record<string, string>

    return(
        <BoxScoreMain todayScoreboard={todayScoreboards} teamLogos={teamLogos} schedules={schedules}/>
    )
}


