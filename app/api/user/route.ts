import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from 'bcrypt';
import { id } from "date-fns/locale";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, username, password } = body;

        const existingUserByEmail = await db.user.findUnique({
            where: {
                email: email
            }
        });

        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: 'User with this email already exists' }, { status: 409 });
        }

        const existingUserByUsername = await db.user.findUnique({
            where: {
                username: username
            }
        });

        if (existingUserByUsername) {
            return NextResponse.json({ user: null, message: 'User with this username already exists' }, { status: 409 });
        }

        const hashedPassword = await hash(password, 10);
        const newUser = await db.user.create({
            data: {
                email,
                username,
                password: hashedPassword
            }
        })
        const { password: newUserPassword, ...rest } = newUser;

        return NextResponse.json({ user: rest, message: 'User created.' }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ message: 'Error when creating user: ', error }, { status: 409 });
    }

}

export async function getUserById(id: string) {
    try {
        const user = await db.user.findUnique({
            where: {
                id
            }
        })

        return user;
    } catch {
        return null;
    }
}