import HiringCard from "@/components/HiringCard/HiringCard";
import {Searchbar} from "@/components/searchbar/searchbar";
import {ComboboxDemo} from "@/components/ui/comobox";
import React from "react";

export default function Page() {
    return (
        <div className="p-4">
            <div>
                <Searchbar/>
            </div>

            <div className="p-2 flex flex-row gap-4">
                <ComboboxDemo/>
                <ComboboxDemo/>
                <ComboboxDemo/>
                <ComboboxDemo/>
            </div>
            <div className="flex flex-row justify-between">
                <HiringCard/>
                <HiringCard/>
                <HiringCard/>
                <HiringCard/>
            </div>
            <div className="flex flex-row justify-between">
                <HiringCard/>
                <HiringCard/>
                <HiringCard/>
                <HiringCard/>
            </div>
            <div className="flex flex-row justify-between">
                <HiringCard/>
                <HiringCard/>
                <HiringCard/>
                <HiringCard/>
            </div>
            <div className="flex flex-row justify-between">
                <HiringCard/>
                <HiringCard/>
                <HiringCard/>
                <HiringCard/>
            </div>
        </div>
    )
}