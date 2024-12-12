import Link from "next/link";
import { Suspense } from "react";
import BoardDetail from "@/app/components/board/board-detail";

export default async function BoardDetailPage({
    params,
    searchParams,
}: {
    params: { id: string };
    searchParams: { currentPage?: string };
}) {
    const { id } = params;
    const currentPage = Number(searchParams.currentPage) || 1;

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <BoardDetail id={id} />
            </Suspense>
            <div className="button-wrap">
                <Link
                    href={`/board/page/${currentPage}`}
                    className="btn btn-round btn-round--grey"
                >
                    <span>LIST</span>
                </Link>
                <button
                    type="button"
                    className="btn btn-round btn-round--green"
                >
                    <span>DELETE</span>
                </button>
            </div>
        </>
    );
}
