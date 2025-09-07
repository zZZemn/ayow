import type { ImportWordsDTO } from "../types/ImportWordsDTO";
import type { Word } from "../types/Word";

export async function getWords() {
    const response = await fetch("/word", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch words: ${response.status}`);
    }

    return response.json() as Promise<Word[]>;
}

export async function importWords(payload: ImportWordsDTO[]) {
    const response = await fetch("/word/importWords", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })

    if (!response.ok) {
        throw new Error(`Failed to import words: ${response.status}`);
    }

    return response.json() as Promise<{
        message: string;
    }>;
}