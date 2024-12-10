import Link from "next/link";
import EditorWithNoSSR from "@/app/components/board/editor";

export default function BoardPage() {
    return (
        <>
            <div className="editor">
                <EditorWithNoSSR />
            </div>
        </>
    );
}
