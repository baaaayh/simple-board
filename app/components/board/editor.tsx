"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { saveImage } from "@/app/utils/api";
import { getDetail, postData, modifyData } from "@/app/lib/actions";
import { SessionProps, EditorContentsType } from "@/app/lib/definitions";
import { Editor } from "@toast-ui/react-editor";
import { contentType } from "@/app/lib/definitions";
import "@toast-ui/editor/dist/toastui-editor.css";

const ToastEditor = dynamic(
    () => import("@toast-ui/react-editor").then((mod) => mod.Editor),
    { ssr: true }
);

export default function ToastEditorComponent({
    userInfo,
    currentPage,
    editorType,
    postId,
}: {
    userInfo: SessionProps;
    currentPage: number;
    editorType: string;
    postId: string | null;
}) {
    const router = useRouter();
    const editorRef = useRef<Editor>(null);
    const [content, setContent] = useState<contentType>();
    const [postTitle, setPostTitle] = useState("");

    const handleSave = useCallback(async () => {
        if (!editorRef.current) return;
        const instance = editorRef.current.getInstance();
        const contents = instance?.getHTML();

        const title = postTitle;
        const currentDate = new Date().getTime();

        const date =
            editorType === "write" ? currentDate : Number(content?.date);

        if (title === "") {
            alert("제목을 입력해주세요.");
            return;
        }

        const contentObj: EditorContentsType = {
            postId: postId,
            projectName: "simple_board",
            contents,
            writer: userInfo?.user?.name,
            title,
            date,
        };

        try {
            if ((userInfo?.user?.name, date)) {
                if (editorType === "write") {
                    const response = await postData(
                        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/saveEditorContent`,
                        contentObj
                    );

                    window.alert("정상적으로 등록되었습니다.");

                    if (response?.success) {
                        router.push(`/board/page/${1}`);
                    }
                } else if (editorType === "modify") {
                    const response = await modifyData(
                        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/modifyEditorContent`,
                        contentObj
                    );

                    window.alert("정상적으로 수정되었습니다.");

                    if (response?.success) {
                        router.push(`/board/page/${1}`);
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    }, [content, postTitle, editorType, userInfo, postId, router]);

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

    const getPostContents = useCallback(async (postId: string) => {
        const result = await getDetail(postId);
        console.log(result);
        setContent(result);
    }, []);

    useEffect(() => {
        if (postId) {
            getPostContents(postId);
        }
    }, [postId, getPostContents]);

    useEffect(() => {
        if (content) {
            setPostTitle(content.title);
            editorRef.current?.getInstance().setHTML(content.contents || "");
        }
    }, [postId, content]);

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
                    <span>{editorType === "write" ? `WRITE` : "MODIFY"}</span>
                </button>
            </div>
        </>
    );
}
