export default function generateTokenExpiryDate(daysUntilExpires: number = 7) {
    const now = new Date()

    const expiryDate = new Date(now)

    expiryDate.setDate(now.getDate() + daysUntilExpires)

    return expiryDate
}
