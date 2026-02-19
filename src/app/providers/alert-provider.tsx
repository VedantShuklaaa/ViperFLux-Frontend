"use client";
import { Boxes } from "@/components/ui/box/boxes";
import React, { createContext, useContext, useState } from "react";

type AlertType = "success" | "error" | "info" | "warning";

type Alert = {
    type: AlertType;
    message: string;
    id: number
}

type AlertContextValue = {
    showAlert: (message: string, type?: AlertType) => void;
}

const AlertContext = createContext<AlertContextValue | null>(null);

export const useAlert = () => {
    const ctx = useContext(AlertContext);
    if (!ctx) throw new Error('useAlert must be used inside <AlertProvider>');
    return ctx;
};

export function AlertProvider({ children }: { children: React.ReactNode }) {

    const [alerts, setAlerts] = useState<Alert[]>([]);

    const showAlert = (message: string, type: AlertType = "info") => {
        const id = Date.now();
        setAlerts((prev) => [...prev, { id, type, message }]);

        setTimeout(() => {
            setAlerts((prev) => prev.filter((a) => a.id !== id));
        }, 5000);
    }

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}
            <div className="fixed right-0 bottom-0 z-50 flex flex-col items-end justify-end p-4 font-mono gap-2">
                {alerts.map((a) => (
                    <div key={a.id}>
                        <Boxes className="max-w-sm flex flex-col items-center justify-center p-5">
                            <h1 className={`text-2xl font-bold ${
                                a.type === 'success'
                                    ? 'text-emerald-400'
                                    : a.type === 'error'
                                        ? 'text-red-400'
                                        : a.type === 'warning'
                                            ? 'text-amber-400'
                                            : 'text-zinc-100'
                            }`}>
                                {a.type.toUpperCase()}
                            </h1>
                            <span className="p-2">
                                <p className="text-center">
                                    {a.message}
                                </p>
                            </span>
                        </Boxes>
                    </div>
                ))}
            </div>
        </AlertContext.Provider>
    );
}