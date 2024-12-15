"use client";
import { useRouter } from "next/navigation";
import styles from "@/app/components/pagination/pagination.module.scss";

export default function PaginationButton({
    pageIndex,
    currentPage,
}: {
    pageIndex: number;
    currentPage: number;
}) {
    const router = useRouter();
    const isActive = pageIndex === currentPage;

    const handleClick = () => {
        router.push(`/board/page/${pageIndex}`);
    };

    return (
        <li
            className={
                isActive
                    ? `${styles.pagination__item} ${styles["pagination__item--active"]}`
                    : `${styles.pagination__item}`
            }
        >
            <button
                type="button"
                className={styles.pagination__btn}
                onClick={handleClick}
            >
                {pageIndex}
            </button>
        </li>
    );
}
