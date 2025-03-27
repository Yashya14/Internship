import { readFile, writeFile } from 'fs';
import { join } from 'path';

const logFilePath = join(__dirname, '../database/logs.json');

export interface Log {
    date: string;
    user: string;
    action: string;
    status: string;
    details: string;
}

const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    return new Intl.DateTimeFormat('en-US', options).format(date).replace(',', '');
};

const logAction = (log: Log): void => {
    readFile(logFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Failed to read log file:', err);
            return;
        }

        let logsData: { logs: Log[] } = { logs: [] }; // Default to empty logs if the file is empty 
        try {
            logsData = JSON.parse(data); 
            if (!Array.isArray(logsData.logs)) {
                console.error('Log file content is not a valid logs array:', data);
                throw new Error('Invalid log file structure');
            }
        } catch (err) {
            console.error('Error parsing log file:', err);
            return;
        }

        // Add the new log entry to the logs array
        logsData.logs.push(log);

        // Write the updated logs back to the file
        writeFile(logFilePath, JSON.stringify(logsData, null, 2), (err) => {
            if (err) {
                console.error('Failed to write log:', err);
            } else {
                console.log('Log successfully written.');
            }
        });
    });
};

export { logAction, formatDate };
