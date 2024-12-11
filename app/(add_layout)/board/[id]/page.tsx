import { Suspense } from "react";
import BoardDetail from "@/app/components/board/board-detail";

export default async function BoardDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = await params;

    return (
        <div className="">
            <Suspense fallback={<div>Loading...</div>}>
                <BoardDetail id={id} />
            </Suspense>
        </div>
    );
}
