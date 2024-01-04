import React from "react";
import { PricingTable } from "@/components/pricingTable/pricingTable";

export default function Page(): React.ReactElement {
    const backgroundImageUrl = "/premiumBG.jpg";

    return (
        <div
            className="bg-cover bg-center h-[calc(100vh-65px)] flex flex-col justify-center p-8"
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        >
            <span className="text-5xl text-white text-center font-bold mb-3">Become Premium</span>
            <span className="text-center text-white text-xl mb-8">Get Access to Advantages and Support our Work!</span>
            <PricingTable />
        </div>
    );
}

