import React, { useRef } from 'react';
import { useEmployee } from '../context/EmployeeContext';

const IDCardForm: React.FC = () => {
  const { employeeData, updateEmployeeData } = useEmployee();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateEmployeeData({ [name]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateEmployeeData({ avatarUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={employeeData.name || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Enter employee name"
        />
      </div>

      <div>
        <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
          Job Position
        </label>
        <input
          type="text"
          id="position"
          name="position"
          value={employeeData.position || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Enter job position"
        />
      </div>

      <div>
        <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">
          Employee ID
        </label>
        <input
          type="text"
          id="id"
          name="id"
          value={employeeData.id || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="e.g., EMP0001"
        />
      </div>
      <div>
        <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-1">
          Blood Group
        </label>
        <select
          id="bloodGroup"
          name="bloodGroup"
          value={employeeData.bloodGroup || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          <option value="" disabled>Select blood group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={employeeData.phone || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="e.g., +91 9123456789"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Employee Photo
        </label>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
        />
      </div>
    </form>
  );
};

export default IDCardForm;