// All times are Eastern Time (America/New_York)
// EST (UTC-5) Nov–Mar 8; EDT (UTC-4) Mar 8–Nov
// Year inferred from schedule: Jun 2026 – Aug 2026

export type Game = {
  awayTeam: string
  homeTeam: string
  time: string // ISO string (EST)
  awayTeamScore?: number
  homeTeamScore?: number
}

export const games: Game[] = [
  // June 2026
  {
    awayTeam: 'Cretaceous Puck',
    homeTeam: 'Slashing Pumpkins',
    time: '2026-06-29T22:40:00-04:00',
    awayTeamScore: 3,
    homeTeamScore: 1,
  },

  // July 2026
  {
    awayTeam: 'Slashing Pumpkins',
    homeTeam: 'Lightning',
    time: '2026-07-12T22:50:00-04:00',
    awayTeamScore: 5,
    homeTeamScore: 3,
  },
  {
    awayTeam: 'Junkyard Dogs',
    homeTeam: 'Slashing Pumpkins',
    time: '2026-07-20T20:00:00-04:00',
  },
  {
    awayTeam: 'Slashing Pumpkins',
    homeTeam: 'Alers',
    time: '2026-07-27T20:00:00-04:00',
  },

  // August 2026
  {
    awayTeam: 'Bottle Caps',
    homeTeam: 'Slashing Pumpkins',
    time: '2026-08-08T08:20:00-04:00',
  },
  {
    awayTeam: 'Slashing Pumpkins',
    homeTeam: 'Cretaceous Puck',
    time: '2026-08-17T21:40:00-04:00',
  },
  {
    awayTeam: 'Lightning',
    homeTeam: 'Slashing Pumpkins',
    time: '2026-08-23T09:40:00-04:00',
  },
  {
    awayTeam: 'Slashing Pumpkins',
    homeTeam: 'Junkyard Dogs',
    time: '2026-08-31T19:00:00-04:00',
  },
]

export const TEAM = 'Slashing Pumpkins'

export const getDate = (game: Game): Date => new Date(game.time)

export const isHomeGame = (game: Game): boolean => game.homeTeam === TEAM

export const getOpponent = (game: Game): string =>
  isHomeGame(game) ? game.awayTeam : game.homeTeam

export const isPlayed = (game: Game): boolean =>
  game.awayTeamScore !== undefined && game.homeTeamScore !== undefined
