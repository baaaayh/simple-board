import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
    sassOptions: {
        implementation: "sass-embedded",
    },
    serverExternalPackages: ["@bcrypt/ui"],
};

export default nextConfig;
