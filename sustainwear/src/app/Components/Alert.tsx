import React from 'react';
import { FaWindowClose } from 'react-icons/fa';

type AlertType = 'Success' | 'Error' | 'Warning';

type AlertProps = {
    type: AlertType;
    message: string;
    onClose: () => void;
}

const backgroundColors = {
    Success: '#22c55e',
    Error: "#fb2c36",
    Warning: '#f97316',
};

const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
    return(
        <div className="alert-box flex w-full rounded-lg flex-col max-w-[400px] transform items-start justify-start gap-4 bg-white transition delay-200 duration-500 ease-in-out z-100">
            <div className="flex w-full items-start justify-between">
                <span className="font-Inter text-xs font-medium leading-tight text-black">
                    {message}
                </span>
                <span className="cursor-pointer duration-300 hover:opacity-70" onClick={onClose}>
                    <FaWindowClose/>
                </span>
            </div>
            <div className="flex h-4 w-full items-center justify-center rounded-b-lg" style={{ backgroundColor: backgroundColors[type] }}></div>
        </div>
    )    
}

export default Alert;
