import {
    isThisWeek, isPast, formatDistance,
    parseISO, isValid, isTomorrow,
    isThisYear, format, endOfDay, startOfDay, isEqual, isBefore
} from 'date-fns'

export { setDate }


function setDate(inputDate) {

    const date = parseISO(inputDate);
    const today = new Date();

    if (isValid(date)) {

        if (isBefore(date, endOfDay(today)) && isEqual(startOfDay(date), startOfDay(today))) { 
            return 'Today'
    
        } else if (isPast(date)) {
            return 'Invalid date'
    
        } else if (isTomorrow(date)) {
            return 'Tomorrow'
    
        } else if (isThisWeek(date)) {
            return format(date, 'EEEE')
    
        } else if (isThisYear(date)) {
            return `${format(date, 'MMMM')} ${format(date, 'do')}`
        } else {
            return `Due date in ${formatDistance(today, date)}`
        }
    } else {
        return 'Invalid date'
    }
    }
    
    