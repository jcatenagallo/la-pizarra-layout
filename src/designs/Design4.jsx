// Design 4: HOJA OLVIDADA
// Aesthetic: A white sheet of paper that spent 40 years inside a drawer.
// Yellowed, aged paper tones. Faded ink. Humidity stains. Foxing spots.
// The warmth of forgotten documents, old newspaper clippings, tobacco-stained margins.

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Landmark } from 'lucide-react';
import {
  matches, leagues, countries, teams,
  getMatchesByStatus, getLeague, getTeam, getCountry,
  groupMatchesByLeague, getFeaturedLeagues, getLeaguesByCountry
} from '../data/matches';
import { TacticalBackground } from '../components/TacticalBackground';
import { TacticalElements } from '../components/TacticalElements';
import { PizarraLogo } from '../components/Logo';
import { CountryBadge } from '../components/CountryBadge';
import { MobileSidebar4 } from '../components/MobileSidebar4';

// -- Palette constants --
const PAPER = {
  bg: '#EDE0B8',        // aged drawer background, more yellow
  surface: '#F5EDCE',   // the paper itself, warm yellow
  surfaceAlt: '#F0E7C4',// slightly different paper tone
  ink: '#3D2B1F',       // old fountain pen ink, dark sepia
  inkFaded: '#6B5344',  // faded ink
  inkLight: '#8B7355',  // very faded ink
  stain: '#B8893D',     // humidity/amber stain accent
  stainLight: '#D4AD5C',// lighter golden stain for borders
  foxing: '#CCAD6E',    // foxing spots color, golden
  rust: '#8B6914',      // rusty paper clip stain
  border: '#D4C48A',    // old paper edge, yellowish
  shadow: 'rgba(61, 43, 31, 0.08)',
};

// Foxing spots - those little brown spots on old paper
const FoxingOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-[1]" style={{ opacity: 0.15 }}>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <filter id="foxing">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="42" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncA type="discrete" tableValues="0 0 0 0 0 0 0 0 0.3 0.5" />
        </feComponentTransfer>
      </filter>
      <rect width="100%" height="100%" filter="url(#foxing)" fill={PAPER.stain} />
    </svg>
  </div>
);

// Paper texture - subtle fiber pattern
const PaperTexture = () => (
  <div className="fixed inset-0 pointer-events-none z-[2]" style={{ opacity: 0.04 }}>
    <svg width="100%" height="100%">
      <filter id="paperGrain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#paperGrain)" />
    </svg>
  </div>
);

const FlipDigit = ({ digit, delay = 0 }) => (
  <motion.div
    initial={{ rotateX: -90, opacity: 0 }}
    animate={{ rotateX: 0, opacity: 1 }}
    transition={{ duration: 0.4, delay }}
    className="relative font-display text-xl md:text-2xl
               w-8 md:w-9 h-8 md:h-9 flex items-center justify-center
               rounded-sm"
    style={{
      perspective: '500px',
      transformStyle: 'preserve-3d',
      background: PAPER.surfaceAlt,
      color: PAPER.ink,
      boxShadow: `inset 0 1px 3px ${PAPER.shadow}, 0 2px 4px ${PAPER.shadow}`,
      border: `1px solid ${PAPER.border}`,
    }}
  >
    <span style={{ textShadow: `0 1px 0 rgba(255,255,255,0.4)` }}>{digit}</span>
    <div className="absolute inset-x-0 top-1/2 h-px" style={{ background: `${PAPER.stainLight}66` }} />
  </motion.div>
);

const ScoreDisplay = ({ home, away, isLive }) => {
  const homeDigits = String(home ?? '-').padStart(1, '0').split('');
  const awayDigits = String(away ?? '-').padStart(1, '0').split('');

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <div className="flex gap-0.5 md:gap-1">
        {homeDigits.map((d, i) => <FlipDigit key={`h${i}`} digit={d} delay={i * 0.1} />)}
      </div>
      <span className="text-xl md:text-2xl font-display" style={{ color: PAPER.inkFaded }}>
        -
      </span>
      <div className="flex gap-0.5 md:gap-1">
        {awayDigits.map((d, i) => <FlipDigit key={`a${i}`} digit={d} delay={i * 0.1} />)}
      </div>
    </div>
  );
};

const GoalIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="inline-block">
    <path d="M3 20 L3 6 L21 6 L21 20" stroke={PAPER.ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <line x1="3" y1="10" x2="21" y2="10" stroke={PAPER.ink} strokeWidth="0.75" opacity="0.5" />
    <line x1="3" y1="14" x2="21" y2="14" stroke={PAPER.ink} strokeWidth="0.75" opacity="0.5" />
    <line x1="3" y1="18" x2="21" y2="18" stroke={PAPER.ink} strokeWidth="0.75" opacity="0.5" />
    <line x1="7" y1="6" x2="7" y2="20" stroke={PAPER.ink} strokeWidth="0.75" opacity="0.5" />
    <line x1="12" y1="6" x2="12" y2="20" stroke={PAPER.ink} strokeWidth="0.75" opacity="0.5" />
    <line x1="17" y1="6" x2="17" y2="20" stroke={PAPER.ink} strokeWidth="0.75" opacity="0.5" />
  </svg>
);

const CardIcon = () => (
  <svg width={10} height={14} viewBox="0 0 10 14" className="inline-block">
    <rect x="1" y="1" width="8" height="12" rx="1" fill="#B44040" stroke="#943333" strokeWidth="1" />
  </svg>
);

const SubstitutionIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="inline-block">
    <path d="M7 14 L7 6 M4 9 L7 6 L10 9" stroke="#4A7C59" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17 10 L17 18 M14 15 L17 18 L20 15" stroke="#B44040" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EventIcon = ({ type }) => {
  switch (type) {
    case 'goal': return <GoalIcon size={14} />;
    case 'redCard': return <CardIcon />;
    case 'substitution': return <SubstitutionIcon size={14} />;
    default: return null;
  }
};

