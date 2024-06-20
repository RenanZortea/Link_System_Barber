import React, { useState, createContext, useContext } from 'react';
import { FaHome, FaBars, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { CiCalendar } from "react-icons/ci";
import { RiContactsLine } from "react-icons/ri";
import { MdAttachMoney } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { doSignOut } from '../../contexts/auth/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './index.css';
import bg from '../../assets/bg.svg';
import toggle_backdrop from '../../assets/toggle_backdrop.svg';
import stars from '../../assets/stars.svg';
import circles from '../../assets/circles.svg';
import clouds from '../../assets/clouds.svg';
import { DarkModeContext } from '../../contexts/darkModeContext';


const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const [IS_PRESSED, setIS_PRESSED] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLogout = async () => {
    try {
      await doSignOut(); // Call the doSignOut function
      console.log('Logout successful');
      navigate('/login'); // Navigate to the login page
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  const menuItems = [
    { id: 'home', name: 'Home', icon: <FaHome />, link: '/home' },
    { id: 'billing', name: 'Faturamento', icon: <MdAttachMoney />, link: '/faturamento' },
    { id: 'customers', name: 'Clientes', icon: <RiContactsLine />, link: '/customers' },
    { id: 'scheduler', name: 'Calendário', icon: <CiCalendar />, link: '/scheduler' },
    { id: 'settings', name: 'Configurações', icon: <IoSettingsOutline />, link: '/configuracoes' }
  ];
  
const { darkMode, setDarkMode } = useContext(DarkModeContext);

const TOGGLE = () => {
  const root = document.documentElement;
  console.log('TOGGLE function called');
  console.log('Current IS_PRESSED state:', IS_PRESSED);
  if (IS_PRESSED) {
    console.log('Removing dark class');
    root.classList.remove('dark');
    setDarkMode(false); // Set darkMode to false when IS_PRESSED is true
  } else {
    console.log('Adding dark class');
    root.classList.add('dark');
    setDarkMode(true); // Set darkMode to true when IS_PRESSED is false
  }
  setIS_PRESSED(!IS_PRESSED); // Pass the new value to the state setter
  console.log('New IS_PRESSED state:', !IS_PRESSED);
};





return (
    <div className={`flex flex-col ${isExpanded ? 'w-48' : 'w-16'} min-h-screen bg-black transition-width duration-500`}>
        <div className="flex items-center justify-center mt-4 mb-4">
            <div className="text-white text-2xl cursor-pointer transition-all duration-200 ease-in-out" onClick={toggleExpanded}>
                <FaBars />
            </div>
        </div>
        <div className="flex-grow">
            <ul className="list-none p-0">
                {menuItems.map((item, index) => (
                    <li key={index} className={`py-4 w-full text-center relative flex ${isExpanded ? 'justify-start ml-4' : 'justify-center'}`}>
                        <Link
                            to={item.link}
                            className="text-white no-underline text-xl flex items-center justify-center relative"
                        >
                            <div className={`mb-2 ${isExpanded ? 'ml-2' : 'hover:text-2xl transition-all duration-200 ease-in-out'}`}>{item.icon}</div>
                            {isExpanded && <span className="ml-2 absolute left-8 bottom-1">{item.name}</span>}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
        <div className="flex justify-center mb-2">
            <img src={logo} alt="Company Logo" className="w-10 h-10 rounded-full" />
        </div>
        <div className="flex justify-center mb-4">
            <div className="text-white text-2xl cursor-pointer mb-2 transition-all duration-200 ease-in-out" onClick={toggleExpanded}>
                <FaUser />
            </div>
        </div>
        <div className="flex justify-center mb-4">
            <button className="bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition-colors" onClick={handleLogout}>
                <FaSignOutAlt className="text-xl" />
            </button>
        </div>
        {/*absolute insanity do not try this at home*/}
        
        <div className="flex justify-center mb-4 place-content-center mx-auto">
      <button className="toggle" aria-pressed={IS_PRESSED} title="Toggle Dark Mode" onClick={TOGGLE}>
        <span className="toggle__content">
          {!IS_PRESSED && <img src={clouds} alt="Clouds" />}
          <span aria-hidden="true" className="pilot__container">
            <span className="pilot-bear">
              <img src={bg} alt="Background" />
            </span>
          </span>
          {!IS_PRESSED && <img src={toggle_backdrop} alt="Toggle Backdrop" />}
          <span className="toggle__indicator-wrapper">
            <span className="toggle__indicator">
              <span className="toggle__star">
                <span className="sun">
                  <span className="moon">
                    <span className="moon__crater"></span>
                    <span className="moon__crater"></span>
                    <span className="moon__crater"></span>
                  </span>
                </span>
              </span>
            </span>
          </span>
          {IS_PRESSED && <img src={stars} aria-hidden={true} alt="Stars" />}
          <span className="astrobear__container">
            <span className="astrobear">
              {IS_PRESSED && <img src={circles} alt="Circles" />}
            </span>
          </span>
        </span>
      </button>





        </div>
    </div>
);
}

export default Sidebar;
