/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    
  
    turbopack: {
        rules: {
          
        },
    },
    
   
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                ],
            },
        ]
    },
};

export default nextConfig;
