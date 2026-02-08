// Design 1 Variant 1: TIZA CLÁSICA
// Efecto de tiza blanca simple con textura irregular y marco completo

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Landmark } from 'lucide-react';
import {
  matches, leagues, countries,
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
      <div className="absolute inset-0 opacity-30"
           style={{
             backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)`
           }} />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-stadium-ochre/20 rounded-full blur-3xl" />

      <div className="relative z-10 flex items-center gap-3">
        <div className="w-14 shrink-0 text-center">
          {isLive ? (
            <div className="flex flex-col items-center">
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-stadium-red shadow-[0_0_8px_rgba(196,69,54,0.8)] mb-0.5"
              />
              <span className="font-condensed text-white font-bold text-base">{match.minute}'</span>
            </div>
          ) : isFinished ? (
            <span className="font-condensed text-stadium-ochre text-xs tracking-widest">FINAL</span>
          ) : (
            <span className="font-mono text-stadium-chalk/70 text-sm">{match.time}</span>
          )}
        </div>

        <div className="flex-1 flex items-center justify-center gap-3 md:gap-4">
          <div className="flex-1 flex items-center justify-end gap-2 min-w-0">
            <div className="font-display text-stadium-chalk text-sm md:text-lg lg:text-xl tracking-wide truncate">
              {homeTeam?.name}
            </div>
            <img src={homeTeam?.logo} alt={homeTeam?.name} className="w-8 h-8 md:w-10 md:h-10 object-contain shrink-0 drop-shadow-lg" />
          </div>
          <div className="px-2 shrink-0">
            <ScoreDisplay home={match.homeScore} away={match.awayScore} isLive={isLive} />
          </div>
          <div className="flex-1 flex items-center justify-start gap-2 min-w-0">
            <img src={awayTeam?.logo} alt={awayTeam?.name} className="w-8 h-8 md:w-10 md:h-10 object-contain shrink-0 drop-shadow-lg" />
            <div className="font-display text-stadium-chalk text-sm md:text-lg lg:text-xl tracking-wide truncate">
              {awayTeam?.name}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Componente de línea de tiza clásica
const ChalkLine = ({ className = "", vertical = false }) => (
  <div
    className={`${vertical ? 'w-[3px]' : 'h-[3px]'} ${className}`}
    style={{
      background: vertical
        ? 'linear-gradient(180deg, transparent 0%, rgba(245,240,230,0.3) 5%, rgba(245,240,230,0.85) 20%, rgba(245,240,230,0.95) 50%, rgba(245,240,230,0.8) 80%, rgba(245,240,230,0.3) 95%, transparent 100%)'
        : 'linear-gradient(90deg, transparent 0%, rgba(245,240,230,0.3) 5%, rgba(245,240,230,0.85) 20%, rgba(245,240,230,0.95) 50%, rgba(245,240,230,0.8) 80%, rgba(245,240,230,0.3) 95%, transparent 100%)',
    }}
  />
);

// Marco de tiza completo
const ChalkFrame = ({ children, className = "" }) => (
  <div className={`relative ${className}`}>
    {/* Bordes de tiza */}
    <div className="absolute top-0 left-0 right-0 h-[3px]" style={{
      background: 'linear-gradient(90deg, transparent 0%, rgba(245,240,230,0.4) 5%, rgba(245,240,230,0.9) 15%, rgba(245,240,230,0.95) 50%, rgba(245,240,230,0.9) 85%, rgba(245,240,230,0.4) 95%, transparent 100%)'
    }} />
    <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{
      background: 'linear-gradient(90deg, transparent 0%, rgba(245,240,230,0.4) 5%, rgba(245,240,230,0.9) 15%, rgba(245,240,230,0.95) 50%, rgba(245,240,230,0.9) 85%, rgba(245,240,230,0.4) 95%, transparent 100%)'
    }} />
    <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{
      background: 'linear-gradient(180deg, transparent 0%, rgba(245,240,230,0.4) 5%, rgba(245,240,230,0.9) 15%, rgba(245,240,230,0.95) 50%, rgba(245,240,230,0.9) 85%, rgba(245,240,230,0.4) 95%, transparent 100%)'
    }} />
    <div className="absolute right-0 top-0 bottom-0 w-[3px]" style={{
      background: 'linear-gradient(180deg, transparent 0%, rgba(245,240,230,0.4) 5%, rgba(245,240,230,0.9) 15%, rgba(245,240,230,0.95) 50%, rgba(245,240,230,0.9) 85%, rgba(245,240,230,0.4) 95%, transparent 100%)'
    }} />
    <div className="p-6">{children}</div>
  </div>
);

const LeagueSection = ({ leagueId, matchList }) => {
  const league = getLeague(leagueId);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <CountryBadge countryId={league?.country} size={20} />
        <h3 className="font-display text-white text-lg tracking-wide">{league?.name}</h3>
      </div>
      <ChalkLine className="mb-3" />
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
  const formatDayName = (date) => ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'][date.getDay()];

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
            className={`flex flex-col items-center px-2.5 py-1.5 md:px-3 md:py-2 rounded-md transition-all font-condensed min-w-[50px]
              ${isSelected ? 'bg-stadium-ochre text-stadium-night shadow-lg' : 'bg-stadium-night/50 text-stadium-chalk/60 hover:bg-stadium-night/80'}
              ${isToday && !isSelected ? 'ring-2 ring-stadium-ochre/50' : ''}`}
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
    <div className="relative">
      {/* Marco de tiza para el sidebar */}
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{
        background: 'linear-gradient(90deg, transparent 0%, rgba(245,240,230,0.8) 10%, rgba(245,240,230,0.9) 50%, rgba(245,240,230,0.8) 90%, transparent 100%)'
      }} />
      <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{
        background: 'linear-gradient(90deg, transparent 0%, rgba(245,240,230,0.8) 10%, rgba(245,240,230,0.9) 50%, rgba(245,240,230,0.8) 90%, transparent 100%)'
      }} />
      <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{
        background: 'linear-gradient(180deg, transparent 0%, rgba(245,240,230,0.8) 10%, rgba(245,240,230,0.9) 50%, rgba(245,240,230,0.8) 90%, transparent 100%)'
      }} />
      <div className="absolute right-0 top-0 bottom-0 w-[3px]" style={{
        background: 'linear-gradient(180deg, transparent 0%, rgba(245,240,230,0.8) 10%, rgba(245,240,230,0.9) 50%, rgba(245,240,230,0.8) 90%, transparent 100%)'
      }} />

      <div className="bg-stadium-night/60 rounded-lg p-4">
        <h3 className="font-display text-stadium-ochre text-xl mb-4 tracking-wide flex items-center gap-2">
          DESTACADOS
        </h3>
        <div className="space-y-2 mb-6">
          {featured.map(league => (
            <motion.button
              key={league.id}
              whileHover={{ x: 4 }}
              onClick={() => onLeagueSelect(league.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded text-left transition-colors
                ${selectedLeague === league.id ? 'bg-stadium-ochre text-stadium-night' : 'hover:bg-stadium-ochre/20 text-stadium-chalk/80'}`}
            >
              <span className="font-condensed text-sm">{league.name}</span>
            </motion.button>
          ))}
        </div>

        <ChalkLine className="my-4" />

        <h4 className="font-display text-stadium-chalk/60 text-sm mb-3 tracking-wide">POR PAÍS</h4>
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
                    className={`block text-left text-sm font-condensed w-full px-2 py-1 rounded transition-colors
                      ${selectedLeague === league.id ? 'text-stadium-ochre bg-stadium-ochre/10' : 'text-stadium-chalk/50 hover:text-stadium-chalk/80'}`}
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

