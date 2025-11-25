export function formatDateForReadability(date: Date) {
    const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: "short",
        month: "short",
        day: "numeric",
    }

    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
    }

    const datePart = date
        .toLocaleDateString("en-GB", dateOptions)
        .replace(",", "")

    const timePart = date.toLocaleTimeString("en-GB", timeOptions)

    return `${datePart} ${timePart}`
}
