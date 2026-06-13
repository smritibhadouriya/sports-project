
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0d1117] transition-colors duration-200">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
// import { Outlet } from 'react-router-dom'
// import Navbar from './Navbar'

// import Footer from './Footer'
// import { appConfig } from '@/config/app.config'

// const MainLayout = () => {
//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0d1117] transition-colors duration-200">
//       <Navbar />
   
//       <main className="flex-1">
//         <Outlet />
//       </main>
//       <Footer />
//     </div>
//   )
// }

// export default MainLayout
