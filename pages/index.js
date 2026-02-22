import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center p-8">
      <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl text-center">
        <h1 className="text-5xl font-black text-gray-900 mb-4">
          TradeLeadsFlow
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          AI Receptionist Platform
        </p>
        
        <div className="bg-yellow-50 border-2 border-yellow-400 rounded-2xl p-6 mb-8">
          <p className="text-lg font-bold text-yellow-900 mb-2">
            📌 NOTE: Replace This Page
          </p>
          <p className="text-sm text-yellow-800">
            This is a placeholder homepage. Replace the content in <code className="bg-yellow-100 px-2 py-1 rounded">pages/index.js</code> with your actual tradeleadsflow.com homepage content.
          </p>
        </div>

        <Link href="/client">
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105">
            Access Client Portal →
          </button>
        </Link>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Client portal includes: Revenue Dashboard • Conversations • Appointments • Analytics
          </p>
        </div>
      </div>
    </div>
  );
}
