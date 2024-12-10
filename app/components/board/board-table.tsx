import Link from "next/link";
import styles from "@/app/components/board/board-table.module.scss";

export default function BoardTable() {
    return (
        <div className={styles["table-container"]}>
            <table className={styles["table"]}>
                <caption></caption>
                <colgroup>
                    <col style={{ width: "100px" }} />
                    <col style={{ width: "auto" }} />
                    <col style={{ width: "200px" }} />
                    <col style={{ width: "200px" }} />
                </colgroup>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>TITLE</th>
                        <th>Writer</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td className={styles["table__title"]}>
                            <Link href="/">첫 번재 게시물입니다.</Link>
                        </td>
                        <td>superAdmin</td>
                        <td>2024.12.10</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
