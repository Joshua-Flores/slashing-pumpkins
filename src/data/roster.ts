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
  {
    name: 'Doug Gray',
    number: 32,
    position: 'G',
    shoots: 'L',
    showHeadshot: true,
    bio: "Last season with the Roughnecks, Gray lead the Fairfax Novice Division in saves and ended the year with a 2.50 GAA during the Team's late season run.  An emerging top goalie and defensive leader on the Pumpkins, Gray provides a strong presence in the net and looks to build upon his 2024-25 rookie season stats.",
  },
  {
    name: 'Enrique Bouchot',
    number: 77,
    position: 'C',
    shoots: 'R',
    showHeadshot: true,
    bio: "I watched my first hockey game ever at Vancouver's Pacific Coliseum when the Canucks beat the Blues 3-1 in game 4 of round 1 of the playoffs. Ever since I became a Canucks fan. I didn't start playing hockey myself until I was an adult. I started out as a goalie, with disastrous results, so decided to skate out instead, with slightly less disastrous results.",
  },
  {
    name: 'Phil Hutinet',
    number: 5,
    position: 'LD',
    shoots: 'L',
    showHeadshot: true,
    bio: "DC native, middle-aged Gen Xer as old as the Capitals franchise, Hutinet learned how to skate at 32 and still became your problem. A reliable, vocal and locked-in teammate who brings energy, accountability and laughs to the bench; on the ice he’s an unrelenting, chirpy, score-killing SOB. Plays defense because ruining your clean scoring chance gives him more joy than putting one in himself. Lives rent-free in your head all game, then leads his team’s post-game beers while you’re still explaining—again—how you 'totally had him beat.'",
  },
]
