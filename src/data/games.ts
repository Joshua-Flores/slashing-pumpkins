import { easternDateTimeToDate } from './utils'

export type Game = {
  date: Date
  opponent: string
  score?: {
    slashingPumpkins: number
    opponent: number
  }
}

type GameInput = Omit<Game, 'date'> & {
  dateEt: string
  timeEt: string
}

const gameInputs: GameInput[] = [
  {
    dateEt: '2025-12-07',
    timeEt: '9:45pm',
    opponent: 'Red Wings',
    score: {
      slashingPumpkins: 7,
      opponent: 3,
    },
  },
  {
    dateEt: '2025-12-14',
    timeEt: '11:00pm',
    opponent: 'Roccos',
    score: {
      slashingPumpkins: 2,
      opponent: 2,
    },
  },
  {
    dateEt: '2025-12-21',
    timeEt: '10:40pm',
    opponent: 'Hershey Beers',
    score: {
      slashingPumpkins: 2,
      opponent: 1,
    },
  },
  {
    dateEt: '2026-01-04',
    timeEt: '8:45pm',
    opponent: 'Blue Dogs',
    score: {
      slashingPumpkins: 4,
      opponent: 2,
    },
  },
  {
    dateEt: '2026-01-11',
    timeEt: '8:55pm',
    opponent: 'Megalosaurus',
    score: {
      slashingPumpkins: 1,
      opponent: 5,
    },
  },
  {
    dateEt: '2026-01-30',
    timeEt: '11:55pm',
    opponent: 'Red Wings',
    score: {
      slashingPumpkins: 7,
      opponent: 3,
    },
  },
  {
    dateEt: '2026-02-14',
    timeEt: '10:40pm',
    opponent: 'Roccos',
    score: {
      slashingPumpkins: 7,
      opponent: 1,
    },
  },
  {
    dateEt: '2026-02-22',
    timeEt: '4:55pm',
    opponent: 'Blue Dogs',
    score: {
      slashingPumpkins: 4,
      opponent: 3,
    },
  },
  { dateEt: '2026-03-01', timeEt: '7:45pm', opponent: 'Hershey Beers' },
  { dateEt: '2026-03-15', timeEt: '9:30pm', opponent: 'Thunder' },
  { dateEt: '2026-03-28', timeEt: '11:55pm', opponent: 'Blue Dogs' },
  { dateEt: '2026-04-03', timeEt: '11:30pm', opponent: 'Megalosaurus' },
  { dateEt: '2026-04-11', timeEt: '10:10pm', opponent: 'Red Wings' },
  { dateEt: '2026-04-12', timeEt: '10:50pm', opponent: 'Slashing Pumpkins' },
  { dateEt: '2026-04-19', timeEt: '9:40pm', opponent: 'Roccos' },
  { dateEt: '2026-04-25', timeEt: '11:30pm', opponent: 'Hershey Beers' },
  { dateEt: '2026-05-10', timeEt: '8:10pm', opponent: 'Thunder' },
  { dateEt: '2026-05-24', timeEt: '8:10pm', opponent: 'Red Wings' },
  { dateEt: '2026-05-31', timeEt: '10:50pm', opponent: 'Roccos' },
  { dateEt: '2026-06-07', timeEt: '9:30am', opponent: 'Megalosaurus' },
]

export const games: Game[] = gameInputs.map(({ dateEt, timeEt, ...rest }) => ({
  ...rest,
  date: easternDateTimeToDate(dateEt, timeEt),
}))
