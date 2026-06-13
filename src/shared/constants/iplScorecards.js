// iplScorecards.js – Complete scorecard data for all IPL matches

export const iplScorecards = [
  // Match 1: RCB vs SRH
 {
  slug: "rcb-vs-srh",
    series: "ipl-2026",
   
    venue: "Bengaluru, M.Chinnaswamy Stadium",
    date: "Sat, Mar 28 2026",
    time: "7:30 PM",
    toss: { winner: "Royal Challengers Bengaluru", decision: "bat" },
    result: "Royal Challengers Bengaluru won by 15 runs",
    playerOfTheMatch: "Virat Kohli",
    teams: {
      team1: {
        name: "Royal Challengers Bengaluru",
        code: "RCB",
        color: "#dc2626",
        innings: {
          inningsNumber: 1,
          total: "185/7",
          overs: "20.0",
          runRate: "9.25",
          batting: [
            {
              playerId: "p-1",
              name: "Virat Kohli",
              runs: 72,
              balls: 48,
              fours: 8,
              sixes: 3,
              strikeRate: 150.0,
              dismissal: "c Abhishek Sharma b Bhuvneshwar Kumar"
            },
            {
              playerId: "p-2",
              name: "Devdutt Padikkal",
              runs: 34,
              balls: 22,
              fours: 4,
              sixes: 1,
              strikeRate: 154.54,
              dismissal: "lbw b Pat Cummins"
            },
            {
              playerId: "p-3",
              name: "Glenn Maxwell",
              runs: 28,
              balls: 18,
              fours: 2,
              sixes: 2,
              strikeRate: 155.55,
              dismissal: "c Markram b Natarajan"
            },
            {
              playerId: "p-4",
              name: "AB de Villiers",
              runs: 19,
              balls: 12,
              fours: 1,
              sixes: 1,
              strikeRate: 158.33,
              dismissal: "c & b Rashid Khan"
            },
            {
              playerId: "p-5",
              name: "Shahbaz Ahmed",
              runs: 12,
              balls: 8,
              fours: 1,
              sixes: 0,
              strikeRate: 150.0,
              dismissal: "run out (Samad/†Saha)"
            },
            {
              playerId: "p-6",
              name: "Kyle Jamieson",
              runs: 9,
              balls: 6,
              fours: 0,
              sixes: 1,
              strikeRate: 150.0,
              dismissal: "not out"
            },
            {
              playerId: "p-7",
              name: "Harshal Patel",
              runs: 4,
              balls: 3,
              fours: 0,
              sixes: 0,
              strikeRate: 133.33,
              dismissal: "c Williamson b Natarajan"
            },
            {
              playerId: "p-8",
              name: "Yuzvendra Chahal",
              runs: 1,
              balls: 1,
              fours: 0,
              sixes: 0,
              strikeRate: 100.0,
              dismissal: "not out"
            }
          ],
          didNotBat: [],
          extras: { byes: 1, legByes: 2, wides: 3, noBalls: 0, penalty: 0, total: 6 },
          fallOfWickets: [
            { wicket: 1, score: 56, over: "6.2", batsman: "Devdutt Padikkal" },
            { wicket: 2, score: 112, over: "12.1", batsman: "Glenn Maxwell" },
            { wicket: 3, score: 148, over: "16.3", batsman: "Virat Kohli" },
            { wicket: 4, score: 165, over: "18.0", batsman: "AB de Villiers" },
            { wicket: 5, score: 169, over: "18.5", batsman: "Shahbaz Ahmed" },
            { wicket: 6, score: 178, over: "19.3", batsman: "Harshal Patel" }
          ],
          bowling: [
            { playerName: "Bhuvneshwar Kumar", overs: 4, maidens: 0, runs: 32, wickets: 1, noBalls: 0, wides: 2, economy: 8.0, dots: 12 },
            { playerName: "Pat Cummins", overs: 4, maidens: 0, runs: 45, wickets: 1, noBalls: 0, wides: 1, economy: 11.25, dots: 8 },
            { playerName: "T Natarajan", overs: 4, maidens: 0, runs: 38, wickets: 2, noBalls: 0, wides: 1, economy: 9.5, dots: 10 },
            { playerName: "Rashid Khan", overs: 4, maidens: 0, runs: 29, wickets: 1, noBalls: 0, wides: 0, economy: 7.25, dots: 14 },
            { playerName: "Vijay Shankar", overs: 2, maidens: 0, runs: 22, wickets: 0, noBalls: 0, wides: 1, economy: 11.0, dots: 4 },
            { playerName: "Abhishek Sharma", overs: 2, maidens: 0, runs: 14, wickets: 0, noBalls: 0, wides: 0, economy: 7.0, dots: 6 }
          ],
          powerplays: [{ name: "Mandatory", overs: "0.1 - 6", runs: 43 }],
          partnerships: [
            { wicket: 1, batsmen: "Virat Kohli / Devdutt Padikkal", runs: 56, balls: 38 },
            { wicket: 2, batsmen: "Virat Kohli / Glenn Maxwell", runs: 56, balls: 35 },
            { wicket: 3, batsmen: "Virat Kohli / AB de Villiers", runs: 36, balls: 25 },
            { wicket: 4, batsmen: "AB de Villiers / Shahbaz Ahmed", runs: 17, balls: 9 },
            { wicket: 5, batsmen: "Shahbaz Ahmed / Kyle Jamieson", runs: 4, balls: 3 },
            { wicket: 6, batsmen: "Kyle Jamieson / Harshal Patel", runs: 9, balls: 4 },
            { wicket: 7, batsmen: "Kyle Jamieson / Yuzvendra Chahal", runs: 7, balls: 4 }
          ]
        }
      },
      team2: {
        name: "Sunrisers Hyderabad",
        code: "SRH",
        color: "#f97316",
        innings: {
          inningsNumber: 2,
          total: "170/8",
          overs: "20.0",
          runRate: "8.5",
          batting: [
            {
              playerId: "p-9",
              name: "David Warner",
              runs: 45,
              balls: 30,
              fours: 5,
              sixes: 2,
              strikeRate: 150.0,
              dismissal: "c Kohli b Jamieson"
            },
            {
              playerId: "p-10",
              name: "Wriddhiman Saha",
              runs: 12,
              balls: 9,
              fours: 2,
              sixes: 0,
              strikeRate: 133.33,
              dismissal: "lbw b Chahal"
            },
            {
              playerId: "p-11",
              name: "Kane Williamson",
              runs: 28,
              balls: 22,
              fours: 3,
              sixes: 0,
              strikeRate: 127.27,
              dismissal: "c de Villiers b Harshal"
            },
            {
              playerId: "p-12",
              name: "Manish Pandey",
              runs: 19,
              balls: 15,
              fours: 2,
              sixes: 0,
              strikeRate: 126.67,
              dismissal: "c Padikkal b Jamieson"
            },
            {
              playerId: "p-13",
              name: "Vijay Shankar",
              runs: 15,
              balls: 12,
              fours: 1,
              sixes: 1,
              strikeRate: 125.0,
              dismissal: "c Maxwell b Chahal"
            },
            {
              playerId: "p-14",
              name: "Abhishek Sharma",
              runs: 22,
              balls: 14,
              fours: 2,
              sixes: 1,
              strikeRate: 157.14,
              dismissal: "c Kohli b Harshal"
            },
            {
              playerId: "p-15",
              name: "Rashid Khan",
              runs: 12,
              balls: 7,
              fours: 1,
              sixes: 1,
              strikeRate: 171.43,
              dismissal: "not out"
            },
            {
              playerId: "p-16",
              name: "Pat Cummins",
              runs: 4,
              balls: 3,
              fours: 0,
              sixes: 0,
              strikeRate: 133.33,
              dismissal: "run out (Maxwell)"
            },
            {
              playerId: "p-17",
              name: "Bhuvneshwar Kumar",
              runs: 3,
              balls: 2,
              fours: 0,
              sixes: 0,
              strikeRate: 150.0,
              dismissal: "not out"
            }
          ],
          didNotBat: ["T Natarajan"],
          extras: { byes: 0, legByes: 1, wides: 4, noBalls: 1, penalty: 0, total: 6 },
          fallOfWickets: [
            { wicket: 1, score: 38, over: "4.3", batsman: "Wriddhiman Saha" },
            { wicket: 2, score: 81, over: "9.2", batsman: "Kane Williamson" },
            { wicket: 3, score: 98, over: "11.5", batsman: "David Warner" },
            { wicket: 4, score: 118, over: "14.1", batsman: "Manish Pandey" },
            { wicket: 5, score: 132, over: "15.4", batsman: "Vijay Shankar" },
            { wicket: 6, score: 158, over: "18.2", batsman: "Abhishek Sharma" },
            { wicket: 7, score: 165, over: "19.1", batsman: "Pat Cummins" }
          ],
          bowling: [
            { playerName: "Kyle Jamieson", overs: 4, maidens: 0, runs: 32, wickets: 2, noBalls: 0, wides: 1, economy: 8.0, dots: 12 },
            { playerName: "Harshal Patel", overs: 4, maidens: 0, runs: 39, wickets: 2, noBalls: 0, wides: 2, economy: 9.75, dots: 10 },
            { playerName: "Yuzvendra Chahal", overs: 4, maidens: 0, runs: 28, wickets: 2, noBalls: 0, wides: 1, economy: 7.0, dots: 14 },
            { playerName: "Shahbaz Ahmed", overs: 3, maidens: 0, runs: 24, wickets: 0, noBalls: 0, wides: 1, economy: 8.0, dots: 8 },
            { playerName: "Glenn Maxwell", overs: 3, maidens: 0, runs: 27, wickets: 0, noBalls: 0, wides: 0, economy: 9.0, dots: 6 },
            { playerName: "Mohammed Siraj", overs: 2, maidens: 0, runs: 18, wickets: 0, noBalls: 1, wides: 0, economy: 9.0, dots: 4 }
          ],
          powerplays: [{ name: "Mandatory", overs: "0.1 - 6", runs: 46 }],
          partnerships: [
            { wicket: 1, batsmen: "David Warner / Wriddhiman Saha", runs: 38, balls: 27 },
            { wicket: 2, batsmen: "David Warner / Kane Williamson", runs: 43, balls: 29 },
            { wicket: 3, batsmen: "David Warner / Manish Pandey", runs: 17, balls: 15 },
            { wicket: 4, batsmen: "Manish Pandey / Vijay Shankar", runs: 20, balls: 14 },
            { wicket: 5, batsmen: "Vijay Shankar / Abhishek Sharma", runs: 14, balls: 9 },
            { wicket: 6, batsmen: "Abhishek Sharma / Rashid Khan", runs: 26, balls: 16 },
            { wicket: 7, batsmen: "Rashid Khan / Pat Cummins", runs: 7, balls: 5 },
            { wicket: 8, batsmen: "Rashid Khan / Bhuvneshwar Kumar", runs: 5, balls: 3 }
          ]
        }
      }
    }
  },

  // Match 2: MI vs CSK
  {
  slug: "mi-vs-csk",
    series: "ipl-2026",
   
    venue: "Mumbai, Wankhede Stadium",
    date: "Sun, Mar 29 2026",
    time: "7:30 PM",
    toss: { winner: "Mumbai Indians", decision: "bat" },
    result: "Mumbai Indians won by 8 runs",
    playerOfTheMatch: "Rohit Sharma",
    teams: {
      team1: {
        name: "Mumbai Indians",
        code: "MI",
        color: "#1e40af",
        innings: {
          inningsNumber: 1,
          total: "198/5",
          overs: "20.0",
          runRate: "9.90",
          batting: [
            {
              playerId: "mi-1",
              name: "Rohit Sharma",
              runs: 65,
              balls: 42,
              fours: 7,
              sixes: 3,
              strikeRate: 154.76,
              dismissal: "c Dhoni b Chahar"
            },
            {
              playerId: "mi-2",
              name: "Ishan Kishan",
              runs: 48,
              balls: 30,
              fours: 5,
              sixes: 2,
              strikeRate: 160.0,
              dismissal: "lbw b Jadeja"
            },
            {
              playerId: "mi-3",
              name: "Suryakumar Yadav",
              runs: 36,
              balls: 22,
              fours: 3,
              sixes: 2,
              strikeRate: 163.63,
              dismissal: "c Rayudu b Santner"
            },
            {
              playerId: "mi-4",
              name: "Hardik Pandya",
              runs: 27,
              balls: 14,
              fours: 2,
              sixes: 2,
              strikeRate: 192.85,
              dismissal: "c Gaikwad b Bravo"
            },
            {
              playerId: "mi-5",
              name: "Kieron Pollard",
              runs: 15,
              balls: 8,
              fours: 1,
              sixes: 1,
              strikeRate: 187.5,
              dismissal: "not out"
            },
            {
              playerId: "mi-6",
              name: "Tim David",
              runs: 4,
              balls: 2,
              fours: 0,
              sixes: 0,
              strikeRate: 200.0,
              dismissal: "run out (Conway)"
            },
            {
              playerId: "mi-7",
              name: "Jasprit Bumrah",
              runs: 2,
              balls: 2,
              fours: 0,
              sixes: 0,
              strikeRate: 100.0,
              dismissal: "not out"
            }
          ],
          didNotBat: ["Trent Boult", "Rahul Chahar", "Jayant Yadav"],
          extras: { byes: 0, legByes: 1, wides: 4, noBalls: 0, penalty: 0, total: 5 },
          fallOfWickets: [
            { wicket: 1, score: 97, over: "10.1", batsman: "Ishan Kishan" },
            { wicket: 2, score: 128, over: "13.3", batsman: "Rohit Sharma" },
            { wicket: 3, score: 174, over: "17.2", batsman: "Suryakumar Yadav" },
            { wicket: 4, score: 186, over: "18.4", batsman: "Hardik Pandya" },
            { wicket: 5, score: 192, over: "19.2", batsman: "Tim David" }
          ],
          bowling: [
            { playerName: "Deepak Chahar", overs: 4, maidens: 0, runs: 38, wickets: 1, noBalls: 0, wides: 1, economy: 9.5, dots: 9 },
            { playerName: "Ravindra Jadeja", overs: 4, maidens: 0, runs: 42, wickets: 1, noBalls: 0, wides: 1, economy: 10.5, dots: 7 },
            { playerName: "Mitchell Santner", overs: 4, maidens: 0, runs: 35, wickets: 1, noBalls: 0, wides: 0, economy: 8.75, dots: 11 },
            { playerName: "Dwayne Bravo", overs: 4, maidens: 0, runs: 44, wickets: 1, noBalls: 0, wides: 2, economy: 11.0, dots: 6 },
            { playerName: "Moeen Ali", overs: 2, maidens: 0, runs: 20, wickets: 0, noBalls: 0, wides: 0, economy: 10.0, dots: 4 },
            { playerName: "Shardul Thakur", overs: 2, maidens: 0, runs: 18, wickets: 0, noBalls: 0, wides: 0, economy: 9.0, dots: 5 }
          ],
          powerplays: [{ name: "Mandatory", overs: "0.1 - 6", runs: 52 }],
          partnerships: [
            { wicket: 1, batsmen: "Rohit Sharma / Ishan Kishan", runs: 97, balls: 61 },
            { wicket: 2, batsmen: "Rohit Sharma / Suryakumar Yadav", runs: 31, balls: 20 },
            { wicket: 3, batsmen: "Suryakumar Yadav / Hardik Pandya", runs: 46, balls: 23 },
            { wicket: 4, batsmen: "Hardik Pandya / Kieron Pollard", runs: 12, balls: 8 },
            { wicket: 5, batsmen: "Kieron Pollard / Tim David", runs: 6, balls: 4 },
            { wicket: 6, batsmen: "Kieron Pollard / Jasprit Bumrah", runs: 6, balls: 2 }
          ]
        }
      },
      team2: {
        name: "Chennai Super Kings",
        code: "CSK",
        color: "#fbbf24",
        innings: {
          inningsNumber: 2,
          total: "190/7",
          overs: "20.0",
          runRate: "9.50",
          batting: [
            {
              playerId: "csk-1",
              name: "Ruturaj Gaikwad",
              runs: 52,
              balls: 38,
              fours: 5,
              sixes: 2,
              strikeRate: 136.84,
              dismissal: "c Kishan b Boult"
            },
            {
              playerId: "csk-2",
              name: "Devon Conway",
              runs: 41,
              balls: 30,
              fours: 4,
              sixes: 1,
              strikeRate: 136.66,
              dismissal: "c Pollard b Bumrah"
            },
            {
              playerId: "csk-3",
              name: "Moeen Ali",
              runs: 27,
              balls: 18,
              fours: 2,
              sixes: 2,
              strikeRate: 150.0,
              dismissal: "c David b Rahul Chahar"
            },
            {
              playerId: "csk-4",
              name: "Ambati Rayudu",
              runs: 23,
              balls: 14,
              fours: 2,
              sixes: 1,
              strikeRate: 164.28,
              dismissal: "c Yadav b Jayant Yadav"
            },
            {
              playerId: "csk-5",
              name: "MS Dhoni",
              runs: 19,
              balls: 10,
              fours: 1,
              sixes: 2,
              strikeRate: 190.0,
              dismissal: "c Bumrah b Hardik Pandya"
            },
            {
              playerId: "csk-6",
              name: "Ravindra Jadeja",
              runs: 12,
              balls: 6,
              fours: 1,
              sixes: 1,
              strikeRate: 200.0,
              dismissal: "not out"
            },
            {
              playerId: "csk-7",
              name: "Dwayne Bravo",
              runs: 8,
              balls: 4,
              fours: 1,
              sixes: 0,
              strikeRate: 200.0,
              dismissal: "c & b Bumrah"
            },
            {
              playerId: "csk-8",
              name: "Shardul Thakur",
              runs: 4,
              balls: 2,
              fours: 0,
              sixes: 0,
              strikeRate: 200.0,
              dismissal: "not out"
            }
          ],
          didNotBat: ["Deepak Chahar", "Mitchell Santner"],
          extras: { byes: 1, legByes: 2, wides: 3, noBalls: 0, penalty: 0, total: 6 },
          fallOfWickets: [
            { wicket: 1, score: 78, over: "9.1", batsman: "Devon Conway" },
            { wicket: 2, score: 113, over: "12.5", batsman: "Ruturaj Gaikwad" },
            { wicket: 3, score: 139, over: "15.2", batsman: "Moeen Ali" },
            { wicket: 4, score: 155, over: "16.4", batsman: "Ambati Rayudu" },
            { wicket: 5, score: 173, over: "18.1", batsman: "MS Dhoni" },
            { wicket: 6, score: 182, over: "19.1", batsman: "Dwayne Bravo" }
          ],
          bowling: [
            { playerName: "Trent Boult", overs: 4, maidens: 0, runs: 42, wickets: 1, noBalls: 0, wides: 1, economy: 10.5, dots: 8 },
            { playerName: "Jasprit Bumrah", overs: 4, maidens: 0, runs: 35, wickets: 2, noBalls: 0, wides: 1, economy: 8.75, dots: 11 },
            { playerName: "Rahul Chahar", overs: 4, maidens: 0, runs: 38, wickets: 1, noBalls: 0, wides: 0, economy: 9.5, dots: 9 },
            { playerName: "Jayant Yadav", overs: 3, maidens: 0, runs: 29, wickets: 1, noBalls: 0, wides: 1, economy: 9.66, dots: 6 },
            { playerName: "Hardik Pandya", overs: 3, maidens: 0, runs: 27, wickets: 1, noBalls: 0, wides: 0, economy: 9.0, dots: 7 },
            { playerName: "Kieron Pollard", overs: 2, maidens: 0, runs: 16, wickets: 0, noBalls: 0, wides: 0, economy: 8.0, dots: 5 }
          ],
          powerplays: [{ name: "Mandatory", overs: "0.1 - 6", runs: 44 }],
          partnerships: [
            { wicket: 1, batsmen: "Ruturaj Gaikwad / Devon Conway", runs: 78, balls: 55 },
            { wicket: 2, batsmen: "Ruturaj Gaikwad / Moeen Ali", runs: 35, balls: 22 },
            { wicket: 3, batsmen: "Moeen Ali / Ambati Rayudu", runs: 26, balls: 15 },
            { wicket: 4, batsmen: "Ambati Rayudu / MS Dhoni", runs: 16, balls: 9 },
            { wicket: 5, batsmen: "MS Dhoni / Ravindra Jadeja", runs: 18, balls: 9 },
            { wicket: 6, batsmen: "Ravindra Jadeja / Dwayne Bravo", runs: 9, balls: 4 },
            { wicket: 7, batsmen: "Ravindra Jadeja / Shardul Thakur", runs: 8, balls: 2 }
          ]
        }
      }
    }
  },

  // Match 3: KKR vs DC
{
   slug: "kkr-vs-dc",
    series: "ipl-2026",
    venue: "Kolkata, Eden Gardens",
    date: "Mon, Mar 30 2026",
    time: "7:30 PM",
    toss: { winner: "Delhi Capitals", decision: "bowl" },
    result: "Delhi Capitals won by 6 wickets (with 8 balls remaining)",
    playerOfTheMatch: "Rishabh Pant",
    teams: {
      team1: {
        name: "Kolkata Knight Riders",
        code: "KKR",
        color: "#7c3aed",
        innings: {
          inningsNumber: 1,
          total: "162/9",
          overs: "20.0",
          runRate: "8.10",
          batting: [
            {
              playerId: "kkr-1",
              name: "Venkatesh Iyer",
              runs: 38,
              balls: 28,
              fours: 4,
              sixes: 1,
              strikeRate: 135.71,
              dismissal: "c Dhawan b Avesh Khan"
            },
            {
              playerId: "kkr-2",
              name: "Shreyas Iyer",
              runs: 44,
              balls: 32,
              fours: 5,
              sixes: 1,
              strikeRate: 137.5,
              dismissal: "b Nortje"
            },
            {
              playerId: "kkr-3",
              name: "Nitish Rana",
              runs: 22,
              balls: 16,
              fours: 2,
              sixes: 1,
              strikeRate: 137.5,
              dismissal: "c Pant b Axar"
            },
            {
              playerId: "kkr-4",
              name: "Andre Russell",
              runs: 19,
              balls: 12,
              fours: 1,
              sixes: 2,
              strikeRate: 158.33,
              dismissal: "c Shaw b Nortje"
            },
            {
              playerId: "kkr-5",
              name: "Rinku Singh",
              runs: 12,
              balls: 9,
              fours: 1,
              sixes: 0,
              strikeRate: 133.33,
              dismissal: "c Marsh b Avesh Khan"
            },
            {
              playerId: "kkr-6",
              name: "Sunil Narine",
              runs: 9,
              balls: 6,
              fours: 1,
              sixes: 0,
              strikeRate: 150.0,
              dismissal: "c & b Kuldeep"
            },
            {
              playerId: "kkr-7",
              name: "Pat Cummins",
              runs: 8,
              balls: 5,
              fours: 1,
              sixes: 0,
              strikeRate: 160.0,
              dismissal: "c Dhawan b Axar"
            },
            {
              playerId: "kkr-8",
              name: "Varun Chakravarthy",
              runs: 3,
              balls: 3,
              fours: 0,
              sixes: 0,
              strikeRate: 100.0,
              dismissal: "run out (Nortje)"
            },
            {
              playerId: "kkr-9",
              name: "Shivam Mavi",
              runs: 1,
              balls: 2,
              fours: 0,
              sixes: 0,
              strikeRate: 50.0,
              dismissal: "not out"
            },
            {
              playerId: "kkr-10",
              name: "Umesh Yadav",
              runs: 0,
              balls: 1,
              fours: 0,
              sixes: 0,
              strikeRate: 0,
              dismissal: "run out (Pant)"
            }
          ],
          didNotBat: ["Tim Southee"],
          extras: { byes: 0, legByes: 2, wides: 5, noBalls: 0, penalty: 0, total: 7 },
          fallOfWickets: [
            { wicket: 1, score: 68, over: "7.3", batsman: "Venkatesh Iyer" },
            { wicket: 2, score: 92, over: "10.2", batsman: "Nitish Rana" },
            { wicket: 3, score: 112, over: "12.5", batsman: "Shreyas Iyer" },
            { wicket: 4, score: 132, over: "14.4", batsman: "Andre Russell" },
            { wicket: 5, score: 143, over: "16.1", batsman: "Rinku Singh" },
            { wicket: 6, score: 151, over: "17.0", batsman: "Sunil Narine" },
            { wicket: 7, score: 159, over: "18.2", batsman: "Pat Cummins" },
            { wicket: 8, score: 162, over: "19.1", batsman: "Varun Chakravarthy" },
            { wicket: 9, score: 162, over: "19.4", batsman: "Umesh Yadav" }
          ],
          bowling: [
            { playerName: "Anrich Nortje", overs: 4, maidens: 0, runs: 32, wickets: 2, noBalls: 0, wides: 1, economy: 8.0, dots: 11 },
            { playerName: "Avesh Khan", overs: 4, maidens: 0, runs: 38, wickets: 2, noBalls: 0, wides: 2, economy: 9.5, dots: 9 },
            { playerName: "Axar Patel", overs: 4, maidens: 0, runs: 28, wickets: 2, noBalls: 0, wides: 0, economy: 7.0, dots: 13 },
            { playerName: "Kuldeep Yadav", overs: 4, maidens: 0, runs: 34, wickets: 1, noBalls: 0, wides: 1, economy: 8.5, dots: 10 },
            { playerName: "Lalit Yadav", overs: 2, maidens: 0, runs: 18, wickets: 0, noBalls: 0, wides: 0, economy: 9.0, dots: 5 },
            { playerName: "Mitchell Marsh", overs: 2, maidens: 0, runs: 15, wickets: 0, noBalls: 0, wides: 1, economy: 7.5, dots: 6 }
          ],
          powerplays: [{ name: "Mandatory", overs: "0.1 - 6", runs: 49 }],
          partnerships: [
            { wicket: 1, batsmen: "Venkatesh Iyer / Shreyas Iyer", runs: 68, balls: 45 },
            { wicket: 2, batsmen: "Shreyas Iyer / Nitish Rana", runs: 24, balls: 17 },
            { wicket: 3, batsmen: "Shreyas Iyer / Andre Russell", runs: 20, balls: 15 },
            { wicket: 4, batsmen: "Andre Russell / Rinku Singh", runs: 20, balls: 11 },
            { wicket: 5, batsmen: "Rinku Singh / Sunil Narine", runs: 11, balls: 9 },
            { wicket: 6, batsmen: "Sunil Narine / Pat Cummins", runs: 8, balls: 5 },
            { wicket: 7, batsmen: "Pat Cummins / Varun Chakravarthy", runs: 8, balls: 7 },
            { wicket: 8, batsmen: "Varun Chakravarthy / Shivam Mavi", runs: 3, balls: 3 },
            { wicket: 9, batsmen: "Shivam Mavi / Umesh Yadav", runs: 0, balls: 2 }
          ]
        }
      },
      team2: {
        name: "Delhi Capitals",
        code: "DC",
        color: "#ef4444",
        innings: {
          inningsNumber: 2,
          total: "163/4",
          overs: "18.4",
          runRate: "8.73",
          batting: [
            {
              playerId: "dc-1",
              name: "Prithvi Shaw",
              runs: 28,
              balls: 19,
              fours: 3,
              sixes: 2,
              strikeRate: 147.36,
              dismissal: "c Rinku b Mavi"
            },
            {
              playerId: "dc-2",
              name: "David Warner",
              runs: 41,
              balls: 29,
              fours: 5,
              sixes: 1,
              strikeRate: 141.37,
              dismissal: "c Venkatesh b Russell"
            },
            {
              playerId: "dc-3",
              name: "Rishabh Pant",
              runs: 52,
              balls: 33,
              fours: 4,
              sixes: 3,
              strikeRate: 157.57,
              dismissal: "not out"
            },
            {
              playerId: "dc-4",
              name: "Mitchell Marsh",
              runs: 21,
              balls: 14,
              fours: 2,
              sixes: 1,
              strikeRate: 150.0,
              dismissal: "c Venkatesh b Russell"
            },
            {
              playerId: "dc-5",
              name: "Axar Patel",
              runs: 14,
              balls: 9,
              fours: 1,
              sixes: 1,
              strikeRate: 155.55,
              dismissal: "c Iyer b Varun"
            },
            {
              playerId: "dc-6",
              name: "Lalit Yadav",
              runs: 2,
              balls: 4,
              fours: 0,
              sixes: 0,
              strikeRate: 50.0,
              dismissal: "not out"
            }
          ],
          didNotBat: ["Shardul Thakur", "Kuldeep Yadav", "Anrich Nortje", "Avesh Khan"],
          extras: { byes: 1, legByes: 2, wides: 3, noBalls: 0, penalty: 0, total: 6 },
          fallOfWickets: [
            { wicket: 1, score: 46, over: "5.2", batsman: "Prithvi Shaw" },
            { wicket: 2, score: 89, over: "10.1", batsman: "David Warner" },
            { wicket: 3, score: 136, over: "15.0", batsman: "Mitchell Marsh" },
            { wicket: 4, score: 159, over: "17.4", batsman: "Axar Patel" }
          ],
          bowling: [
            { playerName: "Shivam Mavi", overs: 3, maidens: 0, runs: 27, wickets: 1, noBalls: 0, wides: 1, economy: 9.0, dots: 8 },
            { playerName: "Umesh Yadav", overs: 3, maidens: 0, runs: 31, wickets: 0, noBalls: 0, wides: 1, economy: 10.33, dots: 6 },
            { playerName: "Pat Cummins", overs: 3, maidens: 0, runs: 28, wickets: 0, noBalls: 0, wides: 0, economy: 9.33, dots: 7 },
            { playerName: "Andre Russell", overs: 4, maidens: 0, runs: 32, wickets: 2, noBalls: 0, wides: 1, economy: 8.0, dots: 11 },
            { playerName: "Varun Chakravarthy", overs: 3.4, maidens: 0, runs: 25, wickets: 1, noBalls: 0, wides: 0, economy: 6.81, dots: 12 },
            { playerName: "Sunil Narine", overs: 2, maidens: 0, runs: 17, wickets: 0, noBalls: 0, wides: 0, economy: 8.5, dots: 5 }
          ],
          powerplays: [{ name: "Mandatory", overs: "0.1 - 6", runs: 51 }],
          partnerships: [
            { wicket: 1, batsmen: "Prithvi Shaw / David Warner", runs: 46, balls: 32 },
            { wicket: 2, batsmen: "David Warner / Rishabh Pant", runs: 43, balls: 29 },
            { wicket: 3, batsmen: "Rishabh Pant / Mitchell Marsh", runs: 47, balls: 29 },
            { wicket: 4, batsmen: "Rishabh Pant / Axar Patel", runs: 23, balls: 16 },
            { wicket: 5, batsmen: "Rishabh Pant / Lalit Yadav", runs: 4, balls: 7 }
          ]
        }
      }
    }
  },

  // Match 4: PBKS vs RR
{
     slug: "pbks-vs-rr",
    series: "ipl-2026",
    venue: "Mohali, PCA Stadium",
    date: "Tue, Mar 31 2026",
    time: "7:30 PM",
    toss: { winner: "Rajasthan Royals", decision: "bowl" },
    result: "Rajasthan Royals won by 5 wickets (with 10 balls remaining)",
    playerOfTheMatch: "Sanju Samson",
    teams: {
      team1: {
        name: "Punjab Kings",
        code: "PBKS",
        color: "#dc2626",
        innings: {
          inningsNumber: 1,
          total: "175/6",
          overs: "20.0",
          runRate: "8.75",
          batting: [
            {
              playerId: "pbks-1",
              name: "Shikhar Dhawan",
              runs: 49,
              balls: 35,
              fours: 6,
              sixes: 1,
              strikeRate: 140.0,
              dismissal: "c Hetmyer b Ashwin"
            },
            {
              playerId: "pbks-2",
              name: "Jonny Bairstow",
              runs: 28,
              balls: 19,
              fours: 3,
              sixes: 1,
              strikeRate: 147.36,
              dismissal: "c Jaiswal b Prasidh"
            },
            {
              playerId: "pbks-3",
              name: "Liam Livingstone",
              runs: 38,
              balls: 24,
              fours: 2,
              sixes: 3,
              strikeRate: 158.33,
              dismissal: "c Buttler b Boult"
            },
            {
              playerId: "pbks-4",
              name: "Shahrukh Khan",
              runs: 21,
              balls: 14,
              fours: 2,
              sixes: 1,
              strikeRate: 150.0,
              dismissal: "c & b Ashwin"
            },
            {
              playerId: "pbks-5",
              name: "Jitesh Sharma",
              runs: 18,
              balls: 11,
              fours: 1,
              sixes: 1,
              strikeRate: 163.63,
              dismissal: "not out"
            },
            {
              playerId: "pbks-6",
              name: "Kagiso Rabada",
              runs: 12,
              balls: 7,
              fours: 0,
              sixes: 1,
              strikeRate: 171.42,
              dismissal: "c Samson b Prasidh"
            },
            {
              playerId: "pbks-7",
              name: "Rishi Dhawan",
              runs: 5,
              balls: 4,
              fours: 0,
              sixes: 0,
              strikeRate: 125.0,
              dismissal: "c Hetmyer b Boult"
            },
            {
              playerId: "pbks-8",
              name: "Harpreet Brar",
              runs: 2,
              balls: 2,
              fours: 0,
              sixes: 0,
              strikeRate: 100.0,
              dismissal: "not out"
            }
          ],
          didNotBat: ["Arshdeep Singh", "Rahul Chahar"],
          extras: { byes: 0, legByes: 1, wides: 2, noBalls: 0, penalty: 0, total: 3 },
          fallOfWickets: [
            { wicket: 1, score: 56, over: "6.1", batsman: "Jonny Bairstow" },
            { wicket: 2, score: 106, over: "11.3", batsman: "Shikhar Dhawan" },
            { wicket: 3, score: 127, over: "14.0", batsman: "Liam Livingstone" },
            { wicket: 4, score: 153, over: "16.4", batsman: "Shahrukh Khan" },
            { wicket: 5, score: 169, over: "18.2", batsman: "Kagiso Rabada" },
            { wicket: 6, score: 173, over: "19.1", batsman: "Rishi Dhawan" }
          ],
          bowling: [
            { playerName: "Trent Boult", overs: 4, maidens: 0, runs: 34, wickets: 2, noBalls: 0, wides: 1, economy: 8.5, dots: 10 },
            { playerName: "Prasidh Krishna", overs: 4, maidens: 0, runs: 40, wickets: 2, noBalls: 0, wides: 0, economy: 10.0, dots: 8 },
            { playerName: "Ravichandran Ashwin", overs: 4, maidens: 0, runs: 35, wickets: 2, noBalls: 0, wides: 1, economy: 8.75, dots: 11 },
            { playerName: "Yuzvendra Chahal", overs: 4, maidens: 0, runs: 38, wickets: 0, noBalls: 0, wides: 0, economy: 9.5, dots: 9 },
            { playerName: "Navdeep Saini", overs: 2, maidens: 0, runs: 16, wickets: 0, noBalls: 0, wides: 0, economy: 8.0, dots: 5 },
            { playerName: "Riyan Parag", overs: 2, maidens: 0, runs: 12, wickets: 0, noBalls: 0, wides: 0, economy: 6.0, dots: 7 }
          ],
          powerplays: [{ name: "Mandatory", overs: "0.1 - 6", runs: 48 }],
          partnerships: [
            { wicket: 1, batsmen: "Shikhar Dhawan / Jonny Bairstow", runs: 56, balls: 37 },
            { wicket: 2, batsmen: "Shikhar Dhawan / Liam Livingstone", runs: 50, balls: 32 },
            { wicket: 3, batsmen: "Liam Livingstone / Shahrukh Khan", runs: 21, balls: 15 },
            { wicket: 4, batsmen: "Shahrukh Khan / Jitesh Sharma", runs: 26, balls: 16 },
            { wicket: 5, batsmen: "Jitesh Sharma / Kagiso Rabada", runs: 16, balls: 10 },
            { wicket: 6, batsmen: "Jitesh Sharma / Rishi Dhawan", runs: 4, balls: 3 },
            { wicket: 7, batsmen: "Jitesh Sharma / Harpreet Brar", runs: 2, balls: 2 }
          ]
        }
      },
      team2: {
        name: "Rajasthan Royals",
        code: "RR",
        color: "#fbbf24",
        innings: {
          inningsNumber: 2,
          total: "176/5",
          overs: "18.2",
          runRate: "9.60",
          batting: [
            {
              playerId: "rr-1",
              name: "Jos Buttler",
              runs: 32,
              balls: 21,
              fours: 4,
              sixes: 1,
              strikeRate: 152.38,
              dismissal: "c Jitesh b Rabada"
            },
            {
              playerId: "rr-2",
              name: "Yashasvi Jaiswal",
              runs: 24,
              balls: 18,
              fours: 3,
              sixes: 0,
              strikeRate: 133.33,
              dismissal: "c Dhawan b Arshdeep"
            },
            {
              playerId: "rr-3",
              name: "Sanju Samson",
              runs: 58,
              balls: 34,
              fours: 5,
              sixes: 3,
              strikeRate: 170.58,
              dismissal: "c Livingstone b Rishi Dhawan"
            },
            {
              playerId: "rr-4",
              name: "Shimron Hetmyer",
              runs: 27,
              balls: 16,
              fours: 2,
              sixes: 2,
              strikeRate: 168.75,
              dismissal: "c Jitesh b Rahul Chahar"
            },
            {
              playerId: "rr-5",
              name: "Riyan Parag",
              runs: 18,
              balls: 11,
              fours: 1,
              sixes: 1,
              strikeRate: 163.63,
              dismissal: "not out"
            },
            {
              playerId: "rr-6",
              name: "Ravichandran Ashwin",
              runs: 11,
              balls: 7,
              fours: 1,
              sixes: 0,
              strikeRate: 157.14,
              dismissal: "c Rabada b Rishi Dhawan"
            },
            {
              playerId: "rr-7",
              name: "Trent Boult",
              runs: 2,
              balls: 2,
              fours: 0,
              sixes: 0,
              strikeRate: 100.0,
              dismissal: "not out"
            }
          ],
          didNotBat: ["Prasidh Krishna", "Yuzvendra Chahal", "Navdeep Saini"],
          extras: { byes: 1, legByes: 2, wides: 3, noBalls: 0, penalty: 0, total: 6 },
          fallOfWickets: [
            { wicket: 1, score: 44, over: "5.1", batsman: "Yashasvi Jaiswal" },
            { wicket: 2, score: 71, over: "8.3", batsman: "Jos Buttler" },
            { wicket: 3, score: 128, over: "13.4", batsman: "Sanju Samson" },
            { wicket: 4, score: 155, over: "16.1", batsman: "Shimron Hetmyer" },
            { wicket: 5, score: 173, over: "17.5", batsman: "Ravichandran Ashwin" }
          ],
          bowling: [
            { playerName: "Kagiso Rabada", overs: 4, maidens: 0, runs: 38, wickets: 1, noBalls: 0, wides: 1, economy: 9.5, dots: 9 },
            { playerName: "Arshdeep Singh", overs: 4, maidens: 0, runs: 35, wickets: 1, noBalls: 0, wides: 1, economy: 8.75, dots: 11 },
            { playerName: "Rahul Chahar", overs: 4, maidens: 0, runs: 42, wickets: 1, noBalls: 0, wides: 0, economy: 10.5, dots: 7 },
            { playerName: "Rishi Dhawan", overs: 3, maidens: 0, runs: 27, wickets: 2, noBalls: 0, wides: 1, economy: 9.0, dots: 8 },
            { playerName: "Harpreet Brar", overs: 2, maidens: 0, runs: 17, wickets: 0, noBalls: 0, wides: 0, economy: 8.5, dots: 5 },
            { playerName: "Liam Livingstone", overs: 1.2, maidens: 0, runs: 14, wickets: 0, noBalls: 0, wides: 0, economy: 10.5, dots: 2 }
          ],
          powerplays: [{ name: "Mandatory", overs: "0.1 - 6", runs: 45 }],
          partnerships: [
            { wicket: 1, batsmen: "Jos Buttler / Yashasvi Jaiswal", runs: 44, balls: 31 },
            { wicket: 2, batsmen: "Jos Buttler / Sanju Samson", runs: 27, balls: 20 },
            { wicket: 3, batsmen: "Sanju Samson / Shimron Hetmyer", runs: 57, balls: 31 },
            { wicket: 4, batsmen: "Shimron Hetmyer / Riyan Parag", runs: 27, balls: 15 },
            { wicket: 5, batsmen: "Riyan Parag / Ravichandran Ashwin", runs: 18, balls: 10 },
            { wicket: 6, batsmen: "Riyan Parag / Trent Boult", runs: 3, balls: 2 }
          ]
        }
      }
    }
  }
];