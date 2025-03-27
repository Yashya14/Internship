import { IEmployee } from "./Employee.type";
import { useEffect, useState } from "react";
import { ShowUserDetails, AddEditUserModal } from "./index";
import DataTable, { TableColumn } from 'react-data-table-component';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlus, FaTrash, FaEdit, FaEye, FaTimes } from 'react-icons/fa';
import "./EmployeeList.css";

const EmployeeList: React.FC = () => {
  const [apiData, setApiData] = useState<IEmployee[]>([]); // to store data fetched from API
  const [localData, setLocalData] = useState<IEmployee[]>([]); // to store data added locally
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // to open model for adding/editing user
  const [selectedRows, setSelectedRows] = useState<IEmployee[]>([]); // to store selected rows
  const [editUser, setEditUser] = useState<IEmployee | null>(null); // to store user to edit
  const [isSaved, setIsSaved] = useState<boolean>(false); // to check if data is saved to API
  const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>(false); // to open modal for viewing user details
  const [viewUser, setViewUser] = useState<IEmployee | null>(null); // to store user to view
  const [filterText, setFilterText] = useState<string>(''); // to store filter text

  // column definition for data table
  const columns: TableColumn<IEmployee>[] = [
    { name: 'ID', selector: (row: IEmployee) => row.id },
    { name: 'First Name', selector: (row: IEmployee) => row.firstName, sortable: true },
    { name: 'Last Name', selector: (row: IEmployee) => row.lastName, sortable: true },
    {
      name: 'Badge', cell: (row) =>
      (<span title="view user" className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 cursor-pointer">
        <FaEye onClick={() => openUserModal(row)} />
      </span>),
    },
  ];

  // custom styles for data table
  const customStyles = {
    headCells: {
      style: {
        fontWeight: 'bold',
        fontSize: '16px',
        backgroundColor: '#09122C',
        color: 'white',
        paddingLeft: '8px',
        paddingRight: '8px',
      },
    },
    cells: {
      style: {
        paddingLeft: '8px',
        paddingRight: '8px',
      },
    },
  };

  // get all users from API
  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users');
      setApiData(response.data);
      setIsSaved(true);
    } catch (error) {
      console.error('Unable to fetch data!', error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // add user locally
  const handleAddUserLocally = (newUser: IEmployee) => {
    setLocalData([...localData, newUser]);
    setIsModalOpen(false);
    setIsSaved(false);
    toast.success('User added locally!');
  };

  // save new users to API
  const saveNewUsers = async () => {
    try {
      const requests = localData.map((user) => axios.post("http://localhost:8000/user", user));
      await Promise.all(requests);
      await getUsers();
      setLocalData([]);
      setIsSaved(true);
      toast.success('Users saved to API!');
    } catch (error) {
      console.error('Failed to save users:', error);
      toast.error('Failed to save users!');
    }
  };

  // delete selected users based (locally or from API)
  const deleteSelectedRows = async () => {
    if (!window.confirm("Are you sure you want to delete the selected users?")) {
      return;
    }

    const selectedIds = selectedRows.map(row => row.id);

    if (isSaved) {
      try {
        const requests = selectedIds.map(id => axios.delete(`http://localhost:8000/user/${id}`));
        await Promise.all(requests);
        await getUsers();
        toast.success('Users deleted from API!');
      } catch (error) {
        console.error('Failed to delete users:', error);
        toast.error('Failed to delete users!');
      }
    } else {
      const updatedData = localData.filter(user => !selectedIds.includes(user.id));
      setLocalData(updatedData);
      toast.success('Users deleted locally!');
    }
    setSelectedRows([]);
  };

  // edit selected user
  const editSelectedRows = () => {
    if (selectedRows.length === 1) {
      setEditUser(selectedRows[0]);
      setSelectedRows([]);
      setIsModalOpen(true);
    } else {
      alert("Please select one row to edit.");
    }
  };

  // edit user (locally or from API)
  const handleEditUser = async (updatedUser: IEmployee) => {
    if (isSaved) {
      try {
        await axios.put(`http://localhost:8000/user/${updatedUser.id}`, updatedUser);
        await getUsers();
        toast.success('User updated in API!');
      } catch (error) {
        console.error('Failed to update user:', error);
        toast.error('Failed to update user!');
      }
    } else {
      const updatedData = localData.map(user => user.id === updatedUser.id ? updatedUser : user);
      setLocalData(updatedData);
      toast.success('User updated locally!');
    }

    setIsModalOpen(false);
    setSelectedRows([]);
    setEditUser(null);
  };

  // handle selected rows change
  const handleSelectedRowsChange = (state: { selectedRows: IEmployee[] }) => {
    const allRows = [...apiData, ...localData];
    const selected = state.selectedRows.filter(row => allRows.find(r => r.id === row.id));
    setSelectedRows(selected);
  };

  // open modal to view user details
  const openUserModal = (user: IEmployee) => {
    setViewUser(user);
    setIsUserModalOpen(true);
  }

  const filterData = [...apiData, ...localData].filter(
    item => item.firstName.toLowerCase().includes(filterText.toLowerCase()) ||
      item.lastName.toLowerCase().includes(filterText.toLowerCase()));

  return (
    <div className="container mx-auto p-6 xl:px-20">
      <h1 className="text-3xl sm:text-4xl font-bold my-2 sm:my-4 text-center text-gray-800">
        Employee List
      </h1>


      {/* Button section */}

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 my-4">

        <div className="flex flex-wrap gap-2">
          <button
            className="bg-gradient-to-r from-blue-500 to-teal-400 text-white py-1 px-2 text-xs rounded-md shadow-sm hover:from-blue-600 hover:to-teal-500 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center sm:py-2 sm:px-4 sm:text-sm"
            onClick={() => { setIsModalOpen(true); setEditUser(null); }}
            title="Add New User"
          >
            <FaPlus className="mr-1" /> <span>Add</span>
          </button>

          <button
            className="bg-gradient-to-r from-red-500 to-pink-400 text-white py-1 px-2 text-xs rounded-md shadow-sm hover:from-red-600 hover:to-pink-500 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center sm:py-2 sm:px-4 sm:text-sm"
            onClick={deleteSelectedRows}
            disabled={selectedRows.length === 0}
            title="Delete User"
          >
            <FaTrash className="mr-1" /> <span>Delete</span>
          </button>

          <button
            className="bg-gradient-to-r from-yellow-500 to-orange-400 text-white cursor-pointer py-1 px-2 text-xs rounded-md shadow-sm hover:from-yellow-600 hover:to-orange-500 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 flex items-center sm:py-2 sm:px-4 sm:text-sm"
            onClick={editSelectedRows}
            disabled={selectedRows.length === 0}
            title="Edit User"
          >
            <FaEdit className="mr-1" /> <span>Edit</span>
          </button>
        </div>


        <div className="flex w-full sm:w-auto">
          <input
            type="text"
            className="sm:w-64 border rounded-lg border-gray-950 py-2 px-4 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
            placeholder="Search"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          {filterText && (
            <button
              className="ml-2 border border-blue-500  rounded-sm p-2 text-gray-600 hover:text-gray-900 ring-2 ring-blue-500"
              onClick={() => setFilterText('')}
              title="Clear Search"
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>


      {/* Data Table Section */}
      <div className="mt-6 max-h-screen overflow-auto">
        <DataTable
          columns={columns}
          data={filterData}
          pagination
          fixedHeader
          selectableRows
          fixedHeaderScrollHeight="calc(100vh - 400px)"
          onSelectedRowsChange={handleSelectedRowsChange}
          customStyles={customStyles}
          selectableRowsHighlight
        // dense
        />
      </div>
      {/* dense- rremove spacing */}

      {/* Save Changes Button */}
      {!isSaved && localData.length > 0 && (
        <button
          className="bg-green-500 text-white px-4 py-2 text-xs mt-4 rounded-md shadow-lg hover:bg-green-600 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          onClick={saveNewUsers}
          title="Save Changes"
        >
          Save Changes
        </button>
      )}

      {/* Modal for Adding/Editing User */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <AddEditUserModal
            onClose={() => setIsModalOpen(false)}
            onAdd={editUser ? handleEditUser : handleAddUserLocally}
            user={editUser}
          />
        </div>
      )}

      {/* Modal for Viewing User Details */}
      {isUserModalOpen && viewUser && (
        <ShowUserDetails user={viewUser} onClose={() => setIsUserModalOpen(false)} />
      )}

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default EmployeeList;
