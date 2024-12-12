// import Papa from 'papaparse';

// // Utility function to export data to CSV
// export const exportToCSV = (
//     data: any[],
//     filename: string = 'exported_data.csv',
//     columns?: string[]
// ) => {
//     // If no specific columns are provided, use all keys from the first object
//     const effectiveColumns = columns ||
//         (data.length > 0 ? Object.keys(data[0]) : []);

//     // Prepare the data for export, selecting only specified columns
//     const dataToExport = data.map(item =>
//         effectiveColumns.reduce((acc, col) => {
//             // Handle nested objects and potential undefined values
//             acc[col] = item[col] !== undefined ?
//                 (typeof item[col] === 'object' ?
//                     JSON.stringify(item[col]) :
//                     item[col])
//                 : '';
//             return acc;
//         }, {} as any)
//     );

//     // Convert to CSV
//     const csv = Papa.unparse({
//         fields: effectiveColumns,
//         data: dataToExport.map(item =>
//             effectiveColumns.map(col => item[col])
//         )
//     });

//     // Create and trigger file download
//     const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');

//     if (link.download !== undefined) {
//         const url = URL.createObjectURL(blob);
//         link.setAttribute('href', url);
//         link.setAttribute('download', filename);
//         link.style.visibility = 'hidden';
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     }
// };

// =============================== Above code exports nested objects also ===============================

import Papa from "papaparse";

/**
 * Exports only first-level object properties to CSV
 * @param data Array of objects to export
 * @param filename Name of the CSV file
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const exportToCSV = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[] | undefined,
  filename: string = "exported_data.csv",
) => {
  // If no data, exit early
  if (!data || data.length === 0) {
    console.warn("No data to export");
    return;
  }

  // Extract only first-level, non-object properties
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const extractFirstLevelProps = (obj: any) => {
    return Object.keys(obj).reduce((acc, key) => {
      // Only include properties that are not objects, arrays, or functions
      if (
        obj[key] !== null &&
        typeof obj[key] !== "object" &&
        typeof obj[key] !== "function"
      ) {
        acc[key] = obj[key];
      }
      return acc;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }, {} as any);
  };

  // Prepare data with only first-level properties
  const flattenedData = data.map(extractFirstLevelProps);

  // If no data after flattening, exit
  if (flattenedData.length === 0) {
    console.warn("No first-level properties to export");
    return;
  }

  // Extract headers from the first object
  const headers = Object.keys(flattenedData[0]);

  // Convert to CSV
  const csv = Papa.unparse({
    fields: headers,
    data: flattenedData.map((item) => headers.map((header) => item[header])),
  });

  // Create and trigger file download
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
