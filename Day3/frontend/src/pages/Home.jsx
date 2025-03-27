import { useState, useEffect } from "react";
import axios from "axios";
import AddEditUser from "./AddEditUser";
import ListUserData from "./ListUserData";

const Home = () => {
  const [id, setId] = useState(null);
  const [data, setData] = useState([]); // all users

  // set the selectedf id of user
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

  return (
    <div className="main-content">
      <h1 className="text-center m-5 font-medium text-4xl my-5">
        Employee Data
      </h1>
      <div className="flex flex-wrap justify-center">
        <div className="w-full md:w-3/5 p-2">
          <ListUserData editUser={editUser} data={data} getUsers={getUsers} />
        </div>
        <div className="w-full md:w-2/5 p-2">
          <AddEditUser id={id} userUpdated={userUpdated} getUsers={getUsers} />
        </div>
      </div>
    </div>
  );
};

export default Home;
