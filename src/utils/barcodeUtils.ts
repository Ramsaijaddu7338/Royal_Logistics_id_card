import JsBarcode from 'jsbarcode';
import { EmployeeData } from '../context/EmployeeContext';

/**
 * Generate barcode data from employee information
 * @param employee Employee data object
 * @returns String representation of the employee data for barcode
 */
export const generateBarcodeData = (employee: EmployeeData): string => {
  // Format data for barcode - can be customized based on scanning app requirements
  return JSON.stringify({
    name: employee.name,
    position: employee.position,
    id: employee.id,
    joinDate: employee.joinDate,
    phone: employee.phone
  });
};

/**
 * Apply barcode to an SVG element
 * @param element SVG element reference
 * @param data Barcode data to encode
 */
export const applyBarcode = (element: SVGSVGElement, data: string): void => {
  JsBarcode(element, data, {
    format: "CODE128",
    lineColor: "#000",
    width: 2,
    height: 50,
    displayValue: false
  });
};