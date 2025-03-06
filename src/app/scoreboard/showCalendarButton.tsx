interface ShowCalendarButtonProps {
    calendarShow: () => void
}

export default function ShowCalendarButton({calendarShow}: ShowCalendarButtonProps){

    return (
        <button className="bg-blue-500 text-white text-sm font-bold w-36 h-10 rounded-full" onClick={calendarShow}>
            Show Calendar
        </button>
    )
}