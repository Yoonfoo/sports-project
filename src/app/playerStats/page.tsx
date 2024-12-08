import PlayerStatsTable from "./stats-table";
import SeasonSelect from "./season-select";

export default function playerStatsPage() {
    return (
        <div>
            <h1>Player Stats</h1>
            <div className="flex flex-row">
                <SeasonSelect />
                <SeasonSelect />
            </div>
            <PlayerStatsTable />
        </div>
    )
}