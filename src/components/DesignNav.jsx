import { useLocation, useNavigate } from 'react-router-dom';

const ROUTES = ['/', '/1', '/2', '/3', '/4', '/5', '/6', '/7', '/8', '/9', '/10', '/11'];

export default function DesignNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentIndex = location.pathname === '/'
    ? 0
    : ROUTES.indexOf(location.pathname);

  if (currentIndex === -1) return null;

  const start = Math.max(0, Math.min(currentIndex - 2, ROUTES.length - 5));
  const end = Math.min(ROUTES.length, Math.max(currentIndex + 3, 5));
  const visible = ROUTES.slice(start, end);

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === ROUTES.length - 1;

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1.5 shadow-lg shadow-black/30">
      <button
        onClick={() => navigate(ROUTES[currentIndex - 1])}
        disabled={isFirst}
        className="w-8 h-8 flex items-center justify-center rounded-full text-white text-sm font-medium disabled:opacity-30 hover:bg-white/20 transition-colors"
      >
        &larr;
      </button>

      {visible.map((route) => {
        const idx = ROUTES.indexOf(route);
        const isActive = idx === currentIndex;
        return (
          <button
            key={route}
            onClick={() => navigate(route)}
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
              isActive
                ? 'bg-white text-black'
                : 'text-white/80 hover:bg-white/20'
            }`}
          >
            {idx}
          </button>
        );
      })}

      <button
        onClick={() => navigate(ROUTES[currentIndex + 1])}
        disabled={isLast}
        className="w-8 h-8 flex items-center justify-center rounded-full text-white text-sm font-medium disabled:opacity-30 hover:bg-white/20 transition-colors"
      >
        &rarr;
      </button>
    </nav>
  );
}
