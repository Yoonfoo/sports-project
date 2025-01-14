import { teamStandings } from '../../../interface-definition/standings-type'
import StandingMain from './standing-main';

async function getStandings(): Promise<teamStandings> {
    const apiUrl = process.env.NODE_ENV === 'development'
    ?'http://localhost:3000/api/nba/standings'
    :`${process.env.NEXT_PUBLIC_API_URL}/api/nba/standings`
    const res = await fetch(apiUrl, {
        cache: "force-cache",
    })
    if(!res.ok) {
        console.log(res.status)
        throw new Error('Failed to fetch standings')
    }
    const standings = await res.json()
    // const standings = data.resultSets[0].rowSet
    return standings
}  

export default async function Standings() {

    const standing = await getStandings()

    return (
        <div>
            {/* <StandingMain/>  */}
            <StandingMain standings={standing}/>
        </div>
    );
}