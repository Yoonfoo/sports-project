import Links from "../../../projectLinks/links";
import MainLayout from "./mainLayout";
import { todayScoreboards, schedule } from "../../../interface-definition/scoreboard-interface";

async function getTodayScoreboard(): Promise<todayScoreboards> {

    const res = await fetch('https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json',{
        headers:{
            "referer": "https://www.nba.com/",
        },
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
    })
    if(!res.ok){
        throw new Error('Failed to fetch schedule')
    }
    const data = await res.json()
    const schedules = data.leagueSchedule.gameDates
    return schedules
}

async function fetchStanding(): Promise<any> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/nba/standings`)
    if(!res.ok){
        throw new Error('Failed to fetch standings')
    }
    const data = await res.json()
    return data
}

export default async function Scoreboard(){

    const standings = await fetchStanding()
    const todayScoreboards = await getTodayScoreboard()
    const schedules = await fetchSchedule()
    const teamLogos = Links.TEAM_LOGO as Record<string, string>
    console.log(standings)

    return(
        <MainLayout todayScoreboard={todayScoreboards} teamLogos={teamLogos} schedules={schedules}/>
    )
}


