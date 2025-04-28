'use client'

import Image from 'next/image'
import { FC, useState, useEffect } from 'react'
import { boxscoreGame, team } from '../../../interface-definition/boxscore-interface'

type BoxScoreProps = {
    boxscore: boxscoreGame
    teamLogos: Record<string, string>
}

const BoxScore: FC<BoxScoreProps> = ({boxscore ,teamLogos}) => {
    
    const [selectTeamBoxScore, setSelectTeamBoxScore] = useState<team>(boxscore.homeTeam)

    useEffect(() => {
        setSelectTeamBoxScore(boxscore.homeTeam)
    }, [boxscore])

    return (

    <div className="overflow-auto lg:mx-96 lg:py-8 lg:border-2 lg:border-gray-100 lg:rounded-2xl lg:my-4">
        <div>

            <div className="my-4 lg:my-0">
                <div className="flex justify-between mx-8 mb-4 text-sm lg:text-xl">
                    <span>{boxscore.gameStatusText}</span>
                </div>
                <div className="flex justify-evenly border-b-2 border-gray-300 py-8">
                    <div className="flex flex-col items-center w-32 lg:w-60 text-center text-sm lg:text-xl">
                        <Image src={teamLogos[boxscore.homeTeam.teamId]} alt={`${boxscore.homeTeam.teamCity} ${boxscore.homeTeam.teamName}`} height={128} width={128} className="max-w-12 max-h-12 lg:max-w-28 lg:max-h-28"/>
                        <span>{boxscore.homeTeam.teamCity + " " + boxscore.homeTeam.teamName}</span>
                    </div>
                    <div className="flex justify-between items-center gap-4 text-xl lg:text-4xl lg:w-52">
                        <span>{boxscore.homeTeam.score}</span>
                        <span> - </span>
                        <span>{boxscore.awayTeam.score}</span>
                    </div>
                    <div className="flex flex-col items-center w-32 lg:w-60 text-center text-sm lg:text-xl">
                        <Image src={teamLogos[boxscore.awayTeam.teamId]} alt={`${boxscore.awayTeam.teamCity} ${boxscore.awayTeam.teamName}`} height={128} width={128} className="max-w-12 max-h-12 lg:max-w-28 lg:max-h-28"/>
                        <span>{boxscore.awayTeam.teamCity + " " + boxscore.awayTeam.teamName}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col py-4 border-b-2 border-gray-300 text-sm lg:text-xl px-4">
                <div className="flex flex-row justify-between mx-4 mb-4">
                    <span>TEAM</span>
                    <div className="flex flex-row gap-4">
                        <span>Q1</span>
                        <span>Q2</span>
                        <span>Q3</span>
                        <span>Q4</span>
                        {boxscore.period > 4 && <span>OT</span>}
                    </div>
                </div>
                <div className="flex flex-row justify-between mx-4">
                    <span>{boxscore.homeTeam.teamCity} {boxscore.homeTeam.teamName}</span>
                    <div className="flex flex-row gap-5">
                        <span>{boxscore.homeTeam.periods[0].score}</span>
                        <span>{boxscore.homeTeam.periods[1].score}</span>
                        <span>{boxscore.homeTeam.periods[2].score}</span>
                        <span>{boxscore.homeTeam.periods[3].score}</span>
                        {boxscore.period > 4 && <span>{boxscore.homeTeam.periods[4].score}</span>}
                    </div>
                </div>
                <div className="flex flex-row justify-between mx-4">
                    <span>{boxscore.awayTeam.teamCity} {boxscore.awayTeam.teamName}</span>
                    <div className="flex flex-row gap-5">
                        <span>{boxscore.awayTeam.periods[0].score}</span>
                        <span>{boxscore.awayTeam.periods[1].score}</span>
                        <span>{boxscore.awayTeam.periods[2].score}</span>
                        <span>{boxscore.awayTeam.periods[3].score}</span>
                        {boxscore.period > 4 && <span>{boxscore.awayTeam.periods[4].score}</span>}
                    </div>
                </div>
            </div>

            <div className="m-4 pb-8 mx-8">
                <span className="text-sm lg:text-xl">Venue: {boxscore.arena.arenaName + ", " + boxscore.arena.arenaCity}</span>
            </div>
        </div>

        <div className="flex flex-row border-collapse text-sm m-2 lg:text-xl">
            <button className="w-1/2 p-4 bg-slate-100 focus:bg-gray-300" onClick={()=>setSelectTeamBoxScore(boxscore.homeTeam)}>{boxscore.homeTeam.teamCity}&nbsp;{boxscore.homeTeam.teamName}</button>
            <button className="w-1/2 bg-slate-100 focus:bg-gray-300" onClick={()=>setSelectTeamBoxScore(boxscore.awayTeam)}>{boxscore.awayTeam.teamCity}&nbsp;{boxscore.awayTeam.teamName}</button>
        </div>
        
        <div className="m-2 shadow-xl">    

            <div className="overflow-scroll text-sm">
                <table className="table-auto w-full min-w-max lg:text-lg">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="bg-gray-200 py-2 sticky left-0 lg:text-left lg:pl-2">Players</th>
                            <th className="w-12 lg:w-20">MIN</th>
                            <th className="w-12 lg:w-20">PTS</th>
                            <th className="w-12 lg:w-20">FGM</th>
                            <th className="w-12 lg:w-20">FGA</th>
                            <th className="w-12 lg:w-20">AST</th>
                            <th className="w-12 lg:w-20">OREB</th>
                            <th className="w-12 lg:w-20">DREB</th>
                            <th className="w-12 lg:w-20">REB</th>
                            <th className="w-12 lg:w-20">BLK</th>
                            <th className="w-12 lg:w-20">FTM</th>
                            <th className="w-12 lg:w-20">FTA</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectTeamBoxScore.players.map((player) => (
                            <tr key={player.personId} className="even:bg-slate-100 odd:bg-white">
                                <td className="px-2 py-2 sticky left-0 bg-white border-r-2 border-gray-100 lg:bg-transparent">
                                    {window.innerWidth > 1024
                                    ? player.name
                                    : player.name.split(" ")[0][0] + ". "  + player.name.split(" ").slice(1)
                                    }
                                    <span className="px-4 font-bold text-right">{player.position}</span>    
                                </td>
                                <td className="w-12 text-center">{player.statistics.minutes.substring(2,4) + ":" + player.statistics.minutes.substring(5,7)}</td>
                                <td className="w-12 text-center">{player.statistics.points}</td>
                                <td className="w-12 text-center">{player.statistics.fieldGoalsMade}</td>
                                <td className="w-12 text-center">{player.statistics.fieldGoalsAttempted}</td>
                                <td className="w-12 text-center">{player.statistics.assists}</td>
                                <td className="w-12 text-center">{player.statistics.reboundsOffensive}</td>
                                <td className="w-12 text-center">{player.statistics.reboundsDefensive}</td>
                                <td className="w-12 text-center">{player.statistics.reboundsTotal}</td>
                                <td className="w-12 text-center">{player.statistics.blocks}</td>
                                <td className="w-12 text-center">{player.statistics.freeThrowsMade}</td>
                                <td className="w-12 text-center">{player.statistics.freeThrowsAttempted}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    </div>
  
    )
}

export default BoxScore