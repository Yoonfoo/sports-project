'use client'
import { useEffect, useState } from 'react';
import { todayScoreboards } from '../../../interface-definition/scoreboard-interface';
import schedules, { schedule, game } from '../../../interface-definition/scoreboard-interface';
import boxscoreGame from '../../../interface-definition/boxscore-interface';
import BoxScore from './boxscore';
import ScoreboardSummary from './scoreboard-summary';
import PopupCalendar from './popup-calendar';
import ShowCalendarButton from './show-calendar-button';
import { SlArrowDown } from 'react-icons/sl'
import { format, subDays } from 'date-fns';

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
    const [latestMatches, setLatestMatches] = useState<todayScoreboards | game[]>(todayScoreboard)

    useEffect(() => {
        const fetchGame = async () => {
            const res = await fetch(`http://localhost:3000/api/nba/boxscore?gameID=${selectedGameID}`)
            // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/nba/boxscore?gameID=${selectedGameID}`)
            if(!res.ok){
                throw new Error('Failed to fetch boxscore')
            }
            setSelectedGameBoxScore(await res.json())
        }
        if(selectedGameID) fetchGame()
        console.log(latestMatches)
        if(Array.isArray(latestMatches) && latestMatches.length === 0){
            const latestMatchDay = subDays(new Date(), 1)
            
            for(let i=1;;i++){
                const latestMatch = schedules.find(game => game.gameDate == format(latestMatchDay, 'MM/dd/yyyy 00:00:00'))
                console.log(latestMatch)
                if(latestMatch){
                    setLatestMatches(latestMatch.games)
                    break
                }
                else latestMatchDay.setDate(latestMatchDay.getDate()-1)
            }

        }
        
        // else setSelectedDate(`${new Date().getMonth()+1}/${(new Date().getDate()-2).toString().padStart(2,'0')}/${new Date().getFullYear()} 00:00:00`)
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
            <div className={`bg-gray-400 p-8 z-20 flex fixed inset-x-0 justify-center border-2 transition-transform duration-500 ease-in-out ${showCalendarBar ? '-translate-y-16' : '-translate-y-44'}`} onMouseOver={()=>setShowCalendarBar(true)} onMouseOut={()=>setShowCalendarBar(false)}>
                <ShowCalendarButton calendarShow={handleShowCalendar}/>
            </div>
            <SlArrowDown className="absolute flex justify-center inset-x-1/2 animate-bounce mt-4 w-8 h-8" onMouseEnter={handleShowCalendarBar} onMouseOut={handleShowCalendarBar}/>
            <div className="flex flex-row w-full">
                <div className="w-1/5 overflow-auto">
                    <ScoreboardSummary schedulesGames={schedules} todayScoreboard={latestMatches} date={selectedDate} teamLogos={teamLogos} setGameId={handleShowBoxScore}/>
                </div>
                {showCalendar &&
                <div className="fixed inset-0 z-50 my-48 flex justify-center">
                    <PopupCalendar setSelectedDate={setSelectedDate}/>
                </div>
                }
                {selectedGameBoxScore && 
                <div className="w-4/5 overflow-auto flex flex-row justify-center">
                    <BoxScore boxscore={selectedGameBoxScore} teamLogos={teamLogos}/>
                </div>
                }
            </div>
        </>
    )
}