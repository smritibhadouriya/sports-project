// // // import { useState } from 'react'
// // // import SportsTabs from '@/layouts/SportsTabs'
// // // import CricketTabs from '../components/CricketTabs'
// // // import SectionHeader from '@/shared/components/SectionHeader'
// // // import BlogsSection from '@/shared/components/BlogsSection'
// // // import SeoManager from '@/core/seo/SeoManager'
// // // import { iplTeams, iplTeamPlayers } from '@/shared/constants/cricket.data'
// // // import { Link } from 'react-router-dom'

// // // const PlayerRow = ({ player }) => (
// // //   <Link
// // //     to={`/cricket/player/${player.id}`}
// // //     className="flex items-center gap-3 p-4 bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
// // //   >
// // //     <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-yellow-100">
// // //       {player.image ? (
// // //         <img src={player.image} alt={player.name} className="w-full h-full object-cover" loading="lazy" />
// // //       ) : (
// // //         <div className="w-full h-full bg-gradient-to-br from-yellow-200 to-purple-300 flex items-center justify-center">
// // //           <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
// // //             <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
// // //           </svg>
// // //         </div>
// // //       )}
// // //     </div>
// // //     <div className="flex-1 min-w-0">
// // //       <h4 className="font-bold text-gray-900 dark:text-white text-sm">{player.name}</h4>
// // //       <p className="text-xs text-gray-500 dark:text-gray-400">{player.role}</p>
// // //       <p className="text-xs text-gray-500 dark:text-gray-400">Age: {player.age}</p>
// // //       <p className="text-xs text-gray-500 dark:text-gray-400">
// // //         Batting: <span className="font-semibold text-gray-700 dark:text-gray-300">{player.batting}</span>
// // //       </p>
// // //       <p className="text-xs text-gray-500 dark:text-gray-400">
// // //         Bowling: <span className="font-semibold text-gray-700 dark:text-gray-300">{player.bowling}</span>
// // //       </p>
// // //     </div>
// // //     <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //       <path strokeWidth="2" strokeLinecap="round" d="M9 18l6-6-6-6" />
// // //     </svg>
// // //   </Link>
// // // )

// // // const PlayerCardPage = () => {
// // //   const [selectedTeam, setSelectedTeam] = useState('Royal Challengers Bengaluru')
// // //   const [showDropdown, setShowDropdown] = useState(false)

// // //   const players = iplTeamPlayers[selectedTeam] || []

// // //   return (
// // //     <>
// // //       <SeoManager title="Player Info | SportyRadar" />
// // //       <SportsTabs />
// // //       <CricketTabs />
// // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
// // //         <SectionHeader title="Player Info" />

// // //         {/* Team Selector */}
// // //         <div className="relative inline-block mb-4">
// // //           <button
// // //             onClick={() => setShowDropdown((v) => !v)}
// // //             className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-[#1c2128] hover:border-[#00698c] transition-colors"
// // //           >
// // //             {selectedTeam || 'Select Team'}
// // //             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //               <path strokeWidth="2" strokeLinecap="round" d="M19 9l-7 7-7-7" />
// // //             </svg>
// // //           </button>
// // //           {showDropdown && (
// // //             <div className="absolute top-full mt-1 left-0 z-20 bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg min-w-[220px]">
// // //               {iplTeams.map((team) => (
// // //                 <button
// // //                   key={team}
// // //                   onClick={() => { setSelectedTeam(team); setShowDropdown(false) }}
// // //                   className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
// // //                     selectedTeam === team ? 'text-[#00698c] font-semibold' : 'text-gray-700 dark:text-gray-300'
// // //                   }`}
// // //                 >
// // //                   {team}
// // //                 </button>
// // //               ))}
// // //             </div>
// // //           )}
// // //         </div>

// // //         {/* Team Name */}
// // //         <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3">{selectedTeam}</h3>

