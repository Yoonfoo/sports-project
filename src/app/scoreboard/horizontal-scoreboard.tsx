import { FC } from "react";
import Image from "next/image"
import { game, todayScoreboards, scoreboard } from "../../../interface-definition/scoreboard-interface";

type ScoreboardSummaryProps = {
    todayScoreboard: todayScoreboards | game[],
    teamLogos: Record<string, string>
    setGameId: (gameId: string) => void
}

const HorizontalScoreboard: FC<ScoreboardSummaryProps> = ({todayScoreboard, teamLogos, setGameId}) => {

    return(
        <>
        { 
           todayScoreboard?.map((game:game | scoreboard) => (
                <div key={game.gameId} className="border-2 border-gray-100 rounded-lg shadow-inner px-4 py-2 bg-white" onClick={()=>setGameId(game.gameId)}>
                    <div className="text-xs lg:text-lg">
                        <span>{game.gameStatusText} {'gameClock' in game && game.gameClock}</span>
                    </div>
                    <div className="flex flex-row px-6 my-6 lg:px-8">
                        <Image src={teamLogos[game.homeTeam.teamId]} alt={game.homeTeam.teamName} width={60} height={60} className="max-w-8 max-h-8 lg:max-w-14 lg:max-h-14"/>
                        <div className="flex gap-4 text-xl lg:text-2xl items-center mx-4">
                            <span>{game.homeTeam.score}</span>
                            <span>-</span>
                            <span>{game.awayTeam.score}</span>
                        </div>
                        <Image src={teamLogos[game.awayTeam.teamId]} alt={game.awayTeam.teamName} width={60} height={60} className="max-w-8 max-h-8 lg:max-w-14 lg:max-h-14"/>
                    </div>
                    <div className="text-xs lg:text-lg">
                        <span>{game.gameLabel}&nbsp;</span>
                        <span>{game.gameSubLabel}</span>
                    </div>
                </div>
            ))
        }
        </>          
    )
}

export default HorizontalScoreboard