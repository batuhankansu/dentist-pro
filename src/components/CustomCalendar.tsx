"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MONTHS = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
];

const DAYS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

interface CustomCalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  minDate?: Date;
  disabledDays?: number[]; // 0 = Pazar
}

export function CustomCalendar({
  selectedDate,
  onDateSelect,
  minDate,
  disabledDays = [0],
}: CustomCalendarProps) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(
    selectedDate || new Date(today.getFullYear(), today.getMonth() + 1, 1)
  );

  const currentMonth = viewDate.getMonth();
  const currentYear = viewDate.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  // Pazartesi başlangıç için düzeltme
  const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const isDateDisabled = (day: number): boolean => {
    const date = new Date(currentYear, currentMonth, day);
    const dayOfWeek = date.getDay();
    if (disabledDays.includes(dayOfWeek)) return true;
    if (minDate && date < minDate) return true;
    // Bugünden önceki tarihler
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (date < todayStart) return true;
    return false;
  };

  const isDateSelected = (day: number): boolean => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear
    );
  };

  const isToday = (day: number): boolean => {
    return (
      today.getDate() === day &&
      today.getMonth() === currentMonth &&
      today.getFullYear() === currentYear
    );
  };

  const handlePrevMonth = () => {
    setViewDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleMonthChange = (month: number) => {
    setViewDate(new Date(currentYear, month, 1));
  };

  const handleYearChange = (year: number) => {
    setViewDate(new Date(year, currentMonth, 1));
  };

  const handleDayClick = (day: number) => {
    if (!isDateDisabled(day)) {
      onDateSelect(new Date(currentYear, currentMonth, day));
    }
  };

  // Yıl seçenekleri (bu yıl + 1 yıl)
  const years = [today.getFullYear(), today.getFullYear() + 1];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 w-full max-w-sm">
      {/* Ay/Yıl Seçici */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="h-4 w-4 text-slate-600" />
        </button>
        <div className="flex items-center gap-2">
          <select
            value={currentMonth}
            onChange={(e) => handleMonthChange(Number(e.target.value))}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
          >
            {MONTHS.map((month, index) => (
              <option key={month} value={index}>
                {month}
              </option>
            ))}
          </select>
          <select
            value={currentYear}
            onChange={(e) => handleYearChange(Number(e.target.value))}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ChevronRight className="h-4 w-4 text-slate-600" />
        </button>
      </div>

      {/* Gün Başlıkları */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-slate-500 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Günler */}
      <div className="grid grid-cols-7 gap-1">
        {/* Boş hücreler (başlangıç için) */}
        {Array.from({ length: startDay }, (_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}

        {/* Günler */}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const disabled = isDateDisabled(day);
          const selected = isDateSelected(day);
          const todayDate = isToday(day);

          return (
            <button
              key={day}
              onClick={() => handleDayClick(day)}
              disabled={disabled}
              className={`aspect-square rounded-xl text-sm font-medium transition-all ${
                selected
                  ? "bg-sky-500 text-white shadow-lg shadow-sky-500/30"
                  : todayDate
                  ? "bg-sky-100 text-sky-700 font-bold"
                  : disabled
                  ? "text-slate-300 cursor-not-allowed"
                  : "text-slate-700 hover:bg-sky-50 hover:text-sky-600"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Seçilen Tarih Bilgisi */}
      {selectedDate && (
        <div className="mt-4 p-3 bg-sky-50 rounded-xl text-center">
          <p className="text-sm text-sky-700 font-medium">
            {selectedDate.toLocaleDateString("tr-TR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      )}
    </div>
  );
}
