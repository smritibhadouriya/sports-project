// Mock Cricket Data

const iplLogos = {
  RCB: 'https://assets.ccbp.in/frontend/react-js/rcb-logo-img.png',
  SRH: 'https://th.bing.com/th/id/OIP.SyIHLPJQ1FBQz5_rcqzbVAHaHa?w=164&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
  MI: 'https://resources.pulse.icc-cricket.com/ipl/logos/mi.svg',
  CSK: 'https://resources.pulse.icc-cricket.com/ipl/logos/csk.svg',
  KKR: 'https://resources.pulse.icc-cricket.com/ipl/logos/kkr.svg',
  DC: 'https://resources.pulse.icc-cricket.com/ipl/logos/dc.svg',
  PBKS: 'https://resources.pulse.icc-cricket.com/ipl/logos/pbks.svg',
  RR: 'https://resources.pulse.icc-cricket.com/ipl/logos/rr.svg',
  GT: 'https://resources.pulse.icc-cricket.com/ipl/logos/gt.svg',
  LSG: 'https://resources.pulse.icc-cricket.com/ipl/logos/lsg.svg',
}

export const topHeadlineMatches = [
  {
    id: 'match-1',
    type: 'Live',
    sport: 'cricket',
    series: 'India Women Tour of Australia',
    team1: {
      name: 'AUS - W',
      flag: 'https://flagcdn.com/w320/au.png',
      status: 'Bowling',
    },
    team2: {
      name: 'IND - W',
      flag: 'https://flagcdn.com/w320/in.png',
      score: '49 / 1 (13.4)',
    },
  },
  {
    id: 'match-3',
    type: 'Live',
    sport: 'cricket',
    series: 'IPL 2026 — RCB vs SRH',
    team1: {
      name: 'RCB',
      flag: 'https://assets.ccbp.in/frontend/react-js/rcb-logo-img.png',
      status: 'Batting',
    },
    team2: {
      name: 'SRH',
      flag: 'https://th.bing.com/th/id/OIP.SyIHLPJQ1FBQz5_rcqzbVAHaHa?w=164&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
      score: '142 / 6 (18.2)',
    },
  },
  {
    id: 'um-1',
    type: 'Upcoming',
    sport: 'cricket',
    series: "Final ICC Men's T20 World Cup, 2026",
    team1: { name: 'New Zealand', flag: 'https://flagcdn.com/w320/nz.png' },
    team2: { name: 'India', flag: 'https://flagcdn.com/w320/in.png' },
    date: 'Sun, 08 Mar, 07:00 PM',
  },
  {
    id: 'um-2',
    type: 'Upcoming',
    sport: 'cricket',
    series: "Semi Final ICC Men's T20 World Cup, 2026",
    team1: { name: 'Australia', flag: 'https://flagcdn.com/w320/au.png' },
    team2: { name: 'England', flag: 'https://flagcdn.com/w320/gb.png' },
    date: 'Sat, 07 Mar, 03:00 PM',
  },
  {
    id: 'rm-1',
    type: 'Recent',
    sport: 'cricket',
    series: "Final ICC Men's T20 World Cup, 2026",
    team1: { name: 'New Zealand', flag: 'https://flagcdn.com/w320/nz.png', score: '180 / 4' },
    team2: { name: 'India', flag: 'https://flagcdn.com/w320/in.png', score: '183 / 3' },
    result: 'India won by 7 wkts',
  },
  {
    id: 'rm-2',
    type: 'Recent',
    sport: 'cricket',
    series: 'India Women Tour of Australia',
    team1: { name: 'AUS - W', flag: 'https://flagcdn.com/w320/au.png', score: '198' },
    team2: { name: 'IND - W', flag: 'https://flagcdn.com/w320/in.png', score: '201 / 6' },
    result: 'India Women won by 4 wkts',
  },
]

