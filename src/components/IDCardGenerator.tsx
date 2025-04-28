import React from 'react';
import IDCardForm from './IDCardForm';
import IDCardPreview from './IDCardPreview';

const IDCardGenerator: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Employee Information</h2>
        <IDCardForm />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">ID Card Preview</h2>
        <IDCardPreview />
      </div>
    </div>
  );
};

export default IDCardGenerator;