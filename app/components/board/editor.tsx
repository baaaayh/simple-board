"use client";

import React, { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { postData, saveImage } from "@/app/utils/api";
import { SessionProps, EditorContentsType } from "@/app/lib/definitions";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

const ToastEditor = dynamic(
    () => import("@toast-ui/react-editor").then((mod) => mod.Editor),
    { ssr: true }
);

export default function ToastEditorComponent({
    userInfo,
    currentPage,
}: {
    userInfo: SessionProps;
    currentPage: number;
}) {
    const [postTitle, setPostTitle] = useState("");
    const router = useRouter();
    const editorRef = useRef<Editor>(null);

    const handleSave = useCallback(async () => {
        if (editorRef.current) {
            const instance = editorRef.current.getInstance();
            const contents = instance?.getHTML();
            const writer = userInfo?.user?.name;
            const title = postTitle;
            const date = new Date().getTime();

            if (title === "") {
                alert("제목을 입력해주세요.");
                return;
            }

            const content: EditorContentsType = {
                projectName: "simple_board",
                contents,
                writer,
                title,
                date,
            };

            try {
                const response = await postData(
                    "/api/saveEditorContent",
                    content
                );

                if (response?.ok) {
                    router.push(`/board/page/${1}`);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }, [postTitle]);

    const handleImageUpload = useCallback(
        async (file: File, callback: (url: string, name: string) => void) => {
            try {
                const response = await saveImage(file);
                const data = await response?.json();
                const imageUrl = data?.filePath;

                callback(imageUrl, file.name);
            } catch (error) {
                console.log(error);
            }
        },
        []
    );

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>): void => {
            setPostTitle(e.target.value);
        },
        []
    );

    return (
        <>
            <div className="write-title">
                <input
                    type="text"
                    value={postTitle}
                    placeholder="제목을 입력하세요."
                    onChange={handleChange}
                />
            </div>
            <ToastEditor
                ref={editorRef}
                initialValue="내용을 입력하세요."
                previewStyle="vertical"
                height="600px"
                initialEditType="wysiwyg"
                useCommandShortcut={true}
                hooks={{
                    addImageBlobHook: handleImageUpload,
                }}
            />
            <div className="button-wrap">
                <Link
                    href={`/board/page/${currentPage}`}
                    className="btn btn-round btn-round--grey"
                >
                    <span>LIST</span>
                </Link>
                <button
                    type="button"
                    onClick={handleSave}
                    className="btn btn-round btn-round--green"
                >
                    <span>SUBMIT</span>
                </button>
            </div>
        </>
    );
}
