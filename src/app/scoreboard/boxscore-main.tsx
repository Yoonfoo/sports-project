'use client'
import { useEffect, useState } from 'react';
import { todayScoreboards } from '../../../interface-definition/scoreboard-interface';
import schedules, { game } from '../../../interface-definition/scoreboard-interface';
import boxscoreGame from '../../../interface-definition/boxscore-interface';
import BoxScore from './boxscore';
import ScoreboardSummary from './scoreboard-summary';
import PopupCalendar from './popup-calendar';
import ShowCalendarButton from './show-calendar-button';
// import { SlArrowDown } from 'react-icons/sl'

interface BoxScoreMainProps {
    todayScoreboard: todayScoreboards,
    teamLogos: Record<string, string>
}

async function fetchGame(selectedGameID: string): Promise<boxscoreGame> {
    const res = process.env.NODE_ENV === 'development'
    ? await fetch(`http://localhost:3000/api/nba/boxscore?gameID=${selectedGameID}`,{
        headers:{
            "referer": "http://www.nba.com/",
        },
        cache: "force-cache",
    })
    : await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/nba/boxscore?gameID=${selectedGameID}`, {
        headers:{
            "referer": "http://www.nba.com/",
        },
        cache: "force-cache",
    })
    if(!res.ok){
        throw new Error('Failed to fetch boxscore')
    }
    return await res.json()
}

async function fetchSchedule(): Promise<schedules> {
    const res = process.env.NODE_ENV === 'development'
    ? await fetch('http://localhost:3000/api/nba/schedule',{
        headers:{
            "referer": "http://www.nba.com/",
        },
        cache: "force-cache",
    })
    : await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/nba/schedule`, {
        headers:{
            "referer": "http://www.nba.com/",
        },
        cache: "force-cache",
    })
    if(!res.ok){
        throw new Error('Failed to fetch schedule')
    }
    return await res.json()
}

export default function BoxScoreMain({todayScoreboard, teamLogos}: BoxScoreMainProps) {

    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    // const [showCalendarBar, setShowCalendarBar] = useState<boolean>(false);

    const [selectedGameBoxScore, setSelectedGameBoxScore] = useState<boxscoreGame>()
    const [latestMatches, setLatestMatches] = useState<todayScoreboards | game[]>(todayScoreboard)
    const [schedulesMatches, setSchedulesMatches] = useState<schedules>()

    useEffect(() => {
    const fetchScheduleData = async () => {
        const schedule = await fetchSchedule()
        setSchedulesMatches(schedule);
    } 
    fetchScheduleData();
        
    }, []);

    const handleShowCalendar = () => {
        setShowCalendar(prev => !prev)
    }

    // const handleShowCalendarBar = () => {
    //     setShowCalendarBar(prev => !prev)
    // }

    const checkShowScoreboard = ():boolean => {
        const scoreboard = document.getElementById("scoreboard")
        return scoreboard?.classList.contains("hidden") || !scoreboard
    }

    const handleShowScoreboard = () => {
        const scoreboard = document.getElementById("scoreboard")
        scoreboard?.classList.toggle("hidden")
    }

    const handleShowBoxScore = async(gameId: string) => {
        setSelectedGameBoxScore(await fetchGame(gameId))
        handleShowScoreboard()
        setShowCalendar(false)
    }

    const handleSelectSchedule = (day:string) => {
        setSelectedGameBoxScore(undefined)
        const temp = checkShowScoreboard()
        if(temp) handleShowScoreboard()
        const latestMatch = schedulesMatches?.find(game => game.gameDate == day)
        if(latestMatch){
            setLatestMatches(latestMatch.games)
        }
        else setLatestMatches([])
    }
    
    return(
        <>
            {/* <div className={`bg-gray-400 p-8 z-20 flex fixed inset-x-0 justify-center border-2 transition-transform duration-500 ease-in-out ${showCalendarBar ? '-translate-y-16' : '-translate-y-44'}`} onMouseOver={()=>setShowCalendarBar(true)} onMouseOut={()=>setShowCalendarBar(false)}>
                <ShowCalendarButton calendarShow={handleShowCalendar}/>
            </div>
            <SlArrowDown className="absolute flex justify-center inset-x-1/2 animate-bounce mt-4 w-8 h-8" onMouseEnter={handleShowCalendarBar} onMouseOut={handleShowCalendarBar}/>
            <div className="flex flex-row w-full">
                <div className="w-1/5 overflow-auto sm:w-1/4">
                    <ScoreboardSummary todayScoreboard={latestMatches} teamLogos={teamLogos} setGameId={handleShowBoxScore}/>
                </div>
                {showCalendar &&
                <div className="fixed inset-0 z-50 my-48 flex justify-center">
                    <PopupCalendar setSelectedDate={handleSelectSchedule}/>
                </div>
                }
                {selectedGameBoxScore && 
                <div className="w-4/5 overflow-auto flex flex-row justify-center">
                    <BoxScore boxscore={selectedGameBoxScore} teamLogos={teamLogos}/>
                </div>
                }
            </div> */}
            <div className="flex justify-center items-center">
                <ShowCalendarButton calendarShow={handleShowCalendar}/>
            </div>
            <div className="flex flex-row size-full">
                <div id="scoreboard" className="size-full z-10 overflow-auto">
                    <ScoreboardSummary todayScoreboard={latestMatches} teamLogos={teamLogos} setGameId={handleShowBoxScore}/>
                </div>
                {showCalendar &&
                <div className="fixed inset-0 z-50 my-48 flex justify-center">
                    <PopupCalendar setSelectedDate={handleSelectSchedule}/>
                </div>
                }
                {selectedGameBoxScore && 
                <div className="bg-gray-200 absolute size-full z-20 overflow-auto flex flex-row justify-center">
                    <BoxScore boxscore={selectedGameBoxScore} teamLogos={teamLogos}/>
                </div>
                }
            </div>
        </>
    )
}