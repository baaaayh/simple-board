import Link from "next/link";
import BoardTable from "@/app/components/board/board-table";

export default function BoardListPage() {
    return (
        <>
            <h2 className="page-title">Simple Board</h2>
            <BoardTable />
            <div className="button-wrap">
                <Link
                    href="/board/write"
                    className="btn btn-round btn-round--green"
                >
                    <span>WRITE</span>
                </Link>
            </div>
        </>
    );
}
