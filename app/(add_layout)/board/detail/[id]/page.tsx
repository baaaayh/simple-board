import Link from "next/link";
import BoardDetail from "@/app/components/board/board-detail";
import { auth } from "@/auth";
import { getDetail } from "@/app/lib/actions";
import DeleteButton from "@/app/components/board/delete-button";

export default async function BoardDetailPage({
    params,
    searchParams,
}: {
    params: { id: string };
    searchParams: { currentPage?: string };
}) {
    const { id } = await params;
    const page = await searchParams;
    const currentPage = Number(page.currentPage) || 1;

    const info = await auth();
    const user = info?.user;

    const content = await getDetail(id);

    return (
        <>
            <BoardDetail content={content} />
            <div className="button-wrap">
                <Link
                    href={`/board/page/${currentPage}`}
                    className="btn btn-round btn-round--grey"
                >
                    <span>LIST</span>
                </Link>
                {user?.name === content?.writer && (
                    <DeleteButton id={id} currentPage={currentPage} />
                )}
            </div>
        </>
    );
}
