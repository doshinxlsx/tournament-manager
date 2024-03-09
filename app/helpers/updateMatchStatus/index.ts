import { db } from "@/lib/db"

export const updateMatchStatus = async (id: number) => {
    const currentDate = new Date();
    try {
        const match = await db.match.findUnique({
            where: {
                id
            }
        })

        if (!match) {
            return { error: 'Match not found.' }
        }

        const matchDate = match.matchDate;

        if (currentDate.getTime() < matchDate.getTime()) {
            return { message: 'Match date is in the future.' }
        } else if (currentDate.getTime() > matchDate.getTime()) {
            return { message: 'Match is overdue.' }
        } else {
            if (match.matchStatus === 'DECLARED') {
                await db.match.update({
                    where: {
                        id
                    },
                    data: {
                        matchStatus: 'ONGOING'
                    }
                })

                return { message: 'Match started.' }
            }
        }

        return { error: 'Invalid operation' };
    } catch (error) {
        return { error: 'Error when starting match: ' + error }
    }
}