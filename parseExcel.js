import xlsx from "xlsx";

/**
 * Parses an uploaded Excel file.
 * @param {string} filePath - Path to the uploaded file.
 * @returns {object} - Criteria and alternatives extracted from the file.
 */
export const parseExcel = (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  const criteria = Object.keys(data[0]).slice(1);
  const alternatives = data.map((row) => ({
    name: row[Object.keys(row)[0]],
    values: criteria.map((criterion) => parseFloat(row[criterion])),
  }));

  return { criteria, alternatives };
};
