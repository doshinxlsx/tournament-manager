import { NextResponse } from 'next/server';
import { db } from "@/lib/db";
import { NextApiRequest } from "next";

export async function PUT(req: NextApiRequest) {
    const currentDate = new Date();
    try {
        const { id } = req.query;
        const match = await db.match.findUnique({
            where: {
                id: Number(id)
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
                        id: Number(id)
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