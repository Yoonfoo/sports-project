import { teamStandings } from '../../../interface-definition/standings-type'
import Links from "../../../projectLinks/links";
import Image from 'next/image'

type standingProps = {
    standings: teamStandings,
    conference: string,
}

export default function Standing({ standings, conference }: standingProps) {
    
    const teamLogos = Links.TEAM_LOGO as Record<string, string>
    let indexCounter = 1

    return (
        <>
            <div className="flex flex-row justify-between items-center w-full h-12">
                <span className="w-1/2 pl-8 font-bold">Team</span>
                <div className="w-1/2 flex flex-row">
                    <span className="w-24 font-bold">W</span>    {/* Fixed width (1rem) */}
                    <span className="w-24 font-bold">L</span>    {/* Wider span (2rem) */}
                    <span className="w-24 font-bold">PCT</span> {/* Wider span for longer text */}
                    <span className="w-24 font-bold">GB</span>
                    <span className="w-24 font-bold">Conf</span>
                    <span className="w-24 font-bold">Home</span>
                    <span className="w-24 font-bold">Away</span>
                    <span className="w-24 font-bold">L10</span>
                    <span className="w-24 font-bold">Strk</span>
                </div>
            </div>
            {standings.map((standing) => (
                standing[6] === conference 
                &&
                <div key={standing[2]} className="flex flex-row justify-between w-full h-16 border-y">
                    <div className="flex flex-row w-1/2 items-center">
                        <span className="pl-4">{indexCounter++}</span>
                        <Image src={teamLogos[standing[2]]} alt={standing[3].toString()} width={48} height={48} className="pl-4"/>
                        <span className="pl-4">{standing[3]} {standing[4]}</span>
                    </div>
                    <div className="w-1/2 flex flex-row items-center">
                        <span className="w-24">{standing[13]}</span>
                        <span className="w-24">{standing[14]}</span>
                        <span className="w-24">{standing[15]}</span>
                        <span className="w-24">{standing[38]}</span>
                        <span className="w-24">{standing[7]}</span>
                        <span className="w-24">{standing[18]}</span>
                        <span className="w-24">{standing[19]}</span>
                        <span className="w-24">{standing[20]}</span>
                        <span className="w-24">{standing[36]?.toString().charAt(0) == "-" ? standing[36]?.toString().replace("-","L"): standing[36]?.toString().padStart(2,"W")}</span>
                        </div>
                </div>
                
            ))}
        </>
    );
}