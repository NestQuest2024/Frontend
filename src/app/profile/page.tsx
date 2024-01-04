import * as React from "react";
import {BasicInfoCard} from "@/components/profile/basicInfoCard";
import {OffersMaded} from "@/components/profile/offersMaded";

export default function Page() {
    return (
        <div className="pl-8 pr-8 pb-8">
            <BasicInfoCard/>
            <OffersMaded/>
        </div>
    )
}
