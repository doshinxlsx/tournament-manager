import { NextResponse } from 'next/server';
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const matchId = req.query.id;

    if (req.method === 'PUT') {
        const { referee, score_A, score_B } = req.body;

        const updatedMatch = await db.match.update({
            where: {
                id: Number(matchId)
            },
            data: {
                referee,
                score_A: score_A,
                score_B: score_B
            }
        });

        return NextResponse.json(updatedMatch);
    }
}