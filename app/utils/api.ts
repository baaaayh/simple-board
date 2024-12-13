import { EditorContentsType } from "../lib/definitions";

export const postData = async (url: string, body: EditorContentsType) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const saveImage = async (file: File) => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("projectName", "simple_board");

        const response = await fetch("/api/uploadImage", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response;
    } catch (error) {
        console.error("이미지 업로드 중 오류 발생:", error);
        throw error;
    }
};

export const getDetail = async (id: string) => {
    try {
        const response = await fetch("/api/detailContent", {
            method: "POST",
            body: JSON.stringify({ id: id }),
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch detail");
    }
};
