import { useState } from 'react';
import { ListFilter, X } from 'lucide-react';
import { motion } from 'motion/react';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';

const PAPER = {
  bg: '#EDE0B8',
  surface: '#F5EDCE',
  ink: '#3D2B1F',
  stain: '#B8893D',
  stainLight: '#D4AD5C',
  border: '#D4C48A',
};

export function MobileSidebar4({ children, selectedLeague, onClose, bottomOffset = false }) {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (value) => {
    setOpen(value);
    if (!value && onClose) onClose();
  };

  return (
    <div className="lg:hidden">
      <motion.button
        onClick={() => setOpen(true)}
        className={`fixed ${bottomOffset ? 'bottom-16' : 'bottom-6'} right-6 z-40 flex items-center gap-2
                   font-condensed font-bold uppercase tracking-wider text-sm
                   p-3.5 rounded-full cursor-pointer`}
        style={{
          background: PAPER.stain,
          color: PAPER.surface,
          border: `2px solid ${PAPER.ink}44`,
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
      >
        <ListFilter size={18} />
        {selectedLeague && (
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#B44040' }} />
        )}
      </motion.button>

      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetContent
          side="left"
          showCloseButton={false}
          className="w-[85%] sm:max-w-sm p-0 overflow-y-auto scrollbar-hide"
          style={{
            background: PAPER.bg,
            borderRight: `2px solid ${PAPER.border}`,
          }}
        >
          <SheetTitle className="sr-only">Filtros</SheetTitle>
          <div className="sticky top-0 z-10 flex justify-end px-3 pt-2" style={{ background: PAPER.bg }}>
            <SheetClose className="rounded-lg p-2 transition-colors cursor-pointer"
                        style={{ background: PAPER.stain, color: PAPER.surface }}>
              <X size={20} />
            </SheetClose>
          </div>

          <div className="px-4 pb-4 [&>div]:p-0 [&>div]:border-0 [&>div]:bg-transparent [&>div]:rounded-none" onClick={(e) => {
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
