import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {
    Bell,
    ChevronRight,
    Cookie,
    Gem, HeartHandshake,
    KeyRound,
    Languages,
    LogOut,
    Mail,
    SunMoon,
    User,
    Wallet,
    XCircle
} from "lucide-react";

export default function Settings() {
    return (
        <div className=" justify-center p-8">
            <div className="w-4/4">
                <Card>
                    <CardHeader className="space-y-8">
                        <CardTitle>Settings</CardTitle>
                        <CardDescription className="text-lg text-gray-500 font-normal">
                            General
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-row items-center pl-2">
                            <div className="border-2 rounded-lg p-2" style={{borderWidth: '1px'}}>
                                <User/>
                            </div>
                            <Button className="text-lg">Account Informations</Button>
                            <div className="ml-auto">
                                <ChevronRight/>
                            </div>
                        </div>
                        <div className="flex flex-row items-center pl-2">
                            <div className="border-2 rounded-lg p-2" style={{borderWidth: '1px'}}>
                                <Bell/>
                            </div>
                            <Button className="text-lg">Notifications</Button>
                            <div className="ml-auto">
                                <ChevronRight/>
                            </div>
                        </div>
                        <div className="flex flex-row items-center pl-2">
                            <div className="border-2 rounded-lg p-2" style={{borderWidth: '1px'}}>
                                <SunMoon/>
                            </div>
                            <Button className="text-lg">Appearence</Button>
                            <div className="ml-auto">
                                <ChevronRight/>
                            </div>
                        </div>
                        <div className="flex flex-row items-center pl-2">
                            <div className="border-2 rounded-lg p-2" style={{borderWidth: '1px'}}>
                                <Languages/>
                            </div>
                            <Button className="text-lg">Languages</Button>
                            <div className="ml-auto">
                                <ChevronRight/>
                            </div>
                        </div>
                    </CardContent>
                    <CardHeader>
                        <CardDescription className="text-lg text-gray-500 font-normal">Account</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-row items-center pl-2">
                            <div className="border-2 rounded-lg p-2" style={{borderWidth: '1px'}}>
                                <Wallet/>
                            </div>
                            <Button className="text-lg">Billing and Payments</Button>
                            <div className="ml-auto">
                                <ChevronRight/>
                            </div>
                        </div>
                        <div className="flex flex-row items-center pl-2">
                            <div className="border-2 rounded-lg p-2" style={{borderWidth: '1px'}}>
                                <Gem/>
                            </div>
                            <Button className="text-lg">Premium</Button>
                            <div className="ml-auto">
                                <ChevronRight/>
                            </div>
                        </div>
                    </CardContent>
                    <CardHeader>
                        <CardDescription className="text-lg text-gray-500 font-normal">Security</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-row items-center pl-2">
                            <div className="border-2 rounded-lg p-2" style={{borderWidth: '1px'}}>
                                <Mail/>
                            </div>
                            <Button className="text-lg">Change Email</Button>
                            <div className="ml-auto">
                                <ChevronRight/>
                            </div>
                        </div>
                        <div className="flex flex-row items-center pl-2">
                            <div className="border-2 rounded-lg p-2" style={{borderWidth: '1px'}}>
                                <KeyRound/>
                            </div>
                            <Button className="text-lg">Change Password</Button>
                            <div className="ml-auto">
                                <ChevronRight/>
                            </div>
                        </div>
                        <div className="flex flex-row items-center pl-2">
                            <div className="border-2 rounded-lg p-2" style={{borderWidth: '1px'}}>
                                <XCircle/>
                            </div>
                            <Button className="text-lg">Disable Account</Button>
                            <div className="ml-auto">
                                <ChevronRight/>
                            </div>
                        </div>
                    </CardContent>
                    <CardHeader>
                        <CardDescription className="text-lg text-gray-500 font-normal">Others</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-row items-center pl-2">
                            <div className="border-2 rounded-lg p-2" style={{borderWidth: '1px'}}>
                                <Mail/>
                            </div>
                            <Button className="text-lg">About Us</Button>
                            <div className="ml-auto">
                                <ChevronRight/>
                            </div>
                        </div>
                        <div className="flex flex-row items-center pl-2">
                            <div className="border-2 rounded-lg p-2" style={{borderWidth: '1px'}}>
                                <KeyRound/>
                            </div>
                            <Button className="text-lg">Help & Support</Button>
                            <div className="ml-auto">
                                <ChevronRight/>
                            </div>
                        </div>
                        <div className="flex flex-row items-center pl-2">
                            <div className="border-2 rounded-lg p-2" style={{borderWidth: '1px'}}>
                                <HeartHandshake/>
                            </div>
                            <Button className="text-lg">Terms & Conditions</Button>
                            <div className="ml-auto">
                                <ChevronRight/>
                            </div>
                        </div>
                        <div className="flex flex-row items-center pl-2">
                            <div className="border-2 rounded-lg p-2" style={{borderWidth: '1px'}}>
                                <Cookie/>
                            </div>
                            <Button className="text-lg">Privacy Policy</Button>
                            <div className="ml-auto">
                                <ChevronRight/>
                            </div>
                        </div>
                        <div className="flex flex-row items-center pl-2">
                            <div className="border-2 rounded-lg p-2" style={{borderWidth: '1px'}}>
                                <LogOut/>
                            </div>
                            <Button className="text-lg">Sign Out</Button>
                            <div className="ml-auto">
                                <ChevronRight/>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

        </div>
    )
}