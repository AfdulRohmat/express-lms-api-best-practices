import { Document, Model } from "mongoose";

interface MonthData {
    month: string,
    count: number
}

// GENERATE LAST 12 MONTH ANALITYC
export async function generateLast12MonthsData<T extends Document>(model: Model<T>): Promise<{ last12Months: MonthData[] }> {
    const last12Months: MonthData[] = []
    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() + 1)

    for (let index = 11; index >= 0; index--) {
        const endDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() - index * 28)

        const startDate = new Date(
            endDate.getFullYear(),
            endDate.getMonth(),
            endDate.getDate() - 28)

        const monthYear = endDate.toLocaleString('default', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })

        const count = await model.countDocuments({
            createdAt: {
                $gte: startDate,
                $lt: endDate
            }
        })

        last12Months.push({ month: monthYear, count })
    }

    return { last12Months }
}