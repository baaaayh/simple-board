"use server";
import pool from "@/app/lib/db";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(
    prevState: string | undefined,
    formData: FormData
) {
    try {
        await signIn("credentials", formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid credentials.";
                default:
                    return "Something went wrong.";
            }
        }
        throw error;
    }
}

export async function getTotalPost() {
    const result = await pool.query("SELECT COUNT(*) FROM editor_contents");
    return result.rows[0].count;
}

export async function getBoardList(total: number, page: number) {
    const offset = (page - 1) * total;
    const result = await pool.query(
        "SELECT * FROM editor_contents ORDER BY date DESC LIMIT $1 OFFSET $2",
        [total, offset]
    );
    return result.rows;
}

export async function getDetail(id: string | null) {
    try {
        if (!id) {
            throw new Error("Invalid ID");
        }

        const response = await pool.query(
            "SELECT * FROM editor_contents WHERE id = $1",
            [id]
        );

        const data = await response.rows[0];

        return data;
    } catch (error) {
        throw new Error("Failed to fetch detail");
    }
}

export async function deletePost(id: string) {
    try {
        await pool.query("DELETE FROM editor_contents WHERE id = $1", [id]);
    } catch (error) {
        throw new Error("Failed to delete post");
    }
}

// export async function saveEditorContent(data: EditorContentsType) {
//     try {
//         const { contents, title, date, writer } = data;

//         const id = uuidv4();
//         const result = await pool.query(
//             "INSERT INTO editor_contents (id, title, contents, date, writer) VALUES ($1, $2, $3, $4, $5) RETURNING id",
//             [id, title, contents, date, writer]
//         );

//         return {
//             success: true,
//             message: "저장 성공",
//         };
//     } catch (error) {
//         console.log(error);
//         return {
//             success: false,
//             message: "저장 실패",
//         };
//     }
// }
