import EditorWithNoSSR from "@/app/components/board/editor";
import { auth } from "@/auth";
import { SessionProps } from "@/app/lib/definitions";

export async function generateMetadata() {
    return {
        title: "글쓰기 페이지",
        description: "글쓰기 페이지 입니다.",
    };
}

export default async function BoardPage({
    searchParams,
}: {
    searchParams: Promise<{ currentPage: string }>;
}) {
    const userInfo = await auth();
    const data = await searchParams;
    const currentPage = Number(data.currentPage) || 1;

    return (
        <>
            <div className="editor">
                <EditorWithNoSSR
                    userInfo={userInfo as unknown as SessionProps}
                    currentPage={currentPage}
                />
            </div>
        </>
    );
}