// // //         {/* Players */}
// // //         <div className="space-y-3 mb-8">
// // //           {players.map((player) => (
// // //             <PlayerRow key={player.id} player={player} />
// // //           ))}
// // //           {players.length === 0 && (
// // //             <p className="text-gray-500 dark:text-gray-400 text-sm py-4">No players found for this team.</p>
// // //           )}
// // //         </div>

// // //         <BlogsSection />
// // //       </div>
// // //     </>
// // //   )
// // // }

// // // export default PlayerCardPage


// // import { useState, useEffect, useRef } from 'react'
// // import SportsTabs from '@/layouts/SportsTabs'
// // import CricketTabs from '../components/CricketTabs'
// // import SectionHeader from '@/shared/components/SectionHeader'
// // import BlogsSection from '@/shared/components/BlogsSection'
// // import SeoManager from '@/core/seo/SeoManager'
// // import { iplTeams, iplTeamPlayers } from '@/shared/constants/cricket.data'
// // import { Link } from 'react-router-dom'

// // const PlayerRow = ({ player }) => (
// //   <Link
// //     to={`/cricket/player/${player.id}`}
// //     className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:border-[#00698c] dark:hover:border-[#00698c] group"
// //   >
// //     <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30">
// //       {player.image ? (
// //         <img src={player.image} alt={player.name} className="w-full h-full object-cover" loading="lazy" />
// //       ) : (
// //         <div className="w-full h-full bg-gradient-to-br from-yellow-200 to-purple-300 dark:from-yellow-800 dark:to-purple-800 flex items-center justify-center">
// //           <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
// //             <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
// //           </svg>
// //         </div>
// //       )}
// //     </div>
// //     <div className="flex-1 min-w-0">
// //       <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base truncate group-hover:text-[#00698c] dark:group-hover:text-[#00698c] transition-colors">
// //         {player.name}
// //       </h4>
// //       <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">{player.role}</p>
// //       <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
// //         <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Age: {player.age}</p>
// //         <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
// //           Batting: <span className="font-semibold text-gray-700 dark:text-gray-300">{player.batting}</span>
// //         </p>
// //         <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
// //           Bowling: <span className="font-semibold text-gray-700 dark:text-gray-300">{player.bowling}</span>
// //         </p>
// //       </div>
// //     </div>
// //     <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 group-hover:text-[#00698c] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //       <path strokeWidth="2" strokeLinecap="round" d="M9 18l6-6-6-6" />
// //     </svg>
// //   </Link>
// // )

// // const PlayerCardPage = () => {
// //   const [selectedTeam, setSelectedTeam] = useState('Royal Challengers Bengaluru')
// //   const [showDropdown, setShowDropdown] = useState(false)
// //   const dropdownRef = useRef(null)

// //   // Close dropdown when clicking outside
// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// //         setShowDropdown(false)
// //       }
// //     }
// //     document.addEventListener('mousedown', handleClickOutside)
// //     return () => document.removeEventListener('mousedown', handleClickOutside)
// //   }, [])

// //   const players = iplTeamPlayers[selectedTeam] || []

// //   return (
// //     <>
// //       <SeoManager title={`${selectedTeam} - Player Info | SportyRadar`} />
// //       <SportsTabs />
// //       <CricketTabs />
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
// //         <SectionHeader title="Player Info" />

// //         {/* Team Selector Section */}
// //         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
// //           {/* Dropdown Team Selector */}
// //           <div className="relative" ref={dropdownRef}>
// //             <button
// //               onClick={() => setShowDropdown((v) => !v)}
// //               className="flex items-center justify-between gap-2 px-4 sm:px-5 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-full text-sm sm:text-base text-gray-700 dark:text-gray-300 bg-white dark:bg-[#1c2128] hover:border-[#00698c] dark:hover:border-[#00698c] transition-all duration-200 min-w-[200px] sm:min-w-[240px]"
// //             >
// //               <span className="truncate">{selectedTeam || 'Select Team'}</span>
// //               <svg className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path strokeWidth="2" strokeLinecap="round" d="M19 9l-7 7-7-7" />
// //               </svg>
// //             </button>
            
