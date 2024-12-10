import Link from "next/link";
import { signOut } from "@/auth";
import { SessionProps } from "@/app/lib/definitions";
import styles from "@/app/components/header.module.scss";

export default function Header({ userInfo }: SessionProps) {
    return (
        <header className={styles["header"]}>
            <div className={styles["header__inner"]}>
                <h1 className={styles["header__logo"]}>
                    <Link href="/">
                        <span>BOARD</span>
                        <span>BOARD</span>
                    </Link>
                </h1>
                <div className={styles["header__user"]}>
                    <div className={styles["header__username"]}>
                        <span>[USER] :</span>
                        {userInfo?.user?.name}
                    </div>
                    <div className={styles["header__logout"]}>
                        <form
                            action={async () => {
                                "use server";
                                await signOut();
                            }}
                        >
                            <button type="submit" className="btn btn-logout">
                                <span>로그아웃</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </header>
    );
}
