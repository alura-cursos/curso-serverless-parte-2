export function formatDate(date) {
    const dt = new Date(date)
    const day = String(dt.getDate()).padStart(2, "0")
    const month = String(dt.getMonth() + 1).padStart(2, "0")
    const year = dt.getFullYear()

    return `${day}/${month}/${year}`;
}