// //             {showDropdown && (
// //               <div className="absolute top-full mt-2 left-0 z-20 bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl min-w-[220px] sm:min-w-[260px] max-h-[300px] overflow-y-auto">
// //                 {iplTeams.map((team) => (
// //                   <button
// //                     key={team}
// //                     onClick={() => { setSelectedTeam(team); setShowDropdown(false) }}
// //                     className={`w-full text-left px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
// //                       selectedTeam === team 
// //                         ? 'text-[#00698c] font-semibold bg-gray-50 dark:bg-gray-800' 
// //                         : 'text-gray-700 dark:text-gray-300'
// //                     }`}
// //                   >
// //                     <div className="flex items-center justify-between">
// //                       <span className="truncate">{team}</span>
// //                       {selectedTeam === team && (
// //                         <svg className="w-4 h-4 text-[#00698c] flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                           <path strokeWidth="2" strokeLinecap="round" d="M5 13l4 4L19 7" />
// //                         </svg>
// //                       )}
// //                     </div>
// //                   </button>
// //                 ))}
// //               </div>
// //             )}
// //           </div>

// //           {/* Team Stats Badge */}
// //           <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-full self-start sm:self-auto">
// //             <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
// //               <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
// //             </svg>
// //             <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
// //               <span className="font-semibold text-gray-900 dark:text-white">{players.length}</span> Players
// //             </span>
// //           </div>
// //         </div>

// //         {/* Team Name Header */}
// //         <div className="mb-4 sm:mb-6 pb-2 sm:pb-3 border-b-2 border-gray-200 dark:border-gray-700">
// //           <div className="flex items-center gap-2">
// //             <div className="w-1 h-6 sm:h-8 bg-[#00698c] rounded-full"></div>
// //             <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white truncate">
// //               {selectedTeam}
// //             </h3>
// //           </div>
// //           <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 ml-3">
// //             Full squad list for IPL 2026 season
// //           </p>
// //         </div>

// //         {/* Players Grid/List */}
// //         <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
// //           {players.length > 0 ? (
// //             players.map((player) => (
// //               <PlayerRow key={player.id} player={player} />
// //             ))
// //           ) : (
// //             <div className="text-center py-8 sm:py-12 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
// //               <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
// //                 <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
// //                   <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
// //                 </svg>
// //               </div>
// //               <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">No players found for this team.</p>
// //               <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Please select a different team</p>
// //             </div>
// //           )}
// //         </div>

// //         {/* Quick Stats Section */}
// //         {players.length > 0 && (
// //           <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
// //             <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
// //               <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Players</p>
// //               <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{players.length}</p>
// //             </div>
// //             <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
// //               <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Batsmen</p>
// //               <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
// //                 {players.filter(p => p.role?.toLowerCase().includes('batsman') || p.role?.toLowerCase().includes('batter')).length}
// //               </p>
// //             </div>
// //             <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
// //               <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Bowlers</p>
// //               <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
// //                 {players.filter(p => p.role?.toLowerCase().includes('bowler')).length}
// //               </p>
// //             </div>
// //             <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
// //               <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">All-rounders</p>
// //               <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
// //                 {players.filter(p => p.role?.toLowerCase().includes('all-rounder')).length}
// //               </p>
// //             </div>
// //           </div>
// //         )}

// //         <BlogsSection />
// //       </div>
// //     </>
// //   )
// // }

// // export default PlayerCardPage


// import { useState, useEffect, useRef } from 'react'
// import SportsTabs from '@/layouts/SportsTabs'
// import CricketTabs from '../components/CricketTabs'
// import SectionHeader from '@/shared/components/SectionHeader'
// import BlogsSection from '@/shared/components/BlogsSection'
// import SeoManager from '@/core/seo/SeoManager'
// import { iplTeams, iplTeamPlayers } from '@/shared/constants/cricket.data'
// import { Link } from 'react-router-dom'
// const getSlug = (name) =>
//   name.toLowerCase().replace(/\s+/g, '-')

