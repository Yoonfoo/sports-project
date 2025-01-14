'use client'
import Standing from './standing';
import { useState } from 'react'
import { teamStandings } from '../../../interface-definition/standings-type'

type standingProps = {
    standings: teamStandings
}

// async function getStandings(): Promise<teamStandings> {
//     const res = process.env.NODE_ENV === 'development'
//     ? await fetch(`http://localhost:3000/api/nba/standings`,{
//         headers:{
//             "referer": "http://www.nba.com/",
//         },
//         cache: "force-cache",
//     })
//     : await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/nba/standings`, {
//         headers:{
//             "referer": "http://www.nba.com/",
//         },
//         cache: "force-cache",
//     })
//     if(!res.ok) {
//         throw new Error('Failed to fetch standings')
//     }
//     const data = await res.json()
//     console.log(data)
//     const standings = data.resultSets[0].rowSet
//     return standings
// }   

export default function StandingMain({standings}: standingProps) {

    const [conferenceSelected, setConferenceSelected] = useState('East')
    // const [standings, setStandings] = useState<teamStandings>([])

    // useEffect(() => {
    //     const fetchStandings = async () => {
    //         const standings = await getStandings()
    //         setStandings(standings)
    //         console.log(standings)
    //     }
    //     fetchStandings()
    // },[])
            
    return (
        <div className="flex flex-col w-full">
            <div className="bg-gray-300 flex flex-row justify-around h-16 w-full">
                <div onClick={()=>setConferenceSelected('East')} className="bg-yellow-200 size-full flex justify-center items-center hover:bg-gray-300">
                    <span>Eastern Conference</span>
                </div>
                <div onClick={()=>setConferenceSelected('West')} className="bg-yellow-200 size-full flex justify-center items-center hover:bg-gray-300">
                    <span>Western Conference</span>
                </div>
            </div>
            <Standing standings={standings} conference={conferenceSelected}/>
        </div>
    );
}