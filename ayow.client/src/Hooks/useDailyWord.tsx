import { useEffect, useState } from "react";
import axios from "axios";

import type { DailyWord } from "../types/DailyWord";

export function useDailyWord() {
    const [dailyWord, setDailyWord] = useState<DailyWord | null>(null);

    useEffect(() => {
        let ignore = false;

        axios.get("/dailyword/today", {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
        }).then(res => {
            if (!ignore) setDailyWord(res.data);
        });

        return () => { ignore = true };
    }, []);


    return dailyWord;
}