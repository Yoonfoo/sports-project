'use client'
const dropdown = () => {
    const dropDownMenu = document.getElementById("dropDownMenu");
    dropDownMenu?.classList.toggle("hidden");
}

export default function DropDown(){
    return(
        <>
        <div className="mr-4" onClick={dropdown}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="#fff" d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6z"/></svg>
        </div>
        </>
    )
}