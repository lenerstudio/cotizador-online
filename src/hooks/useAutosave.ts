import { useState, useEffect } from 'react';

export function useAutosave<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error('Error reading from localStorage', error);
            return initialValue;
        }
    });

    useEffect(() => {
        const handler = setTimeout(() => {
            try {
                window.localStorage.setItem(key, JSON.stringify(value));
            } catch (error) {
                console.error('Error saving to localStorage', error);
            }
        }, 1000); // Debounce 1s

        return () => {
            clearTimeout(handler);
        };
    }, [key, value]);

    return [value, setValue] as const;
}
