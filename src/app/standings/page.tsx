// import { teamStandings } from '../../../interface-definition/standings-type'
// import StandingMain from './standing-main';

// async function getStandings(): Promise<teamStandings> {
//     const res = await fetch('https://stats.nba.com/stats/leaguestandingsv3?GroupBy=conf&LeagueID=00&Season=2024-25&SeasonType=Regular Season&Section=overall', {
//       headers: {
//         'referer': 'https://www.nba.com/',
//       },
//     })
//     if(!res.ok) {
//         throw new Error('Failed to fetch standings')
//     }
//     const data = await res.json()
//     console.log(data)
//     const standings = data.resultSets[0].rowSet
//     return data
// }  

export default async function Standings() {

    return (
        <div>
            {/* <StandingMain/> */}
            {/* <StandingMain standings={standing}/> */}
        </div>
    );
}