// ── CHANGED: emoji → image URLs ──────────────────────────────────────────────
export const liveMatch = [
  {
    slug: 'australia-women-vs-india-women-one-off-test-2026-day-1',
    isLive: true,
    series: 'India Women Tour of Australia',
    matchType: 'One-off Test, India Women in Australia, One-off Test, 2026',
    status: 'Day 1 | Stumps',
    team1: { name: 'Australia Women', flag: 'https://flagcdn.com/w320/au.png', score: '98/3 (27.0)' },
    team2: { name: 'India Women', flag: 'https://flagcdn.com/w320/in.png', score: '198' },
    summary: 'Australia Women lead by 102 runs',
  },
  {
    slug: 'australia-women-vs-india-women-one-off-test-2026-day-2',
    isLive: true,
    series: 'India Women Tour of India',
    matchType: 'One-off Test, India Women in Australia, One-off Test, 2026',
    status: 'Day 2 | Stumps',
    team1: { name: 'Australia Women', flag: 'https://flagcdn.com/w320/au.png', score: '98/3 (27.0)' },
    team2: { name: 'India Women', flag: 'https://flagcdn.com/w320/in.png', score: '198' },
    summary: 'Australia Women lead by 102 runs',
  },
]

export const upcomingMatches = [
  {
    slug: 'new-zealand-vs-india-t20-world-cup-final-2026',
    series: "Final ICC Men's T20 World Cup, 2026",
    date: 'Sun, 08 Mar, 07:00 PM',
    team1: { name: 'New Zealand', flag: 'https://flagcdn.com/w320/nz.png' },
    team2: { name: 'India', flag: 'https://flagcdn.com/w320/in.png' },
    venue: 'Narenda Modi Stadium, Ahmedabad',
  },
  {
    slug: 'new-zealand-vs-india-t20-world-cup-final-2026-2',
    series: "Final ICC Men's T20 World Cup, 2026",
    date: 'Sun, 08 Mar, 07:00 PM',
    team1: { name: 'New Zealand', flag: 'https://flagcdn.com/w320/nz.png' },
    team2: { name: 'India', flag: 'https://flagcdn.com/w320/in.png' },
    venue: 'Narenda Modi Stadium, Ahmedabad',
  },
]

export const recentMatches = [
  {
    slug: 'new-zealand-vs-india-t20-world-cup-final-2026-result-1',
    series: "Final ICC Men's T20 World Cup, 2026",
    date: 'Sun, 08 Mar, 07:00 PM',
    team1: { name: 'New Zealand', flag: 'https://flagcdn.com/w320/nz.png' },
    team2: { name: 'India', flag: 'https://flagcdn.com/w320/in.png' },
    venue: 'Narenda Modi Stadium, Ahmedabad',
  },
  {
    slug: 'new-zealand-vs-india-t20-world-cup-final-2026-result-2',
    series: "Final ICC Men's T20 World Cup, 2026",
    date: 'Sun, 08 Mar, 07:00 PM',
    team1: { name: 'New Zealand', flag: 'https://flagcdn.com/w320/nz.png' },
    team2: { name: 'India', flag: 'https://flagcdn.com/w320/in.png' },
    venue: 'Narenda Modi Stadium, Ahmedabad',
  },
]

export const currentSeries = [
  {
    id: 'cs-1',
    name: 'T20 WorldCup 2026',
    dates: 'Feb 07 - Mar 08',
    links: ['Schedule', 'Results', 'Stats', 'News'],
  },
]

export const recentSeries = [
  {
    id: 'rs-1',
    name: 'T20 WorldCup 2026',
    dates: 'Feb 07 - Mar 08',
    links: ['Results', 'Stats', 'News'],
  },
  {
    id: 'rs-2',
    name: 'T20 WorldCup 2026',
    dates: 'Feb 07 - Mar 08',
    links: ['Results', 'Stats', 'News'],
  },
  {
    id: 'rs-3',
    name: 'T20 WorldCup 2026',
    dates: 'Feb 07 - Mar 08',
    links: ['Results', 'Stats', 'News'],
  },
  {
    id: 'rs-4',
    name: 'T20 WorldCup 2026',
    dates: 'Feb 07 - Mar 08',
    links: ['Results', 'Stats', 'News'],
  },
]

