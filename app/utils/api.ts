import { EditorContentsType } from "@/app/lib/definitions";

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
