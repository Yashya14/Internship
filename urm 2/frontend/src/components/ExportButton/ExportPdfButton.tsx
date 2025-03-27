import React from "react";
import { jsPDF } from "jspdf";
import   autoTable  from "jspdf-autotable";
import { Button } from "react-bootstrap";
import { FaFilePdf } from "react-icons/fa";

// PDFTable component for creating the table based on user and role data
interface ExportPDFButtonProps {
  docText: string;
  docName: string;
  columnsData: any[];
  rows: any[][];
}

export const ExportPDFButton: React.FC<ExportPDFButtonProps> = ({docText,columnsData,rows,docName }) => {
  const generateTable = () => {
    const doc = new jsPDF();

    doc.text(docText, 14, 10);

    // Add the table to the document
    autoTable(doc, {
      head: [columnsData],
      body: rows,
      startY: 20,
      theme: "grid",
    });

    // Save the generated PDF
    doc.save(`${docName}`);
  };

  return (
    <Button variant="danger" className="d-flex align-items-center btn-sm btn-md mb-2 mb-sm-0 p-2" size="sm" title="Export to PDF" onClick={generateTable}><FaFilePdf /></Button>
  );
};

// // ExportToPDF component that takes userData and docText as props
// const ExportToPDF = ({ userData, docText = "User Information Table" }) => {
//   return (
//     <div>
//       <h2>{docText}</h2>
//       <PDFTable userData={userData} docText={docText} />
//     </div>
//   );
// };

// export default ExportToPDF;
