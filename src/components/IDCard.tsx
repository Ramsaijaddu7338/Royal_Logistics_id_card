import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import JsBarcode from 'jsbarcode';
import { useEmployee } from '../context/EmployeeContext';
import { UserCircle } from 'lucide-react';

const IDCard: React.FC<{ side?: 'front' | 'back' }> = ({ side = 'front' }) => {
  const { employeeData } = useEmployee();
  const qrCodeRef = useRef<HTMLCanvasElement>(null);
  const barcodeRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (qrCodeRef.current) {
      QRCode.toCanvas(qrCodeRef.current, JSON.stringify(employeeData), {
        width: 180,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });
    }

    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, employeeData.id || 'EMP0000', {
        format: "CODE128",
        width: 2,
        height: 40,
        displayValue: true,
        fontSize: 12,
        margin: 5
      });
    }
  }, [employeeData]);

  const backgroundImage = "/images/royal-template.jpg";
const signatureImage = "/images/signature.png";


  if (side === 'back') {
    return (
      <div className="bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="relative w-full" style={{ aspectRatio: '0.63/1' }}>
          <div className="absolute inset-0">
            <img src={backgroundImage} alt="background" className="w-full h-full object-cover" />
          </div>
  
          <div className="relative z-10 pt-[120px] px-6 pb-6 h-full flex flex-col justify-between">
            {/* QR Code Section - Reduced Size */}
            <div className="text-center">
              <p className="text-white mb-2 text-sm">Scan QR code to verify employee details</p>
              <canvas 
                ref={qrCodeRef} 
                className="mx-auto bg-white p-2 rounded-lg shadow-sm"
                style={{ width: '120px', height: '120px' }}  // Reduced size
              />
            </div>
  
            {/* Company Info - Unchanged */}
            <div className="text-center mt-4 space-y-0">
  <h3 className="font-bold text-gray-800">Royal Logistics Head Office</h3>
  <p className="text-sm text-gray-600">
    <span className="text-yellow-500 font-medium">Location:</span> 8-1-284/OU/130,2nd Floor,OU Colony, Manikonda
    Shaikpet, Hyderabad,Telangana - 500089.
  </p>
  <p className="text-sm text-gray-600">
    <span className="text-yellow-500 font-medium">Contact:</span> +91 9000747680
  </p>
  <p className="text-sm text-gray-600">
    <span className="text-yellow-500 font-medium">Email:</span> raja@royalslogistic.com
  </p>
  <p className="text-sm text-gray-600">www.royallogistics.co</p>
  <p className="text-sm text-gray-600">
    This ID card remains the property of Royal Logistics.
  </p>
</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
      <div className="relative w-full" style={{ aspectRatio: '0.63/1' }}>
        <div className="absolute inset-0">
          <img src={backgroundImage} alt="Royal Logistics Template" className="w-full h-full object-cover" />
        </div>

        <div className="relative z-10 pt-[120px] px-6 pb-6 h-full flex flex-col justify-between">
          {/* Profile image */}
          <div className="flex justify-center mb-4">
            <div className="w-32 h-40 bg-white p-1 shadow-lg">
              {employeeData.avatarUrl ? (
                <img src={employeeData.avatarUrl} alt="Employee" className="w-full h-full object-cover" />
              ) : (
                <div className="bg-gray-100 w-full h-full flex items-center justify-center">
                  <UserCircle size={64} className="text-gray-400" />
                </div>
              )}
            </div>
          </div>

          {/* Name & position */}
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-gray-800 uppercase">{employeeData.name || 'Employee Name'}</h2>
            <p className="text-lg font-medium text-gray-700">{employeeData.position || 'Job Position'}</p>
          </div>

          {/* Info */}
          <div className="mt-4 space-y-2 text-[15px] text-gray-800 leading-snug text-center">
  <p className="font-sans">
    <span className="font-bold text-yellow-600">ID no : </span>
    <span className="font-medium text-black">{employeeData.id || 'EMP0000'}</span>
  </p>
  <p className="font-sans">
    <span className="font-bold text-yellow-600">Blood Group : </span>
    <span className="font-medium text-black">{employeeData.bloodGroup || 'Not specified'}</span>
  </p>
  <p className="font-sans">
    <span className="font-bold text-yellow-600">Phone : </span>
    <span className="font-medium text-black">{employeeData.phone || 'Not specified'}</span>
  </p>
</div>

          {/* Signature */}
          <div className="text-center mt-6 font-serif">
            <img
              src={signatureImage}
              alt="Signature"
              className="mx-auto h-10 mb-1 object-contain"
            />
            <p className="text-sm text-black">Authorised Signature</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IDCard;