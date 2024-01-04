"use client";
import React, {useState} from "react";
import {GrCubes} from "react-icons/gr";
import {IoIosArrowDown} from "react-icons/io";

type Props = {
    title: string;
    icon: React.ReactElement
}

export function Filters({
    title,
    icon
}: Props) {

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);

    };

    return (
        <div className="border-2 rounded-20 w-[204px] h-[40px] p-filters flex items-center justify-between ">
            <div className="flex items-center">
                {icon}
                <div className="pl-2.5 w-[126px]">{title}</div>
            </div>
            <div className="relative inline-block">
                <IoIosArrowDown size={16} onClick={toggleDropdown}/>
                {isOpen && (
                    <div
                        className="absolute right-[-12px] w-[204px] mt-3 rounded-[15px] shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <a className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Teste 1</a>
                            <a className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Teste 2</a>
                            <a className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Teste 3</a>
                    </div>
                )}
            </div>
        </div>
    );
}
