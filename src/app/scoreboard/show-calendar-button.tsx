interface ShowCalendarButtonProps {
    calendarShow: () => void
}

export default function ShowCalendarButton({calendarShow}: ShowCalendarButtonProps){

    return (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded-full" onClick={calendarShow}>
            Show Calendar
        </button>
    )
}