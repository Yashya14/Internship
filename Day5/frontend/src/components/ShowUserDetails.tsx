import React from 'react';
import { ShowUserDetailsProps } from './Employee.type';
import LabelValueModel from './LabelValueModel';


const ShowUserDetails: React.FC<ShowUserDetailsProps> = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white p-4 rounded-xl shadow-lg w-full sm:w-80 max-w-sm relative">
        <h1 className='text-center font-bold text-3xl mb-2'>User Details</h1>
        <LabelValueModel labelname="FirstName" value={user.firstName} />
        <LabelValueModel labelname="LastName" value={user.lastName} />
        <LabelValueModel labelname="Date of Birth" value={user.dateOfBirth} />
        <LabelValueModel labelname="Address" value={user.address} />

        <div className="flex justify-center py-2 mt-2">
          <button onClick={onClose}
            className="text-gray-800 bg-blue-500 p-2 rounded-full shadow-md hover:bg-blue-600 text-sm font-semibold">
            <span>Close</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowUserDetails;
