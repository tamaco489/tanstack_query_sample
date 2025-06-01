/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js の API ルートをローカルの API サーバーにリダイレクトする。
  // これにより、ローカルで API サーバーを実行している場合でも、Next.js の API ルートを使用できる。
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/api/:path*',
      },
    ];
  },
};

export default nextConfig;
