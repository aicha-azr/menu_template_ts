import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Check, Copy, Facebook, Instagram, MapPin, MessageSquareWarning, Phone, Twitter, Wifi } from "lucide-react";
import {CopyToClipboard} from 'react-copy-to-clipboard';
interface InfoData {
    logo: string;
    address: string;
    phone: string;
}

const InfoMenu: React.FC = () => {
    const navigate = useNavigate();
    const [info, setInfo] = useState<InfoData | null>(null);
    const textToCopy = 'ABC123';
    const [copied, setCopied] = useState<boolean>(false);

    const handleReclamationClick = () => {
        navigate('/reclamation');
    };

    const fetchInfo = async () => {
        try {
            const response = await axios.get('https://json-4m9i.onrender.com/infos/1');
            setInfo(response.data);
        } catch (e) {
            console.log('error: ', e);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <>
            <div className="bg-white absolute top-[4rem] right-0 p-1 rounded-[20px] shadow-lg shadow-[#279C61] z-50 w-[300px] text-black">
                <ul className="flex flex-col gap-3 py-4">
                    <li className="p-1 flex justify-center">
                        {info ? (
                            <img src={info.logo} alt="logo" className="rounded rounded-full h-10 w-10 border border-black border-2" />
                        ) : ""}
                    </li>
                    <li className="p-1 font-bold">
                        <h2 className="text-xl">Restaurant Name</h2>
                    </li>
                    <li className="flex flex-col gap-3">
                        <h4 className="font-bold">Social Media</h4>
                        <div className="flex justify-around text-[#279C61]">
                            <Facebook size={30} className="bg-[#efeeee] rounded-md p-1 shadow shadow-md" />
                            <Instagram size={30} className="bg-[#efeeee] rounded-md p-1 shadow shadow-md" />
                            <Twitter size={30} className="bg-[#efeeee] rounded-md p-1 shadow shadow-md" />
                        </div>
                    </li>
                    <li className="p-1 flex gap-3">
                        <h4 className="font-bold">Location:</h4>
                        <div className="flex gap-3">
                            <h3>{info ? info.address : 'Loading...'}</h3>
                        </div>
                    </li>
                    <li className="flex gap-3 p-1">
                        <h4 className="font-bold">Phone number:</h4>
                        <div className="flex gap-3">
                            <h3>{info ? `+${info.phone}` : 'Loading...'}</h3>
                        </div>
                    </li>
                    <li className="flex flex-col gap-3 p-1">
                        <h4 className="font-bold">WIFI</h4>
                        <div className="flex justify-between rounded-md shadow shadow-md p-2 bg-[#efeeee] text-black">
                            <div className="flex gap-3">
                                <Wifi />
                                <h3>{textToCopy}</h3>
                            </div>
                            <CopyToClipboard text={textToCopy} onCopy={handleCopy}>
                                {copied ? <Check color="#279C61" /> : <Copy className="text-gray-800 cursor-pointer w-5 h-5 hover:text-gray-400 duration-200" />}
                            </CopyToClipboard>
                        </div>
                    </li>
                    <li className="hover:cursor-pointer bg-[#279C61] p-3 rounded-lg shadow shadow-md" onClick={handleReclamationClick}>
                        <div className="flex gap-3 font-bold justify-center text-white text-3rem">
                            <MessageSquareWarning />
                            <h3>Reclamation</h3>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default InfoMenu;
