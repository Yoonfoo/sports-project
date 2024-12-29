'use client'
import { SlArrowDown } from 'react-icons/sl'

const dropdown = () => {
    const dropDownMenu = document.getElementById("dropDownMenu");
    dropDownMenu?.classList.toggle("hidden");
}

export default function DropDown(){
    return(
        <>
        <div className="mr-4" onClick={dropdown}>
            <SlArrowDown className="text-white"/>
        </div>
        </>
    )
}