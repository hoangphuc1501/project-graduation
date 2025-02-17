import { Outlet } from "react-router-dom";
import ProfileLeft from "../../../components/client/users/profileLeft";


const Profile = () => {
    return (
        <div className="py-[60px]">
            <div className="container px-[16px] mx-auto">
                <div className="flex justify-between ">
                    <div className="w-[25%]">
                        <ProfileLeft/>
                    </div>
                    <div className="w-[73%] px-[20px] py-[12px] rounded-[10px] overflow-hidden">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Profile;