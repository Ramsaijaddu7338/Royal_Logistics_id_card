import React from 'react';
import { EmployeeProvider } from './context/EmployeeContext';
import IDCardGenerator from './components/IDCardGenerator';

function App() {
  return (
    <EmployeeProvider>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-gray-800 text-white py-4 shadow-md">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold">Royal Logistics ID Card Generator</h1>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <IDCardGenerator />
        </main>
        <footer className="bg-gray-800 text-white py-4 mt-8">
          <div className="container mx-auto px-4 text-center">
            <p>© {new Date().getFullYear()} Royal Logistics. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </EmployeeProvider>
  );
}

export default App;