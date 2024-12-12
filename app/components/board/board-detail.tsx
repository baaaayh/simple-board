"use client";
import { useEffect, useState, useCallback } from "react";
import styles from "@/app/components/board/board-detail.module.scss";
import { getDetail } from "@/app/lib/actions";
import { contentType } from "@/app/lib/definitions";

export default function BoardDetail({ id }: { id: string }) {
    const [content, setContent] = useState<contentType | null>(null);

    const getCotnent = useCallback(async (id: string) => {
        try {
            const response = await getDetail(id);
            setContent(response);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        getCotnent(id);
    }, [id]);

    let formattedDate = "";
    if (content?.date) {
        const date = new Date(Number(content.date));
        if (!isNaN(date.getTime())) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            formattedDate = `${year}-${month}-${day}`;
        }
    }

    return (
        <div className={styles.detail}>
            <div className={styles["detail__title"]}>
                <h1>{content?.title}</h1>
                <div className={styles["detail__info"]}>
                    <div>{content?.writer}</div>
                    <span>|</span>
                    <div>{formattedDate}</div>
                </div>
            </div>
            <div className={styles["detail__contents"]}>
                <div
                    className={styles["detail__view"]}
                    dangerouslySetInnerHTML={{
                        __html: content?.contents || "",
                    }}
                ></div>
            </div>
        </div>
    );
}
