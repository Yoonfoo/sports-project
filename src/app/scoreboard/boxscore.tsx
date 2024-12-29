'use client'

import Image from 'next/image'
import { FC, useState, useEffect, useMemo } from 'react'
import boxscoreGame, { team } from '../../../interface-definition/boxscore-interface'

type BoxScoreProps = {
    boxscore: boxscoreGame
    teamLogos: Record<string, string>
}

const BoxScore: FC<BoxScoreProps> = ({boxscore ,teamLogos}) => {
    
    const [selectTeamBoxScore, setSelectTeamBoxScore] = useState<team>(boxscore.homeTeam)

    useMemo(() => {}, [boxscore])
    useEffect(() => {
        setSelectTeamBoxScore(boxscore.homeTeam)
    }, [boxscore])

    return (
        // <div className="p-8">

        //     <div>
        //         <div className="flex justify-between">
        //             <span className="mt-4 ml-8 text-xl">{boxscore.gameStatusText}</span>
        //             <span className="mt-4 mr-8 text-xl">{boxscore.gameTimeUTC.split('T')[0]}</span>
        //         </div>
        //         <div className="flex justify-evenly p-8 py-16 border-t-2 border-b-2 border-black mt-8 mb-8">
        //             <div className="flex flex-col items-center text-xl">
        //                 <Image src={teamLogos[boxscore.homeTeam.teamId]} alt={`${boxscore.homeTeam.teamCity} ${boxscore.homeTeam.teamName}`} height={112} width={112} className="max-w-28 max-h-28"/>
        //                 <span className="w-96 flex justify-center">{boxscore.homeTeam.teamCity + " " + boxscore.homeTeam.teamName}</span>
        //             </div>
        //             <div className="flex justify-center items-center text-5xl">
        //                 <span>{boxscore.homeTeam.score} - {boxscore.awayTeam.score}</span>
        //             </div>
        //             <div className="flex flex-col items-center text-xl">
        //                 <Image src={teamLogos[boxscore.awayTeam.teamId]} alt={`${boxscore.awayTeam.teamCity} ${boxscore.awayTeam.teamName}`} height={112} width={112} className="max-w-28 max-h-28"/>
        //                 <span className="w-96 flex justify-center">{boxscore.awayTeam.teamCity + " " + boxscore.awayTeam.teamName}</span>
        //             </div>
        //         </div>
        //         <span className="ml-8 py-4 text-xl">Venue: {boxscore.arena.arenaName + ", " + boxscore.arena.arenaCity}</span>
        //     </div>

        //     <div className="flex flex-col p-8 m-8">
        //         <div className="flex flex-row justify-between">
        //             <div className="py-2 w-48">TEAM</div>
        //             <div className="flex flex-row">
        //                 <div className="px-8 py-2">Q1</div>
        //                 <div className="px-8 py-2">Q2</div>
        //                 <div className="px-8 py-2">Q3</div>
        //                 <div className="px-8 py-2">Q4</div>
        //                 {boxscore.period > 4 && <div className="px-8 py-2">OT</div>}
        //             </div>
        //         </div>
        //         <div className="flex flex-row justify-between">
        //             <div className="py-2 w-48">{boxscore.homeTeam.teamCity} {boxscore.homeTeam.teamName}</div>
        //             <div className="flex flex-row">
        //                 <div className="px-8 py-2">{boxscore.homeTeam.periods[0].score}</div>
        //                 <div className="px-8 py-2">{boxscore.homeTeam.periods[1].score}</div>
        //                 <div className="px-8 py-2">{boxscore.homeTeam.periods[2].score}</div>
        //                 <div className="px-8 py-2">{boxscore.homeTeam.periods[3].score}</div>
        //                 {boxscore.period > 4 && <div className="px-8 py-2">{boxscore.homeTeam.periods[4].score}</div>}
        //             </div>
        //         </div>
        //         <div className="flex flex-row justify-between">
        //             <div className="py-2 w-48">{boxscore.awayTeam.teamCity} {boxscore.awayTeam.teamName}</div>
        //             <div className="flex flex-row">
        //                 <div className="px-8 py-2">{boxscore.awayTeam.periods[0].score}</div>
        //                 <div className="px-8 py-2">{boxscore.awayTeam.periods[1].score}</div>
        //                 <div className="px-8 py-2">{boxscore.awayTeam.periods[2].score}</div>
        //                 <div className="px-8 py-2">{boxscore.awayTeam.periods[3].score}</div>
        //                 {boxscore.period > 4 && <div className="px-8 py-2">{boxscore.awayTeam.periods[4].score}</div>}
        //             </div>
        //         </div>
        //     </div>

        //     <div className="flex flex-row mx-8 border-collapse mb-8">
        //         <button className="basis-1/2 border-2 border-black border-r-0 rounded-l-xl p-4" onClick={()=>setSelectTeamBoxScore(boxscore.homeTeam)}>{boxscore.homeTeam.teamCity}&nbsp;{boxscore.homeTeam.teamName}</button>
        //         <button className="basis-1/2 border-2 border-black rounded-r-xl p-4" onClick={()=>setSelectTeamBoxScore(boxscore.awayTeam)}>{boxscore.awayTeam.teamCity}&nbsp;{boxscore.awayTeam.teamName}</button>
        //     </div>

        //     <div className="p-4 flex justify-center shadow-xl rounded-xl">
        //         <table className="border-collapse">
        //             <thead>
        //                 <tr className="border-b-2 border-black">
        //                     <th className="flex flex-start px-4 py-2 border-r-2 border-black">Players</th>
        //                     <th className="px-4 py-2">MIN</th>
        //                     <th className="px-4 py-2">PTS</th>
        //                     <th className="px-4 py-2">FGM</th>
        //                     <th className="px-4 py-2">FGA</th>
        //                     <th className="px-4 py-2">AST</th>
        //                     <th className="px-4 py-2">OREB</th>
        //                     <th className="px-4 py-2">DREB</th>
        //                     <th className="px-4 py-2">REB</th>
        //                     <th className="px-4 py-2">BLK</th>
        //                     <th className="px-4 py-2">FTM</th>
        //                     <th className="px-4 py-2">FTA</th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {selectTeamBoxScore.players.map((player) => (
        //                     <tr key={player.personId}>
        //                         <td className="flex px-4 py-2 justify-between border-r-2 border-black">
        //                             {player.name}
        //                             <span className="px-4 font-bold">{player.position}</span>    
        //                         </td>
        //                         <td className="px-4 py-2">{player.statistics.minutes.substring(2,4) + ":" + player.statistics.minutes.substring(5,7)}</td>
        //                         <td className="px-4 py-2">{player.statistics.points}</td>
        //                         <td className="px-4 py-2">{player.statistics.fieldGoalsMade}</td>
        //                         <td className="px-4 py-2">{player.statistics.fieldGoalsAttempted}</td>
        //                         <td className="px-4 py-2">{player.statistics.assists}</td>
        //                         <td className="px-4 py-2">{player.statistics.reboundsOffensive}</td>
        //                         <td className="px-4 py-2">{player.statistics.reboundsDefensive}</td>
        //                         <td className="px-4 py-2">{player.statistics.reboundsTotal}</td>
        //                         <td className="px-4 py-2">{player.statistics.blocks}</td>
        //                         <td className="px-4 py-2">{player.statistics.freeThrowsMade}</td>
        //                         <td className="px-4 py-2">{player.statistics.freeThrowsAttempted}</td>
        //                     </tr>
        //                 ))}
        //             </tbody>
        //         </table>
        //     </div>

        // </div>
        <div className="size-full">

            <div className="my-4">
                <div className="flex justify-between mx-4 mb-4">
                    <span className="">{boxscore.gameStatusText}</span>
                    <span className="">{boxscore.gameTimeUTC.split('T')[0]}</span>
                </div>
                <div className="flex justify-evenly border-y-2 border-gray-300 py-8">
                    <div className="flex flex-col items-center w-32">
                        <Image src={teamLogos[boxscore.homeTeam.teamId]} alt={`${boxscore.homeTeam.teamCity} ${boxscore.homeTeam.teamName}`} height={40} width={40} className="max-w-28 max-h-28"/>
                        <span className="text-center">{boxscore.homeTeam.teamCity + " " + boxscore.homeTeam.teamName}</span>
                    </div>
                    <span className="flex justify-center items-center">{boxscore.homeTeam.score} - {boxscore.awayTeam.score}</span>
                    <div className="flex flex-col items-center w-32">
                        <Image src={teamLogos[boxscore.awayTeam.teamId]} alt={`${boxscore.awayTeam.teamCity} ${boxscore.awayTeam.teamName}`} height={40} width={40} className="max-w-28 max-h-28"/>
                        <span className="text-center">{boxscore.awayTeam.teamCity + " " + boxscore.awayTeam.teamName}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col py-4 border-b-2 border-gray-300">
                <div className="flex flex-row justify-between mx-4">
                    <div className="">TEAM</div>
                    <div className="flex flex-row">
                        <div className="w-12">Q1</div>
                        <div className="w-12">Q2</div>
                        <div className="w-12">Q3</div>
                        <div className="w-12">Q4</div>
                        {boxscore.period > 4 && <div className="w-12">OT</div>}
                    </div>
                </div>
                <div className="flex flex-row justify-between mx-4">
                    <div className="">{boxscore.homeTeam.teamCity} {boxscore.homeTeam.teamName}</div>
                    <div className="flex flex-row">
                        <div className="w-12">{boxscore.homeTeam.periods[0].score}</div>
                        <div className="w-12">{boxscore.homeTeam.periods[1].score}</div>
                        <div className="w-12">{boxscore.homeTeam.periods[2].score}</div>
                        <div className="w-12">{boxscore.homeTeam.periods[3].score}</div>
                        {boxscore.period > 4 && <div className="w-12">{boxscore.homeTeam.periods[4].score}</div>}
                    </div>
                </div>
                <div className="flex flex-row justify-between mx-4">
                    <div className="">{boxscore.awayTeam.teamCity} {boxscore.awayTeam.teamName}</div>
                    <div className="flex flex-row">
                        <div className="w-12">{boxscore.awayTeam.periods[0].score}</div>
                        <div className="w-12">{boxscore.awayTeam.periods[1].score}</div>
                        <div className="w-12">{boxscore.awayTeam.periods[2].score}</div>
                        <div className="w-12">{boxscore.awayTeam.periods[3].score}</div>
                        {boxscore.period > 4 && <div className="w-12">{boxscore.awayTeam.periods[4].score}</div>}
                    </div>
                </div>
            </div>

            <div className="m-4">
                <span className="">Venue: {boxscore.arena.arenaName + ", " + boxscore.arena.arenaCity}</span>
            </div>

            <div className="flex flex-row border-collapse w-full">
                <button className="w-1/2 border-2 border-black border-r-0 p-2" onClick={()=>setSelectTeamBoxScore(boxscore.homeTeam)}>{boxscore.homeTeam.teamCity}&nbsp;{boxscore.homeTeam.teamName}</button>
                <button className="w-1/2 border-2 border-black" onClick={()=>setSelectTeamBoxScore(boxscore.awayTeam)}>{boxscore.awayTeam.teamCity}&nbsp;{boxscore.awayTeam.teamName}</button>
            </div>

            <div className="flex h-full overflow-auto">
                <table className="border-collapse">
                    <thead className="sticky top-0 bg-gray-300">
                        <tr className="">
                            <th className="flex flex-start px-4 py-2 border-r-2 border-black sticky left-0">Players</th>
                            <th className="px-4 py-2">MIN</th>
                            <th className="px-4 py-2">PTS</th>
                            <th className="px-4 py-2">FGM</th>
                            <th className="px-4 py-2">FGA</th>
                            <th className="px-4 py-2">AST</th>
                            <th className="px-4 py-2">OREB</th>
                            <th className="px-4 py-2">DREB</th>
                            <th className="px-4 py-2">REB</th>
                            <th className="px-4 py-2">BLK</th>
                            <th className="px-4 py-2">FTM</th>
                            <th className="px-4 py-2">FTA</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectTeamBoxScore.players.map((player) => (
                            <tr key={player.personId}>
                                <td className="flex px-4 py-2 justify-between border-r-2 border-black sticky left-0">
                                    {player.name}
                                    <div>

                                    <span className="px-4 font-bold">{player.position}</span>    
                                    </div>
                                </td>
                                <td className="px-4 py-2">{player.statistics.minutes.substring(2,4) + ":" + player.statistics.minutes.substring(5,7)}</td>
                                <td className="px-4 py-2">{player.statistics.points}</td>
                                <td className="px-4 py-2">{player.statistics.fieldGoalsMade}</td>
                                <td className="px-4 py-2">{player.statistics.fieldGoalsAttempted}</td>
                                <td className="px-4 py-2">{player.statistics.assists}</td>
                                <td className="px-4 py-2">{player.statistics.reboundsOffensive}</td>
                                <td className="px-4 py-2">{player.statistics.reboundsDefensive}</td>
                                <td className="px-4 py-2">{player.statistics.reboundsTotal}</td>
                                <td className="px-4 py-2">{player.statistics.blocks}</td>
                                <td className="px-4 py-2">{player.statistics.freeThrowsMade}</td>
                                <td className="px-4 py-2">{player.statistics.freeThrowsAttempted}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default BoxScore