import { Button } from 'react-bootstrap';
import { FaFileCsv } from 'react-icons/fa';
import { toast } from 'react-toastify';
// import { ICombine } from '../UserRoleContext/UserRoleContext.tsx';

interface IExportButtonProps<T> {
    data: T[];
    typeOfData: string;
    mapData: (item: T) => any;
}

export const downloadCSV = <T,>(data: T[], mapData: (item: T) => any, typeOfData: string) => {
    if (data.length === 0) {
        toast.error('No data available to export');
        return;
    }

    const csvData = data.map(mapData);

    const csvContent = "data:text/csv;charset=utf-8," +
        [Object.keys(csvData[0]).join(','), ...csvData.map(row => Object.values(row).join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${typeOfData}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`${typeOfData} data downloaded successfully`);
};

const ExportButton= <T,>({ data, typeOfData, mapData }: IExportButtonProps<T>) => (
    <Button
        onClick={() => downloadCSV(data, mapData, typeOfData)}
        variant="success"
        title="Export to CSV"
        className="p-2 d-flex align-items-center me-1 btn-sm btn-md mb-2 mb-sm-0 title-hover"
    >
        <FaFileCsv />
    </Button>
);

export default ExportButton;