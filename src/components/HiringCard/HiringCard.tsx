import React from "react";
import {Card, CardFooter} from "@/components/ui/card";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {Calendar, MapPin} from "lucide-react";

export default function HiringCard() {
    return (
        <div className="p-2">
            <Card className="w-[400px]">
                <div className="flex flex-row p-4 justify-between">
                    <div className="flex flex-col space-y-4">
                        <div className="space-y-6">
                            <div className="flex flex-row gap-2 items-center">
                                <Avatar>
                                    <AvatarFallback>CL</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-md font-medium">Carlos Leite</p>
                                    <p className="text-xs font-medium">Software Engineer</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex flex-row items-center gap-1">
                                    <MapPin size={18}/>
                                    <p className="text-sm font-normal">Porto, Portugal</p>
                                </div>
                                <div className="flex flex-row items-center gap-1">
                                    <Calendar size={18}/>
                                    <p className="text-sm font-normal">Available Now</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-lg font-bold">12-20 €/hourly</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-2 w-[120px] bg-zinc-300 rounded-lg">
                    </div>
                </div>
            </Card>
        </div>
    )
}