import React, { createContext, useState, useContext } from 'react';

export interface EmployeeData {
  name: string;
  position: string;
  id: string;
  joinDate: string;
  phone: string;
  bloodGroup: string;
  avatarUrl: string;
  companyName: string;
}

interface EmployeeContextType {
  employeeData: EmployeeData;
  updateEmployeeData: (data: Partial<EmployeeData>) => void;
  scanEmployeeData: (barcodeData: string) => void;
}

const defaultEmployeeData: EmployeeData = {
  companyName: 'ROYAL LOGISTICS',
  name: 'YOUR NAME',
  position: 'Job Position',
  id: '',
  joinDate: '23-APR-2025',
  phone: '',
  bloodGroup: '',
  avatarUrl: ''
  
};

const EmployeeContext = createContext<EmployeeContextType>({
  employeeData: defaultEmployeeData,
  updateEmployeeData: () => {},
  scanEmployeeData: () => {},
});

export const useEmployee = () => useContext(EmployeeContext);

export const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [employeeData, setEmployeeData] = useState<EmployeeData>(defaultEmployeeData);

  const updateEmployeeData = (data: Partial<EmployeeData>) => {
    setEmployeeData((prev) => ({ ...prev, ...data }));
  };

  const scanEmployeeData = (barcodeData: string) => {
    try {
      const scannedData = JSON.parse(barcodeData);
      if (scannedData && typeof scannedData === 'object') {
        setEmployeeData({
          ...defaultEmployeeData, // Keep default values for missing fields
          ...scannedData,        // Override with scanned data
          companyName: 'ROYAL LOGISTICS' // Always maintain company name
        });
      }
    } catch (error) {
      console.error('Error parsing barcode data:', error);
      // Fallback to just displaying the raw barcode data
      setEmployeeData({
        ...defaultEmployeeData,
        id: barcodeData,
        companyName: 'ROYAL LOGISTICS'
      });
    }
  };

  return (
    <EmployeeContext.Provider value={{ employeeData, updateEmployeeData, scanEmployeeData }}>
      {children}
    </EmployeeContext.Provider>
  );
};