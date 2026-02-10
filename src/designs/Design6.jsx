// Design 9: TRAVEL
// Aesthetic: Fresh, modern, travel-inspired palette with ocean blues,
// cyan accents, cream warmth, and bold red live indicators

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
import { MobileSidebar } from '../components/MobileSidebar';

const FlipDigit = ({ digit, delay = 0 }) => (
  <motion.div
    initial={{ rotateX: -90, opacity: 0 }}
    animate={{ rotateX: 0, opacity: 1 }}
    transition={{ duration: 0.4, delay }}
    className="relative bg-[#0a1929] text-[#1EA4D9] font-display text-xl md:text-2xl
               w-8 md:w-9 h-8 md:h-9 flex items-center justify-center
               rounded-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),0_4px_8px_rgba(0,0,0,0.3)]
               border-t border-[#1EA4D9]/20"
    style={{ perspective: '500px', transformStyle: 'preserve-3d' }}
  >
    <span className="drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">{digit}</span>
    <div className="absolute inset-x-0 top-1/2 h-px bg-black/50" />
    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
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
      <span className="text-[#F2E2CE] text-xl md:text-2xl font-display">
        -
      </span>
      <div className="flex gap-0.5 md:gap-1">
        {awayDigits.map((d, i) => <FlipDigit key={`a${i}`} digit={d} delay={i * 0.1} />)}
      </div>
    </div>
  );
};

// Goal icon - football/soccer goal post
const GoalIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="inline-block">
    {/* Goal frame */}
    <path
      d="M3 20 L3 6 L21 6 L21 20"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Net lines - horizontal */}
    <line x1="3" y1="10" x2="21" y2="10" stroke="white" strokeWidth="0.75" opacity="0.6" />
    <line x1="3" y1="14" x2="21" y2="14" stroke="white" strokeWidth="0.75" opacity="0.6" />
    <line x1="3" y1="18" x2="21" y2="18" stroke="white" strokeWidth="0.75" opacity="0.6" />
    {/* Net lines - vertical */}
    <line x1="7" y1="6" x2="7" y2="20" stroke="white" strokeWidth="0.75" opacity="0.6" />
    <line x1="12" y1="6" x2="12" y2="20" stroke="white" strokeWidth="0.75" opacity="0.6" />
    <line x1="17" y1="6" x2="17" y2="20" stroke="white" strokeWidth="0.75" opacity="0.6" />
  </svg>
);

// Card icon (vertical) - only red card now
const CardIcon = () => (
  <svg width={10} height={14} viewBox="0 0 10 14" className="inline-block">
    <rect
      x="1"
      y="1"
      width="8"
      height="12"
      rx="1"
      fill="#EF4444"
      stroke="#DC2626"
      strokeWidth="1"
    />
  </svg>
);

// Substitution icon - arrows up/down
const SubstitutionIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="inline-block">
    {/* Arrow up - player in (green) */}
    <path
      d="M7 14 L7 6 M4 9 L7 6 L10 9"
      stroke="#22C55E"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Arrow down - player out (red) */}
    <path
      d="M17 10 L17 18 M14 15 L17 18 L20 15"
      stroke="#EF4444"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Event icon component
const EventIcon = ({ type }) => {
  switch (type) {
    case 'goal':
      return <GoalIcon size={14} />;
    case 'redCard':
      return <CardIcon />;
    case 'substitution':
      return <SubstitutionIcon size={14} />;
    default:
      return null;
  }
};

