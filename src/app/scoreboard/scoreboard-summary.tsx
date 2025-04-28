import { FC } from "react";
import Image from "next/image"
import { game, todayScoreboards, scoreboard } from "../../../interface-definition/scoreboard-interface";

type ScoreboardSummaryProps = {
    todayScoreboard: todayScoreboards | game[],
    teamLogos: Record<string, string>
    setGameId: (gameId: string) => void
    setGameBoxScoreDiv: (gameId: string) => void
    divId: string
}

const ScoreboardSummary: FC<ScoreboardSummaryProps> = ({todayScoreboard, teamLogos, setGameId, setGameBoxScoreDiv, divId}) => {

    return(
        <>
        {
            todayScoreboard?.map((game:game | scoreboard) => (
                <div key={game.gameId} className="border-2 border-gray-100 m-2 rounded-xl shadow-inner px-4 py-2" onClick={()=> {setGameId(game.gameId); setGameBoxScoreDiv(divId)}}>
                    <div className="text-sm py-2 md:text-lg lg:text-xl">
                        <span>{game.gameStatusText} {'gameClock' in game && game.gameClock}</span>
                    </div>
                    <div className="flex flex-row justify-evenly my-4">
                        <Image src={teamLogos[game.homeTeam.teamId]} alt={game.homeTeam.teamName} width={128} height={128} className="max-w-12 max-h-12 md:max-w-20 md:max-h-20 lg:max-w-20 lg:max-h-20"/>
                        <div className="flex gap-4 text-xl items-center md:text-3xl">
                            <span>{game.homeTeam.score}</span>
                            <span>-</span>
                            <span>{game.awayTeam.score}</span>
                        </div>
                        <Image src={teamLogos[game.awayTeam.teamId]} alt={game.awayTeam.teamName} width={128} height={128} className="max-w-12 max-h-12 md:max-w-20 md:max-h-20 lg:max-w-20 lg:max-h-20"/>
                    </div>
                    <div className="text-sm py-2 md:text-lg lg:text-xl">
                        <span>{game.gameLabel}&nbsp;</span>
                        <span>{game.gameSubLabel}</span>
                    </div>
                </div>
            ))
        }
        </>          
    )
}

export default ScoreboardSummary