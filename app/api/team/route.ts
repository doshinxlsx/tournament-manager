import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const { slug, team_name, group,
        goalNumber,
        totalMatches,
        totalPoints,
        id,
        createdAt,
        updatedAt } = body;
    console.log({ body });



    const team = await db.team.create({
        data: {
            team_name,
            slug,
            group,
            goalNumber,
            totalMatches,
            totalPoints,
            id,
            createdAt,
            updatedAt
        }
    })
    return NextResponse.json(team);
}

export async function GET(req: Request) {
    const teams = await db.team.findMany();

    if (!teams) {
        return NextResponse.json({ message: 'No teams found.' });
    }

    return NextResponse.json(teams);
}