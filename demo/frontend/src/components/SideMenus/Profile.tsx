import React, { useEffect, useState } from 'react'
import axiosInstance from '../Axios/axiosInstance';

const Profile: React.FC = () => {
    const [profileData, setProfileData] = useState<any[]>();

    const getProfileData = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const response = await axiosInstance.get(`/auth/profile/${userId}`);
            setProfileData(response.data);
            console.log("profile : ", response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProfileData();
    }, [])

    return (
        <>
            <div className="mt-2">
                <h1>Profile</h1>
                {profileData && profileData.map((data: any) => (
                    <div key={data._id} className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Name : {data.name}</h5>
                            <p className="card-text">Email : {data.email}</p>
                        </div>
                    </div>
                ))}

            </div>

        </>
    )
}

export default Profile;