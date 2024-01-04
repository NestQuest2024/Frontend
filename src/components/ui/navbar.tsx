import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuGroup, DropdownMenuContent, DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from 'next/image';
import Link from 'next/link';


export default function Navbar() {
    return (
        <div className="hidden flex-col md:flex">
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    <nav className={"flex items-center space-x-4 lg:space-x-6 mx-6"}>
                        <div className="flex items-center gap-5">
                            <Image src={"/Logo.png"} width={46} height={48} alt={""} className="pl-2" />
                            <a href="/"
                                className="text-lg font-medium transition-colors hover:text-primary">
                                NestQuest
                            </a>
                        </div>
                    </nav>
                    <div className="ml-auto flex items-center space-x-4">
                        <Button variant="outline">
                            <Link href="/register">Sign Up</Link>
                        </Button>
                        <Button variant="outline">
                            <Link href="/login">Sign In</Link>
                        </Button>
                        <Button variant="outline">
                            <Link href="https://docs.google.com/forms/d/e/1FAIpQLSfi5FXjKZ2cYE7FJDd0vVsNbH8ejOyHebCOxvPj1Q-TQ3MZQA/viewform">Become Service Provider</Link>
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback>SC</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">Carlos</p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            m@example.com
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Settings
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </div>
    )
}