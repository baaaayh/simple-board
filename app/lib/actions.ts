"use server";
import pool from "@/app/lib/db";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { EditorContentsType } from "./definitions";

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
        console.log(error);
        throw new Error("Failed to fetch detail");
    }
}

export async function deletePost(id: string) {
    try {
        await pool.query("DELETE FROM editor_contents WHERE id = $1", [id]);
    } catch (error) {
        console.log(error);
        throw new Error("Failed to delete post");
    }
}

export async function postData(url: string, body: EditorContentsType) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function modifyData(url: string, body: EditorContentsType) {
    try {
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}
