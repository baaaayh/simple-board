import { NextResponse } from "next/server";
import { EditorContentsType } from "@/app/lib/definitions";

import pool from "@/app/lib/db";

export async function PATCH(request: Request) {
    try {
        const { postId, contents, title, date, writer }: EditorContentsType =
            await request.json();

        const result = await pool.query(
            `UPDATE editor_contents 
                 SET title = $1, contents = $2, date = $3, writer = $4 
                 WHERE id = $5`,
            [title, contents, date, writer, postId]
        );
        return NextResponse.json({
            success: true,
            message: "게시물 수정 성공",
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "게시물 수정 실패",
        });
    }
}
