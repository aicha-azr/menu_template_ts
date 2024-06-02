import React, { useState, useEffect } from 'react';
import { LayoutPanelLeft, MessagesSquare, ShoppingCart } from "lucide-react";
import waiterImage from '../assets/waiter.png';
import { useNavigate, useLocation } from 'react-router-dom';

const NavBar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const [waiterVisible, setWaiterVisible] = useState<boolean>(false);
    const [feedbackVisible, setFeedbackVisible] = useState<boolean>(false);

    useEffect(() => {
        if (location.pathname.includes('menu')) {
            setSelectedItem(0);
        } else if (location.pathname.includes('cart')) {
            setSelectedItem(2);
        } else {
            setSelectedItem(null);
        }
    }, [location.pathname]);

    const handleClick = (index: number, path?: string) => {
        setSelectedItem(index);
        if (path) navigate(path);
    };

    const toggleWaiter = () => {
        setWaiterVisible(!waiterVisible);
    };

    const toggleFeedback = () => {
        setFeedbackVisible(!feedbackVisible);
    };

    return (
        <>
            <nav className="shadow-md rounded-md w-full bg-white border border-black flex items-center">
                <ol className="flex flex-1 justify-between p-3">
                    <li 
                        className={`flex flex-col items-center cursor-pointer ${selectedItem === 0 ? 'text-[#279C61]' : ''}`}
                        onClick={() => handleClick(0, '/menu')}
                    >
                        <LayoutPanelLeft />
                        <p className="text-xs md:text-base">Menu</p>
                    </li>
                    <li 
                        className={`flex flex-col items-center cursor-pointer`}
                        onClick={() => { handleClick(1); toggleFeedback(); }}
                    >
                        <MessagesSquare />
                        <p className="text-xs md:text-base">Feedback</p>
                    </li>
                    <li 
                        className={`flex flex-col items-center cursor-pointer ${selectedItem === 2 ? 'text-[#279C61]' : ''}`}
                        onClick={() => handleClick(2, '/cart')}
                    >
                        <ShoppingCart />
                        <p className="text-xs md:text-base">Cart</p>
                    </li>
                    <li 
                        className="flex flex-col items-center cursor-pointer"
                        onClick={() => { handleClick(3); toggleWaiter(); }}
                    >
                        <div className={`rounded-full shadow-md self-start`}>
                            <img src={waiterImage} alt="waiter" className="rounded-full md:h-[48px] md:w-[46px] h-[43px] w-[41px]" />
                        </div>
                    </li>
                </ol>
            </nav>

            {waiterVisible && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
                    <div className="bg-white rounded-lg shadow-lg p-10 flex flex-col justify-around gap-4">
                        <h2 className="text-black font-bold text-1xl">Do you need waiter assistance?</h2>
                        <div className="flex justify-around mt-4">
                            <button className="text-white font-bold bg-[#279C61] rounded-[8px]">Yes</button>
                            <button className="text-white font-bold bg-[#279C61] rounded-[8px]" onClick={toggleWaiter}>No</button>
                        </div>
                    </div>
                </div>
            )}

            {feedbackVisible && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
                    <div className="bg-white rounded-lg shadow-lg p-10 flex flex-col justify-around gap-4">
                        <h2 className="text-black font-bold text-1xl">Your feedback is important. Share Your Feedback on:</h2>
                        <div className="flex justify-around mt-4">
                            <button className="text-white font-bold bg-[#279C61] rounded-[8px]">Yes</button>
                            <button className="text-white font-bold bg-[#279C61] rounded-[8px]" onClick={toggleFeedback}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default NavBar;
