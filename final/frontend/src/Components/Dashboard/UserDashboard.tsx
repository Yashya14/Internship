import { useUserRoleContext } from "../UserRoleContext/UserRoleContext";

const UserDashboard: React.FC = () => {
    const { profileData } = useUserRoleContext();
    // console.log("profileData: ", profileData);


    return (
        <>
            <div className='list-container-user'>
                <div>
                    <h3 className="text-2xl font-semibold ms-2">Welcome, {profileData && profileData.firstName} {profileData && profileData.lastName} 👋</h3>
                    <p className="text-muted mt-1 ms-2">Manage your profile, view your activities, and much more.</p>
                </div>
            </div>
        </>
    )
}

export default UserDashboard;