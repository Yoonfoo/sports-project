// import { teamStandings } from '../../../interface-definition/standings-type'
import StandingMain from './standing-main';

// async function getStandings(): Promise<teamStandings> {
//     const apiUrl = process.env.NODE_ENV === 'development'
//     ?'http://localhost:3000/api/nba/standings'
//     :`${process.env.NEXT_PUBLIC_API_URL}/api/nba/standings`
//     const res = await fetch(apiUrl, {
//         cache: "force-cache"
//     })
//     if(!res.ok) {
//         console.log(apiUrl)
//         console.log(process.env.NEXT_PUBLIC_API_URL)
//         throw new Error('Failed to fetch standings')
//     }
//     const standings = await res.json()
//     // const standings = data.resultSets[0].rowSet
//     return standings
// }  

export default async function Standings() {

    const fetchStandings = async() => {
        // const apiUrl = process.env.NODE_ENV === 'development'
        // ?'http://localhost:3000/api/nba/standings'
        // :`${process.env.NEXT_PUBLIC_API_URL}/api/nba/standings`
        const res = await fetch('https://stats.nba.com/stats/leaguestandingsv3?GroupBy=conf&LeagueID=00&Season=2024-25&SeasonType=Regular%20Season&Section=overall', {
            headers: {
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br, zstd',
                'Accept-Language': 'en-US,en;q=0.5',
                'Connection': 'keep-alive',
                'Host': 'stats.nba.com',
                'Priority': 'u=4',
                'Referer': 'https://www.nba.com/',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-site',
                'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:131.0) Gecko/20100101 Firefox/131.0',
            },
            // cache: "force-cache"
        })
        if(!res.ok) {
            console.log(res.status)
            // console.log(process.env.NEXT_PUBLIC_API_URL)
            throw new Error('Failed to fetch standings')
        }
        const data = await res.json()
        const standings = data.resultSets[0].rowSet
        return standings
    }

    const standing = await fetchStandings()

    return (
        <div>
            {/* <StandingMain/>  */}
            <StandingMain standings={standing}/>
        </div>
    );
}