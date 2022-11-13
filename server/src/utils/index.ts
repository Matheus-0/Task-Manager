export const getWeek = (date: Date) => {
    let first = date.getDate() - date.getDay()
    let last = first + 6

    return {
        firstDay: new Date(date.setDate(first)),
        lastDay: new Date(date.setDate(last))
    }
}