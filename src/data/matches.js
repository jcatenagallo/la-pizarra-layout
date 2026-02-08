// Shared match data for La Pizarra

export const countries = [
  { id: 'esp', name: 'España', flag: '🇪🇸' },
  { id: 'eng', name: 'Inglaterra', flag: '🇬🇧' },
  { id: 'ita', name: 'Italia', flag: '🇮🇹' },
  { id: 'ger', name: 'Alemania', flag: '🇩🇪' },
  { id: 'fra', name: 'Francia', flag: '🇫🇷' },
  { id: 'arg', name: 'Argentina', flag: '🇦🇷' },
  { id: 'bra', name: 'Brasil', flag: '🇧🇷' },
  { id: 'int', name: 'Internacional', flag: '🌍' },
];

export const leagues = [
  // España
  { id: 'laliga', name: 'La Liga', country: 'esp', logo: '⚽', featured: true },
  { id: 'coparey', name: 'Copa del Rey', country: 'esp', logo: '🏆', featured: false },
  { id: 'segunda', name: 'La Liga 2', country: 'esp', logo: '⚽', featured: false },

  // Inglaterra
  { id: 'premier', name: 'Premier League', country: 'eng', logo: '🦁', featured: true },
  { id: 'facup', name: 'FA Cup', country: 'eng', logo: '🏆', featured: false },
  { id: 'championship', name: 'Championship', country: 'eng', logo: '⚽', featured: false },
  { id: 'eflcup', name: 'EFL Cup', country: 'eng', logo: '🏆', featured: false },

  // Italia
  { id: 'seriea', name: 'Serie A', country: 'ita', logo: '🇮🇹', featured: true },
  { id: 'copaitalia', name: 'Coppa Italia', country: 'ita', logo: '🏆', featured: false },

  // Alemania
  { id: 'bundesliga', name: 'Bundesliga', country: 'ger', logo: '🇩🇪', featured: true },
  { id: 'dfbpokal', name: 'DFB-Pokal', country: 'ger', logo: '🏆', featured: false },

  // Francia
  { id: 'ligue1', name: 'Ligue 1', country: 'fra', logo: '🇫🇷', featured: false },
  { id: 'coupedefrance', name: 'Coupe de France', country: 'fra', logo: '🏆', featured: false },

  // Argentina
  { id: 'lpf', name: 'Liga Profesional', country: 'arg', logo: '🇦🇷', featured: true },
  { id: 'copaarg', name: 'Copa Argentina', country: 'arg', logo: '🏆', featured: false },

  // Brasil
  { id: 'brasileirao', name: 'Brasileirão', country: 'bra', logo: '🇧🇷', featured: false },
  { id: 'copabrasil', name: 'Copa do Brasil', country: 'bra', logo: '🏆', featured: false },

  // Internacionales
  { id: 'ucl', name: 'Champions League', country: 'int', logo: '⭐', featured: true },
  { id: 'uel', name: 'Europa League', country: 'int', logo: '🔶', featured: true },
  { id: 'uecl', name: 'Conference League', country: 'int', logo: '🟢', featured: false },
  { id: 'libertadores', name: 'Copa Libertadores', country: 'int', logo: '🏆', featured: true },
  { id: 'sudamericana', name: 'Copa Sudamericana', country: 'int', logo: '🏆', featured: false },
];

// ESPN logo URL helper
const espnLogo = (id) => `https://a.espncdn.com/i/teamlogos/soccer/500/${id}.png`;