const MatchEventsPanel = ({ events }) => {
  if (!events || events.length === 0) return null;
  const sortedEvents = [...events].sort((a, b) => a.minute - b.minute);

  return (
    <div style={{ borderTop: `2px solid ${PAPER.border}` }}>
      <div className="px-2 md:px-4 py-1.5 md:py-2 space-y-0.5 md:space-y-1">
        {sortedEvents.map((event, idx) => {
          const isHome = event.team === 'home';
          return (
            <div key={idx} className="flex items-center">
              <div className="flex-1 flex items-center justify-end gap-1 md:gap-2">
                {isHome && (
                  event.type === 'substitution' ? (
                    <div className="flex flex-col items-end text-xs md:text-sm font-condensed">
                      <span style={{ color: '#4A7C59' }}>{event.playerIn}</span>
                      <span style={{ color: '#B44040' }}>{event.playerOut}</span>
                    </div>
                  ) : (
                    <span className="font-condensed text-xs md:text-sm text-right" style={{ color: PAPER.ink }}>
                      {event.player}
                    </span>
                  )
                )}
              </div>
              <div className="w-4 md:w-5 flex justify-center">
                {isHome && <EventIcon type={event.type} />}
              </div>
              <div className="w-9 md:w-12 flex justify-center">
                <span className="font-condensed text-xs md:text-sm font-semibold" style={{ color: PAPER.stain }}>
                  {event.minute}'
                </span>
              </div>
              <div className="w-4 md:w-5 flex justify-center">
                {!isHome && <EventIcon type={event.type} />}
              </div>
              <div className="flex-1 flex items-center justify-start gap-1 md:gap-2">
                {!isHome && (
                  event.type === 'substitution' ? (
                    <div className="flex flex-col items-start text-xs md:text-sm font-condensed">
                      <span style={{ color: '#4A7C59' }}>{event.playerIn}</span>
                      <span style={{ color: '#B44040' }}>{event.playerOut}</span>
                    </div>
                  ) : (
                    <span className="font-condensed text-xs md:text-sm" style={{ color: PAPER.ink }}>
                      {event.player}
                    </span>
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MatchCard = ({ match, index }) => {
  const homeTeam = getTeam(match.homeTeam);
  const awayTeam = getTeam(match.awayTeam);
  const isLive = match.status === 'live';
  const isFinished = match.status === 'finished';

  return (
    <div
      className="relative rounded-none md:rounded-lg overflow-hidden"
      style={{
        background: '#FFFDF5',
        border: `1px solid ${PAPER.border}`,
        boxShadow: `0 2px 8px ${PAPER.shadow}`,
      }}
    >
      {/* Aged paper fiber texture on card */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
           style={{
             backgroundImage: `repeating-linear-gradient(
               0deg,
               transparent,
               transparent 1px,
               rgba(139,115,85,0.3) 1px,
               rgba(139,115,85,0.3) 2px
             )`
           }} />

      <div className="flex items-stretch">
        {/* Time/Status */}
        <div className="relative z-10 w-12 md:w-20 shrink-0 flex flex-col items-center justify-center py-2 md:py-3"
             style={{ borderRight: `2px solid ${PAPER.border}` }}>
          {isLive ? (
            <span className="font-condensed font-bold text-base md:text-2xl" style={{ color: PAPER.ink }}>
              {match.minute}'
            </span>
          ) : isFinished ? (
            <span className="font-condensed font-bold text-xs md:text-xl" style={{ color: PAPER.inkFaded }}>
              FIN
            </span>
          ) : (
            <span className="font-condensed font-bold text-base md:text-2xl" style={{ color: PAPER.ink }}>
              {match.time}
            </span>
          )}
        </div>

        {/* Match content */}
        <div className="flex-1 relative min-w-0">
          <div className="relative z-10 flex items-center justify-center gap-1.5 md:gap-4 px-2 py-2 md:px-4 md:py-3">
            {/* Home Team */}
            <div className="flex-1 flex flex-col items-center md:flex-row md:items-center md:justify-end gap-0.5 md:gap-2 min-w-0">
              <img src={homeTeam?.logo} alt={homeTeam?.name}
                className="w-7 h-7 md:w-10 md:h-10 object-contain shrink-0 md:order-2"
                style={{ filter: 'sepia(15%) saturate(80%)' }}
              />
              <div className="font-display text-xs md:text-lg lg:text-xl tracking-wide md:order-1 text-center md:text-right leading-tight md:truncate"
                   style={{ color: PAPER.ink }}>
                {homeTeam?.name}
              </div>
            </div>

            {/* Score */}
            <div className="shrink-0">
              <ScoreDisplay home={match.homeScore} away={match.awayScore} isLive={isLive} />
            </div>

            {/* Away Team */}
            <div className="flex-1 flex flex-col items-center md:flex-row md:items-center md:justify-start gap-0.5 md:gap-2 min-w-0">
              <img src={awayTeam?.logo} alt={awayTeam?.name}
                className="w-7 h-7 md:w-10 md:h-10 object-contain shrink-0"
                style={{ filter: 'sepia(15%) saturate(80%)' }}
              />
              <div className="font-display text-xs md:text-lg lg:text-xl tracking-wide text-center md:text-left leading-tight md:truncate"
                   style={{ color: PAPER.ink }}>
                {awayTeam?.name}
              </div>
            </div>
          </div>

          <MatchEventsPanel events={match.events} />
        </div>
      </div>
    </div>
  );
};

const LeagueSection = ({ leagueId, matchList }) => {
  const league = getLeague(leagueId);
  const country = getCountry(league?.country);

  return (
    <div className="mb-3 md:mb-6">
      <div className="rounded-lg overflow-hidden"
           style={{
             border: `2px solid ${PAPER.border}`,
             background: PAPER.surfaceAlt,
             boxShadow: `0 4px 16px ${PAPER.shadow}, inset 0 1px 0 rgba(255,255,255,0.6)`,
           }}>

        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3"
             style={{
               background: `${PAPER.inkFaded}18`,
               borderBottom: `2px solid ${PAPER.border}`,
             }}>
          {league?.logo ? (
            <img src={league.logo} alt={league.name} className="w-7 h-7 object-contain"
                 style={{ filter: 'sepia(20%) saturate(70%)' }} />
          ) : (
            <CountryBadge countryId={league?.country} size={22} />
          )}
          <h3 className="font-display text-xl tracking-wide"
              style={{ color: PAPER.ink }}>
            {league?.name}
          </h3>
          <div className="flex-1 h-px ml-2" style={{
            background: `linear-gradient(90deg, ${PAPER.border}, transparent)`,
          }} />
          <span className="font-condensed text-xs tracking-wider" style={{ color: PAPER.inkLight }}>
            {matchList.length} {matchList.length === 1 ? 'PARTIDO' : 'PARTIDOS'}
          </span>
        </div>

        {/* Matches */}
        <div className="p-0 md:p-3 space-y-1 md:space-y-2">
          {matchList.map((match, idx) => (
            <MatchCard key={match.id} match={match} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

const DateSelector = ({ selectedDate, onDateChange }) => {
  const dates = [];
  for (let i = -3; i <= 3; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    dates.push(d);
  }

  const formatDayName = (date) => {
    const days = ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'];
    return days[date.getDay()];
  };

  return (
    <div className="flex items-center justify-center gap-1 md:gap-1.5 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
      {dates.map((date, idx) => {
        const dateStr = date.toISOString().split('T')[0];
        const isSelected = dateStr === selectedDate;
        const isToday = idx === 3;

        return (
          <motion.button
            key={dateStr}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDateChange(dateStr)}
            className={`
              flex-col items-center px-2.5 py-1.5 md:px-3 md:py-2 rounded-md transition-all
              font-condensed min-w-[50px]
              ${(idx === 0 || idx === 6) ? 'hidden md:flex' : 'flex'}
            `}
            style={{
              background: isSelected ? PAPER.stain : `${PAPER.surface}88`,
              color: isSelected ? PAPER.surface : PAPER.inkFaded,
              boxShadow: isSelected ? `0 2px 8px rgba(166,123,91,0.3)` : 'none',
              border: isToday && !isSelected ? `2px solid ${PAPER.stainLight}` : '2px solid transparent',
            }}
          >
            <span className="text-[10px] tracking-wider">{formatDayName(date)}</span>
            <span className="text-base md:text-lg font-bold">{date.getDate()}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

const LeaguesSidebar = ({ selectedLeague, onLeagueSelect }) => {
  const featured = getFeaturedLeagues();

  return (
    <div className="rounded-lg p-4"
         style={{
           background: `${PAPER.surface}cc`,
           border: `2px solid ${PAPER.border}`,
         }}>
      <div className="mb-6 rounded-lg overflow-hidden" style={{ border: `2px solid ${PAPER.stainLight}55` }}>
        <div className="flex items-center gap-2 py-2.5 px-3"
             style={{ background: `${PAPER.stain}33`, color: PAPER.stain }}>
          <span className="font-display text-lg uppercase tracking-wide font-semibold">Destacados</span>
        </div>
        <div style={{ borderColor: PAPER.border }}>
          {featured.map((league, idx) => (
            <button
              key={league.id}
              onClick={() => onLeagueSelect(league.id)}
              className="w-full flex items-center gap-3 px-3 py-1.5 text-left transition-colors cursor-pointer"
              style={{
                background: selectedLeague === league.id ? PAPER.stain : 'transparent',
                color: selectedLeague === league.id ? PAPER.surface : PAPER.inkFaded,
                fontWeight: selectedLeague === league.id ? 600 : 400,
                borderBottom: idx < featured.length - 1 ? `1px solid ${PAPER.border}` : 'none',
              }}
            >
              <motion.span whileHover={{ x: 4 }} className="font-condensed text-base">
                {league.name}
              </motion.span>
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4" style={{ borderTop: `1px solid ${PAPER.border}` }}>
        <h4 className="font-display text-base mb-3 tracking-wide" style={{ color: PAPER.inkLight }}>
          POR PAÍS
        </h4>
        {countries.map(country => {
          const countryLeagues = getLeaguesByCountry(country.id);
          if (countryLeagues.length === 0) return null;

          return (
            <div key={country.id} className="mb-3 rounded-lg overflow-hidden"
                 style={{ border: `1px solid ${PAPER.border}` }}>
              <div className="flex items-center gap-2 text-sm py-2 px-3"
                   style={{ background: `${PAPER.stain}15`, color: PAPER.stain }}>
                <CountryBadge countryId={country.id} size={16} />
                <span className="font-condensed uppercase tracking-wider font-semibold">{country.name}</span>
              </div>
              <div>
                {countryLeagues.map((league, idx) => (
                  <button
                    key={league.id}
                    onClick={() => onLeagueSelect(league.id)}
                    className="block text-left w-full px-3 py-1.5 transition-colors cursor-pointer"
                    style={{
                      color: selectedLeague === league.id ? PAPER.stain : PAPER.inkFaded,
                      background: selectedLeague === league.id ? `${PAPER.stain}15` : 'transparent',
                      fontWeight: selectedLeague === league.id ? 600 : 400,
                      borderBottom: idx < countryLeagues.length - 1 ? `1px solid ${PAPER.border}` : 'none',
                    }}
                  >
                    <motion.span whileHover={{ x: 4 }} className="block text-base font-condensed">
                      {league.name}
                    </motion.span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function Design4({ showLiveTicker = true, tickerPosition = 'top' }) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  const liveMatches = getMatchesByStatus('live');
  const upcomingMatches = getMatchesByStatus('upcoming');
  const finishedMatches = getMatchesByStatus('finished');

  const getFilteredMatches = () => {
    let filtered = matches;
    if (selectedLeague) {
      filtered = filtered.filter(m => m.league === selectedLeague);
    }
    if (activeTab === 'live') return filtered.filter(m => m.status === 'live');
    if (activeTab === 'upcoming') return filtered.filter(m => m.status === 'upcoming');
    if (activeTab === 'finished') return filtered.filter(m => m.status === 'finished');
    return filtered;
  };

  const groupedMatches = groupMatchesByLeague(getFilteredMatches());

  return (
    <div className="min-h-screen" style={{ background: PAPER.bg }}>
      {/* Foxing spots & paper texture */}
      <FoxingOverlay />
      <PaperTexture />

      {/* Header */}
      <header className="relative overflow-hidden" style={{ borderBottom: `2px solid ${PAPER.stain}` }}>
        {/* Subtle aged light beams */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-32 h-full transform -skew-x-12"
               style={{ background: `linear-gradient(to bottom, ${PAPER.stain}12, transparent)` }} />
          <div className="absolute top-0 right-1/3 w-24 h-full transform skew-x-6"
               style={{ background: `linear-gradient(to bottom, ${PAPER.stain}08, transparent)` }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-2 md:py-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center mb-2 md:mb-4"
          >
            <div className="flex items-center gap-4">
              <PizarraLogo
                size={64}
                color={PAPER.ink}
                accentColor={PAPER.stain}
                animated={false}
              />
              <h1 className="font-display text-5xl md:text-6xl tracking-wider"
                  style={{
                    color: PAPER.stain,
                    textShadow: `0 2px 4px ${PAPER.shadow}`,
                  }}>
                LA PIZARRA
              </h1>
            </div>

            <p className="font-condensed text-[10px] md:text-xs tracking-[0.4em] uppercase -mt-1 md:mt-1"
               style={{ color: PAPER.inkLight }}>
              La página de la pelotita
            </p>
          </motion.div>

          <DateSelector selectedDate={selectedDate} onDateChange={setSelectedDate} />
        </div>
      </header>

      {/* Live Matches Ticker - Top */}
      {showLiveTicker && tickerPosition === 'top' && liveMatches.length > 0 && (
        <div className="overflow-hidden"
             style={{
               background: `linear-gradient(90deg, ${PAPER.stain}, #8B6042, ${PAPER.stain})`,
               borderTop: `1px solid ${PAPER.stainLight}`,
               borderBottom: `2px solid ${PAPER.stainLight}`,
             }}>
          <div className="flex items-stretch relative">
            <div className="px-4 flex items-center gap-2 shrink-0 relative z-10"
                 style={{ background: PAPER.ink }}>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full"
                style={{ background: '#B44040' }}
              />
              <span className="font-display text-sm tracking-wider" style={{ color: PAPER.surface }}>EN VIVO</span>
            </div>
            <motion.div
              animate={{ x: [0, -2000] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex items-center gap-0 px-4 py-2 whitespace-nowrap"
            >
              {[...liveMatches, ...liveMatches].map((match, idx) => {
                const home = getTeam(match.homeTeam);
                const away = getTeam(match.awayTeam);
                return (
                  <span key={idx} className="font-condensed text-sm flex items-center" style={{ color: PAPER.surface }}>
                    <span className="h-6 w-px mx-8" style={{ background: `${PAPER.surface}55` }} />
                    <span className="mr-3" style={{ color: `${PAPER.surface}99` }}>{match.minute}'</span>
                    {home?.name}
                    <img src={home?.logo} alt="" className="w-5 h-5 object-contain mx-1.5" style={{ filter: 'brightness(1.1)' }} />
                    <span className="font-bold" style={{ color: PAPER.foxing }}>{match.homeScore} - {match.awayScore}</span>
                    <img src={away?.logo} alt="" className="w-5 h-5 object-contain mx-1.5" style={{ filter: 'brightness(1.1)' }} />
                    {away?.name}
                  </span>
                );
              })}
            </motion.div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="relative">
        {/* Tactical Background - with aged paper color */}
        <div className="absolute inset-0 pointer-events-none" style={{ transform: 'translateZ(0)' }}>
          <TacticalBackground
            variant="minimal"
            opacity={0.06}
            animated={false}
            color={PAPER.stainLight}
          />
          <TacticalElements
            opacity={0.08}
            color={PAPER.stainLight}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-2 md:px-4 pt-0 pb-2 md:py-8">
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-8">
            {/* Desktop sidebar */}
            <aside className="hidden lg:block lg:w-72 shrink-0 order-1">
              <LeaguesSidebar
                selectedLeague={selectedLeague}
                onLeagueSelect={(id) => setSelectedLeague(id === selectedLeague ? null : id)}
              />
            </aside>

            {/* Mobile sidebar */}
            <MobileSidebar4 selectedLeague={selectedLeague} bottomOffset={tickerPosition === 'bottom' && showLiveTicker && liveMatches.length > 0}>
              <LeaguesSidebar
                selectedLeague={selectedLeague}
                onLeagueSelect={(id) => setSelectedLeague(id === selectedLeague ? null : id)}
              />
            </MobileSidebar4>

            <div className="flex-1 lg:order-2">
              {Object.entries(groupedMatches).map(([leagueId, leagueMatches]) => (
                <LeagueSection
                  key={leagueId}
                  leagueId={leagueId}
                  matchList={leagueMatches}
                />
              ))}
              {Object.keys(groupedMatches).length === 0 && (
                <div className="text-center py-16">
                  <Landmark size={64} className="mx-auto mb-4" style={{ color: PAPER.inkLight }} />
                  <p className="font-display text-xl" style={{ color: PAPER.inkLight }}>
                    NO HAY PARTIDOS
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`mt-12 py-6 ${tickerPosition === 'bottom' && showLiveTicker && liveMatches.length > 0 ? 'pb-16' : ''}`}
              style={{ borderTop: `2px solid ${PAPER.border}` }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-condensed text-sm tracking-wider" style={{ color: PAPER.inkLight }}>
            LA PIZARRA © 2025 • TODOS LOS DERECHOS RESERVADOS
          </p>
        </div>
      </footer>

      {/* Live Matches Ticker - Bottom (fixed) */}
      {showLiveTicker && tickerPosition === 'bottom' && liveMatches.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 overflow-hidden"
             style={{
               background: `linear-gradient(90deg, ${PAPER.stain}, #8B6042, ${PAPER.stain})`,
               borderTop: `2px solid ${PAPER.stainLight}`,
               boxShadow: `0 -4px 20px rgba(61,43,31,0.2)`,
             }}>
          <div className="flex items-stretch relative">
            <div className="px-4 flex items-center gap-2 shrink-0 relative z-10"
                 style={{ background: PAPER.ink }}>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full"
                style={{ background: '#B44040' }}
              />
              <span className="font-display text-sm tracking-wider" style={{ color: PAPER.surface }}>EN VIVO</span>
            </div>
            <motion.div
              animate={{ x: [0, -2000] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex items-center gap-0 px-4 py-2 whitespace-nowrap"
            >
              {[...liveMatches, ...liveMatches].map((match, idx) => {
                const home = getTeam(match.homeTeam);
                const away = getTeam(match.awayTeam);
                return (
                  <span key={idx} className="font-condensed text-sm flex items-center" style={{ color: PAPER.surface }}>
                    <span className="h-6 w-px mx-8" style={{ background: `${PAPER.surface}55` }} />
                    <span className="mr-3" style={{ color: `${PAPER.surface}99` }}>{match.minute}'</span>
                    {home?.name}
                    <img src={home?.logo} alt="" className="w-5 h-5 object-contain mx-1.5" style={{ filter: 'brightness(1.1)' }} />
                    <span className="font-bold" style={{ color: PAPER.foxing }}>{match.homeScore} - {match.awayScore}</span>
                    <img src={away?.logo} alt="" className="w-5 h-5 object-contain mx-1.5" style={{ filter: 'brightness(1.1)' }} />
                    {away?.name}
                  </span>
                );
              })}
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
