import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type BoothStatus = "available" | "occupied" | "selected";

interface Booth {
  id: number;
  number: string;
  hall: string;
  width: number;
  height: number;
  status: BoothStatus;
  row: number;
  col: number;
  colSpan?: number;
  rowSpan?: number;
}

const INITIAL_BOOTHS: Booth[] = [
  // Hall A — Row 1
  { id: 1,  number: "A01", hall: "القاعة أ", width: 3, height: 3, status: "available",  row: 0, col: 0 },
  { id: 2,  number: "A02", hall: "القاعة أ", width: 3, height: 3, status: "occupied",   row: 0, col: 1 },
  { id: 3,  number: "A03", hall: "القاعة أ", width: 3, height: 3, status: "available",  row: 0, col: 2 },
  { id: 4,  number: "A04", hall: "القاعة أ", width: 4, height: 4, status: "available",  row: 0, col: 3 },
  { id: 5,  number: "A05", hall: "القاعة أ", width: 4, height: 4, status: "occupied",   row: 0, col: 4 },
  // Hall A — Row 2
  { id: 6,  number: "A06", hall: "القاعة أ", width: 3, height: 3, status: "available",  row: 1, col: 0 },
  { id: 7,  number: "A07", hall: "القاعة أ", width: 4, height: 4, status: "available",  row: 1, col: 1 },
  { id: 8,  number: "A08", hall: "القاعة أ", width: 3, height: 3, status: "occupied",   row: 1, col: 2 },
  { id: 9,  number: "A09", hall: "القاعة أ", width: 3, height: 3, status: "available",  row: 1, col: 3 },
  { id: 10, number: "A10", hall: "القاعة أ", width: 4, height: 4, status: "available",  row: 1, col: 4 },
  // Hall A — Row 3
  { id: 11, number: "A11", hall: "القاعة أ", width: 6, height: 4, status: "available",  row: 2, col: 0 },
  { id: 12, number: "A12", hall: "القاعة أ", width: 4, height: 4, status: "occupied",   row: 2, col: 1 },
  { id: 13, number: "A13", hall: "القاعة أ", width: 3, height: 3, status: "available",  row: 2, col: 2 },
  { id: 14, number: "A14", hall: "القاعة أ", width: 3, height: 3, status: "available",  row: 2, col: 3 },
  { id: 15, number: "A15", hall: "القاعة أ", width: 4, height: 4, status: "occupied",   row: 2, col: 4 },
  // Hall B — Row 1
  { id: 16, number: "B01", hall: "القاعة ب", width: 4, height: 4, status: "available",  row: 0, col: 0 },
  { id: 17, number: "B02", hall: "القاعة ب", width: 3, height: 3, status: "occupied",   row: 0, col: 1 },
  { id: 18, number: "B03", hall: "القاعة ب", width: 3, height: 3, status: "available",  row: 0, col: 2 },
  { id: 19, number: "B04", hall: "القاعة ب", width: 6, height: 4, status: "available",  row: 0, col: 3 },
  { id: 20, number: "B05", hall: "القاعة ب", width: 4, height: 4, status: "occupied",   row: 0, col: 4 },
  // Hall B — Row 2
  { id: 21, number: "B06", hall: "القاعة ب", width: 3, height: 3, status: "available",  row: 1, col: 0 },
  { id: 22, number: "B07", hall: "القاعة ب", width: 4, height: 4, status: "available",  row: 1, col: 1 },
  { id: 23, number: "B08", hall: "القاعة ب", width: 3, height: 3, status: "occupied",   row: 1, col: 2 },
  { id: 24, number: "B09", hall: "القاعة ب", width: 4, height: 4, status: "available",  row: 1, col: 3 },
  { id: 25, number: "B10", hall: "القاعة ب", width: 3, height: 3, status: "available",  row: 1, col: 4 },
  // Hall B — Row 3
  { id: 26, number: "B11", hall: "القاعة ب", width: 4, height: 4, status: "available",  row: 2, col: 0 },
  { id: 27, number: "B12", hall: "القاعة ب", width: 3, height: 3, status: "occupied",   row: 2, col: 1 },
  { id: 28, number: "B13", hall: "القاعة ب", width: 6, height: 4, status: "available",  row: 2, col: 2 },
  { id: 29, number: "B14", hall: "القاعة ب", width: 3, height: 3, status: "available",  row: 2, col: 3 },
  { id: 30, number: "B15", hall: "القاعة ب", width: 4, height: 4, status: "available",  row: 2, col: 4 },
];

interface BoothMapProps {
  selectedBooth: Booth | null;
  onSelect: (booth: Booth | null) => void;
  occupiedBoothNumbers?: string[];
}

function BoothCell({
  booth,
  isSelected,
  onSelect,
}: {
  booth: Booth;
  isSelected: boolean;
  onSelect: (b: Booth) => void;
}) {
  const isOccupied = booth.status === "occupied";

  let bg = "bg-white border-2 border-[#E6E6E6] hover:border-[#1B8354] hover:bg-[#1B8354]/5 cursor-pointer";
  if (isOccupied) bg = "bg-[#E6E6E6] border-2 border-[#B3B3B3] cursor-not-allowed opacity-60";
  if (isSelected) bg = "bg-[#1B8354] border-2 border-[#1B8354] text-white cursor-pointer";

  return (
    <motion.button
      type="button"
      disabled={isOccupied}
      onClick={() => !isOccupied && onSelect(booth)}
      whileHover={!isOccupied ? { scale: 1.04 } : {}}
      whileTap={!isOccupied ? { scale: 0.97 } : {}}
      data-testid={`booth-${booth.number}`}
      className={`relative rounded-lg p-2 flex flex-col items-center justify-center transition-all duration-200 min-w-0 ${bg}`}
      style={{ minHeight: 72 }}
      aria-label={`بوث ${booth.number}`}
    >
      <span className={`text-xs font-bold mb-1 ${isSelected ? "text-white" : isOccupied ? "text-[#525252]" : "text-[#161616]"}`}>
        {booth.number}
      </span>
      <span className={`text-[10px] ${isSelected ? "text-white/80" : isOccupied ? "text-[#525252]" : "text-[#525252]"}`}>
        {booth.width}×{booth.height}م
      </span>
      {isOccupied && (
        <span className="material-icons text-[#525252] text-xs mt-1">lock</span>
      )}
      {isSelected && (
        <span className="material-icons text-white text-xs mt-1">check_circle</span>
      )}
    </motion.button>
  );
}

