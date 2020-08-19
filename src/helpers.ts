import { useEffect, useRef, useState } from 'react';

export const useInterval = (callback: any, delay: number | null) => {
    const savedCallback: any = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
        return () => clearInterval();
    }, [delay]);
};

export const normilizeFunction = (fn: any) => {
    return (...args: any[]) => {
        if (typeof fn === 'function') {
            fn(...args);
        }
    };
};

export const debounce = (fn: any, delay: number = 200) => {
    let timeout: any = null;
    return (...args: any[]) => {
        const cb = () => {
            clearTimeout(timeout);
            fn(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(cb, delay);
    };
};