export default function Design1V1() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  const liveMatches = getMatchesByStatus('live');

  const getFilteredMatches = () => {
    let filtered = matches;
    if (selectedLeague) filtered = filtered.filter(m => m.league === selectedLeague);
    if (activeTab === 'live') return filtered.filter(m => m.status === 'live');
    if (activeTab === 'upcoming') return filtered.filter(m => m.status === 'upcoming');
    if (activeTab === 'finished') return filtered.filter(m => m.status === 'finished');
    return filtered;
  };

  const groupedMatches = groupMatchesByLeague(getFilteredMatches());

  return (
    <div className="min-h-screen bg-[#14100e]">
      <header className="relative overflow-hidden border-b-2 border-stadium-ochre">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-32 h-full bg-gradient-to-b from-stadium-ochre/10 to-transparent transform -skew-x-12" />
          <div className="absolute top-0 right-1/3 w-24 h-full bg-gradient-to-b from-stadium-ochre/5 to-transparent transform skew-x-6" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-3 md:py-4">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center mb-4">
            <div className="flex items-center gap-4">
              <PizarraLogo size={64} color="#F5F0E6" accentColor="#D4A03D" animated={false} />
              <h1 className="font-display text-stadium-ochre text-5xl md:text-6xl tracking-wider drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
                LA PIZARRA
              </h1>
            </div>
            <p className="font-condensed text-stadium-chalk/50 text-[10px] md:text-xs tracking-[0.4em] uppercase mt-1">
              La página de la pelotita
            </p>
          </motion.div>
          <DateSelector selectedDate={selectedDate} onDateChange={setSelectedDate} />
        </div>
      </header>

      {liveMatches.length > 0 && (
        <div className="bg-stadium-red border-y-2 border-stadium-ochre/50 overflow-hidden">
          <div className="flex items-center relative">
            <div className="bg-stadium-night px-4 py-2 flex items-center gap-2 shrink-0 relative z-10">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5, repeat: Infinity }} className="w-2 h-2 rounded-full bg-white" />
              <span className="font-display text-white text-sm tracking-wider">EN VIVO</span>
            </div>
            <motion.div animate={{ x: [0, -2000] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="flex items-center gap-0 px-4 py-2 whitespace-nowrap">
              {[...liveMatches, ...liveMatches].map((match, idx) => {
                const home = getTeam(match.homeTeam);
                const away = getTeam(match.awayTeam);
                return (
                  <span key={idx} className="font-condensed text-white text-sm flex items-center">
                    <span className="h-6 w-px bg-stadium-ochre/50 mx-8" />
                    <span className="text-stadium-chalk/60 mr-3">{match.minute}'</span>
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

      <main className="relative">
        <div className="absolute inset-0 pointer-events-none" style={{ transform: 'translateZ(0)' }}>
          <TacticalBackground variant="minimal" opacity={0.08} animated={false} color="#D4A03D" />
          <TacticalElements opacity={0.12} color="#D4A03D" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop sidebar */}
            <aside className="hidden lg:block lg:w-72 shrink-0 order-1">
              <LeaguesSidebar selectedLeague={selectedLeague} onLeagueSelect={(id) => setSelectedLeague(id === selectedLeague ? null : id)} />
            </aside>

            {/* Mobile sidebar (Sheet drawer) */}
            <MobileSidebar selectedLeague={selectedLeague}>
              <LeaguesSidebar selectedLeague={selectedLeague} onLeagueSelect={(id) => setSelectedLeague(id === selectedLeague ? null : id)} />
            </MobileSidebar>

            <div className="flex-1 lg:order-2">
              {/* Marco de tiza completo para todos los partidos */}
              <ChalkFrame>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeTab}-${selectedLeague}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {Object.entries(groupedMatches).map(([leagueId, leagueMatches]) => (
                      <LeagueSection key={leagueId} leagueId={leagueId} matchList={leagueMatches} />
                    ))}
                    {Object.keys(groupedMatches).length === 0 && (
                      <div className="text-center py-16">
                        <Landmark size={64} className="mx-auto mb-4 text-stadium-chalk/40" />
                        <p className="font-display text-stadium-chalk/40 text-xl">NO HAY PARTIDOS</p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </ChalkFrame>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t-2 border-stadium-ochre/30 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-condensed text-stadium-chalk/30 text-sm tracking-wider">LA PIZARRA © 2025 • TODOS LOS DERECHOS RESERVADOS</p>
        </div>
      </footer>
    </div>
  );
}
