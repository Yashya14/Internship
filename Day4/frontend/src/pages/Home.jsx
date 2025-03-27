import { useState, useEffect } from "react";
import axios from "axios";
import AddEditUser from "./AddEditUser";
import ListUserData from "./ListUserData";
import { toast } from "react-toastify";

// let localUserData = []; // to store the data locally

const Home = () => {
  const [id, setId] = useState(null);
  const [data, setData] = useState([]); // all users
  const [localData, setLocalData] = useState([]); // local data 
  const [useLocal, setUseLocal] = useState(true); // toggle between local and api

  // set the selected id of user
  const editUser = (id) => {
    console.log("edit user id : ", id);
    setId(id);
  };

  // reset the selected id of user
  const userUpdated = () => {
    setId(null);
    getUsers(); //  refresh the users list after update
  };

  // fetch all users
  const getUsers = async () => {
    const result = await axios.get("http://localhost:8000/users");
    if (result.status === 200) setData(result.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const saveToAPI = async () => {
    try {
      console.log(localData);
      // create an array of requests to save data to api
      const requests = localData.map((user) => {
        if (user.id) return axios.post("http://localhost:8000/user", user);
      });

      await Promise.all(requests);

      toast.success("Data saved to API successfully!");
      setLocalData([]);
      setUseLocal(false); // disable local after save
      await getUsers(); // fetch data from api to render the table
    } catch (error) {
      toast.error("Failed to save data to API. Please try again.");
    }
  };

  return (
    <div className="main-content">
      <h1 className="text-center m-5 font-medium text-4xl my-5">
        Employee Data
      </h1>
      <div className="flex flex-wrap justify-center">
        <div className="w-full md:w-3/5 p-2">
          <ListUserData
            editUser={editUser}
            data={useLocal ? localData : data}
            getUsers={getUsers}

            setLocalData={setLocalData}
            saveToAPI={saveToAPI}
            useLocal={useLocal}
          />
        </div>
        <div className="w-full md:w-2/5 p-2">
          <AddEditUser
            id={id}
            userUpdated={userUpdated}
            getUsers={getUsers}
            
            localData={localData}
            setLocalData={setLocalData}
            useLocal={useLocal}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
