"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface AppData {
  letters: string;
  tooltip: string;
  launchCommand: string;
  usageCount: number;
}

interface DatabaseContextType {
  getAppsForSide: (side: string) => AppData[];
  incrementUsage: (letters: string) => void;
}

const DatabaseContext = createContext<DatabaseContextType | null>(null);

export function DatabaseProvider({ children }: { children: React.ReactNode }) {
  console.log('DatabaseProvider rendered')
  const [apps, setApps] = useState<Record<string, AppData[]>>({});

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    try {
      const response = await fetch('/api/app');
      if (!response.ok) {
        throw new Error('Failed to fetch apps');
      }
      const data = await response.json();
      setApps(data);
      console.log('Fetched apps:', data);
    } catch (error) {
      console.error('Error fetching apps:', error);
    }
  };

  const getAppsForSide = (side: string) => apps[side] || [];

  const incrementUsage = async (letters: string) => {
    // Implement the logic to increment usage count
    // This might involve another API call to update the database
  };

  return (
    <DatabaseContext.Provider value={{ getAppsForSide, incrementUsage }}>
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabase() {
  console.log('useDatabase called')
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
}