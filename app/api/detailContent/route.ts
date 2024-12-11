import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db";

export async function POST(req: NextRequest) {
    const body = await req.text();

    const { id } = JSON.parse(body);

    try {
        const result = await pool.query(
            "SELECT * FROM editor_contents WHERE id = $1",
            [id]
        );

        return NextResponse.json({
            success: true,
            message: "게시물 불러오기 성공",
            data: result.rows[0],
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { success: false, message: "게시물 불러오기 실패" },
            { status: 500 }
        );
    }
}