export const fixturesByDate = [
  {
    label: 'Tomorrow',
    matches: [
      {
        id: 'f-1',
        name: '2nd T20I, Bahrain in Malaysia, 3 T20I Series, 2026',
        time: 'Sun 12:30 PM',
        venue: 'Bayuemas Oval, Kuala Lumpur',
        team1: { name: 'Malaysia', flag: '🇲🇾' },
        team2: { name: 'Bahrain', flag: '🇧🇭' },
      },
      {
        id: 'f-2',
        name: '2nd T20I, Bahrain in Malaysia, 3 T20I Series, 2026',
        time: 'Sun 12:30 PM',
        venue: 'Bayuemas Oval, Kuala Lumpur',
        team1: { name: 'Malaysia', flag: '🇲🇾' },
        team2: { name: 'Bahrain', flag: '🇧🇭' },
      },
    ],
  },
  {
    label: 'Upcoming',
    matches: [
      {
        id: 'f-3',
        name: '2nd T20I, Bahrain in Malaysia, 3 T20I Series, 2026',
        time: 'Sun 12:30 PM',
        venue: 'Bayuemas Oval, Kuala Lumpur',
        team1: { name: 'Malaysia', flag: '🇲🇾' },
        team2: { name: 'Bahrain', flag: '🇧🇭' },
      },
    ],
  },
]

export const resultsByDate = [
  {
    date: 'Sat, Mar 07 2026',
    matches: [
      {
        id: 'r-1',
        name: '2nd T20I, Bahrain in Malaysia, 3 T20I Series, 2026',
        venue: 'Bayuemas Oval, Kuala Lumpur',
        team1: { name: 'Malaysia', flag: '🇲🇾', score: '98/3 (27.0)' },
        team2: { name: 'Bahrain', flag: '🇧🇭', score: '198' },
      },
      {
        id: 'r-2',
        name: '2nd T20I, Bahrain in Malaysia, 3 T20I Series, 2026',
        venue: 'Bayuemas Oval, Kuala Lumpur',
        team1: { name: 'Malaysia', flag: '🇲🇾', score: '98/3 (27.0)' },
        team2: { name: 'Bahrain', flag: '🇧🇭', score: '198' },
      },
    ],
  },
  {
    date: 'Thr, Mar 05 2026',
    matches: [
      {
        id: 'r-3',
        name: '2nd T20I, Bahrain in Malaysia, 3 T20I Series, 2026',
        venue: 'Bayuemas Oval, Kuala Lumpur',
        team1: { name: 'Malaysia', flag: '🇲🇾', score: '98/3 (27.0)' },
        team2: { name: 'Bahrain', flag: '🇧🇭', score: '198' },
      },
    ],
  },
]

export const iplTeams = [
  'Chennai Super Kings',
  'Delhi Capitals',
  'Gujarat Titans',
  'Royal Challengers Bengaluru',
  'Punjab Kings',
  'Kolkata Knight Riders',
  'Sunrisers Hyderabad',
  'Rajasthan Royals',
  'Lucknow Super Giants',
  'Mumbai Indians',
]

