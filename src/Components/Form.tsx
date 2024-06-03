import React from 'react';

const Form: React.FC = () => {
    return (
        <>
            <form action="post" className="flex flex-col gap-2 max-w-[22rem] w-screen p-3 shadow shadow-lg rounded rounded-md">
                <label htmlFor="name" className="text-start font-bold text-black">
                    Name:
                </label>
                <input type="text" id="name" placeholder="Enter your name..." className="shadow-md p-2 rounded rounded-md focus:outline-none" required />
                
                <label htmlFor="email" className="text-start font-bold text-black">
                    Email:
                </label>
                <input type="email" id="email" placeholder="Enter your email..." className="shadow-md p-2 rounded rounded-md focus:outline-none" required />
                
                <div className="flex text-black gap-2">
                    <input type="checkbox" id="anonymous" value="Submit Anonymous Claim" className="text-black accent-[#279C61] checked:text-white" />
                    <label htmlFor="anonymous">Submit Anonymous Claim</label>
                </div>
                
                <label htmlFor="description" className="text-start text-black font-bold">
                    Description:
                </label>
                <textarea id="description" placeholder="Write a description..." className="shadow-md p-2 rounded rounded-md h-[175px] focus:outline-none" required />
                
                <button type="submit" className="text-white font-bold bg-[#279C61] rounded rounded-[10px]">Send</button>
            </form>
        </>
    )
}

export default Form;
