export type Game = {
  date: Date
  opponent: string
  score?: {
    slashingPumpkins: number
    opponent: number
  }
}

export const games: Game[] = [
  {
    date: new Date('2025-12-07T21:45:00-05:00'),
    opponent: 'Red Wings',
    score: {
      slashingPumpkins: 7,
      opponent: 3,
    },
  },
  {
    date: new Date('2025-12-14T23:00:00-05:00'),
    opponent: 'Roccos',
    score: {
      slashingPumpkins: 2,
      opponent: 2,
    },
  },
  {
    date: new Date('2025-12-21T22:40:00-05:00'),
    opponent: 'Hershey Beers',
    score: {
      slashingPumpkins: 2,
      opponent: 1,
    },
  },
  {
    date: new Date('2026-01-04T20:45:00-05:00'),
    opponent: 'Blue Dogs',
    score: {
      slashingPumpkins: 4,
      opponent: 2,
    },
  },
  {
    date: new Date('2026-01-11T20:55:00-05:00'),
    opponent: 'Megalosaurus',
    score: {
      slashingPumpkins: 1,
      opponent: 5,
    },
  },
  {
    date: new Date('2026-01-30T23:55:00-05:00'),
    opponent: 'Red Wings',
    score: {
      slashingPumpkins: 7,
      opponent: 3,
    },
  },
  { date: new Date('2026-02-14T22:40:00-05:00'), opponent: 'Roccos' },
  { date: new Date('2026-02-22T16:55:00-05:00'), opponent: 'Blue Dogs' },
  { date: new Date('2026-03-01T19:45:00-05:00'), opponent: 'Hershey Beers' },
]