function HallGrid({
  booths,
  hallName,
  selectedId,
  onSelect,
}: {
  booths: Booth[];
  hallName: string;
  selectedId: number | null;
  onSelect: (b: Booth) => void;
}) {
  const rows = [0, 1, 2];

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-px flex-1 bg-[#E6E6E6]" />
        <span className="text-sm font-bold text-[#1B8354] px-3 py-1 bg-[#1B8354]/10 rounded-full">{hallName}</span>
        <div className="h-px flex-1 bg-[#E6E6E6]" />
      </div>
      <div className="space-y-2">
        {rows.map(row => {
          const rowBooths = booths.filter(b => b.row === row);
          return (
            <div key={row} className="grid grid-cols-5 gap-2">
              {rowBooths.map(booth => (
                <BoothCell
                  key={booth.id}
                  booth={booth}
                  isSelected={selectedId === booth.id}
                  onSelect={onSelect}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function BoothMap({ selectedBooth, onSelect, occupiedBoothNumbers = [] }: BoothMapProps) {
  const selectedId = selectedBooth?.id ?? null;

  const occupiedSet = new Set(occupiedBoothNumbers);

  const booths = INITIAL_BOOTHS.map(b => ({
    ...b,
    status: (b.status === "occupied" || occupiedSet.has(b.number) ? "occupied" : "available") as BoothStatus,
  }));

  const hallABooths = booths.filter(b => b.hall === "القاعة أ");
  const hallBBooths = booths.filter(b => b.hall === "القاعة ب");

  const handleSelect = (booth: Booth) => {
    if (selectedBooth?.id === booth.id) {
      onSelect(null);
    } else {
      onSelect(booth);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.3 }}
      className="mt-6 rounded-xl border-2 border-[#1B8354]/20 bg-[#F9FAFB] p-4 md:p-6"
    >
      <div className="mb-4">
        <h4 className="text-lg font-bold text-[#161616] mb-1 flex items-center gap-2">
          <span className="material-icons text-[#1B8354]">map</span>
          اختر بوثك
        </h4>
        <p className="text-sm text-[#525252]">انقر على أي بوث متاح لاختياره. يمكنك رؤية تفاصيل البوث بعد الاختيار.</p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-5 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded border-2 border-[#E6E6E6] bg-white" />
          <span className="text-[#525252]">متاح</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded border-2 border-[#1B8354] bg-[#1B8354]" />
          <span className="text-[#525252]">محجوز (اختيارك)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded border-2 border-[#B3B3B3] bg-[#E6E6E6] opacity-60" />
          <span className="text-[#525252]">محجوز مسبقاً</span>
        </div>
      </div>

      {/* Entrance indicator */}
      <div className="flex justify-center mb-4">
        <div className="bg-[#161616] text-white text-xs font-bold px-8 py-2 rounded-full flex items-center gap-2">
          <span className="material-icons text-sm">meeting_room</span>
          المدخل الرئيسي
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[320px]">
          <HallGrid
            booths={hallABooths}
            hallName="القاعة أ"
            selectedId={selectedId}
            onSelect={handleSelect}
          />

          {/* Aisle */}
          <div className="flex items-center gap-3 my-4">
            <div className="h-px flex-1 border-t-2 border-dashed border-[#B3B3B3]" />
            <span className="text-xs text-[#525252] bg-[#E6E6E6] px-3 py-1 rounded-full font-medium">الممر الرئيسي</span>
            <div className="h-px flex-1 border-t-2 border-dashed border-[#B3B3B3]" />
          </div>

          <HallGrid
            booths={hallBBooths}
            hallName="القاعة ب"
            selectedId={selectedId}
            onSelect={handleSelect}
          />
        </div>
      </div>

      {/* Selected booth info */}
      <AnimatePresence>
        {selectedBooth && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 overflow-hidden"
          >
            <div className="bg-[#1B8354] rounded-xl p-4 text-white">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-bold text-base flex items-center gap-2">
                  <span className="material-icons text-sm">check_circle</span>
                  البوث المختار
                </h5>
                <button
                  type="button"
                  onClick={() => onSelect(null)}
                  className="text-white/70 hover:text-white transition-colors"
                  data-testid="button-clear-booth"
                >
                  <span className="material-icons text-sm">close</span>
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <div className="text-white/70 text-xs mb-1">رقم البوث</div>
                  <div className="font-bold text-lg">{selectedBooth.number}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <div className="text-white/70 text-xs mb-1">المساحة</div>
                  <div className="font-bold text-lg">{selectedBooth.width}×{selectedBooth.height}م</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <div className="text-white/70 text-xs mb-1">الموقع</div>
                  <div className="font-bold text-base">{selectedBooth.hall}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <div className="text-white/70 text-xs mb-1">الحالة</div>
                  <div className="font-bold text-base">متاح</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
