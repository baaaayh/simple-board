"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { getBoardList } from "@/app/lib/actions";
import { boardDataType } from "@/app/lib/definitions";
import styles from "@/app/components/board/board-table.module.scss";

export default function BoardTable({
    itemsPerPage,
    currentPage,
    totalPost,
}: {
    itemsPerPage: number;
    currentPage: number;
    totalPost: number;
}) {
    const [items, setItems] = useState<boardDataType[]>([]);

    const getBoardData = useCallback(async () => {
        const boardList = await getBoardList(itemsPerPage, currentPage);
        setItems(boardList);
    }, []);

    useEffect(() => {
        getBoardData();
    }, []);

    return (
        <div className={styles["table-container"]}>
            <table className={styles["table"]}>
                <caption
                    style={{
                        visibility: "hidden",
                        overflow: "hidden",
                        width: 0,
                        height: 0,
                    }}
                >
                    순서, 제목, 글쓴이, 제목의 내용을 포함한 표.
                </caption>
                <colgroup>
                    <col style={{ width: "100px" }} />
                    <col style={{ width: "auto" }} />
                    <col style={{ width: "200px" }} />
                    <col style={{ width: "200px" }} />
                </colgroup>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Writer</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {[...items].map((item, index) => {
                        const date = new Date(Number(item.date));

                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(
                            2,
                            "0"
                        );
                        const day = String(date.getDate()).padStart(2, "0");

                        return (
                            <tr key={`${index}-${item.id}`}>
                                <td>
                                    {totalPost -
                                        (itemsPerPage * (currentPage - 1) +
                                            index)}
                                </td>
                                <td className={styles["table__title"]}>
                                    <Link
                                        href={{
                                            pathname: `/board/detail/${item.id}`,
                                            query: { currentPage: currentPage },
                                        }}
                                    >
                                        {item.title}
                                    </Link>
                                </td>
                                <td>{item.writer}</td>
                                <td>{`${year}-${month}-${day}`}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
