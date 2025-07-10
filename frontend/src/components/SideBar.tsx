
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaVideo, FaUser, FaSignOutAlt, FaTimes, FaBars, FaUpload } from 'react-icons/fa';
import type { AppDispath } from '../reducers/store';
import { fetchUserDetails, logOutUser } from '../reducers/auth/authReducer';

const SideBar: React.FC = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const navigate = useNavigate();
    const disPatch = useDispatch<AppDispath>();

    const toggleSideBar = () => {
        setIsOpen((prev) => !prev);
    };
    useEffect(()=>{
      disPatch(fetchUserDetails())
    },[]);
    return (
        <>
        <div className={`fixed top-0 left-0 z-40 w-64 h-screen bg-black text-white lg:bg-gray-400 lg:text-black shadow-lg transition-all duration-300ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <div className='p-4 text-2xl font-semibold border-b border-gray-300 hidee md:block'>
                My Video Hub
            </div>
            <nav className='mt-10 md:mt-7'>
                <ul>
                    <li>
                        <NavLink
                            onClick={toggleSideBar}
                            to="/"
                            className="flex items-center p-3 hover:bg-bgTwo hover:text-gray-900 rounded-md"
                        >
                            <FaHome size={20} className="mr-3" />
                            <span>Home</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            onClick={toggleSideBar}
                            to="/user/upload-video"
                            className="flex items-center p-3 hover:bg-bgTwo hover:text-gray-900 rounded-md"
                        >
                            <FaUpload size={20} className="mr-3" />
                            <span>Upload Videos</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            onClick={toggleSideBar}
                            to="/user/edit/my-videos"
                            className="flex items-center p-3 hover:bg-bgTwo hover:text-gray-900 rounded-md"
                        >
                            <FaVideo size={20} className="mr-3" />
                            <span>My Videos</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            onClick={toggleSideBar}
                            to="/user/profile"
                            className="flex items-center p-3 hover:bg-bgTwo hover:text-gray-900 rounded-md"
                        >
                            <FaUser size={20} className="mr-3" />
                            <span>User Profile</span>
                        </NavLink>
                    </li>

                    <li>
                        <div
                            onClick={toggleSideBar}
                            className="flex items-center p-3 hover:bg-bgTwo hover:text-gray-900 rounded-md cursor-pointer"
                            onClickCapture={()=>disPatch(logOutUser(navigate))}
                        >
                            <FaSignOutAlt size={20} className="mr-3" />
                            <span>Logout</span>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
        <div className='fixed top-0 left-0 right-0 bg-black text:white h-12 flex items-center px-4 shadow-md z-50'>
            <button onClick={toggleSideBar} className='text-white text-2xl'>
                {isOpen ? <FaTimes/> : <FaBars/>}
            </button>
            <div className='w-full flex items-center justify-center'>
                <NavLink to={"/"} className={`text-lg font-semibold`}>
                    My Video Hub
                </NavLink>
            </div>
        </div>
        </>
    );
};

export default SideBar;
