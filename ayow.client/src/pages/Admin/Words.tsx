import { useEffect, useState, useRef } from 'react';

import AdminAuthenticatedLayout from '../Layout/AdminAuthenticatedLayout';

import type { Word } from '../../types/Word';
import type { ImportWordsDTO } from '../../types/ImportWordsDTO';

import { getWords, importWords } from '../../services/WordService';

import { useLoading } from '../../context/LoadingContext';

import PrimaryButton from '../../components/PrimaryButton';
import FileInput from '../../components/FileInput';


function AdminWords() {
    const { setIsLoading } = useLoading();

    const [words, setWords] = useState<Word[]>([]);

    const fileRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        getWords().then(setWords).catch(console.error);
    }, []);

    const handleImportWords = async () => {
        setIsLoading(true)
        try {
            const file = fileRef.current?.files?.[0]

            if (!file) return alert("Please select a file") // add custom alert
            if (file.type !== "application/json") return alert("Invalid file type")

            const text = await file.text()
            const words: ImportWordsDTO[] = JSON.parse(text)
            await importWords(words)
            setWords(await getWords())
        } catch (err) {
            console.error(err)
            alert("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }



    return (
        <AdminAuthenticatedLayout>
            <div>
                <h1>Words</h1>

                <div>
                    <FileInput ref={fileRef} className='my-3' />
                    <PrimaryButton onClick={handleImportWords}>Import</PrimaryButton>
                </div>
            </div>

            <div>
                <table className='w-full border-collapse border border-gray-800'>
                    <thead>
                        <tr>
                            <th className='border border-gray-800 text-gray-800 p-1'>Day</th>
                            <th className='border border-gray-800 text-gray-800 p-1'>Word</th>
                            <th className='border border-gray-800 text-gray-800 p-1'>Definition</th>
                            <th className='border border-gray-800 text-gray-800 p-1'>Part of Speech</th>
                        </tr>
                    </thead>

                    <tbody className='text-xs'>

                        {
                            words.length > 0 ? (
                                words.map(word => (
                                    <tr>
                                        <td className='border border-gray-800 p-1'>{word.day}</td>
                                        <td className='border border-gray-800 p-1'>{word.ayowWord}</td>
                                        <td className='border border-gray-800 p-1'>{word.definition}</td>
                                        <td className='border border-gray-800 p-1'>{word.partOfSpeech}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className='border border-gray-800 p-1'>No words available</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </AdminAuthenticatedLayout>
    );
}

export default AdminWords;