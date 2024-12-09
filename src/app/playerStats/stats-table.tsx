'use client'

import { useEffect, useState } from 'react';

interface tableHeaders {
    player: string,
    team: string,
    age: string,
    gp: string,
    w: string,
    l: string,
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
    pf: string,
    fp: string,
    dd2: string,
    td3: string,
    plusMinus: string
}

const playerStatsHeader: tableHeaders = {
    player: "PLAYER",
    team: "TEAM",
    age: "AGE",
    gp: "GP",
    w: "W",
    l: "L",
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
    tov: "TO",
    stl: "STL",
    blk: "BLK",
    pf: "PF",
    fp: "FP",   
    dd2: "DD2",
    td3: "TD3",
    plusMinus: "+/-" 
}

export default function PlayerStatsTable () {
    const [playerData, setPlayerData] = useState<Array<string[]|number[]>>([]);

    useEffect(() => {
        const fetchPlayerStats = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/nba/league-dash-player-stats`);
            const data = await res.json();
            setPlayerData(data);
        };
        fetchPlayerStats();
    }, []);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                    {Object.values(playerStatsHeader).map((header: string) => (
                        header == "PLAYER"
                        ? <th key={header} className="px-12 py-1 border-2 border-black">{header}</th>
                        : <th key={header} className="px-8 border-2 border-black">{header}</th>
                    ))}
                    </tr>    
                </thead>
                <tbody>
                {playerData.map((player) => (
                    <tr key={player[0]}>
                        <td className="pl-4 py-1 border-r-2">{player[1]}</td>
                        <td className="pl-4 py-1">{player[4]}</td>
                        <td className="pl-4 py-1">{player[5]}</td>
                        <td className="pl-4 py-1">{player[6]}</td>
                        <td className="pl-4 py-1">{player[7]}</td>
                        <td className="pl-4 py-1">{player[8]}</td>
                        <td className="pl-4 py-1">{player[10]}</td>
                        <td className="pl-4 py-1">{player[30]}</td>
                        <td className="pl-4 py-1">{player[11]}</td>
                        <td className="pl-4 py-1">{player[12]}</td>
                        <td className="pl-4 py-1">{player[13]}</td>
                        <td className="pl-4 py-1">{player[14]}</td>
                        <td className="pl-4 py-1">{player[15]}</td>
                        <td className="pl-4 py-1">{player[16]}</td>
                        <td className="pl-4 py-1">{player[17]}</td>
                        <td className="pl-4 py-1">{player[18]}</td>
                        <td className="pl-4 py-1">{player[19]}</td>
                        <td className="pl-4 py-1">{player[20]}</td>
                        <td className="pl-4 py-1">{player[21]}</td>
                        <td className="pl-4 py-1">{player[22]}</td>
                        <td className="pl-4 py-1">{player[23]}</td>
                        <td className="pl-4 py-1">{player[24]}</td>
                        <td className="pl-4 py-1">{player[25]}</td>
                        <td className="pl-4 py-1">{player[26]}</td>
                        <td className="pl-4 py-1">{player[28]}</td>
                        <td className="pl-4 py-1">{player[32]}</td>
                        <td className="pl-4 py-1">{player[33]}</td>
                        <td className="pl-4 py-1">{player[34]}</td>
                        <td className="pl-4 py-1">{player[31]}</td>
                    </tr>
                ))}
                </tbody>      
            </table>
        </div>
    )
}