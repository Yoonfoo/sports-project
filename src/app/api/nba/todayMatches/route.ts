import { todayScoreboards, scoreboard } from "../../../../../interface-definition/scoreboard-interface";

export async function GET() {
    const res = await fetch('https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json', {
        headers: { "referer": "https://www.nba.com/" },
    });

    if (!res.ok) {
        return new Response('Failed to fetch scoreboard', { status: 500 });
    }

    const data = await res.json();
    const sortedData: todayScoreboards = data.scoreboard.games.sort((a: { gameId: string }, b: { gameId: string }) => a.gameId.localeCompare(b.gameId));
    return Response.json(sortedData);
}
