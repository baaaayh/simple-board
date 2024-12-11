import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const file = formData.get("file");
        const projectName = formData.get("projectName");

        if (!file || !projectName) {
            return NextResponse.json(
                {
                    success: false,
                    message: "파일 또는 프로젝트명이 누락되었습니다.",
                },
                { status: 400 }
            );
        }

        const externalServerUrl = process.env.IMAGE_SERVER_URL;
        if (!externalServerUrl) {
            throw new Error("IMAGE_SERVER_URL is not defined");
        }

        const externalFormData = new FormData();
        externalFormData.append("projectName", projectName);
        externalFormData.append("file", file);

        const response = await fetch(externalServerUrl, {
            method: "POST",
            body: externalFormData,
        });

        if (!response.ok) {
            throw new Error("외부 서버로의 요청이 실패했습니다.");
        }

        const responseBody = await response.json();

        console.log(responseBody);

        return NextResponse.json({
            success: true,
            message: responseBody.message,
            filePath: `${externalServerUrl}${responseBody.filePath}`,
        });
    } catch (error) {
        console.error("서버 오류:", error);
        return NextResponse.json(
            { success: false, message: "이미지 저장 실패" },
            { status: 500 }
        );
    }
}
