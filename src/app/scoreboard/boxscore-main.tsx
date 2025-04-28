'use client'
import { useEffect, useState, useMemo } from 'react';
import { addDays, format, subDays } from 'date-fns';
import { todayScoreboards } from '../../../interface-definition/scoreboard-interface';
import { game, schedule } from '../../../interface-definition/scoreboard-interface';
import { boxscoreGame } from '../../../interface-definition/boxscore-interface';
import BoxScore from './boxscore';
import HorizontalScoreboard from './horizontal-scoreboard';
import ScoreboardSummary from './scoreboard-summary';
import PopupCalendar from './popup-calendar';


interface BoxScoreMainProps {
    todayScoreboard: todayScoreboards,
    teamLogos: Record<string, string>,
    schedules: schedule[]
}

export default function BoxScoreMain({todayScoreboard, teamLogos, schedules}: BoxScoreMainProps) {

    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const [selectedGameBoxScore, setSelectedGameBoxScore] = useState<boxscoreGame>()
    const [selectedGameBoxScoreDiv, setSelectedGameBoxScoreDiv] = useState<string>("")
    const [selectedDatePrev, setSelectedDatePrev] = useState<Date>(subDays(new Date(), 1));
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedDateNext, setSelectedDateNext] = useState<Date>(addDays(new Date(), 1));
    const [selectedMatchesPrev, setSelectedMatchesPrev] = useState<todayScoreboards | game[]>([])
    const [selectedMatches, setSelectedMatches] = useState<todayScoreboards | game[]>(todayScoreboard)
    const [selectedMatchesNext, setSelectedMatchesNext] = useState<todayScoreboards | game[]>([])

    const fetchGame = async(gameID:string) => {
        try {
            const res = process.env.NODE_ENV === 'development' 
            ? await fetch(`http://localhost:3000/api/nba/boxscore?gameID=${gameID}`) 
            : await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/nba/boxscore?gameID=${gameID}`)
            const data = await res.json()
            return data
        }
        catch (error) {
            console.error("Error fetching game data:", error);
            return undefined;
        }
    }

    useEffect(() => {
        const latestMatchesPrev = schedules?.find(game => game.gameDate == format(subDays(selectedDate, 2), 'MM/dd/yyyy 00:00:00'))
        const latestMatchesNext = schedules?.find(game => game.gameDate == format(selectedDate, 'MM/dd/yyyy 00:00:00'))
                
        if(latestMatchesPrev){
            setSelectedMatchesPrev(latestMatchesPrev.games)
        }
        else setSelectedMatchesPrev([])
        if(latestMatchesNext){
            setSelectedMatchesNext(latestMatchesNext.games)
        }
        else setSelectedMatchesNext([])

    }, [])

    const handleShowBoxScore = async(gameId: string) => {
        setSelectedGameBoxScore(await fetchGame(gameId))
    }

    const handleShowBoxScoreDiv = (id: string) => {
        setSelectedGameBoxScoreDiv(id)
    }
    
    const handleSelectSchedule = (day:Date) => {
        setSelectedGameBoxScore(undefined)
        setSelectedDate(day)
        const selectedMatchesPrev = schedules?.find(game => game.gameDate == format(subDays(day ,2), 'MM/dd/yyyy 00:00:00'))
        const selectedMatches = schedules?.find(game => game.gameDate == format(subDays(day, 1), 'MM/dd/yyyy 00:00:00'))
        const selectedMatchesNext = schedules?.find(game => game.gameDate == format(day, 'MM/dd/yyyy 00:00:00'))
        setShowCalendar(false)
        if(selectedMatches){
            setSelectedMatches(selectedMatches.games)
        }
        else setSelectedMatches([])
        if(selectedMatchesPrev){
            setSelectedMatchesPrev(selectedMatchesPrev.games)
        }
        else setSelectedMatchesPrev([])
        if(selectedMatchesNext){
            setSelectedMatchesNext(selectedMatchesNext.games)
        }
        else setSelectedMatchesNext([])
    
    }

    let horizontalScoreboard;
    if(selectedGameBoxScoreDiv === "scoreboard-1") horizontalScoreboard = <HorizontalScoreboard todayScoreboard={selectedMatchesPrev} teamLogos={teamLogos} setGameId={handleShowBoxScore}/>
    else if(selectedGameBoxScoreDiv === "scoreboard-2") horizontalScoreboard = <HorizontalScoreboard todayScoreboard={selectedMatches} teamLogos={teamLogos} setGameId={handleShowBoxScore}/>
    else if(selectedGameBoxScoreDiv === "scoreboard-3") horizontalScoreboard = <HorizontalScoreboard todayScoreboard={selectedMatchesNext} teamLogos={teamLogos} setGameId={handleShowBoxScore}/>

    return(
        <div className="">
            <div className="absolute top-3 left-1/2 -translate-x-1/2 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={()=>setShowCalendar(prev => !prev)}>
                    <path fill="#fff" d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-1V1"/>
                </svg>
            </div>

            {selectedGameBoxScore 
            ?
                <div id="scoreboard" className="flex gap-2 py-2 px-2 overflow-x-auto sticky top-0 bg-slate-600">
                    {horizontalScoreboard}
                </div>
                :
                <div className="md:grid md:grid-cols-2 lg:grid-cols-3">
                    <div id="scoreboard-1" className="hidden lg:block">
                        <span>{format(subDays(selectedDate, 1), 'yyyy-MM-dd')}</span>
                        <ScoreboardSummary todayScoreboard={selectedMatchesPrev} teamLogos={teamLogos} setGameId={handleShowBoxScore} setGameBoxScoreDiv={handleShowBoxScoreDiv} divId="scoreboard-1"/>
                    </div>
                    <div id="scoreboard-2" className="">
                        <span>{format(selectedDate, 'yyyy-MM-dd')}</span>
                        <ScoreboardSummary todayScoreboard={selectedMatches} teamLogos={teamLogos} setGameId={handleShowBoxScore} setGameBoxScoreDiv={handleShowBoxScoreDiv} divId="scoreboard-2"/>
                    </div>
                    <div id="scoreboard-3" className="hidden md:block">
                        <span>{format(addDays(selectedDate, 1), 'yyyy-MM-dd')}</span>
                        <ScoreboardSummary todayScoreboard={selectedMatchesNext} teamLogos={teamLogos} setGameId={handleShowBoxScore} setGameBoxScoreDiv={handleShowBoxScoreDiv} divId="scoreboard-3"/>
                    </div>
                </div>
            }

            {showCalendar &&
            <div className="fixed inset-0 z-50 my-48 flex justify-center">
                <PopupCalendar setDate={handleSelectSchedule} date={selectedDate}/>
            </div>
            }

            {selectedGameBoxScore && 
                <BoxScore boxscore={selectedGameBoxScore} teamLogos={teamLogos}/>
            }
        </div>
    )
}