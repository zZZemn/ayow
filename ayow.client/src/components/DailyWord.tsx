import React from "react";

import { useDailyWord } from "../Hooks/useDailyWord";

export default function DailyWordDisplay() {
  const word = useDailyWord();

  return (
    <div className="bg-gray-200 my-1 px-2 rounded-md">
      <h2 className="text-xl font-bold">Daily Word</h2>
      {
        word ?
          <div className="mt-5">
            <p className="">Day {word?.word?.day}</p>
            <p className="">{word.word?.ayowWord}</p>
          </div>
          : "Waiting for today’s word..."
      }

    </div>
  );
}
