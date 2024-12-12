"use client";
import styles from "./page.module.scss";
import LoginForm from "@/app/components/login/login-form";

export default function Home() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <LoginForm />
            </main>
        </div>
    );
}