// Events panel - same layout as score row so minutes align with the dash
const MatchEventsPanel = ({ events }) => {
  if (!events || events.length === 0) return null;

  const sortedEvents = [...events].sort((a, b) => a.minute - b.minute);

  return (
    <div className="border-t-2 border-[#1EA4D9]/40">
      <div className="px-2 md:px-4 py-1.5 md:py-2 space-y-0.5 md:space-y-1">
        {sortedEvents.map((event, idx) => {
          const isHome = event.team === 'home';
          return (
            <div
              key={idx}
              className="flex items-center"
            >
              {/* Home side: player name + icon */}
              <div className="flex-1 flex items-center justify-end gap-1 md:gap-2">
                {isHome && (
                  event.type === 'substitution' ? (
                    <div className="flex flex-col items-end text-xs md:text-sm font-condensed">
                      <span className="text-green-400">{event.playerIn}</span>
                      <span className="text-red-400">{event.playerOut}</span>
                    </div>
                  ) : (
                    <span className="font-condensed text-[#F2E2CE] text-xs md:text-sm text-right">
                      {event.player}
                    </span>
                  )
                )}
              </div>

              {/* Home icon column - fixed width */}
              <div className="w-4 md:w-5 flex justify-center">
                {isHome && <EventIcon type={event.type} />}
              </div>

              {/* Minutes - center column */}
              <div className="w-9 md:w-12 flex justify-center">
                <span className="font-condensed text-[#23B7D9] text-xs md:text-sm font-semibold">
                  {event.minute}'
                </span>
              </div>

              {/* Away icon column - fixed width */}
              <div className="w-4 md:w-5 flex justify-center">
                {!isHome && <EventIcon type={event.type} />}
              </div>

              {/* Away side: icon + player name */}
              <div className="flex-1 flex items-center justify-start gap-1 md:gap-2">
                {!isHome && (
                  event.type === 'substitution' ? (
                    <div className="flex flex-col items-start text-xs md:text-sm font-condensed">
                      <span className="text-green-400">{event.playerIn}</span>
                      <span className="text-red-400">{event.playerOut}</span>
                    </div>
                  ) : (
                    <span className="font-condensed text-[#F2E2CE] text-xs md:text-sm">
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
      className="relative rounded-none md:rounded-xl overflow-hidden
                 border-x-0 md:border-x-2 border-y border-[#1EA4D9]/40 md:shadow-lg
                 bg-gradient-to-br from-[#0e3a5e] via-[#0d3354] to-[#092740]"
    >
      {/* Wave texture - covers entire card */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
           style={{
             backgroundImage: `repeating-linear-gradient(
               90deg,
               transparent,
               transparent 2px,
               rgba(0,0,0,0.1) 2px,
               rgba(0,0,0,0.1) 4px
             )`
           }} />

      {/* Main row */}
      <div className="flex items-stretch">
        {/* Time/Status section - Left */}
        <div className="relative z-10 w-12 md:w-20 shrink-0 flex flex-col items-center justify-center
                        border-r-2 border-[#1EA4D9]/40 py-2 md:py-3">
          {isLive ? (
            <span className="font-condensed text-white font-bold text-base md:text-2xl">
              {match.minute}'
            </span>
          ) : isFinished ? (
            <span className="font-condensed text-white font-bold text-xs md:text-xl">
              FIN
            </span>
          ) : (
            <span className="font-condensed text-white font-bold text-base md:text-2xl">
              {match.time}
            </span>
          )}
        </div>

        {/* Match content - Right */}
        <div className="flex-1 relative min-w-0">
          {/* Teams and Score */}
          <div className="relative z-10 flex items-center justify-center gap-1.5 md:gap-4 px-2 py-2 md:px-4 md:py-3">
            {/* Home Team */}
            <div className="flex-1 flex flex-col items-center md:flex-row md:items-center md:justify-end gap-0.5 md:gap-2 min-w-0">
              <img
                src={homeTeam?.logo}
                alt={homeTeam?.name}
                className="w-7 h-7 md:w-10 md:h-10 object-contain shrink-0 drop-shadow-lg md:order-2"
              />
              <div className="font-display text-[#F2E2CE] text-xs md:text-lg lg:text-xl tracking-wide md:order-1 text-center md:text-right leading-tight md:truncate">
                {homeTeam?.name}
              </div>
            </div>

            {/* Score */}
            <div className="shrink-0">
              <ScoreDisplay home={match.homeScore} away={match.awayScore} isLive={isLive} />
            </div>

            {/* Away Team */}
            <div className="flex-1 flex flex-col items-center md:flex-row md:items-center md:justify-start gap-0.5 md:gap-2 min-w-0">
              <img
                src={awayTeam?.logo}
                alt={awayTeam?.name}
                className="w-7 h-7 md:w-10 md:h-10 object-contain shrink-0 drop-shadow-lg"
              />
              <div className="font-display text-[#F2E2CE] text-xs md:text-lg lg:text-xl tracking-wide text-center md:text-left leading-tight md:truncate">
                {awayTeam?.name}
              </div>
            </div>
          </div>

          {/* Events - same layout as score */}
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
      {/* Table-style container with full border */}
      <div className="border-2 border-[#1EA4D9]/40 rounded-lg overflow-hidden
                      bg-[#0a1929]
                      shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(30,164,217,0.1)]">

        {/* Header row - integrated into the table */}
        <div className="flex items-center gap-3 px-4 py-3
                        bg-gradient-to-r from-[#1EA4D9] via-[#1a96c7] to-[#1EA4D9]
                        border-b-2 border-[#1EA4D9]/50">
          {league?.logo ? (
            <img src={league.logo} alt={league.name} className="w-7 h-7 object-contain drop-shadow-md" />
          ) : (
            <CountryBadge countryId={league?.country} size={22} />
          )}
          <h3 className="font-display text-[#0a1929] text-xl tracking-wide
                         drop-shadow-[0_1px_0_rgba(255,255,255,0.2)]">
            {league?.name}
          </h3>
          <div className="flex-1 h-px bg-gradient-to-r from-[#0a1929]/20 to-transparent ml-2" />
          <span className="font-condensed text-[#0a1929] text-xs tracking-wider">
            {matchList.length} {matchList.length === 1 ? 'PARTIDO' : 'PARTIDOS'}
          </span>
        </div>

        {/* Matches container - inside the table */}
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
              ${isSelected
                ? 'bg-[#1EA4D9] text-[#0a1929] shadow-lg'
                : 'bg-[#0a1929]/50 text-[#F2E2CE]/60 hover:bg-[#0a1929]/80'}
              ${isToday && !isSelected ? 'ring-2 ring-[#1EA4D9]/50' : ''}
            `}
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
    <div className="bg-[#0a1929]/80 rounded-lg p-4 border-2 border-[#1EA4D9]/20">
      <div className="mb-6 border-2 border-[#1EA4D9]/30 rounded-lg overflow-hidden">
        <div className="flex items-center gap-2 text-[#1EA4D9] py-2.5 px-3 bg-[#1EA4D9]/20">
          <span className="font-display text-lg uppercase tracking-wide font-semibold">Destacados</span>
        </div>
        <div className="divide-y divide-[#1EA4D9]/20">
          {featured.map(league => (
            <button
              key={league.id}
              onClick={() => onLeagueSelect(league.id)}
              className={`
                w-full flex items-center gap-3 px-3 py-1.5 text-left transition-colors cursor-pointer
                ${selectedLeague === league.id
                  ? 'bg-[#1EA4D9] text-[#0a1929] font-semibold'
                  : 'text-white/90 hover:bg-[#1EA4D9]/20'}
              `}
            >
              <motion.span
                whileHover={{ x: 4 }}
                className="font-condensed text-base"
              >
                {league.name}
              </motion.span>
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-[#1EA4D9]/20 pt-4">
        <h4 className="font-display text-[#F2E2CE]/60 text-base mb-3 tracking-wide">
          POR PAÍS
        </h4>
        {countries.map(country => {
          const countryLeagues = getLeaguesByCountry(country.id);
          if (countryLeagues.length === 0) return null;

          return (
            <div key={country.id} className="mb-3 border border-[#1EA4D9]/20 rounded-lg overflow-hidden">
              <div className="flex items-center gap-2 text-[#1EA4D9] text-sm py-2 px-3 bg-[#1EA4D9]/10">
                <CountryBadge countryId={country.id} size={16} />
                <span className="font-condensed uppercase tracking-wider font-semibold">{country.name}</span>
              </div>
              <div className="divide-y divide-[#1EA4D9]/20">
                {countryLeagues.map(league => (
                  <button
                    key={league.id}
                    onClick={() => onLeagueSelect(league.id)}
                    className={`
                      block text-left w-full px-3 py-1.5 transition-colors cursor-pointer
                      ${selectedLeague === league.id
                        ? 'text-[#1EA4D9] bg-[#1EA4D9]/10 font-semibold'
                        : 'text-white/90 hover:bg-[#1EA4D9]/20'}
                    `}
                  >
                    <motion.span
                      whileHover={{ x: 4 }}
                      className="block text-base font-condensed"
                    >
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

export default function Design6({ showLiveTicker = true, tickerPosition = 'top' }) {
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
    <div className="min-h-screen bg-[#0c1520]">

      {/* Header */}
      <header className="relative overflow-hidden border-b-2 border-[#1EA4D9]">
        {/* Light beams */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-32 h-full bg-gradient-to-b from-[#1EA4D9]/10 to-transparent
                          transform -skew-x-12" />
          <div className="absolute top-0 right-1/3 w-24 h-full bg-gradient-to-b from-[#23B7D9]/5 to-transparent
                          transform skew-x-6" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-2 md:py-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center mb-2 md:mb-4"
          >
            {/* Logo + Title row */}
            <div className="flex items-center gap-4">
              <PizarraLogo
                size={64}
                color="#F2E2CE"
                accentColor="#1EA4D9"
                animated={false}
              />
              <h1 className="font-display text-[#1EA4D9] text-5xl md:text-6xl tracking-wider
                             drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
                LA PIZARRA
              </h1>
            </div>

            {/* Tagline centered below */}
            <p className="font-condensed text-[#F2E2CE]/50 text-[10px] md:text-xs tracking-[0.4em] uppercase -mt-1 md:mt-1">
              La página de la pelotita
            </p>
          </motion.div>

          {/* Date Selector */}
          <DateSelector selectedDate={selectedDate} onDateChange={setSelectedDate} />
        </div>
      </header>

      {/* Live Matches Ticker - Top position */}
      {showLiveTicker && tickerPosition === 'top' && liveMatches.length > 0 && (
        <div className="bg-[#A8503E] border-b-2 border-[#1EA4D9]/50 overflow-hidden">
          <div className="flex items-stretch relative">
            <div className="bg-[#0a1929] px-4 flex items-center gap-2 shrink-0 relative z-10">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-red-500"
              />
              <span className="font-display text-white text-sm tracking-wider">EN VIVO</span>
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
                  <span key={idx} className="font-condensed text-white text-sm flex items-center">
                    {/* Separador vertical */}
                    <span className="h-6 w-px bg-[#F2E2CE]/40 mx-8" />
                    {/* Minuto */}
                    <span className="text-[#F2E2CE]/60 mr-3">{match.minute}'</span>
                    {/* Contenido del partido */}
                    {home?.name}
                    <img src={home?.logo} alt="" className="w-5 h-5 object-contain mx-1.5" />
                    <span className="font-bold text-[#F2E2CE]">{match.homeScore} - {match.awayScore}</span>
                    <img src={away?.logo} alt="" className="w-5 h-5 object-contain mx-1.5" />
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
        {/* Tactical Background - full width */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ transform: 'translateZ(0)' }}
        >
          <TacticalBackground
            variant="minimal"
            opacity={0.06}
            animated={false}
            color="#1EA4D9"
          />
          <TacticalElements
            opacity={0.10}
            color="#1EA4D9"
          />
        </div>

        {/* Content container */}
        <div className="relative z-10 max-w-7xl mx-auto px-2 md:px-4 pt-0 pb-2 md:py-8">
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-8">
            {/* Desktop sidebar */}
            <aside className="hidden lg:block lg:w-72 shrink-0 order-1">
              <LeaguesSidebar
                selectedLeague={selectedLeague}
                onLeagueSelect={(id) => setSelectedLeague(id === selectedLeague ? null : id)}
              />
            </aside>

            {/* Mobile sidebar (Sheet drawer) */}
            <MobileSidebar selectedLeague={selectedLeague} variant="travel" bottomOffset={tickerPosition === 'bottom' && showLiveTicker && liveMatches.length > 0}>
              <LeaguesSidebar
                selectedLeague={selectedLeague}
                onLeagueSelect={(id) => setSelectedLeague(id === selectedLeague ? null : id)}
              />
            </MobileSidebar>
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
                  <Landmark size={64} className="mx-auto mb-4 text-[#F2E2CE]/40" />
                  <p className="font-display text-[#F2E2CE]/40 text-xl">
                    NO HAY PARTIDOS
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`border-t-2 border-[#1EA4D9]/30 mt-12 py-6 ${tickerPosition === 'bottom' && showLiveTicker && liveMatches.length > 0 ? 'pb-16' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-condensed text-[#F2E2CE]/30 text-sm tracking-wider">
            LA PIZARRA © 2025 • TODOS LOS DERECHOS RESERVADOS
          </p>
        </div>
      </footer>

      {/* Live Matches Ticker - Bottom position (fixed) */}
      {showLiveTicker && tickerPosition === 'bottom' && liveMatches.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#A8503E] border-t-2 border-[#1EA4D9]/50 overflow-hidden shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
          <div className="flex items-stretch relative">
            <div className="bg-[#0a1929] px-4 flex items-center gap-2 shrink-0 relative z-10">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-red-500"
              />
              <span className="font-display text-white text-sm tracking-wider">EN VIVO</span>
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
                  <span key={idx} className="font-condensed text-white text-sm flex items-center">
                    <span className="h-6 w-px bg-[#F2E2CE]/40 mx-8" />
                    <span className="text-[#F2E2CE]/60 mr-3">{match.minute}'</span>
                    {home?.name}
                    <img src={home?.logo} alt="" className="w-5 h-5 object-contain mx-1.5" />
                    <span className="font-bold text-[#F2E2CE]">{match.homeScore} - {match.awayScore}</span>
                    <img src={away?.logo} alt="" className="w-5 h-5 object-contain mx-1.5" />
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
