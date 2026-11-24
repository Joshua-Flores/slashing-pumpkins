// All times are Eastern Time (America/New_York)
// Winter season: Nov 2026 – Feb 2027, all EST (UTC-5)

export type Game = {
  awayTeam: string
  homeTeam: string
  time: string // ISO string (EST)
  awayTeamScore?: number
  homeTeamScore?: number
}

export const games: Game[] = [
  // November 2026
  {
    awayTeam: 'Slashing Pumpkins',
    homeTeam: 'Bottle Caps',
    time: '2026-11-28T17:20:00-05:00',
  },
  {
    awayTeam: 'Junkyard Dogs',
    homeTeam: 'Slashing Pumpkins',
    time: '2026-11-30T23:20:00-05:00',
  },

  // December 2026
  {
    awayTeam: 'Slashing Pumpkins',
    homeTeam: 'Alers',
    time: '2026-12-14T19:20:00-05:00',
  },
  {
    awayTeam: 'Lightning',
    homeTeam: 'Slashing Pumpkins',
    time: '2026-12-27T22:40:00-05:00',
  },

  // January 2027
  {
    awayTeam: 'Slashing Pumpkins',
    homeTeam: 'Megalosaurus',
    time: '2027-01-03T22:10:00-05:00',
  },
  {
    awayTeam: 'Mutiny',
    homeTeam: 'Slashing Pumpkins',
    time: '2027-01-18T19:00:00-05:00',
  },

  // February 2027
  {
    awayTeam: 'Bottle Caps',
    homeTeam: 'Slashing Pumpkins',
    time: '2027-02-07T07:00:00-05:00',
  },
  {
    awayTeam: 'Slashing Pumpkins',
    homeTeam: 'Junkyard Dogs',
    time: '2027-02-15T21:40:00-05:00',
  },
  {
    awayTeam: 'Alers',
    homeTeam: 'Slashing Pumpkins',
    time: '2027-02-20T22:40:00-05:00',
  },
  {
    awayTeam: 'Megalosaurus',
    homeTeam: 'Slashing Pumpkins',
    time: '2027-02-28T20:55:00-05:00',
  },
]

export const TEAM = 'Slashing Pumpkins'

export const getDate = (game: Game): Date => new Date(game.time)

export const isHomeGame = (game: Game): boolean => game.homeTeam === TEAM

export const getOpponent = (game: Game): string =>
  isHomeGame(game) ? game.awayTeam : game.homeTeam

export const isPlayed = (game: Game): boolean =>
  game.awayTeamScore !== undefined && game.homeTeamScore !== undefined
