import { auth } from "@/auth";
import EditorWithNoSSR from "@/app/components/board/editor";
import { SessionProps } from "@/app/lib/definitions";

export default async function ModifyPage({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ currentPage: string }>;
}) {
    const { id } = await params;
    const userInfo = await auth();
    const paramInfo = await searchParams;

    const currentPage = Number(paramInfo.currentPage) || 1;

    return (
        <div className="editor">
            <EditorWithNoSSR
                userInfo={userInfo as unknown as SessionProps}
                currentPage={currentPage}
                editorType={"modify"}
                postId={id}
            />
        </div>
    );
}
