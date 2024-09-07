"use client";
import { useState, useEffect, useRef, ChangeEvent } from "react";
import "@/app/globals.css";

interface RangeInputProps {
  rangeValue: number;
  setRangeValue: (value: number) => void;
}

export const RangeInput = ({ rangeValue, setRangeValue }: RangeInputProps) => {
  const [localValue, setLocalValue] = useState(rangeValue); // Estado local para el input
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setLocalValue(rangeValue); // Sincroniza el estado local con el valor global cuando cambie
  }, [rangeValue]);

  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newRangeValue = Number(e.target.value);
    setLocalValue(newRangeValue); // Actualiza el estado local inmediatamente

    // Si ya había un timeout anterior, lo limpiamos
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Establecemos un nuevo timeout de 350ms
    debounceRef.current = setTimeout(() => {
      setRangeValue(newRangeValue); // Actualiza el valor global con debounce
    }, 350);
  };

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newNumberValue = Number(e.target.value);
    setLocalValue(newNumberValue); // Actualiza el estado local
    setRangeValue(newNumberValue); // Actualiza el valor global inmediatamente
  };

  return (
    <div className="space-y-4">
      <div>
        <span className="dark:text-white">Release date: </span>
        <input
          type="number"
          min="1900"
          max="2024"
          value={localValue} // Usar el estado local para actualizaciones inmediatas
          onChange={handleNumberChange}
          className="w-20 p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      <input
        id="range-input"
        type="range"
        min="1900"
        max="2024"
        value={localValue} // Usar el estado local para actualizaciones inmediatas
        onChange={handleRangeChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
    </div>
  );
};
