'use client'
import { useEffect, useState } from 'react';
import { todayScoreboards } from '../interface-definition/scoreboard-interface';
import schedules from '../interface-definition/scoreboard-interface';
import boxscoreGame from '../interface-definition/boxscore-interface';
import BoxScore from './boxscore';
import ScoreboardSummary from './scoreboard-summary';
import PopupCalendar from './popup-calendar';
import ShowCalendarButton from './show-calendar-button';
import { SlArrowDown } from 'react-icons/sl'

interface BoxScoreMainProps {
    schedules: schedules,
    todayScoreboard: todayScoreboards,
    teamLogos: Record<string, string>
}

export default function BoxScoreMain({schedules, todayScoreboard, teamLogos}: BoxScoreMainProps) {

    const [selectedDate, setSelectedDate] = useState<string>(`${new Date().getMonth()+1}/${(new Date().getDate()-1).toString().padStart(2,'0')}/${new Date().getFullYear()} 00:00:00`)
    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const [showCalendarBar, setShowCalendarBar] = useState<boolean>(false);
    const [selectedGameBoxScore, setSelectedGameBoxScore] = useState<boxscoreGame>()
    const [selectedGameID, setSelectedGameID] = useState<string>('')

    useEffect(() => {
        const fetchGame = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/nba/boxscore?gameID=${selectedGameID}`)
            if(!res.ok){
                throw new Error('Failed to fetch boxscore')
            }
            setSelectedGameBoxScore(await res.json())
        }
        fetchGame()
    },[selectedGameID])

    const handleShowCalendar = () => {
        setShowCalendar(prev => !prev)
    }

    const handleShowCalendarBar = () => {
        setShowCalendarBar(prev => !prev)
    }

    const handleShowBoxScore = (gameId: string) => {
        setSelectedGameID(gameId)
        setShowCalendar(false)
    }

    return(
        <>
            <div className={`bg-gray-400 p-8 z-50 flex fixed inset-x-0 flex justify-center border-2 transition-transform duration-500 ease-in-out ${showCalendarBar ? 'translate-y-0' : '-translate-y-full'}`} onMouseOver={()=>setShowCalendarBar(true)} onMouseOut={()=>setShowCalendarBar(false)}>
                <ShowCalendarButton calendarShow={handleShowCalendar}/>
            </div>
            <SlArrowDown className="absolute flex justify-center inset-x-1/2 animate-bounce mt-4 w-8 h-8" onMouseEnter={handleShowCalendarBar} onMouseOut={handleShowCalendarBar}/>
            <div className="flex flex-row">
                <div className="basis-1/5 h-screen overflow-auto">
                    <ScoreboardSummary schedulesGames={schedules} todayScoreboard={todayScoreboard} date={selectedDate} teamLogos={teamLogos} setGameId={handleShowBoxScore}/>
                </div>
                {showCalendar &&
                <div className="fixed inset-0 z-50 my-48 flex justify-center">
                    <PopupCalendar setSelectedDate={setSelectedDate}/>
                </div>
                }
                {selectedGameBoxScore && 
                <div className="ml-48 basis-3/5 h-screen overflow-y-auto">
                    <BoxScore boxscore={selectedGameBoxScore} teamLogos={teamLogos}/>
                </div>
                }
            </div>
        </>
    )
}