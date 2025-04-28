import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Printer, Download, RefreshCw, Image } from 'lucide-react';
import * as htmlToImage from 'html-to-image';
import IDCard from './IDCard';
import { useEmployee } from '../context/EmployeeContext';

const IDCardPreview: React.FC = () => {
  const [showBack, setShowBack] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { employeeData } = useEmployee();

  const handlePrint = useReactToPrint({
    content: () => cardRef.current,
    documentTitle: 'Employee ID Card',
  });

  const handleDownloadJPG = async () => {
    if (cardRef.current) {
      try {
        const dataUrl = await htmlToImage.toJpeg(cardRef.current, {
          quality: 1.0,
          backgroundColor: '#ffffff',
        });
        
        const link = document.createElement('a');
        link.download = `${employeeData.name.replace(/\s+/g, '_')}_ID_Card_${showBack ? 'Back' : 'Front'}.jpg`;
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error('Error generating JPG:', error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div ref={cardRef} className="w-full max-w-[350px]">
        <IDCard side={showBack ? 'back' : 'front'} />
      </div>
      
      <div className="mt-6 flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => setShowBack(!showBack)}
          className="flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          {showBack ? 'Show Front' : 'Show Back'}
        </button>

        <button
          onClick={handlePrint}
          className="flex items-center px-4 py-2 bg-yellow-500 text-gray-900 rounded-md hover:bg-yellow-600 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
        >
          <Printer className="w-5 h-5 mr-2" />
          Print ID Card
        </button>
        
        <button
          onClick={handleDownloadJPG}
          className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
        >
          <Image className="w-5 h-5 mr-2" />
          Download as JPG
        </button>
      </div>
    </div>
  );
};

export default IDCardPreview;