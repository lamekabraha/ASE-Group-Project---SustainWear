'use client';
import { AlertContext } from '@/app/context/AlertContext';
import { useContext } from 'react';

export const useAlert = (p0: string, p1: string) => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error("useAlert must be used within an AlertProvider")
    }
    return context;
}