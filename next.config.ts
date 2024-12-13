import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
    sassOptions: {
        // includePaths: [path.join(__dirname, "public")],
    },
    serverExternalPackages: ["@bcrypt/ui"],
    experimental: {
        optimizeCss: true, // CSS 최적화 활성화
    },
};

export default nextConfig;
