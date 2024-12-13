import Header from "@/app/components/layout/header";
import { auth } from "@/auth";
import { SessionProps } from "@/app/lib/definitions";

export default async function BoardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await auth();

    return (
        <main className="main">
            <div className="wrap">
                <Header userInfo={user as unknown as SessionProps} />
                <div className="container">
                    <div className="contents">{children}</div>
                </div>
            </div>
        </main>
    );
}
