"use client";

import { useCallback } from "react";
import { deletePost } from "@/app/lib/actions";
import { useRouter } from "next/navigation";

export default function DeleteButton({
    id,
    currentPage,
}: {
    id: string;
    currentPage: number;
}) {
    const router = useRouter();

    const deletePostAction = async () => {
        await deletePost(id);
        const confirm = window.confirm("게시물을 삭제하시겠습니까?");
        if (confirm) router.push(`/board/page/1`);
    };

    const handleDelete = useCallback(() => {
        deletePostAction();
    }, [id, currentPage]);

    return (
        <button
            type="button"
            className="btn btn-round btn-round--green"
            onClick={handleDelete}
        >
            <span>DELETE</span>
        </button>
    );
}
