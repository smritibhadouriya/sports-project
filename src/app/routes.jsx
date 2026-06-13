import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

// Layouts
import MainLayout from '@/layouts/MainLayout'
import ScrollToTop from '@/components/ScrollToTop'
import CricketLayout from '@/features/cricket/components/Cricketlayout'
import CricketTeamsPage from '../features/cricket/pages/CricketTeamPage'
import CricketTeamDetailPage from '../features/cricket/pages/CricketTeamDetailPage'
import ComingSoon from '../design-system/Comingsoon'

// Common Pages
const HomePage       = lazy(() => import('@/features/home/HomePage'))
const ContactPage    = lazy(() => import('@/features/contact/ContactPage'))
const NotFoundPage   = lazy(() => import('./NotFoundPage'))

// Blog
const BlogsPage          = lazy(() => import('@/features/blogs/BlogsPage'))
const BlogDetailPage     = lazy(() => import('@/features/blogs/BlogDetailPage'))
const AuthorProfileView  = lazy(() => import('@/features/author/AuthorProfielView'))

// News
const NewsPage       = lazy(() => import('@/features/news/pages/NewsPage'))
const NewsListPage   = lazy(() => import('@/features/news/pages/NewsListPage'))
const NewsDetailPage = lazy(() => import('@/features/news/pages/NewsDetailPage'))
const TagListPage    = lazy(() => import('@/features/news/pages/TagListPage'))

// Cricket
const CricketHomePage     = lazy(() => import('@/features/cricket/pages/CricketHomePage'))
const CricketScoresPage   = lazy(() => import('@/features/cricket/pages/CricketScoresPage'))
const CricketSeriesPage   = lazy(() => import('@/features/cricket/pages/CricketSeriesPage'))
const CricketFixturesPage = lazy(() => import('@/features/cricket/pages/CricketFixturesPage'))
const CricketResultsPage  = lazy(() => import('@/features/cricket/pages/CricketResultsPage'))
const CricketNewsPage = lazy(() => import('@/features/cricket/pages/CricketNewsPage'))
const PlayerDetailPage    = lazy(() => import('@/features/cricket/pages/PlayerDetailPage'))
const TeamListPage        = lazy(() => import('@/features/cricket/pages/TeamListPage'))

// IPL
const IPLLayout           = lazy(() => import('@/features/cricket/components/IPLLayout'))
const IPLHomePage         = lazy(() => import('@/features/cricket/pages/IPLHomePage'))
const IPLMatchesPage      = lazy(() => import('@/features/cricket/pages/IPLMatchesPage'))
const IPLScorecardPage    = lazy(() => import('@/features/cricket/pages/Iplscorecardpage'))
const IPLPointsTablePage  = lazy(() => import('@/features/cricket/pages/IPLPointsTablePage'))

const comingSoon          = lazy(() => import('@/design-system/Comingsoon'))
// Media
const Allphoto    = lazy(() => import('@/features/news/pages/Allphoto'))
const GalleryView = lazy(() =>
  import('@/features/news/pages/Allphoto').then(m => ({ default: m.GalleryView }))
)
const AllVideo    = lazy(() => import('@/features/news/pages/Allvedio'))
const VideoDetail = lazy(() =>
  import('@/features/news/pages/Allvedio').then(m => ({ default: m.VideoDetail }))
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <ScrollToTop />
        <MainLayout />
      </>
    ),
    children: [
      { index: true, element: <HomePage /> },

      // ---------------- BLOG ----------------
      {
        path: 'blogs',
        children: [
          { index: true, element: <BlogsPage /> },
          { path: ':title', element: <BlogDetailPage /> },
          { path: 'author/:authorName', element: <AuthorProfileView /> },
        ],
      },

      // ---------------- NEWS ----------------
      {
        path: 'news',
        children: [
          { index: true, element: <NewsPage /> },
          { path: ':slug', element: <NewsDetailPage /> },
          { path: 'tags/:tag', element: <TagListPage /> },
        ],
      },
   
      // ---------------- CRICKET ----------------
{
  path: 'cricket',
  element: <CricketLayout />,
  children: [

    // Main cricket tabs
    { index: true, element: <CricketHomePage /> },
    { path: 'live', element: <CricketScoresPage /> },
    { path: 'fixtures', element: <CricketFixturesPage /> },
    { path: 'results', element: <CricketResultsPage /> },
    { path: 'news', element: <CricketNewsPage/> },
    { path: 'series', element: <CricketSeriesPage /> },

    // Player / Team
    { path: 'teams', element: <CricketTeamsPage /> },           // India, Pak, etc.
    { path: 'teams/:teamId', element: <CricketTeamDetailPage /> }, // team ke players
    { path: 'player/:playerId', element: <PlayerDetailPage /> },

    // ---------------- SERIES SPECIFIC ----------------
    {
      path: 'series/:seriesId',
      element: <IPLLayout />,
      children: [
        { index: true, element: <IPLHomePage /> },
        { path: 'matches', element: <IPLMatchesPage /> },
        { path: 'points-table', element: <IPLPointsTablePage /> },
        { path: 'scorecard/:matchId', element: <IPLScorecardPage /> },
         { path: 'teams', element: <TeamListPage /> },    
        
      ],
    },
  ],
},
      // ---------------- MEDIA ----------------
      {
        path: 'photogallary',
        children: [
          { index: true, element: <Allphoto /> },
          { path: ':slug', element: <GalleryView /> },
        ],
      },
      {
        path: 'vediogallary',
        children: [
          { index: true, element: <AllVideo /> },
          { path: ':slug', element: <VideoDetail /> },
        ],
      },

      // ---------------- OTHER SPORTS ----------------
     // { path: 'football', element: <CricketScoresPage /> },
      { path: 'football/news', element: <NewsListPage /> },
      { path: 'football/news/:slug', element: <NewsDetailPage /> },

      { path: 'sports/news', element: <NewsListPage /> },
      { path: 'sports/news/:slug', element: <NewsDetailPage /> },

      // ---------------- CONTACT ----------------
      { path: 'contact', element: <ContactPage /> },

      //-------------Comming soon ------------
      { path: 'football', element: <ComingSoon /> },
      { path: 'badminton', element: <ComingSoon /> },
      { path: 'tennis', element: <ComingSoon /> },
      { path: 'formula1', element: <ComingSoon /> },
    

      // ---------------- FALLBACK ----------------
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

