'use client'
import Standing from './standing';
import { useState } from 'react'
import { standing, teamStandings } from '../../../interface-definition/standings-type'

type standingProps = {
    standings: teamStandings
}

export default function StandingMain({standings}: standingProps) {

    const [conferenceSelected, setConferenceSelected] = useState('East')

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