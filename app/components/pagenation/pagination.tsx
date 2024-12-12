"use client";
import { useRouter } from "next/navigation";
import First from "@/public/images/icon_button_first.svg";
import Prev from "@/public/images/icon_button_prev.svg";
import Next from "@/public/images/icon_button_next.svg";
import Last from "@/public/images/icon_button_last.svg";
import PagenationButton from "./pagenation-button";
import styles from "./pagination.module.scss";

export default function Pagination({
    itemsPerPage,
    totalPost,
    currentPage,
}: {
    itemsPerPage: number;
    totalPost: number;
    currentPage: number;
}) {
    const router = useRouter();
    const buttonsPerPage = 10;
    const currentGroup = Math.ceil(currentPage / buttonsPerPage);
    const totalButtons = Math.ceil(totalPost / itemsPerPage);
    const startPage = (currentGroup - 1) * buttonsPerPage + 1;
    const endPage = Math.min(startPage + buttonsPerPage - 1, totalButtons);

    const buttonList = Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index
    );

    const moveToFirstPage = () => {
        router.push(`/board/page/1`);
    };

    const moveToPrevPage = () => {
        if (currentPage > 1) {
            router.push(`/board/page/${currentPage - 1}`);
        }
    };

    const moveToNextPage = () => {
        if (currentPage < totalButtons) {
            router.push(`/board/page/${currentPage + 1}`);
        }
    };

    const moveToLastPage = () => {
        router.push(`/board/page/${totalButtons}`);
    };

    return (
        <div className={styles.pagination}>
            <div className={styles.pagination__wrap}>
                <div className={styles.pagination__col}>
                    <button
                        type="button"
                        className={`${styles.pagination__btn} ${styles["pagination__btn--first"]}`}
                        onClick={moveToFirstPage}
                    >
                        처음으로
                        <span
                            style={{
                                backgroundImage: `url(${First.src})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "18px",
                                backgroundPosition: "center",
                            }}
                        ></span>
                    </button>
                </div>
                <div className={styles.pagination__col}>
                    <button
                        type="button"
                        className={`${styles.pagination__btn} ${styles["pagination__btn--prev"]}`}
                        onClick={moveToPrevPage}
                    >
                        이전
                        <span
                            style={{
                                backgroundImage: `url(${Prev.src})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "18px",
                                backgroundPosition: "center",
                            }}
                        ></span>
                    </button>
                </div>
                <ul className={styles.pagination__list}>
                    {buttonList.map((item, index) => {
                        return (
                            <PagenationButton
                                key={index}
                                pageIndex={Number(item)}
                                currentPage={currentPage}
                            />
                        );
                    })}
                </ul>
                <div className={styles.pagination__col}>
                    <button
                        type="button"
                        className={`${styles.pagination__btn} ${styles["pagination__btn--next"]}`}
                        onClick={moveToNextPage}
                    >
                        다음
                        <span
                            style={{
                                backgroundImage: `url(${Next.src})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "18px",
                                backgroundPosition: "center",
                            }}
                        ></span>
                    </button>
                </div>
                <div className={styles.pagination__col}>
                    <button
                        type="button"
                        className={`${styles.pagination__btn} ${styles["pagination__btn--last"]}`}
                        onClick={moveToLastPage}
                    >
                        마지막으로
                        <span
                            style={{
                                backgroundImage: `url(${Last.src})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "18px",
                                backgroundPosition: "center",
                            }}
                        ></span>
                    </button>
                </div>
            </div>
        </div>
    );
}
