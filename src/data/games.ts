// All times are Eastern Time (America/New_York)
// EST (UTC-5) Nov–Mar 8; EDT (UTC-4) Mar 8–Nov
// Year inferred from schedule: Dec 2025 – Jun 2026

export type Game = {
  awayTeam: string
  homeTeam: string
  time: string // ISO string (EST)
  awayTeamScore?: number
  homeTeamScore?: number
}

export const games: Game[] = [
  // December 2025
  {
    awayTeam: 'Slashing Pumpkins',
    homeTeam: 'Red Wings',
    time: '2025-12-07T21:45:00-05:00',
    awayTeamScore: 7,
    homeTeamScore: 3,
  },
  {
    awayTeam: 'Roccos',
    homeTeam: 'Slashing Pumpkins',
    time: '2025-12-14T23:00:00-05:00',
    awayTeamScore: 2,
    homeTeamScore: 2,
  },
  {
    awayTeam: 'Slashing Pumpkins',
    homeTeam: 'Hershey Beers',
    time: '2025-12-21T22:40:00-05:00',
    awayTeamScore: 2,
    homeTeamScore: 1,
  },

  // January 2026
  {
    awayTeam: 'Blue Dogs',
    homeTeam: 'Slashing Pumpkins',
    time: '2026-01-04T20:45:00-05:00',
    awayTeamScore: 2,
    homeTeamScore: 5,
  },
  {
    awayTeam: 'Slashing Pumpkins',
    homeTeam: 'Megalosaurus',
    time: '2026-01-11T20:55:00-05:00',
    awayTeamScore: 1,
    homeTeamScore: 5,
  },
  {
    awayTeam: 'Thunder',
    homeTeam: 'Slashing Pumpkins',
    time: '2026-01-18T16:55:00-05:00',
    awayTeamScore: 0,
    homeTeamScore: 0,
  },
  {
    awayTeam: 'Red Wings',
    homeTeam: 'Slashing Pumpkins',
    time: '2026-01-30T23:55:00-05:00',
    awayTeamScore: 3,
    homeTeamScore: 7,
  },

  // February 2026
  {
    awayTeam: 'Slashing Pumpkins',
    homeTeam: 'Roccos',
    time: '2026-02-14T22:40:00-05:00',
    awayTeamScore: 7,
    homeTeamScore: 1,
  },
  {
    awayTeam: 'Slashing Pumpkins',
    homeTeam: 'Blue Dogs',
    time: '2026-02-22T16:55:00-05:00',
    awayTeamScore: 4,
    homeTeamScore: 3,
  },

  // March 2026 (future – no scores)
  {
    awayTeam: 'Hershey Beers',
    homeTeam: 'Slashing Pumpkins',
    time: '2026-03-01T19:45:00-05:00',
  },
  {
    awayTeam: 'Slashing Pumpkins',
    homeTeam: 'Thunder',
    time: '2026-03-15T21:30:00-04:00',
  },
  {
    awayTeam: 'Blue Dogs',
    homeTeam: 'Slashing Pumpkins',
    time: '2026-03-28T23:55:00-04:00',
  },

  // April 2026
  {
    awayTeam: 'Slashing Pumpkins',
    homeTeam: 'Megalosaurus',
    time: '2026-04-03T23:30:00-04:00',
  },
  {
    awayTeam: 'Slashing Pumpkins',
    homeTeam: 'Red Wings',
    time: '2026-04-11T22:10:00-04:00',
  },
  {
    awayTeam: 'Thunder',
    homeTeam: 'Slashing Pumpkins',
    time: '2026-04-12T22:50:00-04:00',
  },
  {
    awayTeam: 'Roccos',
    homeTeam: 'Slashing Pumpkins',
    time: '2026-04-19T21:40:00-04:00',
  },
  {
    awayTeam: 'Slashing Pumpkins',
    homeTeam: 'Hershey Beers',
    time: '2026-04-25T23:30:00-04:00',
  },

  // May 2026
  {
    awayTeam: 'Thunder',
    homeTeam: 'Slashing Pumpkins',
    time: '2026-05-10T20:10:00-04:00',
  },
  {
    awayTeam: 'Red Wings',
    homeTeam: 'Slashing Pumpkins',
    time: '2026-05-24T20:10:00-04:00',
  },
  {
    awayTeam: 'Slashing Pumpkins',
    homeTeam: 'Roccos',
    time: '2026-05-31T22:50:00-04:00',
  },

  // June 2026
  {
    awayTeam: 'Megalosaurus',
    homeTeam: 'Slashing Pumpkins',
    time: '2026-06-07T09:30:00-04:00',
  },
]
