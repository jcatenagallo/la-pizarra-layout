// Design 1: RETRO STADIUM SCOREBOARD
// Aesthetic: Vintage 70s-80s stadium scoreboard with warm ochre, grass green,
// mechanical flip-board style, worn textures, and analog sports broadcast feel

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  matches, leagues, countries, teams,
  getMatchesByStatus, getLeague, getTeam, getCountry,
  groupMatchesByLeague, getFeaturedLeagues, getLeaguesByCountry
} from '../data/matches';
import { TacticalBackground } from '../components/TacticalBackground';
import { TacticalElements } from '../components/TacticalElements';
import { PizarraLogo } from '../components/Logo';
import { CountryBadge } from '../components/CountryBadge';

const FlipDigit = ({ digit, delay = 0 }) => (
  <motion.div
    initial={{ rotateX: -90, opacity: 0 }}
    animate={{ rotateX: 0, opacity: 1 }}
    transition={{ duration: 0.4, delay }}
    className="relative bg-stadium-night text-stadium-ochre font-display text-xl md:text-2xl
               w-8 md:w-9 h-8 md:h-9 flex items-center justify-center
               rounded-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),0_4px_8px_rgba(0,0,0,0.3)]
               border-t border-stadium-ochre/20"
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
      <div className="flex gap-1">
        {homeDigits.map((d, i) => <FlipDigit key={`h${i}`} digit={d} delay={i * 0.1} />)}
      </div>
      <motion.span
        className="text-stadium-chalk text-xl md:text-2xl font-display"
        animate={isLive ? { opacity: [1, 0.3, 1] } : {}}
        transition={{ duration: 1, repeat: Infinity }}
      >
        -
      </motion.span>
      <div className="flex gap-1">
        {awayDigits.map((d, i) => <FlipDigit key={`a${i}`} digit={d} delay={0.3 + i * 0.1} />)}
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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative bg-gradient-to-br from-[#1a5c2a] via-[#147024] to-[#0d4a1a]
                 rounded-md px-2 py-1.5 md:px-3 md:py-2 overflow-hidden group
                 border border-stadium-ochre/30 shadow-lg"
    >
      {/* Grass texture */}
      <div className="absolute inset-0 opacity-30"
           style={{
             backgroundImage: `repeating-linear-gradient(
               90deg,
               transparent,
               transparent 2px,
               rgba(0,0,0,0.1) 2px,
               rgba(0,0,0,0.1) 4px
             )`
           }} />

      {/* Stadium lights effect */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40
                      bg-stadium-ochre/20 rounded-full blur-3xl" />

      <div className="relative z-10 flex items-center gap-3">
        {/* Match time/status - Left side */}
        <div className="w-14 shrink-0 text-center">
          {isLive ? (
            <div className="flex flex-col items-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-stadium-red shadow-[0_0_8px_rgba(196,69,54,0.8)] mb-0.5"
              />
              <span className="font-condensed text-white font-bold text-base">
                {match.minute}'
              </span>
            </div>
          ) : isFinished ? (
            <span className="font-condensed text-stadium-ochre text-xs tracking-widest">
              FINAL
            </span>
          ) : (
            <span className="font-mono text-stadium-chalk/70 text-sm">
              {match.time}
            </span>
          )}
        </div>

        {/* Teams and Score */}
        <div className="flex-1 flex items-center justify-center gap-3 md:gap-4">
          {/* Home Team */}
          <div className="flex-1 flex items-center justify-end gap-2 min-w-0">
            <div className="font-display text-stadium-chalk text-sm md:text-lg lg:text-xl tracking-wide truncate">
              {homeTeam?.name}
            </div>
            <img
              src={homeTeam?.logo}
              alt={homeTeam?.name}
              className="w-8 h-8 md:w-10 md:h-10 object-contain shrink-0 drop-shadow-lg"
            />
          </div>

          {/* Score */}
          <div className="px-2 shrink-0">
            <ScoreDisplay home={match.homeScore} away={match.awayScore} isLive={isLive} />
          </div>

          {/* Away Team */}
          <div className="flex-1 flex items-center justify-start gap-2 min-w-0">
            <img
              src={awayTeam?.logo}
              alt={awayTeam?.name}
              className="w-8 h-8 md:w-10 md:h-10 object-contain shrink-0 drop-shadow-lg"
            />
            <div className="font-display text-stadium-chalk text-sm md:text-lg lg:text-xl tracking-wide truncate">
              {awayTeam?.name}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const LeagueSection = ({ leagueId, matchList }) => {
  const league = getLeague(leagueId);
  const country = getCountry(league?.country);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mb-8"
    >
      <div className="flex items-center gap-2 mb-2 pb-1 border-b border-stadium-ochre/30">
        <CountryBadge countryId={league?.country} size={20} />
        <h3 className="font-display text-white text-lg tracking-wide">
          {league?.name}
        </h3>
      </div>
      <div className="grid gap-2">
        {matchList.map((match, idx) => (
          <MatchCard key={match.id} match={match} index={idx} />
        ))}
      </div>
    </motion.div>
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
    <div className="flex items-center justify-center gap-1 md:gap-1.5 overflow-x-auto">
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
              flex flex-col items-center px-2.5 py-1.5 md:px-3 md:py-2 rounded-md transition-all
              font-condensed min-w-[50px]
              ${isSelected
                ? 'bg-stadium-ochre text-stadium-night shadow-lg'
                : 'bg-stadium-night/50 text-stadium-chalk/60 hover:bg-stadium-night/80'}
              ${isToday && !isSelected ? 'ring-2 ring-stadium-ochre/50' : ''}
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
    <div className="bg-stadium-night/80 rounded-lg p-4 border-2 border-stadium-ochre/20">
      <h3 className="font-display text-stadium-ochre text-xl mb-4 tracking-wide flex items-center gap-2">
        <span>⭐</span> DESTACADOS
      </h3>
      <div className="space-y-2 mb-6">
        {featured.map(league => {
          const country = getCountry(league.country);
          return (
            <motion.button
              key={league.id}
              whileHover={{ x: 4 }}
              onClick={() => onLeagueSelect(league.id)}
              className={`
                w-full flex items-center gap-3 px-3 py-2 rounded text-left transition-colors
                ${selectedLeague === league.id
                  ? 'bg-stadium-ochre text-stadium-night'
                  : 'hover:bg-stadium-ochre/20 text-stadium-chalk/80'}
              `}
            >
              <CountryBadge countryId={league.country} size={16} />
              <span className="font-condensed text-sm">{league.name}</span>
            </motion.button>
          );
        })}
      </div>

      <div className="border-t border-stadium-ochre/20 pt-4">
        <h4 className="font-display text-stadium-chalk/60 text-sm mb-3 tracking-wide">
          POR PAÍS
        </h4>
        {countries.map(country => {
          const countryLeagues = getLeaguesByCountry(country.id);
          if (countryLeagues.length === 0) return null;

          return (
            <div key={country.id} className="mb-3">
              <div className="flex items-center gap-2 text-stadium-chalk/40 text-xs mb-1">
                <CountryBadge countryId={country.id} size={14} />
                <span className="font-condensed uppercase tracking-wider">{country.name}</span>
              </div>
              <div className="ml-6 space-y-1">
                {countryLeagues.map(league => (
                  <motion.button
                    key={league.id}
                    whileHover={{ x: 2 }}
                    onClick={() => onLeagueSelect(league.id)}
                    className={`
                      block text-left text-sm font-condensed w-full px-2 py-1 rounded transition-colors
                      ${selectedLeague === league.id
                        ? 'text-stadium-ochre bg-stadium-ochre/10'
                        : 'text-stadium-chalk/50 hover:text-stadium-chalk/80'}
                    `}
                  >
                    {league.name}
                  </motion.button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function Design1() {
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
    <div className="min-h-screen bg-[#14100e]">

      {/* Header */}
      <header className="relative overflow-hidden border-b-2 border-stadium-ochre">
        {/* Stadium light beams */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-32 h-full bg-gradient-to-b from-stadium-ochre/10 to-transparent
                          transform -skew-x-12" />
          <div className="absolute top-0 right-1/3 w-24 h-full bg-gradient-to-b from-stadium-ochre/5 to-transparent
                          transform skew-x-6" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-3 md:py-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center mb-4"
          >
            {/* Logo + Title row */}
            <div className="flex items-center gap-4">
              <PizarraLogo
                size={64}
                color="#F5F0E6"
                accentColor="#D4A03D"
                animated={false}
              />
              <h1 className="font-display text-stadium-ochre text-5xl md:text-6xl tracking-wider
                             drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
                LA PIZARRA
              </h1>
            </div>

            {/* Tagline centered below */}
            <p className="font-condensed text-stadium-chalk/50 text-[10px] md:text-xs tracking-[0.4em] uppercase mt-1">
              La página de la pelotita
            </p>
          </motion.div>

          {/* Date Selector */}
          <DateSelector selectedDate={selectedDate} onDateChange={setSelectedDate} />
        </div>
      </header>

      {/* Live Matches Ticker */}
      {liveMatches.length > 0 && (
        <div className="bg-stadium-red border-y-2 border-stadium-ochre/50 overflow-hidden">
          <div className="flex items-center relative">
            <div className="bg-stadium-night px-4 py-2 flex items-center gap-2 shrink-0 relative z-10">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-white"
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
                    <span className="h-6 w-px bg-stadium-ochre/50 mx-8" />
                    {/* Minuto */}
                    <span className="text-stadium-chalk/60 mr-3">{match.minute}'</span>
                    {/* Contenido del partido */}
                    {home?.name}
                    <img src={home?.logo} alt="" className="w-5 h-5 object-contain mx-1.5" />
                    <span className="font-bold text-stadium-ochre">{match.homeScore} - {match.awayScore}</span>
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
            opacity={0.08}
            animated={false}
            color="#D4A03D"
          />
          <TacticalElements
            opacity={0.12}
            color="#D4A03D"
          />
        </div>

        {/* Content container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-72 shrink-0 order-2 lg:order-1">
            <LeaguesSidebar
              selectedLeague={selectedLeague}
              onLeagueSelect={(id) => setSelectedLeague(id === selectedLeague ? null : id)}
            />
          </aside>

          {/* Matches */}
          <div className="flex-1 order-1 lg:order-2">
            {/* Tabs - Hidden for now
            <div className="flex gap-2 mb-6 flex-wrap">
              {[
                { id: 'all', label: 'TODOS', count: matches.length },
                { id: 'live', label: 'EN VIVO', count: liveMatches.length },
                { id: 'upcoming', label: 'PRÓXIMOS', count: upcomingMatches.length },
                { id: 'finished', label: 'FINALIZADOS', count: finishedMatches.length },
              ].map(tab => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    px-4 py-2 rounded-lg font-condensed text-sm tracking-wider transition-all
                    flex items-center gap-2
                    ${activeTab === tab.id
                      ? 'bg-stadium-ochre text-stadium-night shadow-lg'
                      : 'bg-stadium-night/50 text-stadium-chalk/60 hover:bg-stadium-night/80'}
                  `}
                >
                  {tab.label}
                  <span className={`
                    text-xs px-2 py-0.5 rounded-full
                    ${activeTab === tab.id ? 'bg-stadium-night/20' : 'bg-stadium-ochre/20'}
                  `}>
                    {tab.count}
                  </span>
                </motion.button>
              ))}
            </div>
            */}

            {/* Match List */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeTab}-${selectedLeague}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {Object.entries(groupedMatches).map(([leagueId, leagueMatches]) => (
                  <LeagueSection
                    key={leagueId}
                    leagueId={leagueId}
                    matchList={leagueMatches}
                  />
                ))}

                {Object.keys(groupedMatches).length === 0 && (
                  <div className="text-center py-16">
                    <span className="text-6xl mb-4 block">🏟️</span>
                    <p className="font-display text-stadium-chalk/40 text-xl">
                      NO HAY PARTIDOS
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-stadium-ochre/30 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-condensed text-stadium-chalk/30 text-sm tracking-wider">
            LA PIZARRA © 2025 • TODOS LOS DERECHOS RESERVADOS
          </p>
        </div>
      </footer>
    </div>
  );
}
