import { useState } from 'react';
import { ListFilter, X } from 'lucide-react';
import { motion } from 'motion/react';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';

export function MobileSidebar({ children, selectedLeague, onClose }) {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (value) => {
    setOpen(value);
    if (!value && onClose) onClose();
  };

  return (
    <div className="lg:hidden">
      {/* Floating trigger button */}
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2
                   bg-stadium-ochre text-stadium-night font-condensed font-bold
                   uppercase tracking-wider text-sm
                   p-3.5 rounded-full
                   border-2 border-black/40
                   cursor-pointer"
        whileTap={{ scale: 0.95 }}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
      >
        <ListFilter size={18} />
        {selectedLeague && (
          <span className="w-2 h-2 rounded-full bg-stadium-red animate-pulse" />
        )}
      </motion.button>

      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetContent
          side="left"
          showCloseButton={false}
          className="w-[85%] sm:max-w-sm p-0 border-r-2 border-stadium-ochre/30 bg-[#14100e] overflow-y-auto scrollbar-hide"
        >
          <SheetTitle className="sr-only">Filtros</SheetTitle>
          <div className="sticky top-0 z-10 bg-[#14100e] flex justify-end px-3 pt-2">
            <SheetClose className="rounded-lg p-2 bg-stadium-ochre hover:bg-stadium-ochre/80
                                   text-stadium-night transition-colors cursor-pointer">
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
