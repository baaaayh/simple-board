import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const formData = await req.formData();
    const file = formData.get("file");
    const projectName = formData.get("projectName");
    const externalServerUrl = process.env.IMAGE_SERVER_URL;

    if (!file || !projectName || !externalServerUrl) {
        return NextResponse.json(
            {
                success: false,
                message: "필수 데이터가 누락되었습니다.",
            },
            { status: 400 }
        );
    }

    try {
        const externalFormData = new FormData();
        externalFormData.append("projectName", projectName);
        externalFormData.append("file", file);

        const response = await fetch(externalServerUrl, {
            method: "POST",
            body: externalFormData,
        });

        const responseBody = await response.json();

        if (!response.ok) {
            throw new Error(responseBody.message || "외부 서버 요청 실패");
        }

        return NextResponse.json({
            success: true,
            message: responseBody.message,
            filePath: `${externalServerUrl}${responseBody.filePath}`,
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message:
                error instanceof Error ? error.message : "이미지 저장 실패",
        });
    }
}
