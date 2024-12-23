import { FC } from "react";
import Image from "next/image"
import { subDays, format } from "date-fns";
import schedules, { game, todayScoreboards, scoreboard } from "../../../interface-definition/scoreboard-interface";

type ScoreboardSummaryProps = {
    schedulesGames: schedules,
    todayScoreboard: todayScoreboards | game[],
    date: string,
    teamLogos: Record<string, string>
    setGameId: (gameId: string) => void
}

const ScoreboardSummary: FC<ScoreboardSummaryProps> = ({schedulesGames, todayScoreboard, date, teamLogos, setGameId}) => {
    
    
    const games = date == format(subDays(new Date(), 1), 'MM/dd/yyyy 00:00:00')
                        ? todayScoreboard
                        :schedulesGames.find((schedule)=> schedule.gameDate == date)?.games


    return(
        <>
        {
            games?.map((game:game | scoreboard) => (
                <div key={game.gameId} className="border-2 px-6 py-2" onClick={()=>setGameId(game.gameId)}>
                    <div className="flex flex-row justify-start px-2 py-2">
                        <span className="text-md">{game.gameLabel}&nbsp;</span>
                        <span className="text-md">{game.gameStatusText}</span>
                    </div>
                    <div className="flex flex-row justify-center items-center">
                        <div className="p-2">
                            <Image src={teamLogos[game.homeTeam.teamId]} alt={game.homeTeam.teamName} width={64} height={60} className="min-w-16 min-h-16"/>
                        </div>
                        <div className="items-center flex">
                            <span className="flex justify-center items-center w-16 h-16 p-8 text-3xl width-16">{game.homeTeam.score}</span>
                            <span className="flex justify-center items-center w-16 h-16 p-4 text-3xl width-16">-</span>
                            <span className="flex justify-center items-center w-16 h-16 p-8 text-3xl width-16">{game.awayTeam.score}</span>
                        </div>
                        <div className="p-2">
                            <Image src={teamLogos[game.awayTeam.teamId]} alt={game.awayTeam.teamName} width={64} height={64} className="min-w-16 min-h-16"/>
                        </div>
                    </div>
                    <div>
                        <span>{game.gameSubLabel}</span>
                    </div>
                </div>
            ))
        }
        </>          
    )
}

export default ScoreboardSummary