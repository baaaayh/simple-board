"use server";
import { v4 as uuidv4 } from "uuid";
import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db";

export async function POST(req: NextRequest) {
    try {
        const { contents, title, date, writer } = await req.json();
        const id = uuidv4();
        const result = pool.query(
            "INSERT INTO editor_contents (id, title, contents, date, writer) VALUES ($1, $2, $3, $4, $5) RETURNING id",
            [id, title, contents, date, writer]
        );

        return NextResponse.json({
            success: true,
            message: "저장 성공",
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { success: false, message: "저장 실패" },
            { status: 500 }
        );
    }
}
