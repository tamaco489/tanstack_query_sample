export default function Footer() {
  return (
    <footer className="bg-white border-t mt-8">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 text-sm">
            © 2024 ECサイト. All rights reserved.
          </div>
          <div className="mt-4 md:mt-0">
            <nav className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                利用規約
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                プライバシーポリシー
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                お問い合わせ
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
} 