export const teams = {
  // La Liga
  'real-madrid': { name: 'Real Madrid', shortName: 'RMA', logo: espnLogo(86), color: '#FFFFFF' },
  'barcelona': { name: 'FC Barcelona', shortName: 'BAR', logo: espnLogo(83), color: '#A50044' },
  'atletico': { name: 'Atlético Madrid', shortName: 'ATM', logo: espnLogo(1068), color: '#CB3524' },
  'sevilla': { name: 'Sevilla FC', shortName: 'SEV', logo: espnLogo(243), color: '#F43333' },
  'villarreal': { name: 'Villarreal CF', shortName: 'VIL', logo: espnLogo(102), color: '#FFE667' },
  'real-sociedad': { name: 'Real Sociedad', shortName: 'RSO', logo: espnLogo(89), color: '#0067B1' },
  'betis': { name: 'Real Betis', shortName: 'BET', logo: espnLogo(244), color: '#00954C' },
  'athletic': { name: 'Athletic Club', shortName: 'ATH', logo: espnLogo(93), color: '#EE2523' },

  // Premier League
  'man-city': { name: 'Manchester City', shortName: 'MCI', logo: espnLogo(382), color: '#6CABDD' },
  'arsenal': { name: 'Arsenal', shortName: 'ARS', logo: espnLogo(359), color: '#EF0107' },
  'liverpool': { name: 'Liverpool', shortName: 'LIV', logo: espnLogo(364), color: '#C8102E' },
  'man-utd': { name: 'Manchester United', shortName: 'MUN', logo: espnLogo(360), color: '#DA291C' },
  'chelsea': { name: 'Chelsea', shortName: 'CHE', logo: espnLogo(363), color: '#034694' },
  'tottenham': { name: 'Tottenham', shortName: 'TOT', logo: espnLogo(367), color: '#132257' },
  'newcastle': { name: 'Newcastle United', shortName: 'NEW', logo: espnLogo(361), color: '#241F20' },
  'aston-villa': { name: 'Aston Villa', shortName: 'AVL', logo: espnLogo(362), color: '#95BFE5' },

  // Serie A
  'inter': { name: 'Inter Milan', shortName: 'INT', logo: espnLogo(110), color: '#0068A8' },
  'milan': { name: 'AC Milan', shortName: 'MIL', logo: espnLogo(103), color: '#FB090B' },
  'juventus': { name: 'Juventus', shortName: 'JUV', logo: espnLogo(111), color: '#000000' },
  'napoli': { name: 'Napoli', shortName: 'NAP', logo: espnLogo(114), color: '#12A0D7' },
  'roma': { name: 'AS Roma', shortName: 'ROM', logo: espnLogo(104), color: '#8E1F2F' },
  'lazio': { name: 'Lazio', shortName: 'LAZ', logo: espnLogo(112), color: '#87D8F7' },

  // Bundesliga
  'bayern': { name: 'Bayern Munich', shortName: 'BAY', logo: espnLogo(132), color: '#DC052D' },
  'dortmund': { name: 'Borussia Dortmund', shortName: 'BVB', logo: espnLogo(124), color: '#FDE100' },
  'leverkusen': { name: 'Bayer Leverkusen', shortName: 'B04', logo: espnLogo(131), color: '#E32221' },
  'leipzig': { name: 'RB Leipzig', shortName: 'RBL', logo: espnLogo(11420), color: '#DD0741' },

  // Ligue 1
  'psg': { name: 'Paris Saint-Germain', shortName: 'PSG', logo: espnLogo(160), color: '#004170' },
  'marseille': { name: 'Olympique Marseille', shortName: 'OM', logo: espnLogo(176), color: '#2FAEE0' },
  'lyon': { name: 'Olympique Lyon', shortName: 'OL', logo: espnLogo(167), color: '#1A4571' },
  'monaco': { name: 'AS Monaco', shortName: 'MON', logo: espnLogo(174), color: '#E2001A' },

  // Argentina
  'boca': { name: 'Boca Juniors', shortName: 'BOC', logo: espnLogo(5), color: '#003DA5' },
  'river': { name: 'River Plate', shortName: 'RIV', logo: espnLogo(16), color: '#E4002B' },
  'racing': { name: 'Racing Club', shortName: 'RAC', logo: espnLogo(15), color: '#72C5F1' },
  'independiente': { name: 'Independiente', shortName: 'IND', logo: espnLogo(11), color: '#E31837' },
  'san-lorenzo': { name: 'San Lorenzo', shortName: 'SL', logo: espnLogo(18), color: '#0033A0' },
  'estudiantes': { name: 'Estudiantes LP', shortName: 'EST', logo: espnLogo(8), color: '#E31837' },

  // Brasil
  'flamengo': { name: 'Flamengo', shortName: 'FLA', logo: espnLogo(819), color: '#E4002B' },
  'palmeiras': { name: 'Palmeiras', shortName: 'PAL', logo: espnLogo(2029), color: '#006437' },
  'corinthians': { name: 'Corinthians', shortName: 'COR', logo: espnLogo(874), color: '#000000' },
  'santos': { name: 'Santos', shortName: 'SAN', logo: espnLogo(2674), color: '#000000' },
};

