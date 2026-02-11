// Design 12: COMPACT STADIUM SCOREBOARD
// Aesthetic: Same retro stadium as Design1 with compact match layout

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Landmark } from "lucide-react";
import {
  matches,
  leagues,
  countries,
  teams,
  getMatchesByStatus,
  getLeague,
  getTeam,
  getCountry,
  groupMatchesByLeague,
  getFeaturedLeagues,
  getLeaguesByCountry,
} from "../data/matches";
import { TacticalBackground } from "../components/TacticalBackground";
import { TacticalElements } from "../components/TacticalElements";
import { PizarraLogo } from "../components/Logo";
import { CountryBadge } from "../components/CountryBadge";
import { MobileSidebar } from "../components/MobileSidebar";

const FlipDigit = ({ digit, delay = 0 }) => (
  <motion.div
    initial={{ rotateX: -90, opacity: 0 }}
    animate={{ rotateX: 0, opacity: 1 }}
    transition={{ duration: 0.4, delay }}
    className="relative bg-stadium-night text-stadium-ochre font-display text-lg md:text-xl
               w-7 md:w-8 h-7 md:h-8 flex items-center justify-center
               rounded-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),0_4px_8px_rgba(0,0,0,0.3)]
               border-t border-stadium-ochre/20"
    style={{ perspective: "500px", transformStyle: "preserve-3d" }}
  >
    <span className="drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">{digit}</span>
    <div className="absolute inset-x-0 top-1/2 h-px bg-black/50" />
    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
  </motion.div>
);

const ScoreDisplay = ({ home, away }) => {
  const homeDigits = String(home ?? "-")
    .padStart(1, "0")
    .split("");
  const awayDigits = String(away ?? "-")
    .padStart(1, "0")
    .split("");

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <div className="flex gap-0.5 md:gap-1">
        {homeDigits.map((d, i) => (
          <FlipDigit key={`h${i}`} digit={d} delay={i * 0.1} />
        ))}
      </div>
      <span className="text-stadium-chalk text-lg md:text-xl font-display">
        -
      </span>
      <div className="flex gap-0.5 md:gap-1">
        {awayDigits.map((d, i) => (
          <FlipDigit key={`a${i}`} digit={d} delay={i * 0.1} />
        ))}
      </div>
    </div>
  );
};

// Compact horizontal goals row
const MatchGoalsRow = ({ events }) => {
  if (!events || events.length === 0) return null;

  const goals = events
    .filter((e) => e.type === "goal")
    .sort((a, b) => a.minute - b.minute);
  if (goals.length === 0) return null;

  const homeGoals = goals.filter((e) => e.team === "home");
  const awayGoals = goals.filter((e) => e.team === "away");

  const GoalChip = ({ goal }) => (
    <span className="font-condensed text-white text-xs md:text-sm whitespace-nowrap">
      {goal.player} <span className="text-[#F0C850]">{goal.minute}'</span>
    </span>
  );

  return (
    <div className="border-t border-white/10 relative z-10">
      <div className="flex items-center px-2 md:px-4 py-0.5 md:py-1">
        {/* Home goals — right-aligned */}
        <div className="flex-1 flex items-center justify-end gap-1 md:gap-2 flex-wrap">
          {homeGoals.map((g, i) => (
            <GoalChip key={i} goal={g} />
          ))}
        </div>

        {/* Center spacer — matches score width */}
        <div className="w-[70px] md:w-[90px] flex justify-center shrink-0">
          <span className="text-stadium-ochre/30 text-[6px]">●</span>
        </div>

        {/* Away goals — left-aligned */}
        <div className="flex-1 flex items-center justify-start gap-1 md:gap-2 flex-wrap">
          {awayGoals.map((g, i) => (
            <GoalChip key={i} goal={g} />
          ))}
        </div>
      </div>
    </div>
  );
};

const cardGreens = {
  original: "from-[#1a5629] via-[#145d23] to-[#0d431a]",
  cancha: "from-[#2D5E4A] via-[#275545] to-[#1f4838]",
};

