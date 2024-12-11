import EditorWithNoSSR from "@/app/components/board/editor";
import { auth } from "@/auth";

export default async function BoardPage() {
    const userInfo = await auth();

    return (
        <>
            <div className="editor">
                <EditorWithNoSSR userInfo={userInfo} />
            </div>
        </>
    );
}
