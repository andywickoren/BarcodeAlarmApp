import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Barcode = { code: string; name: string };
export type Alarm = { id: string; time: Date; barcode: Barcode };

type AlarmContextType = {
  alarms: Alarm[];
  barcodes: Barcode[];
  addAlarm: (alarm: Alarm) => void;
  addBarcode: (barcode: Barcode) => void;
};

const AlarmContext = createContext<AlarmContextType | undefined>(undefined);

export const useAlarmContext = () => {
  const context = useContext(AlarmContext);
  if (!context) throw new Error('useAlarmContext must be used inside AlarmProvider');
  return context;
};

export const AlarmProvider = ({ children }: { children: ReactNode }) => {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [barcodes, setBarcodes] = useState<Barcode[]>([]);

  const addAlarm = (alarm: Alarm) => {
    setAlarms(prev => [...prev, alarm]);
  };

  const addBarcode = (barcode: Barcode) => {
    setBarcodes(prev => {
      if (prev.find(b => b.code === barcode.code)) return prev;
      return [...prev, barcode];
    });
  };

  return (
    <AlarmContext.Provider value={{ alarms, barcodes, addAlarm, addBarcode }}>
      {children}
    </AlarmContext.Provider>
  );
};