export const iplMatches = [
  {
    id: 'ipl-1',
    date: 'Sat, Mar 28 2026',
    matchNumber: '1st Match',
    team1: { name: 'Royal Challengers Bengaluru', code: 'RCB' },
    team2: { name: 'Sunrisers Hyderabad', code: 'SRH' },
    venue: 'Bengaluru, M.Chinnaswamy Stadium',
    time: '7:30 PM / 2:00 PM (GMT) / 7:30 PM (LOCAL)',
  },
  {
    id: 'ipl-2',
    date: 'Sat, Mar 28 2026',
    matchNumber: '1st Match',
    team1: { name: 'Royal Challengers Bengaluru', code: 'RCB' },
    team2: { name: 'Sunrisers Hyderabad', code: 'SRH' },
    venue: 'Bengaluru, M.Chinnaswamy Stadium',
    time: '7:30 PM / 2:00 PM (GMT) / 7:30 PM (LOCAL)',
  },
  {
    id: 'ipl-3',
    date: 'Sat, Mar 28 2026',
    matchNumber: '1st Match',
    team1: { name: 'Royal Challengers Bengaluru', code: 'RCB' },
    team2: { name: 'Sunrisers Hyderabad', code: 'SRH' },
    venue: 'Bengaluru, M.Chinnaswamy Stadium',
    time: '7:30 PM / 2:00 PM (GMT) / 7:30 PM (LOCAL)',
  },
  {
    id: 'ipl-4',
    date: 'Sat, Mar 28 2026',
    matchNumber: '1st Match',
    team1: { name: 'Royal Challengers Bengaluru', code: 'RCB' },
    team2: { name: 'Sunrisers Hyderabad', code: 'SRH' },
    venue: 'Bengaluru, M.Chinnaswamy Stadium',
    time: '7:30 PM / 2:00 PM (GMT) / 7:30 PM (LOCAL)',
  },
]

export const iplTeamPlayers = {
  'Royal Challengers Bengaluru': [
    {
      name: 'Virat Kohli',
      role: 'Top order Batter',
      age: '37y 9d',
      batting: 'Right hand Bat',
      bowling: 'Right arm Medium',
      image: 'https://im.rediff.com/cricket/2022/sep/08vk.gif',
    },
    {
      name: 'Devdutt Padikkal',
      role: 'Top order Batter',
      age: '37y 9d',
      batting: 'Right hand Bat',
      bowling: 'Right arm Medium',
      image: null,
    },
  ],
  'Chennai Super Kings': [
    { name: 'MS Dhoni', role: 'Wicket Keeper', age: '44y 3d', batting: 'Right hand Bat', bowling: 'Right arm Medium', image: null },
    { name: 'Ruturaj Gaikwad', role: 'Top order Batter', age: '27y 5d', batting: 'Right hand Bat', bowling: 'Right arm Off break', image: null },
  ],
  'Delhi Capitals': [
    { name: 'Rishabh Pant', role: 'Wicket Keeper', age: '26y 2d', batting: 'Left hand Bat', bowling: 'Right arm Medium', image: null },
  ],
  'Gujarat Titans': [
    { name: 'Shubman Gill', role: 'Top order Batter', age: '24y 8d', batting: 'Right hand Bat', bowling: 'Right arm Medium', image: null },
  ],
  'Punjab Kings': [
    { name: 'Shreyas Iyer', role: 'Middle order Batter', age: '29y 4d', batting: 'Right hand Bat', bowling: 'Right arm leg break', image: null },
  ],
  'Kolkata Knight Riders': [
    { name: 'Venkatesh Iyer', role: 'All Rounder', age: '29y 1d', batting: 'Left hand Bat', bowling: 'Right arm Medium', image: null },
  ],
  'Sunrisers Hyderabad': [
    { name: 'Pat Cummins', role: 'Bowler', age: '31y 5d', batting: 'Right hand Bat', bowling: 'Right arm Fast medium', image: null },
  ],
  'Rajasthan Royals': [
    { name: 'Sanju Samson', role: 'Wicket Keeper', age: '29y 7d', batting: 'Right hand Bat', bowling: 'Right arm leg break', image: null },
  ],
  'Lucknow Super Giants': [
    { name: 'KL Rahul', role: 'Wicket Keeper', age: '32y 1d', batting: 'Right hand Bat', bowling: 'Right arm leg break', image: null },
  ],
  'Mumbai Indians': [
    { name: 'Hardik Pandya', role: 'All Rounder', age: '30y 8d', batting: 'Right hand Bat', bowling: 'Right arm Medium fast', image: null },
  ],
}

