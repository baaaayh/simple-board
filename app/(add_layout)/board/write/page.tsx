import EditorWithNoSSR from "@/app/components/board/editor";
import { auth } from "@/auth";
import { SessionProps } from "@/app/lib/definitions";
export default async function BoardPage({
    searchParams,
}: {
    searchParams: { currentPage: string };
}) {
    const userInfo = await auth();
    const data = await searchParams;
    const currentPage = Number(searchParams.currentPage) || 1;

    return (
        <>
            <div className="editor">
                <EditorWithNoSSR
                    userInfo={userInfo as SessionProps}
                    currentPage={currentPage}
                />
            </div>
        </>
    );
}