// const PlayerRow = ({ player }) => (
//   <Link
//     to={`/cricket/player/${getSlug(player.name)}`}
//     className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:border-[#00698c] dark:hover:border-[#00698c] group"
//   >
//     <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30">
//       {player.image ? (
//         <img src={player.image} alt={player.name} className="w-full h-full object-cover" loading="lazy" />
//       ) : (
//         <div className="w-full h-full bg-gradient-to-br from-yellow-200 to-purple-300 dark:from-yellow-800 dark:to-purple-800 flex items-center justify-center">
//           <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
//           </svg>
//         </div>
//       )}
//     </div>
//     <div className="flex-1 min-w-0">
//       <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base truncate group-hover:text-[#00698c] dark:group-hover:text-[#00698c] transition-colors">
//         {player.name}
//       </h4>
//       <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">{player.role}</p>
//       <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
//         <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Age: {player.age}</p>
//         <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
//           Batting: <span className="font-semibold text-gray-700 dark:text-gray-300">{player.batting}</span>
//         </p>
//         <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
//           Bowling: <span className="font-semibold text-gray-700 dark:text-gray-300">{player.bowling}</span>
//         </p>
//       </div>
//     </div>
//     <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 group-hover:text-[#00698c] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeWidth="2" strokeLinecap="round" d="M9 18l6-6-6-6" />
//     </svg>
//   </Link>
// )

// const PlayerCardPage = () => {
//   const [selectedTeam, setSelectedTeam] = useState('Royal Challengers Bengaluru')
//   const [showDropdown, setShowDropdown] = useState(false)
//   const dropdownRef = useRef(null)

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false)
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside)
//     return () => document.removeEventListener('mousedown', handleClickOutside)
//   }, [])

//   const players = iplTeamPlayers[selectedTeam] || []

//   return (
//     <>
//       <SeoManager title={`${selectedTeam} - Player Info | SportyRadar`} />
//       <SportsTabs />
//       <CricketTabs />

//       {/* Main layout: player content + right sidebar space */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
//         <div className="flex gap-6">

//           {/* Left: Player content — narrowed to make room for right sidebar */}
//           <div className="w-full lg:w-[80%] min-w-0">
//             <SectionHeader title="Player Info" />

//             {/* Team Selector Section */}
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
//               {/* Dropdown Team Selector */}
//               <div className="relative" ref={dropdownRef}>
//                 <button
//                   onClick={() => setShowDropdown((v) => !v)}
//                   className="flex items-center justify-between gap-2 px-4 sm:px-5 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-full text-sm sm:text-base text-gray-700 dark:text-gray-300 bg-white dark:bg-[#1c2128] hover:border-[#00698c] dark:hover:border-[#00698c] transition-all duration-200 min-w-[200px] sm:min-w-[240px]"
//                 >
//                   <span className="truncate">{selectedTeam || 'Select Team'}</span>
//                   <svg className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeWidth="2" strokeLinecap="round" d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>

//                 {showDropdown && (
//                   <div className="absolute top-full mt-2 left-0 z-20 bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl min-w-[220px] sm:min-w-[260px] max-h-[300px] overflow-y-auto">
//                     {iplTeams.map((team) => (
//                       <button
//                         key={team}
//                         onClick={() => { setSelectedTeam(team); setShowDropdown(false) }}
//                         className={`w-full text-left px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
//                           selectedTeam === team
//                             ? 'text-[#00698c] font-semibold bg-gray-50 dark:bg-gray-800'
//                             : 'text-gray-700 dark:text-gray-300'
//                         }`}
//                       >
//                         <div className="flex items-center justify-between">
//                           <span className="truncate">{team}</span>
//                           {selectedTeam === team && (
//                             <svg className="w-4 h-4 text-[#00698c] flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeWidth="2" strokeLinecap="round" d="M5 13l4 4L19 7" />
//                             </svg>
//                           )}
//                         </div>
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Team Stats Badge */}
//               <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-full self-start sm:self-auto">
//                 <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
//                 </svg>
//                 <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
//                   <span className="font-semibold text-gray-900 dark:text-white">{players.length}</span> Players
//                 </span>
//               </div>
//             </div>

