import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    sassOptions: {
        silenceDeprecations: ["legacy-js-api"],
    },
    serverExternalPackages: ["@bcrypt/ui"],
};

export default nextConfig;
