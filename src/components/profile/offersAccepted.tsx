import React from "react";
import {Card, Divider, Text} from "@tremor/react";

export function OffersAccepted(): React.ReactElement {
    return (
        <>
            <div className="p-4 space-y-2">
                <div className="flex flex-row gap-4">
                    <Card className="bg-white space-y-6" decoration="bottom" decorationColor="blue">
                        <Text className="text-xl font-semibold text-black">Offers Accepted:</Text>
                        <Divider></Divider>

                    </Card>
                </div>
            </div>
        </>
    )
}