export const playerDetail = [
  {
    name: 'Virat Kohli',
    born: 'November 05, 1988 (37 years)',
    birthPlace: 'Delhi',
    height: '5 ft 9 in (175 cm)',
    role: 'Batsman',
    battingStyle: 'Right Handed Bat',
    bowlingStyle: 'Right-arm medium',
    image: 'https://static.wixstatic.com/media/3c585f_28528aead9c34022b091dd2fb0c473c9~mv2.webp',
    summary: `A spunky, chubby teenager with gelled hair shot to fame after leading India to glory in the Under-19 World Cup at Kuala Lumpur in early 2008. In an Indian team filled with saint-like icons worthy of their own hagiographies, Virat Kohli, with his most un-Indian, 'bad-boy' intensity, would clearly be an outcast.

A spunky, chubby teenager with gelled hair shot to fame after leading India to glory in the Under-19 World Cup at Kuala Lumpur in early 2008. In an Indian team filled with saint-like icons worthy of their own hagiographies, Virat Kohli, with his most un-Indian, 'bad-boy' intensity, would clearly be an outcast.`,
  },
  {
    name: 'Devdutt Padikkal',
    born: 'July 07, 2000 (25 years)',
    birthPlace: 'Edapal, Kerala, India',
    height: '6 ft 3 in (191 cm)',
    role: 'Top order Batter',
    battingStyle: 'Left Handed Bat',
    bowlingStyle: 'Right-arm Offbreak',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Devdutt_Padikkal_in_2024.jpg/200px-Devdutt_Padikkal_in_2024.jpg',
    summary: `Devdutt Padikkal is an elegant left-handed top-order batter known for his tall stature and graceful strokeplay. Born in Edapal, Kerala, he rose through the ranks with Karnataka and made an instant impact in the IPL with Royal Challengers Bengaluru in 2020, scoring 473 runs in his debut season and winning the Emerging Player Award.

At 6'3", Padikkal uses his height and reach effectively, especially against pace, and has a solid technique that allows him to play both aggressive and anchor roles. He also bowls useful right-arm offbreaks, adding value as a part-timer. After stints with Rajasthan Royals and Lucknow Super Giants, he returned to RCB and played a key role in their historic 2025 IPL title win with aggressive starts at the top of the order (247 runs in 10 matches at a strike rate of 150+ before injury).

A former India U-19 and India A player, Padikkal continues to impress in domestic cricket for Karnataka. His calm demeanor off the field contrasts with his fluent batting, making him one of India's promising young talents in white-ball cricket. Fans appreciate his ability to find gaps with timing rather than brute power, and he remains a vital part of RCB's batting lineup in IPL 2026.`,
    debut: { ipl: '2020', domestic: '2018-19', international: 'None (India A level)' },
    majorAchievements: [
      "Emerging Player Award - IPL 2020",
      "Key contributor in RCB's maiden IPL title (2025)",
      'Multiple 50+ scores in IPL and domestic seasons',
      'Represented India A and Karnataka in Ranji Trophy/Syed Mushtaq Ali',
    ],
    iplStats: { matches: 75, runs: 1867, highestScore: '101*', average: 25.93, strikeRate: 128.23, fifties: 12, hundreds: 1 },
    teamsPlayedFor: ['Royal Challengers Bengaluru', 'Rajasthan Royals', 'Lucknow Super Giants', 'Karnataka'],
  },
  {
    name: 'Ruturaj Gaikwad',
    born: 'July 07, 2000 (25 years)',
    birthPlace: 'Edapal, Kerala, India',
    height: '6 ft 3 in (191 cm)',
    role: 'Top order Batter',
    battingStyle: 'Left Handed Bat',
    bowlingStyle: 'Right-arm Offbreak',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Devdutt_Padikkal_in_2024.jpg/200px-Devdutt_Padikkal_in_2024.jpg',
    summary: `Devdutt Padikkal is an elegant left-handed top-order batter known for his tall stature and graceful strokeplay. Born in Edapal, Kerala, he rose through the ranks with Karnataka and made an instant impact in the IPL with Royal Challengers Bengaluru in 2020, scoring 473 runs in his debut season and winning the Emerging Player Award.

At 6'3", Padikkal uses his height and reach effectively, especially against pace, and has a solid technique that allows him to play both aggressive and anchor roles. He also bowls useful right-arm offbreaks, adding value as a part-timer. After stints with Rajasthan Royals and Lucknow Super Giants, he returned to RCB and played a key role in their historic 2025 IPL title win with aggressive starts at the top of the order (247 runs in 10 matches at a strike rate of 150+ before injury).

A former India U-19 and India A player, Padikkal continues to impress in domestic cricket for Karnataka. His calm demeanor off the field contrasts with his fluent batting, making him one of India's promising young talents in white-ball cricket. Fans appreciate his ability to find gaps with timing rather than brute power, and he remains a vital part of RCB's batting lineup in IPL 2026.`,
    debut: { ipl: '2020', domestic: '2018-19', international: 'None (India A level)' },
    majorAchievements: [
      "Emerging Player Award - IPL 2020",
      "Key contributor in RCB's maiden IPL title (2025)",
      'Multiple 50+ scores in IPL and domestic seasons',
      'Represented India A and Karnataka in Ranji Trophy/Syed Mushtaq Ali',
    ],
    iplStats: { matches: 75, runs: 1867, highestScore: '101*', average: 25.93, strikeRate: 128.23, fifties: 12, hundreds: 1 },
    teamsPlayedFor: ['Royal Challengers Bengaluru', 'Rajasthan Royals', 'Lucknow Super Giants', 'Karnataka'],
  },
]

