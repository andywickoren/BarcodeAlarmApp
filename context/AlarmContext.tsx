import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Barcode = { code: string; name: string };
export type Alarm = { id: string; time: Date; barcode: Barcode; enabled: boolean; };

type AlarmContextType = {
  alarms: Alarm[];
  barcodes: Barcode[];
  addAlarm: (alarm: Alarm) => void;
  addBarcode: (barcode: Barcode) => void;
  toggleAlarm: (id: string) => void;
  deleteAlarm: (id: string) => void; 
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
    const newAlarm = { ...alarm, enabled: true };
    setAlarms(prev => [...prev, newAlarm]);
  };

  const addBarcode = (barcode: Barcode) => {
    setBarcodes(prev => {
      if (prev.find(b => b.code === barcode.code)) return prev;
      return [...prev, barcode];
    });
  };

  const toggleAlarm = (id: string) => {
  setAlarms((prevAlarms) =>
    prevAlarms.map((alarm) =>
      alarm.id === id ? { ...alarm, enabled: !alarm.enabled } : alarm
    )
  );
};

const deleteAlarm = (id: string) => {
  setAlarms((prev) => prev.filter((alarm) => alarm.id !== id));
};


  return (
    <AlarmContext.Provider value={{ alarms, barcodes, addAlarm, toggleAlarm, deleteAlarm, addBarcode }}>
      {children}
    </AlarmContext.Provider>
  );
};
