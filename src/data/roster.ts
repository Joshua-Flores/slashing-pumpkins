export type Player = {
  name: string
  number: number
  position: 'RW' | 'LW' | 'C' | 'LD' | 'RD' | 'G'
  shoots: 'L' | 'R'
  bio?: string
  showHeadshot: boolean
}

export const roster: Player[] = [
  {
    name: 'Christopher Adams',
    number: 33,
    position: 'RW',
    shoots: 'R',
    bio: 'Chris has played one season of hockey beginning at the tender age of 55. He is excited about learning how to skate and hit the puck with the stick. Chris is originally from that hotbed of hockey talent, Melbourne Australia. He grew up watching 1 or 2 games of hockey each decade of his early years. He is a big CAPS fan and wants to be able to play like Tom Wilson.',
    showHeadshot: true,
  },
  {
    name: 'Deena Ackerman',
    number: 59,
    position: 'RW',
    shoots: 'L',
    bio: 'I credit my involvement in hockey to Courtney Laughlin and the ACAH program.',
    showHeadshot: true,
  },
  {
    name: 'Drew Carbone',
    number: 42,
    position: 'RW',
    shoots: 'R',
    bio: 'Reliable teammate, relentless forechecker, and unofficial morale officer. Career highlights include a clean pass, a cleaner chirp, and never missing a post-game beer. Known for strong bench presence and high-quality shift commentary.',
    showHeadshot: true,
  },
  {
    name: 'Nate Radke',
    number: 20,
    position: 'RW',
    shoots: 'R',
    showHeadshot: true,
  },
]
