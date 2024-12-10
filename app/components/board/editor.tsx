"use client";

import React, { useRef, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import "@toast-ui/editor/dist/toastui-editor.css";

const ToastEditor = dynamic(
    () => import("@toast-ui/react-editor").then((mod) => mod.Editor),
    { ssr: false }
);

const ToastEditorComponent = () => {
    const editorRef = useRef<any>(null); // Ref를 any로 설정하여 getInstance를 안전하게 호출

    const handleSave = useCallback(async () => {
        if (editorRef.current) {
            const instance = editorRef.current.getInstance(); // getInstance 호출
            const content = instance?.getHTML(); // HTML로 콘텐츠 가져오기
            console.log(content); // 콘솔에 내용 출력
        }
    }, []);

    const handleImageUpload = useCallback(
        async (file: File, callback: Function) => {
            const formData = new FormData();
            formData.append("file", file);

            fetch("/upload", {
                method: "POST",
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    callback(data.url);
                })
                .catch((error) => {
                    console.error("이미지 업로드 실패:", error);
                });
        },
        []
    );

    return (
        <>
            <div className="write-title">
                <input type="text" placeholder="제목을 입력하세요." />
            </div>
            <ToastEditor
                ref={editorRef}
                initialValue="내용을 입력하세요."
                previewStyle="vertical" // 미리보기 스타일 ('tab', 'vertical')
                height="600px"
                initialEditType="wysiwyg" // 'markdown' 또는 'wysiwyg'
                useCommandShortcut={true}
                hooks={{
                    addImageBlobHook: handleImageUpload,
                }}
            />
            <div className="button-wrap">
                <Link href="/board" className="btn btn-round btn-round--grey">
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
};

export default ToastEditorComponent;
