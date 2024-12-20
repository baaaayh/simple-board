import Link from "next/link";
import BoardTable from "@/app/components/board/board-table";
import Pagination from "@/app/components/pagination/pagination";
import { getTotalPost } from "@/app/lib/actions";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ page: string }>;
}) {
    const paramPage = await params;
    const currentPage = paramPage.page;

    return {
        title: `리스트 ${currentPage}번 페이지`,
        description: "심플 보드 리스트 페이지",
    };
}

export default async function BoardListPage({
    params,
}: {
    params: Promise<{ page: string }>;
}) {
    const totalPost = await getTotalPost();
    const itemsPerPage = 10;
    const paramPage = await params;
    const currentPage = parseInt(paramPage.page);

    return (
        <>
            <h2 className="page-title">Simple Board</h2>
            <BoardTable
                totalPost={totalPost}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
            />
            <div className="button-wrap">
                <Link
                    href={{ pathname: "/board/write", query: { currentPage } }}
                    className="btn btn-round btn-round--green"
                >
                    <span>WRITE</span>
                </Link>
            </div>
            <div className="pagination-wrap">
                <Pagination
                    itemsPerPage={itemsPerPage}
                    totalPost={totalPost}
                    currentPage={currentPage}
                />
            </div>
        </>
    );
}
