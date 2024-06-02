import React, { useState } from 'react';
import Resto from '../assets/restaurant.jpg';

import { Facebook, Info, Instagram, Twitter } from 'lucide-react';
import InfoMenu from './InfoMenu';

interface CoverProps {
    title: string;
}

const Cover: React.FC<CoverProps> = ({ title }) => {
    const [infoVisible, setInfoVisible] = useState<boolean>(false);

    const toggleInfo = () => {
        setInfoVisible(!infoVisible);
    };

    return (
        <>
            <div className={`bg-[url('${Resto}')] bg-cover bg-no-repeat bg-full bg-blue-100 w-screen flex justify-center items-center p-3 shadow-md mx-auto relative`}>
                <h2 className='text-white text-2xl font-bold items-center'>{title}</h2>
                <div className='absolute right-1'>
                    <Info className='shadow rounded-full shadow-md text-[#efeeee]' size={30} onClick={toggleInfo} />
                    {infoVisible && <InfoMenu />}
                </div>
                <div className='text-white absolute left-1 flex top-1 gap-2'>
                    <Facebook size={22} />
                    <Instagram size={22} />
                    <Twitter size={22} />
                </div>
            </div>
        </>
    );
}

export default Cover;
