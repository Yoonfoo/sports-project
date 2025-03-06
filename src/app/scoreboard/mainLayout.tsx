'use client'
import { useEffect, useState, useMemo } from 'react';
import { todayScoreboards } from '../../../interface-definition/scoreboard-interface';
import { game, schedule } from '../../../interface-definition/scoreboard-interface';
import { boxscoreGame } from '../../../interface-definition/boxscore-interface';
import BoxScore from './boxscore';
import Scoreboard from './scoreboard';
import PopupCalendar from './popupCalendar';
import ShowCalendarButton from './showCalendarButton';
import "./scoreboardPage.css"


interface MainLayoutProps {
    todayScoreboard: todayScoreboards,
    teamLogos: Record<string, string>,
    schedules: schedule[]
}

export default function MainLayout({todayScoreboard, teamLogos, schedules}: MainLayoutProps) {

    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const [selectedGameBoxScore, setSelectedGameBoxScore] = useState<boxscoreGame | undefined>(undefined)
    const [todayMatches, setTodayMatches] = useState<todayScoreboards>(todayScoreboard)
    const [latestMatches, setLatestMatches] = useState<game[]>([])

    const fetchGame = async(gameID:string) => {
        const res = process.env.NODE_ENV === 'development' 
        ? await fetch(`http://localhost:3000/api/nba/todayScoreboard?gameID=${gameID}`) 
        : await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/nba/todayScoreboard?gameID=${gameID}`)
        const data = await res.json()
        return data
    }


    useEffect(() => {
        const fetchTodayScoreboard = async () => {
            const res = await fetch('/api/nba/todayMatches', { cache: 'no-store' }); // Use API route to avoid direct fetch
            if (res.ok) {
                const data = await res.json();
                setTodayMatches(data);
            }
        };

        const interval = setInterval(fetchTodayScoreboard, 5000); // Auto-refresh every 10 sec

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    useEffect(() => {
        // Restore state on popstate (Back/Forward button)
        const handlePopState = (event: PopStateEvent) => {
            if (event.state) {
                setSelectedGameBoxScore(event.state.selectedGameBoxScore);
                // setLatestMatches(event.state.latestMatches);
            }
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
        
    }, []);

    // const updateHistoryState = () => {
    //     window.history.pushState(
    //         {
    //             selectedGameBoxScore: selectedGameBoxScore,
    //             latestMatches: latestMatches,
    //         },
    //         ''
    //     );
    // };

    const handleShowCalendar = () => {
        setShowCalendar(prev => !prev)
    }


    const handleShowBoxScore = async(gameId: string) => {
        setSelectedGameBoxScore(await fetchGame(gameId))
        window.history.pushState({selectedGameBoxScore:selectedGameBoxScore}, '', '/scoreboard')
    }
    
    const handleSelectSchedule = (day:string) => {
        setSelectedGameBoxScore(undefined);
        const latestMatch = schedules?.find((game) => game.gameDate == day);
        setShowCalendar(false);
        setLatestMatches(latestMatch ? latestMatch.games : []);
        console.log(latestMatches)
        // window.history.pushState({latestMatches:latestMatches}, '', '/scoreboard')
    }
    
    const memoizedScoreboard = useMemo(() => (
            <>
                {selectedGameBoxScore
                ?
                (<div id="scoreboard" className="sm:sm-scoreboard-container-flex">
                    <Scoreboard todayScoreboard={todayMatches} teamLogos={teamLogos} setGameId={handleShowBoxScore} main={false}/>
                </div>)
                :
                (<div id="scoreboard" className="sm:sm-scoreboard-container lg:lg-scoreboard-container">
                    <Scoreboard todayScoreboard={todayMatches} teamLogos={teamLogos} setGameId={handleShowBoxScore} main={true}/>
                </div>)
                }
            </>
    ), [todayMatches, selectedGameBoxScore, teamLogos]);

    return(
        <div>
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
            <div className="sm-show-calendar-container">
                <ShowCalendarButton calendarShow={handleShowCalendar}/>
            </div>
            {memoizedScoreboard}
            {showCalendar &&
            <div className="sm-popup-calendar-container">
                <PopupCalendar setSelectedDate={handleSelectSchedule}/>
            </div>
            }
            {selectedGameBoxScore && 
            <BoxScore boxscore={selectedGameBoxScore} teamLogos={teamLogos}/>
            }
        </div>
    )
}