export const iplMatchTeams = {
  team1: {
    name: 'Royal Challengers Bengaluru',
    code: 'RCB',
    players: [
      { id: 'tp-1', name: 'Virat Kohli', role: 'Batsman' },
      { id: 'tp-2', name: 'Virat Kohli', role: 'Batsman' },
      { id: 'tp-3', name: 'Virat Kohli', role: 'Batsman' },
      { id: 'tp-4', name: 'Virat Kohli', role: 'Batsman' },
      { id: 'tp-5', name: 'Virat Kohli', role: 'Batsman' },
      { id: 'tp-6', name: 'Virat Kohli', role: 'Batsman' },
      { id: 'tp-7', name: 'Virat Kohli', role: 'Batsman' },
      { id: 'tp-8', name: 'Virat Kohli', role: 'Batsman' },
      { id: 'tp-9', name: 'Virat Kohli', role: 'Batsman' },
      { id: 'tp-10', name: 'Virat Kohli', role: 'Batsman' },
    ],
  },
  team2: {
    name: 'Sunrisers Hyderabad',
    code: 'SRH',
    players: [
      { id: 'tp-11', name: 'Player 1', role: 'Batsman, All-Rounder' },
      { id: 'tp-12', name: 'Player 1', role: 'Batsman' },
      { id: 'tp-13', name: 'Player 1', role: 'Batsman' },
      { id: 'tp-14', name: 'Player 1', role: 'Batsman' },
      { id: 'tp-15', name: 'Player 1', role: 'Batsman' },
      { id: 'tp-16', name: 'Player 1', role: 'Batsman' },
      { id: 'tp-17', name: 'Player 1', role: 'Batsman' },
      { id: 'tp-18', name: 'Player 1', role: 'Batsman' },
      { id: 'tp-19', name: 'Player 1', role: 'Batsman' },
      { id: 'tp-20', name: 'Player 1', role: 'Batsman' },
    ],
  },
}