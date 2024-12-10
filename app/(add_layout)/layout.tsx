import Header from "@/app/components/header";
import { auth } from "@/auth";

export default async function BoardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await auth();

    return (
        <main className="main">
            <div className="wrap">
                <Header userInfo={user} />
                <div className="container">
                    <div className="contents">{children}</div>
                </div>
            </div>
        </main>
    );
}
