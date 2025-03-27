import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
    ChartData,
    ArcElement
} from 'chart.js';
import './AdminDashboard.css';
import { useUserRoleContext } from '../UserRoleContext/UserRoleContext';
import { Doughnut } from 'react-chartjs-2';
import DataTable from 'react-data-table-component';
import {customStyles} from '../CustomStyles/customStyles.ts';
import { FaCheck, FaTimes, FaUser, FaUsers } from 'react-icons/fa';

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

interface StatCardProps {
    title: string;
    value: number;
    icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
    <Col md={3} sm={6} xs={12} className="mb-3">
        <Card className="p-2 text-center shadow-sm stat-card d-flex flex-column gap-lg-4 pt-lg-3 pb-lg-3 flex-md-row align-items-center justify-content-center stat-card-responsive">
            <div className="icon-container" style={{ backgroundColor: '#f8f9fa', borderRadius: '50%', padding: '0.5rem', marginBottom: '0.5rem' }}>
                {icon}
            </div>
            <div className="text-center">
                <h6 className="stat-card-title">{title}</h6>
                <p className="stat-card-value mb-0">{value}</p>
            </div>
        </Card>
    </Col>
);

interface IActivityLog {
    date: string;
    user: string;
    action: string;
    status: string;
    details: string;
}

// const activityLogs: IActivityLog[] = [
//     { date: '2025-02-10 10:00', user: 'Admin', action: 'Logged In', status: 'Success', details: 'User logged in successfully' },
//     { date: '2025-02-10 10:05', user: 'Admin', action: 'Added User', status: 'Success', details: 'Added new user John Doe' },
//     { date: '2025-02-10 10:10', user: 'Admin', action: 'Updated Role', status: 'Success', details: 'Updated role for user Jane Smith' },
//     { date: '2025-02-10 10:15', user: 'Admin', action: 'Deleted User', status: 'Success', details: 'Deleted user John Doe' },
//     { date: '2025-02-10 10:20', user: 'Admin', action: 'Edited Role', status: 'Success', details: 'Edited role for user Jane Smith' },
//     { date: '2025-02-10 10:25', user: 'Admin', action: 'Deleted Role', status: 'Success', details: 'Deleted role for user Jane Smith' },
    
// ];

const DetailsCell: React.FC<{ row: IActivityLog }> = ({ row }) => (
    <div style={{ flexGrow: 2 }}>
        {`${row.details}`}
    </div>
);

const columns = [
    { name: 'Date/Time', selector: (row: IActivityLog) => row.date, sortable: true,reverse : true },
    { name: 'User', selector: (row: IActivityLog) => row.user, sortable: true },
    { name: 'Action', selector: (row: IActivityLog) => row.action, sortable: true },
    { name: 'Status', selector: (row: IActivityLog) => row.status, sortable: true },
    { name: 'Details', cell: (row: IActivityLog) => <DetailsCell row={row} />, sortable: true },
];

interface ActivityLogsTableProps {
    logsData: IActivityLog[];
}

const ActivityLogsTable: React.FC<ActivityLogsTableProps> = ({ logsData }) => (
    <DataTable
        // className='stat-card'
        className='activity-logs-table'
        fixedHeader
        fixedHeaderScrollHeight='250px'
        customStyles={customStyles}
        columns={columns}
        data={logsData}
        pagination
        highlightOnHover
        striped
        dense
    />
);

// Define donut chart options
const donutOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
        // (legend - display )used to display area of chart and position is set to bottom
        legend: { display: true, position: 'bottom' }, 
        title: { display: true, text: 'User Role Distribution' },
        
    }
};

const AdminDashboard: React.FC = () => {
    const { users, roles, activeRoleCount, inactiveRoleCount,logsData } = useUserRoleContext();

    const roleDistribution: ChartData<'doughnut'> = {
        labels: ['Active Roles', 'Inactive Roles', 'Roles', 'Users'],
        datasets: [
            {
                label: 'User Role Distribution',
                data: [activeRoleCount, inactiveRoleCount, roles.length, users.length],
                backgroundColor: [
                    'rgba(40, 167, 69, 0.8)',    // Bright Green
                    'rgba(255, 193, 7, 0.8)',    // Bright Yellow
                    'rgba(220, 53, 69, 0.8)',     // Bright Red
                    'rgba(0, 123, 255, 0.8)',    // Bright Blue
                ],
            }
        ]
    };

    return (
        <div className='list-container'>
            <div>
                <h3 className="text-2xl font-semibold ms-2">Welcome, Admin 👋</h3>
                <p className="text-muted mt-1 ms-2">Manage users and roles, view statistics, and perform administrative tasks.</p>
            </div>
            <Container fluid className="mt-4">
            <Row>
                    <StatCard title="Total Users" value={users.length} icon={<FaUsers color="#007bff" size="2em" />} />
                    <StatCard title="Total Roles" value={roles.length} icon={<FaUser color="#28a745" size="2em" />} />
                    <StatCard title="Active Roles" value={activeRoleCount} icon={<FaCheck color="#ffc107" size="2em" />} />
                    <StatCard title="Inactive Roles" value={inactiveRoleCount} icon={<FaTimes color="#dc3545" size="2em" />} />
                </Row>
            </Container>
            <Container fluid className="mt-3">
                <Row>
                    <Col lg={8} md={12} sm={12} xs={12} className="d-flex flex-column justify-content-start mb-3">
                        <h5 className='pb-2 text-2xl font-semibold'>Activity Logs</h5>
                        <ActivityLogsTable logsData={logsData}/>
                    </Col>
                    <Col lg={4} md={6} sm={12} xs={12} className="d-flex flex-column justify-content-center pe-2">
                        <Card className="p-3 stat-card">
                            <h5>User Role Management</h5>
                            <Doughnut data={roleDistribution} options={donutOptions} />
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AdminDashboard;