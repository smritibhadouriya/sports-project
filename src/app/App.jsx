// import { Suspense } from 'react'
// import { RouterProvider } from 'react-router-dom'
// import { HelmetProvider } from 'react-helmet-async'
// import { ThemeProvider } from '@/core/providers/ThemeProvider'
// import { router } from './routes'
// import LoadingFallback from './LoadingFallback'

// const App = () => (
//   <HelmetProvider>
//     <ThemeProvider>
//       <Suspense fallback={<LoadingFallback />}>
//         <RouterProvider router={router} />
//       </Suspense>
//     </ThemeProvider>
//   </HelmetProvider>
// )

// export default App


import React, { Suspense } from 'react'  // ← React add karo
import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from '@/core/providers/ThemeProvider'
import { router } from './routes.jsx'
import LoadingFallback from './LoadingFallback'

const App = () => (
  <HelmetProvider>
    <ThemeProvider>
      <Suspense fallback={<LoadingFallback />}>
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  </HelmetProvider>
)

export default App