// Helper to get today's date string
const today = new Date();
const formatDate = (d) => d.toISOString().split('T')[0];

export const matches = [
  // LIVE MATCHES
  {
    id: 1,
    league: 'ucl',
    homeTeam: 'real-madrid',
    awayTeam: 'man-city',
    homeScore: 2,
    awayScore: 1,
    status: 'live',
    minute: 67,
    date: formatDate(today),
    time: '21:00',
    events: [
      { minute: 12, type: 'goal', team: 'home', player: 'Vinícius Jr.' },
      { minute: 34, type: 'goal', team: 'away', player: 'Haaland' },
      { minute: 58, type: 'goal', team: 'home', player: 'Bellingham' },
    ]
  },
  {
    id: 2,
    league: 'ucl',
    homeTeam: 'barcelona',
    awayTeam: 'psg',
    homeScore: 1,
    awayScore: 1,
    status: 'live',
    minute: 72,
    date: formatDate(today),
    time: '21:00',
    events: [
      { minute: 23, type: 'goal', team: 'away', player: 'Dembélé' },
      { minute: 45, type: 'goal', team: 'home', player: 'Lewandowski' },
    ]
  },
  {
    id: 3,
    league: 'premier',
    homeTeam: 'arsenal',
    awayTeam: 'liverpool',
    homeScore: 0,
    awayScore: 0,
    status: 'live',
    minute: 23,
    date: formatDate(today),
    time: '20:45',
    events: []
  },
  {
    id: 4,
    league: 'lpf',
    homeTeam: 'boca',
    awayTeam: 'river',
    homeScore: 1,
    awayScore: 2,
    status: 'live',
    minute: 81,
    date: formatDate(today),
    time: '19:00',
    events: [
      { minute: 15, type: 'goal', team: 'away', player: 'Borja' },
      { minute: 44, type: 'goal', team: 'home', player: 'Cavani' },
      { minute: 67, type: 'goal', team: 'away', player: 'Solari' },
    ]
  },
  {
    id: 5,
    league: 'seriea',
    homeTeam: 'inter',
    awayTeam: 'milan',
    homeScore: 3,
    awayScore: 0,
    status: 'live',
    minute: 55,
    date: formatDate(today),
    time: '20:45',
    events: [
      { minute: 8, type: 'goal', team: 'home', player: 'Lautaro' },
      { minute: 31, type: 'goal', team: 'home', player: 'Barella' },
      { minute: 52, type: 'goal', team: 'home', player: 'Thuram' },
    ]
  },

  // UPCOMING MATCHES
  {
    id: 6,
    league: 'laliga',
    homeTeam: 'atletico',
    awayTeam: 'sevilla',
    homeScore: null,
    awayScore: null,
    status: 'upcoming',
    date: formatDate(today),
    time: '22:00',
  },
  {
    id: 7,
    league: 'bundesliga',
    homeTeam: 'bayern',
    awayTeam: 'dortmund',
    homeScore: null,
    awayScore: null,
    status: 'upcoming',
    date: formatDate(today),
    time: '20:30',
  },
  {
    id: 8,
    league: 'premier',
    homeTeam: 'chelsea',
    awayTeam: 'tottenham',
    homeScore: null,
    awayScore: null,
    status: 'upcoming',
    date: formatDate(today),
    time: '18:30',
  },
  {
    id: 9,
    league: 'ligue1',
    homeTeam: 'psg',
    awayTeam: 'marseille',
    homeScore: null,
    awayScore: null,
    status: 'upcoming',
    date: formatDate(today),
    time: '21:00',
  },
  {
    id: 10,
    league: 'libertadores',
    homeTeam: 'flamengo',
    awayTeam: 'palmeiras',
    homeScore: null,
    awayScore: null,
    status: 'upcoming',
    date: formatDate(today),
    time: '21:30',
  },
  {
    id: 11,
    league: 'uel',
    homeTeam: 'roma',
    awayTeam: 'leverkusen',
    homeScore: null,
    awayScore: null,
    status: 'upcoming',
    date: formatDate(today),
    time: '21:00',
  },

  // FINISHED MATCHES
  {
    id: 12,
    league: 'laliga',
    homeTeam: 'real-sociedad',
    awayTeam: 'betis',
    homeScore: 2,
    awayScore: 1,
    status: 'finished',
    date: formatDate(today),
    time: '14:00',
    events: [
      { minute: 22, type: 'goal', team: 'home', player: 'Oyarzabal' },
      { minute: 56, type: 'goal', team: 'away', player: 'Fekir' },
      { minute: 78, type: 'goal', team: 'home', player: 'Take Kubo' },
    ]
  },
  {
    id: 13,
    league: 'premier',
    homeTeam: 'man-utd',
    awayTeam: 'newcastle',
    homeScore: 1,
    awayScore: 3,
    status: 'finished',
    date: formatDate(today),
    time: '15:00',
    events: [
      { minute: 11, type: 'goal', team: 'away', player: 'Isak' },
      { minute: 33, type: 'goal', team: 'home', player: 'Rashford' },
      { minute: 67, type: 'goal', team: 'away', player: 'Gordon' },
      { minute: 89, type: 'goal', team: 'away', player: 'Isak' },
    ]
  },
  {
    id: 14,
    league: 'seriea',
    homeTeam: 'juventus',
    awayTeam: 'napoli',
    homeScore: 0,
    awayScore: 1,
    status: 'finished',
    date: formatDate(today),
    time: '18:00',
    events: [
      { minute: 44, type: 'goal', team: 'away', player: 'Osimhen' },
    ]
  },
  {
    id: 15,
    league: 'bundesliga',
    homeTeam: 'leverkusen',
    awayTeam: 'leipzig',
    homeScore: 4,
    awayScore: 2,
    status: 'finished',
    date: formatDate(today),
    time: '15:30',
    events: [
      { minute: 5, type: 'goal', team: 'home', player: 'Wirtz' },
      { minute: 19, type: 'goal', team: 'away', player: 'Openda' },
      { minute: 34, type: 'goal', team: 'home', player: 'Boniface' },
      { minute: 55, type: 'goal', team: 'home', player: 'Grimaldo' },
      { minute: 72, type: 'goal', team: 'away', player: 'Nkunku' },
      { minute: 88, type: 'goal', team: 'home', player: 'Wirtz' },
    ]
  },
  {
    id: 16,
    league: 'lpf',
    homeTeam: 'racing',
    awayTeam: 'independiente',
    homeScore: 2,
    awayScore: 2,
    status: 'finished',
    date: formatDate(today),
    time: '16:00',
    events: [
      { minute: 12, type: 'goal', team: 'home', player: 'Maravilla' },
      { minute: 38, type: 'goal', team: 'away', player: 'Romero' },
      { minute: 61, type: 'goal', team: 'home', player: 'Chancalay' },
      { minute: 85, type: 'goal', team: 'away', player: 'Velasco' },
    ]
  },
  {
    id: 17,
    league: 'coparey',
    homeTeam: 'athletic',
    awayTeam: 'villarreal',
    homeScore: 3,
    awayScore: 1,
    status: 'finished',
    date: formatDate(today),
    time: '19:00',
    events: [
      { minute: 22, type: 'goal', team: 'home', player: 'Williams' },
      { minute: 47, type: 'goal', team: 'home', player: 'Muniain' },
      { minute: 68, type: 'goal', team: 'away', player: 'Gerard Moreno' },
      { minute: 82, type: 'goal', team: 'home', player: 'Williams' },
    ]
  },
];

// Helper functions
export const getMatchesByStatus = (status) => matches.filter(m => m.status === status);
export const getMatchesByLeague = (leagueId) => matches.filter(m => m.league === leagueId);
export const getLeaguesByCountry = (countryId) => leagues.filter(l => l.country === countryId);
export const getFeaturedLeagues = () => leagues.filter(l => l.featured);
export const getTeam = (teamId) => teams[teamId];
export const getLeague = (leagueId) => leagues.find(l => l.id === leagueId);
export const getCountry = (countryId) => countries.find(c => c.id === countryId);

export const groupMatchesByLeague = (matchList) => {
  return matchList.reduce((acc, match) => {
    const league = match.league;
    if (!acc[league]) {
      acc[league] = [];
    }
    acc[league].push(match);
    return acc;
  }, {});
};
