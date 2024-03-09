import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const { id, team_A, team_B, score_A, score_B, slug_A, slug_B, matchId, matchDate, matchStatus, referee } = body;
    console.log({ body });

    const match = await db.match.create({
        data: {
            id,
            slug_A,
            slug_B,
            team_A,
            team_B,
            score_A,
            score_B,
            matchId,
            matchDate,
            matchStatus,
            referee
        }
    })
    return NextResponse.json(match);
}

export async function GET(req: Request) {
    const matches = await db.match.findMany();

    const currentMatch = matches.filter(match => match.matchStatus === 'ONGOING');

    if (!currentMatch) {
        return NextResponse.json({ message: 'Jelenleg nincs meccs.' }, { status: 101 });
    }

    return NextResponse.json(currentMatch);
}