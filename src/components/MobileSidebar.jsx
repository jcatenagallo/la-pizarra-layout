import { useState } from 'react';
import { ListFilter, X } from 'lucide-react';
import { motion } from 'motion/react';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';

const variants = {
  stadium: {
    button: 'bg-stadium-ochre text-stadium-night border-2 border-black/40',
    indicator: 'bg-stadium-red',
    sheet: 'border-r-2 border-stadium-ochre/30 bg-[#14100e]',
    sheetBg: 'bg-[#14100e]',
    close: 'bg-stadium-ochre hover:bg-stadium-ochre/80 text-stadium-night',
  },
  stadiumChalk: {
    button: 'bg-stadium-chalk text-stadium-night border-2 border-black',
    indicator: 'bg-stadium-red',
    sheet: 'border-r-2 border-stadium-ochre/30 bg-[#14100e]',
    sheetBg: 'bg-[#14100e]',
    close: 'bg-stadium-ochre hover:bg-stadium-ochre/80 text-stadium-night',
  },
  stadiumCancha: {
    button: 'bg-stadium-chalk text-[#2D5E4A] border-2 border-[#2D5E4A]',
    indicator: 'bg-stadium-red',
    sheet: 'border-r-2 border-stadium-ochre/30 bg-[#14100e]',
    sheetBg: 'bg-[#14100e]',
    close: 'bg-stadium-ochre hover:bg-stadium-ochre/80 text-stadium-night',
  },
  slate: {
    button: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 backdrop-blur-sm',
    indicator: 'bg-emerald-400',
    sheet: 'border-r border-slate-600/30 bg-slate-900',
    sheetBg: 'bg-slate-900',
    close: 'bg-slate-700 hover:bg-slate-600 text-white',
  },
  olive: {
    button: 'bg-[#C0B87A] text-[#1a1812] border-2 border-black/40',
    indicator: 'bg-[#005F02]',
    sheet: 'border-r-2 border-[#C0B87A]/30 bg-[#1a1812]',
    sheetBg: 'bg-[#1a1812]',
    close: 'bg-[#C0B87A] hover:bg-[#C0B87A]/80 text-[#1a1812]',
  },
  tierra: {
    button: 'bg-[#F5824A] text-[#3a1c0c] border-2 border-[#A03A13]/40',
    indicator: 'bg-[#A03A13]',
    sheet: 'border-r-2 border-[#A03A13]/20 bg-[#EDE4C2]',
    sheetBg: 'bg-[#EDE4C2]',
    close: 'bg-[#A03A13] hover:bg-[#A03A13]/80 text-[#EDE4C2]',
  },
  travel: {
    button: 'bg-[#F23030] text-white border-2 border-[#F23030]/40',
    indicator: 'bg-[#1EA4D9]',
    sheet: 'border-r-2 border-[#1EA4D9]/30 bg-[#0c1520]',
    sheetBg: 'bg-[#0c1520]',
    close: 'bg-[#1EA4D9] hover:bg-[#1EA4D9]/80 text-[#0a1929]',
  },
  bosque: {
    button: 'bg-[#4D7361] text-[#F0F2DC] border-2 border-[#02402E]/40',
    indicator: 'bg-[#02402E]',
    sheet: 'border-r-2 border-[#02402E]/20 bg-[#F0F2DC]',
    sheetBg: 'bg-[#F0F2DC]',
    close: 'bg-[#02402E] hover:bg-[#02402E]/80 text-[#F0F2DC]',
  },
  bosqueNoche: {
    button: 'bg-[#4D7361] text-[#F0F2DC] border-2 border-[#02402E]/40',
    indicator: 'bg-[#F0F2DC]',
    sheet: 'border-r-2 border-[#4D7361]/20 bg-[#01261C]',
    sheetBg: 'bg-[#01261C]',
    close: 'bg-[#4D7361] hover:bg-[#4D7361]/80 text-[#F0F2DC]',
  },
  cancha: {
    button: 'bg-[#C44A2D] text-white border-2 border-black/40',
    indicator: 'bg-[#B85C38]',
    sheet: 'border-r-2 border-[#B85C38]/30 bg-[#2A1810]',
    sheetBg: 'bg-[#2A1810]',
    close: 'bg-[#B85C38] hover:bg-[#B85C38]/80 text-[#2A1810]',
  },
  steel: {
    button: 'bg-[#cd7b5c] text-[#151a20] border-2 border-black/40',
    indicator: 'bg-[#d6735f]',
    sheet: 'border-r-2 border-[#d6735f]/30 bg-[#151a20]',
    sheetBg: 'bg-[#151a20]',
    close: 'bg-[#d6735f] hover:bg-[#d6735f]/80 text-[#151a20]',
  },
  campo: {
    button: 'bg-[#2d5f81] text-[#fbfeff] border-2 border-black/40',
    indicator: 'bg-[#fbfeff]',
    sheet: 'border-r-2 border-[#2d5f81]/30 bg-[#76834e]',
    sheetBg: 'bg-[#76834e]',
    close: 'bg-[#2d5f81] hover:bg-[#2d5f81]/80 text-[#fbfeff]',
  },
};

export function MobileSidebar({ children, selectedLeague, onClose, bottomOffset = false, variant = 'stadium' }) {
  const [open, setOpen] = useState(false);
  const v = variants[variant] || variants.stadium;

  const handleOpenChange = (value) => {
    setOpen(value);
    if (!value && onClose) onClose();
  };

  return (
    <div className="lg:hidden">
      {/* Floating trigger button */}
      <motion.button
        onClick={() => setOpen(true)}
        className={`fixed ${bottomOffset ? 'bottom-16' : 'bottom-6'} right-6 z-40 flex items-center gap-2
                   ${v.button} font-condensed font-bold
                   uppercase tracking-wider text-sm
                   p-3.5 rounded-full
                   cursor-pointer`}
        whileTap={{ scale: 0.95 }}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
      >
        <ListFilter size={18} />
        {selectedLeague && (
          <span className={`w-2 h-2 rounded-full ${v.indicator} animate-pulse`} />
        )}
      </motion.button>

      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetContent
          side="left"
          showCloseButton={false}
          className={`w-[85%] sm:max-w-sm p-0 ${v.sheet} overflow-y-auto scrollbar-hide`}
        >
          <SheetTitle className="sr-only">Filtros</SheetTitle>
          <div className={`sticky top-0 z-10 ${v.sheetBg} flex justify-end px-3 pt-2`}>
            <SheetClose className={`rounded-lg p-2 ${v.close} transition-colors cursor-pointer`}>
              <X size={20} />
            </SheetClose>
          </div>

          <div className="px-4 pb-4 [&>div]:p-0 [&>div]:border-0 [&>div]:bg-transparent [&>div]:rounded-none" onClick={(e) => {
            // Close sheet when a league button inside is clicked
            if (e.target.closest('button')) {
              setTimeout(() => setOpen(false), 150);
            }
          }}>
            {children}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
