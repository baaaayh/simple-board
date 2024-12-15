import { NextResponse } from "next/server";
import { EditorContentsType } from "@/app/lib/definitions";
import { v4 as uuidv4 } from "uuid";
import pool from "@/app/lib/db";

export async function POST(request: Request) {
    try {
        const { contents, title, date, writer }: EditorContentsType =
            await request.json();

        const id = uuidv4();
        const result = await pool.query(
            "INSERT INTO editor_contents (id, title, contents, date, writer) VALUES ($1, $2, $3, $4, $5) RETURNING id",
            [id, title, contents, date, writer]
        );

        return NextResponse.json({
            success: true,
            message: "게시물 저장 성공",
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "게시물 저장 실패",
        });
    }
}