const MatchCard = ({ match, index, cardGreen = "original" }) => {
  const homeTeam = getTeam(match.homeTeam);
  const awayTeam = getTeam(match.awayTeam);
  const isLive = match.status === "live";
  const isFinished = match.status === "finished";
  const homeRedCards = (match.events || []).filter(
    (e) => e.type === "redCard" && e.team === "home",
  ).length;
  const awayRedCards = (match.events || []).filter(
    (e) => e.type === "redCard" && e.team === "away",
  ).length;

  return (
    <div
      className={`relative rounded-none md:rounded-xl overflow-hidden
                 border-x-0 md:border-x-2 border-y border-stadium-ochre/40 md:shadow-lg
                 bg-gradient-to-br ${cardGreens[cardGreen]}`}
    >
      {/* Grass texture - covers entire card */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
               90deg,
               transparent,
               transparent 2px,
               rgba(0,0,0,0.1) 2px,
               rgba(0,0,0,0.1) 4px
             )`,
        }}
      />

      {/* Main row */}
      <div className="flex items-stretch">
        {/* Time/Status section - Left */}
        <div
          className="relative z-10 w-11 md:w-16 shrink-0 flex flex-col items-center justify-center
                        border-r-2 border-stadium-ochre/40 py-1.5 md:py-2"
        >
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
          <div className="relative z-10 flex items-center justify-center gap-1 md:gap-2 px-2 py-1.5 md:px-4 md:py-2">
            {/* Home Team */}
            <div className="relative flex-1 flex flex-row items-center justify-end gap-1.5 md:gap-2 min-w-0">
              <div className="font-display font-semibold text-stadium-chalk text-xs md:text-lg lg:text-xl tracking-wider text-right leading-tight truncate">
                {homeTeam?.name}
              </div>
              <div className="relative shrink-0">
                <img
                  src={homeTeam?.logo}
                  alt={homeTeam?.name}
                  className="w-5 h-5 md:w-8 md:h-8 object-contain drop-shadow-lg"
                />
                {homeRedCards > 0 && (
                  <div className="absolute -top-2 -right-0.5 md:-top-1 md:-left-2 flex gap-[2px]">
                    {Array.from({ length: homeRedCards }).map((_, i) => (
                      <div
                        key={i}
                        className="w-[4px] h-[5px] md:w-[6px] md:h-[8px] bg-red-600 rounded-[0.5px]
                                               shadow-[0_0_3px_rgba(220,38,38,0.5)]"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Score */}
            <div className="shrink-0">
              <ScoreDisplay home={match.homeScore} away={match.awayScore} />
            </div>

            {/* Away Team */}
            <div className="relative flex-1 flex flex-row items-center justify-start gap-1.5 md:gap-2 min-w-0">
              <div className="relative shrink-0">
                <img
                  src={awayTeam?.logo}
                  alt={awayTeam?.name}
                  className="w-5 h-5 md:w-8 md:h-8 object-contain drop-shadow-lg"
                />
                {awayRedCards > 0 && (
                  <div className="absolute -top-2 -left-0.5 md:-top-1 md:-right-2 flex gap-[2px]">
                    {Array.from({ length: awayRedCards }).map((_, i) => (
                      <div
                        key={i}
                        className="w-[4px] h-[5px] md:w-[6px] md:h-[8px] bg-red-600 rounded-[0.5px]
                                               shadow-[0_0_3px_rgba(220,38,38,0.5)]"
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="font-display font-semibold text-stadium-chalk text-xs md:text-lg lg:text-xl tracking-wider text-left leading-tight truncate">
                {awayTeam?.name}
              </div>
            </div>
          </div>

          {/* Goals row — compact horizontal layout, no red cards */}
          <MatchGoalsRow events={match.events} />
        </div>
      </div>
    </div>
  );
};

const LeagueSection = ({ leagueId, matchList, cardGreen }) => {
  const league = getLeague(leagueId);
  const country = getCountry(league?.country);

  return (
    <div className="mb-3 md:mb-6">
      {/* Table-style container with full border — squared */}
      <div
        className="border-2 border-stadium-ochre/40 rounded-lg overflow-hidden
                      bg-stadium-night
                      shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(212,160,61,0.1)]"
      >
        {/* Header row - compact */}
        <div
          className="flex items-center gap-2 px-3 py-1.5
                        bg-gradient-to-r from-stadium-ochre via-[#c4942f] to-stadium-ochre
                        border-b-2 border-stadium-ochre/50"
        >
          {league?.logo ? (
            <img
              src={league.logo}
              alt={league.name}
              className="w-5 h-5 object-contain drop-shadow-md"
            />
          ) : (
            <CountryBadge countryId={league?.country} size={16} />
          )}
          <h3
            className="font-display text-stadium-night text-base tracking-wider
                         drop-shadow-[0_1px_0_rgba(255,255,255,0.2)]"
          >
            {league?.name}
          </h3>
          <div className="flex-1 h-px bg-gradient-to-r from-stadium-night/20 to-transparent ml-2" />
          <span className="font-condensed text-stadium-night text-[10px] tracking-widerr">
            {matchList.length} {matchList.length === 1 ? "PARTIDO" : "PARTIDOS"}
          </span>
        </div>

        {/* Matches container - inside the table */}
        <div className="p-0 md:p-3 space-y-1 md:space-y-2">
          {matchList.map((match, idx) => (
            <MatchCard
              key={match.id}
              match={match}
              index={idx}
              cardGreen={cardGreen}
            />
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
    const days = ["DOM", "LUN", "MAR", "MIE", "JUE", "VIE", "SAB"];
    return days[date.getDay()];
  };

  return (
    <div className="flex items-center justify-center gap-1 md:gap-1.5 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
      {dates.map((date, idx) => {
        const dateStr = date.toISOString().split("T")[0];
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
              ${idx === 0 || idx === 6 ? "hidden md:flex" : "flex"}
              ${
                isSelected
                  ? "bg-stadium-ochre text-stadium-night shadow-lg"
                  : "bg-stadium-night/50 text-stadium-chalk/60 hover:bg-stadium-night/80"
              }
              ${isToday && !isSelected ? "ring-2 ring-stadium-ochre/50" : ""}
            `}
          >
            <span className="text-[10px] tracking-widerr">
              {formatDayName(date)}
            </span>
            <span className="text-base md:text-lg font-bold">
              {date.getDate()}
            </span>
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
      <div className="mb-6 border-2 border-stadium-ochre/30 rounded-lg overflow-hidden">
        <div className="flex items-center gap-2 text-stadium-ochre py-2.5 px-3 bg-stadium-ochre/20">
          <span className="font-display text-lg uppercase tracking-wider font-semibold">
            Destacados
          </span>
        </div>
        <div className="divide-y divide-stadium-ochre/20">
          {featured.map((league) => (
            <button
              key={league.id}
              onClick={() => onLeagueSelect(league.id)}
              className={`
                w-full flex items-center gap-3 px-3 py-1.5 text-left transition-colors cursor-pointer
                ${
                  selectedLeague === league.id
                    ? "bg-stadium-ochre text-stadium-night font-semibold"
                    : "text-white/90 hover:bg-stadium-ochre/20"
                }
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

      <div className="border-t border-stadium-ochre/20 pt-4">
        <h4 className="font-display text-stadium-chalk/60 text-base mb-3 tracking-wider">
          POR PAÍS
        </h4>
        {countries.map((country) => {
          const countryLeagues = getLeaguesByCountry(country.id);
          if (countryLeagues.length === 0) return null;

          return (
            <div
              key={country.id}
              className="mb-3 border border-stadium-ochre/20 rounded-lg overflow-hidden"
            >
              <div className="flex items-center gap-2 text-stadium-ochre text-sm py-2 px-3 bg-stadium-ochre/10">
                <CountryBadge countryId={country.id} size={16} />
                <span className="font-condensed uppercase tracking-widerr font-semibold">
                  {country.name}
                </span>
              </div>
              <div className="divide-y divide-stadium-ochre/20">
                {countryLeagues.map((league) => (
                  <button
                    key={league.id}
                    onClick={() => onLeagueSelect(league.id)}
                    className={`
                      block text-left w-full px-3 py-1.5 transition-colors cursor-pointer
                      ${
                        selectedLeague === league.id
                          ? "text-stadium-ochre bg-stadium-ochre/10 font-semibold"
                          : "text-white/90 hover:bg-stadium-ochre/20"
                      }
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

export default function Design12() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  const liveMatches = getMatchesByStatus("live");
  const upcomingMatches = getMatchesByStatus("upcoming");
  const finishedMatches = getMatchesByStatus("finished");

  const getFilteredMatches = () => {
    let filtered = matches;
    if (selectedLeague) {
      filtered = filtered.filter((m) => m.league === selectedLeague);
    }
    if (activeTab === "live")
      return filtered.filter((m) => m.status === "live");
    if (activeTab === "upcoming")
      return filtered.filter((m) => m.status === "upcoming");
    if (activeTab === "finished")
      return filtered.filter((m) => m.status === "finished");
    return filtered;
  };

  const groupedMatches = groupMatchesByLeague(getFilteredMatches());

  return (
    <div className="min-h-screen bg-[#14100e]">
      {/* Header */}
      <header className="relative overflow-hidden border-b-2 border-stadium-ochre">
        {/* Stadium light beams */}
        <div className="absolute inset-0">
          <div
            className="absolute top-0 left-1/4 w-32 h-full bg-gradient-to-b from-stadium-ochre/10 to-transparent
                          transform -skew-x-12"
          />
          <div
            className="absolute top-0 right-1/3 w-24 h-full bg-gradient-to-b from-stadium-ochre/5 to-transparent
                          transform skew-x-6"
          />
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
                color="#F5F0E6"
                accentColor="#D4A03D"
                animated={false}
              />
              <h1
                className="font-display text-stadium-ochre text-5xl md:text-6xl tracking-widerr
                             drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
              >
                LA PIZARRA
              </h1>
            </div>

            {/* Tagline centered below */}
            <p className="font-condensed text-stadium-chalk/50 text-[10px] md:text-xs tracking-[0.4em] uppercase -mt-1 md:mt-1">
              La página de la pelotita
            </p>
          </motion.div>

          {/* Date Selector */}
          <DateSelector
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
        </div>
      </header>

      {/* Live Matches Ticker */}
      {liveMatches.length > 0 && (
        <div className="bg-stadium-red border-y-2 border-stadium-ochre/50 overflow-hidden">
          <div className="flex items-stretch relative">
            <div className="bg-stadium-night px-4 flex items-center gap-2 shrink-0 relative z-10">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-red-500"
              />
              <span className="font-display text-white text-sm tracking-widerr">
                EN VIVO
              </span>
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
                  <span
                    key={idx}
                    className="font-condensed text-white text-sm flex items-center"
                  >
                    {/* Separador vertical */}
                    <span className="h-6 w-px bg-stadium-ochre/50 mx-8" />
                    {/* Minuto */}
                    <span className="text-stadium-chalk/60 mr-3">
                      {match.minute}'
                    </span>
                    {/* Contenido del partido */}
                    {home?.name}
                    <img
                      src={home?.logo}
                      alt=""
                      className="w-5 h-5 object-contain mx-1.5"
                    />
                    <span className="font-bold text-stadium-ochre">
                      {match.homeScore} - {match.awayScore}
                    </span>
                    <img
                      src={away?.logo}
                      alt=""
                      className="w-5 h-5 object-contain mx-1.5"
                    />
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
          style={{ transform: "translateZ(0)" }}
        >
          <TacticalBackground
            variant="minimal"
            opacity={0.08}
            animated={false}
            color="#D4A03D"
          />
          <TacticalElements opacity={0.12} color="#D4A03D" />
        </div>

        {/* Content container */}
        <div className="relative z-10 max-w-7xl mx-auto px-2 md:px-4 pt-0 pb-2 md:py-8">
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-8">
            {/* Desktop sidebar */}
            <aside className="hidden lg:block lg:w-72 shrink-0 order-1">
              <LeaguesSidebar
                selectedLeague={selectedLeague}
                onLeagueSelect={(id) =>
                  setSelectedLeague(id === selectedLeague ? null : id)
                }
              />
            </aside>

            {/* Mobile sidebar (Sheet drawer) */}
            <MobileSidebar selectedLeague={selectedLeague} variant="stadium">
              <LeaguesSidebar
                selectedLeague={selectedLeague}
                onLeagueSelect={(id) =>
                  setSelectedLeague(id === selectedLeague ? null : id)
                }
              />
            </MobileSidebar>
            <div className="flex-1 lg:order-2">
              {Object.entries(groupedMatches).map(
                ([leagueId, leagueMatches]) => (
                  <LeagueSection
                    key={leagueId}
                    leagueId={leagueId}
                    matchList={leagueMatches}
                  />
                ),
              )}
              {Object.keys(groupedMatches).length === 0 && (
                <div className="text-center py-16">
                  <Landmark
                    size={64}
                    className="mx-auto mb-4 text-stadium-chalk/40"
                  />
                  <p className="font-display text-stadium-chalk/40 text-xl">
                    NO HAY PARTIDOS
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-stadium-ochre/30 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-condensed text-stadium-chalk/30 text-sm tracking-widerr">
            LA PIZARRA © 2025 • TODOS LOS DERECHOS RESERVADOS
          </p>
        </div>
      </footer>
    </div>
  );
}
