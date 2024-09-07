"use client";
import { useState, useRef, ChangeEvent } from "react";
import { useSearchParams } from "next/navigation";
import "@/app/globals.css";

interface RangeInputProps {
  rangeValue: number;
  setRangeValue: (value: number) => void;
}

export const RangeInput = ({ rangeValue, setRangeValue }: RangeInputProps) => {
  const searchParamsHook = useSearchParams();
  const yearParam = searchParamsHook.get("year");
  const [inputValue, setInputValue] = useState(rangeValue);

  // Referencia para almacenar el timeout del debounce
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newRangeValue = Number(e.target.value);

    setInputValue(newRangeValue);

    // Si ya había un timeout anterior, lo limpiamos
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Establecemos un nuevo timeout de 300ms (o el tiempo que prefieras)
    debounceRef.current = setTimeout(() => {
      setRangeValue(newRangeValue);
    }, 350);
  };

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRangeValue(Number(e.target.value));
  };

  return (
    <div className="space-y-4">
      <div>
        <span className="dark:text-white">Release date: </span>
        <input
          type="number"
          min="1900"
          max="2024"
          value={inputValue}
          onChange={handleNumberChange}
          className="w-20 p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <input
        id="range-input"
        type="range"
        min="1900"
        max="2024"
        value={inputValue}
        onChange={handleRangeChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
    </div>
  );
};
