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
  {
    name: 'Josh Flores',
    number: 48,
    position: 'LW',
    shoots: 'R',
    showHeadshot: true,
    bio: "In the spring of 2025, one of my kids took up ice skating and I wanted to try that too. Immediately started eyeing some hockey skates because they looked cool. Eventually the bug struck me and I signed up for the Learn to Play Hockey class at Fairfax Ice Arena. The rest is history and I played my first season with the Roughnecks in the fall of 2025. During my first season I learned a lot and even got to be a substitute goalie for one game. That position is no joke so I have decided to stick to being a winger. My main point of focus is scoring a goal in a game. I've come so close many times. One day I will get there.",
  },
]
