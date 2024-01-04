import {JobPage} from "@/components/jobPage/jobPage";
import React from "react";

export default function Page(): React.ReactElement {
    return (
        <>
            <div className="min-h-full min-w-full">
                <JobPage />
            </div>
        </>
    )
}