//             {/* Team Name Header */}
//             <div className="mb-4 sm:mb-6 pb-2 sm:pb-3 border-b-2 border-gray-200 dark:border-gray-700">
//               <div className="flex items-center gap-2">
//                 <div className="w-1 h-6 sm:h-8 bg-[#00698c] rounded-full"></div>
//                 <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white truncate">
//                   {selectedTeam}
//                 </h3>
//               </div>
//               <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 ml-3">
//                 Full squad list for IPL 2026 season
//               </p>
//             </div>

//             {/* Players Grid/List */}
//             <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
//               {players.length > 0 ? (
//                 players.map((player) => (
//                   <PlayerRow key={player.id} player={player} />
//                 ))
//               ) : (
//                 <div className="text-center py-8 sm:py-12 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
//                   <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
//                     <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
//                     </svg>
//                   </div>
//                   <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">No players found for this team.</p>
//                   <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Please select a different team</p>
//                 </div>
//               )}
//             </div>

//             {/* Quick Stats Section */}
//             {players.length > 0 && (
//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
//                 <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
//                   <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Players</p>
//                   <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{players.length}</p>
//                 </div>
//                 <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
//                   <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Batsmen</p>
//                   <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
//                     {players.filter(p => p.role?.toLowerCase().includes('batsman') || p.role?.toLowerCase().includes('batter')).length}
//                   </p>
//                 </div>
//                 <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
//                   <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Bowlers</p>
//                   <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
//                     {players.filter(p => p.role?.toLowerCase().includes('bowler')).length}
//                   </p>
//                 </div>
//                 <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
//                   <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">All-rounders</p>
//                   <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
//                     {players.filter(p => p.role?.toLowerCase().includes('all-rounder')).length}
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Right: Empty space reserved for future sidebar — adjust w-[20%] to control width */}
//           <div className="hidden lg:block lg:w-[20%]">
//             {/* Sidebar content add karo yahan */}
//           </div>

//         </div>
//       </div>

//       {/* BlogsSection: separate full-width container — unaffected by above layout changes */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <BlogsSection />
//       </div>
//     </>
//   )
// }

// export default PlayerCardPage



import { useState, useEffect, useRef } from 'react'
import SportsTabs from '@/layouts/SportsTabs'
import CricketTabs from '../components/CricketTabs'
import SectionHeader from '@/shared/components/SectionHeader'
import BlogsSection from '@/shared/components/BlogsSection'
import SeoManager from '@/core/seo/SeoManager'
import { iplTeams, iplTeamPlayers } from '@/shared/constants/cricket.data'
import { Link } from 'react-router-dom'
const getSlug = (name) =>
  name.toLowerCase().replace(/\s+/g, '-')

