'use client'

import { useEffect, useState } from 'react';

interface tableHeaders {
    player: string,
    team: string,
    gp: string,
    min: string,
    pts: string
    fgm: string,
    fga: string,
    fgPct: string,
    threePM: string,
    threePA: string,
    threePPct: string,
    ftm: string,
    fta: string,
    ftPct: string,
    oreb: string,
    dreb: string,
    reb: string,
    ast: string,
    tov: string,
    stl: string,
    blk: string,
    eff: string,
}

const playerStatsHeader: tableHeaders = {
    player: "PLAYER",
    team: "TEAM",
    gp: "GP",
    min: "MIN",
    pts: "PTS",
    fgm: "FGM",
    fga: "FGA",
    fgPct: "FG%",
    threePM: "3PM",
    threePA: "3PA",
    threePPct: "3P%",
    ftm: "FTM",
    fta: "FTA",
    ftPct: "FT%",
    oreb: "OREB",
    dreb: "DREB",
    reb: "REB",
    ast: "AST",
    stl: "STL",
    blk: "BLK",
    tov: "TOV",
    eff: "EFF",
}

export default function PlayerStatsTable () {
    const [playerData, setPlayerData] = useState<Array<string[]|number[]>>([]);

    useEffect(() => {
        const fetchPlayerStats = async () => {
            // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/nba/league-dash-player-stats`);
            const res = await fetch("https://stats.nba.com/stats/leagueLeaders?LeagueID=00&PerMode=PerGame&Scope=S&Season=2024-25&SeasonType=Regular Season&StatCategory=PTS")
            const data = await res.json();
            const playerStats = data.resultSet.rowSet;
            console.log(playerStats);
            setPlayerData(playerStats);
        };
        fetchPlayerStats();
    }, []);

    return (
        <div className="overflow-scroll border-2 rounded-2xl max-h-[calc(100vh-7rem)] m-8">
            <table className="table-auto min-w-max">
                <thead>
                    <tr>
                    {Object.values(playerStatsHeader).map((header: string) => (
                        header == "PLAYER"
                        ? <th key={header} className="h-12 border-b-2 border-black text-center bg-slate-300 sticky left-0 top-0 z-10">{header}</th>
                        : <th key={header} className="h-12 border-black border-b-2 text-center sticky top-0 bg-slate-300">{header}</th>
                    ))}
                    </tr>    
                </thead>
                <tbody>
                {playerData.map((player) => (
                    <tr key={player[0]} className="border-b-2">
                        <td className="pl-4 sticky left-0 bg-slate-200">{player[1]} {player[2]}</td>
                        <td className="w-20 h-12 text-center">{player[4]}</td>
                        <td className="w-20 h-12 text-center">{player[5]}</td>
                        <td className="w-20 h-12 text-center">{player[6]}</td>
                        <td className="w-20 h-12 text-center">{player[23]}</td>
                        <td className="w-20 h-12 text-center">{player[7]}</td>
                        <td className="w-20 h-12 text-center">{player[8]}</td>
                        <td className="w-20 h-12 text-center">{player[9]}</td>
                        <td className="w-20 h-12 text-center">{player[10]}</td>
                        <td className="w-20 h-12 text-center">{player[11]}</td>
                        <td className="w-20 h-12 text-center">{player[12]}</td>
                        <td className="w-20 h-12 text-center">{player[13]}</td>
                        <td className="w-20 h-12 text-center">{player[14]}</td>
                        <td className="w-20 h-12 text-center">{player[15]}</td>
                        <td className="w-20 h-12 text-center">{player[16]}</td>
                        <td className="w-20 h-12 text-center">{player[17]}</td>
                        <td className="w-20 h-12 text-center">{player[18]}</td>
                        <td className="w-20 h-12 text-center">{player[19]}</td>
                        <td className="w-20 h-12 text-center">{player[20]}</td>
                        <td className="w-20 h-12 text-center">{player[21]}</td>
                        <td className="w-20 h-12 text-center">{player[22]}</td>
                        <td className="w-20 h-12 text-center">{player[24]}</td>
                    </tr>
                ))}
                </tbody>      
            </table>
        </div>
    )
}