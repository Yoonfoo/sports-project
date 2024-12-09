// interface searchParams {
//   measureType: string,
//   perMode: string,
//   plusMinus: string,
//   paceAdjust: string,
//   rank: string,
//   leagueID: string,
//   season: string,
//   seasonType: string,
//   poRound: string,
//   outcome: string,
//   location: string,
//   month: string,
//   seasonSegment: string,
//   dateFrom: string,
//   dateTo: string,
//   opponentTeamID: string,
//   vsConference: string,
//   vsDivision: string,
//   teamID: string,
//   conference: string,
//   division: string,
//   gameSegment: string,
//   period: string,
//   shotClockRange: string,
//   lastNGames: string,
//   gameScope: string,
//   playerExperience: string,
//   playerPosition: string,
//   starterBench: string,
//   draftYear: string,
//   draftPick: string,
//   college: string,
//   country: string,
//   height: string,
//   weight: string,
//   twoWay: string,
//   gameSubtype: string,
//   activeRoster: string,
//   ISTRound: string,
// }

export async function GET() {
  
  const res = await fetch("https://stats.nba.com/stats/leaguedashplayerstats?College=&Conference=&Country=&DateFrom=&DateTo=&Division=&DraftPick=&DraftYear=&GameScope=&GameSegment=First Half&Height=&ISTRound=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=2024-25&SeasonSegment=&SeasonType=Regular Season&ShotClockRange=&StarterBench=&TeamID=0&VsConference=&VsDivision=&Weight=" ,{
    headers: {
      "referer": "https://www.nba.com/", 
    }
  })

  const data = await res.json()
  const playersData = data.resultSets[0].rowSet
  return Response.json(playersData)
}