const PlayerRow = ({ player }) => (
  <Link
    to={`/cricket/player/${getSlug(player.name)}`}
    className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer hover:border-[#00698c] dark:hover:border-[#00698c] group"
  >
    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30">
      {player.image ? (
        <img src={player.image} alt={player.name} className="w-full h-full object-cover" loading="lazy" />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-yellow-200 to-purple-300 dark:from-yellow-800 dark:to-purple-800 flex items-center justify-center">
          <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
      )}
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base truncate group-hover:text-[#00698c] dark:group-hover:text-[#00698c] transition-colors">
        {player.name}
      </h4>
      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">{player.role}</p>
      <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Age: {player.age}</p>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          Batting: <span className="font-semibold text-gray-700 dark:text-gray-300">{player.batting}</span>
        </p>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          Bowling: <span className="font-semibold text-gray-700 dark:text-gray-300">{player.bowling}</span>
        </p>
      </div>
    </div>
    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 group-hover:text-[#00698c] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeWidth="2" strokeLinecap="round" d="M9 18l6-6-6-6" />
    </svg>
  </Link>
)

const PlayerCardPage = () => {
  const [selectedTeam, setSelectedTeam] = useState('Royal Challengers Bengaluru')
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const players = iplTeamPlayers[selectedTeam] || []

  return (
    <>
      <SeoManager title={`${selectedTeam} - Player Info | SportyRadar`} />
      <SportsTabs />
      <CricketTabs />

      {/* Main layout: player content + right sidebar space */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="flex gap-6">

          {/* Left: Player content — narrowed to make room for right sidebar */}
          <div className="w-full lg:w-[80%] min-w-0">
            <SectionHeader title="Player Info" />

            {/* Team Selector Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
              {/* Dropdown Team Selector */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown((v) => !v)}
                  className="flex items-center justify-between gap-2 px-4 sm:px-5 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-full text-sm sm:text-base text-gray-700 dark:text-gray-300 bg-white dark:bg-[#1c2128] hover:border-[#00698c] dark:hover:border-[#00698c] transition-all duration-200 min-w-[200px] sm:min-w-[240px]"
                >
                  <span className="truncate">{selectedTeam || 'Select Team'}</span>
                  <svg className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="2" strokeLinecap="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showDropdown && (
                  <div className="absolute top-full mt-2 left-0 z-20 bg-white dark:bg-[#1c2128] border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl min-w-[220px] sm:min-w-[260px] max-h-[300px] overflow-y-auto">
                    {iplTeams.map((team) => (
                      <button
                        key={team}
                        onClick={() => { setSelectedTeam(team); setShowDropdown(false) }}
                        className={`w-full text-left px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                          selectedTeam === team
                            ? 'text-[#00698c] font-semibold bg-gray-50 dark:bg-gray-800'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="truncate">{team}</span>
                          {selectedTeam === team && (
                            <svg className="w-4 h-4 text-[#00698c] flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeWidth="2" strokeLinecap="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Team Stats Badge */}
              <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-full self-start sm:self-auto">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold text-gray-900 dark:text-white">{players.length}</span> Players
                </span>
              </div>
            </div>

            {/* Team Name Header */}
            <div className="mb-4 sm:mb-6 pb-2 sm:pb-3 border-b-2 border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 sm:h-8 bg-[#00698c] rounded-full"></div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white truncate">
                  {selectedTeam}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 ml-3">
                Full squad list for IPL 2026 season
              </p>
            </div>

            {/* Players Grid/List */}
            <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
              {players.length > 0 ? (
                players.map((player) => (
                  <PlayerRow key={player.id} player={player} />
                ))
              ) : (
                <div className="text-center py-8 sm:py-12 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">No players found for this team.</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Please select a different team</p>
                </div>
              )}
            </div>

            {/* Quick Stats Section */}
            {players.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Players</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{players.length}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Batsmen</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    {players.filter(p => p.role?.toLowerCase().includes('batsman') || p.role?.toLowerCase().includes('batter')).length}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Bowlers</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    {players.filter(p => p.role?.toLowerCase().includes('bowler')).length}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">All-rounders</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    {players.filter(p => p.role?.toLowerCase().includes('all-rounder')).length}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right: Empty space reserved for future sidebar — adjust w-[20%] to control width */}
          <div className="hidden lg:block lg:w-[20%]">
            {/* Sidebar content add karo yahan */}
          </div>

        </div>
      </div>

      {/* BlogsSection: separate full-width container — unaffected by above layout changes */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlogsSection />
      </div>
    </>
  )
}

export default PlayerCardPage