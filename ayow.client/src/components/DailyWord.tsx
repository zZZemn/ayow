import React from "react";

import { useDailyWord } from "../Hooks/useDailyWord";

export default function DailyWordDisplay() {
  const word = useDailyWord();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Daily Word</h2>
      <p className="mt-2 text-lg">
        {word ? word.word?.ayowWord : "Waiting for today’s word..."}
      </p>
    </div>
  );
}
