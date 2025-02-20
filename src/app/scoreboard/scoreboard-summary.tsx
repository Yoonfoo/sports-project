import { FC } from "react";
import Image from "next/image"
import { game, todayScoreboards, scoreboard } from "../../../interface-definition/scoreboard-interface";

type ScoreboardSummaryProps = {
    todayScoreboard: todayScoreboards | game[],
    teamLogos: Record<string, string>
    setGameId: (gameId: string) => void
    main: boolean
}

const ScoreboardSummary: FC<ScoreboardSummaryProps> = ({todayScoreboard, teamLogos, setGameId, main}) => {

    return(
        <>
        {
            main
            ? todayScoreboard?.map((game:game | scoreboard) => (
                <div key={game.gameId} className="border-2 m-2 rounded-xl shadow-inner px-6 py-2" onClick={()=>setGameId(game.gameId)}>
                    <div className="flex flex-row justify-start px-2 py-2">
                        {/* <span className="text-md">{game.gameLabel}&nbsp;</span> */}
                        <span className="text-md">{game.gameStatusText} {game.gameClock}</span>
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
            : todayScoreboard?.map((game:game | scoreboard) => (
                <div key={game.gameId} className="border-2 m-1 rounded-lg" onClick={()=>setGameId(game.gameId)}>
                    <div className="flex flex-row justify-start">
                        <span className="text-sm">{game.gameLabel}&nbsp;</span>
                        <span className="text-sm p-1">{game.gameStatusText} {game.gameClock}</span>
                    </div>
                    <div className="flex flex-row justify-center items-center px-4 py-1">
                        <div className="">
                            <Image src={teamLogos[game.homeTeam.teamId]} alt={game.homeTeam.teamName} width={40} height={40} className="max-w-8 max-h-8"/>
                        </div>
                        <div className="items-center flex">
                            <span className="flex justify-center items-center text-lg ml-4">{game.homeTeam.score}</span>
                            <span className="flex justify-center items-center text-lg mx-2">-</span>
                            <span className="flex justify-center items-center text-lg mr-4">{game.awayTeam.score}</span>
                        </div>
                        <div className="">
                            <Image src={teamLogos[game.awayTeam.teamId]} alt={game.awayTeam.teamName} width={40} height={40} className="max-w-8 max-h-8"/>
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