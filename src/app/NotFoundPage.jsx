import { Link } from 'react-router-dom'

const NotFoundPage = () => (
  <div className="min-h-[60vh] flex items-center justify-center px-4">
    <div className="text-center">
      <p className="text-8xl font-black text-[#00698c] mb-4">404</p>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Page Not Found</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#00698c] text-white font-semibold rounded-lg hover:bg-[#005470] transition-colors"
      >
        ← Back to Home
      </Link>
    </div>
  </div>
)

export default NotFoundPage
