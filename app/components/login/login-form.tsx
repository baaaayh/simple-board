"use client";
import { useActionState } from "react";
import { authenticate } from "@/app/lib/actions";

import styles from "@/app/components/login/login-form.module.scss";

export default function LoginForm() {
    const [, formAction] = useActionState(authenticate, undefined);

    return (
        <div className={styles["login"]}>
            <h1 className={styles["login__title"]}>Login</h1>
            <div className={styles["login__form"]}>
                <form action={formAction}>
                    <div className={styles["login__row"]}>
                        <p>User ID</p>
                        <input
                            id="userId"
                            name="userId"
                            type="text"
                            placeholder="superAdmin"
                        />
                    </div>
                    <div className={styles["login__row"]}>
                        <p>Password</p>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="1234"
                        />
                    </div>
                    <div className={styles["login__row"]}>
                        <button type="submit">
                            <span>LOGIN</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
