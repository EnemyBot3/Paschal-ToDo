import React, { FC } from 'react'

// interfaces
interface Params {
    type: string;
    message: string;
}

const Alerts:FC<Params> = ({ type, message }) => {
    let path = '';
    let color = '';
    
    if (type.toLowerCase() === 'success') { 
        path = "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"; 
        color = "bg-green-500"
    }
    else if (type.toLowerCase() === 'warning') { 
        path = "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"; 
        color = "bg-amber-500"
    }
    else if (type.toLowerCase() === 'error') { 
        path = "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" 
        color = "bg-red-500"
    }
    else if (type.toLowerCase() === 'info') { 
        path = "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
        color = "bg-blue-500"
    }

    if (!path) return;

    return (
        <div 
            role="alert" 
            className={`alert alert-${type} absolute flex h-16 top-5 right-2 w-10/12 md:w-1/3 ${color} text-white border-none shadow-xl`}
        >
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="stroke-current shrink-0 h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24"
            >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d={path} 
                />
            </svg>
            <span>{message}</span>
        </div>
    )
}


export default Alerts