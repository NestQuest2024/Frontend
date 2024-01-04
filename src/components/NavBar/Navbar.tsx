'use client';

import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuGroup,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSubTrigger,
    DropdownMenuPortal,
    DropdownMenuSubContent, DropdownMenuSub
} from '@/components/ui/dropdown-menu';
import {
    ChevronDown,
    Contrast,
    HelpCircle,
    Languages,
    LogOut,
    Settings,
    User,
    Bell
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from 'next/image'
import Link from 'next/link';
import ThemeButton from "@/components/ThemeButton/ThemeButton";
import { Button } from '../ui/button';
import { Context } from '@/context/authContext';
import { useContext, useEffect, useState } from 'react';

export default function Navbar() {

    const { isAuthenticated: auth } = useContext(Context);
    const { signOut, getUserInfo } = useContext(Context);
    const [isAuthenticated, setIsAuthenticated] = useState(auth);
    const [userInfo, setUserInfo] = useState<any>(null);

    useEffect(() => {
        setIsAuthenticated(auth);
        if (auth) {
            getUserInfo()
                .then((userInfoResponse: any) => {
                    setUserInfo(userInfoResponse.userInfo);
                })
                .catch((error: any) => {
                    console.error('Error fetching user information:', error);
                });
        }
    }, [auth, getUserInfo]);

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
                        <div className="flex items-center space-x-4">
                            {userInfo && userInfo.userType !== 'Default' && (
                                <>
                                    <a href="http://localhost:3000/notifications">
                                        <Bell className='mr-3'/>
                                    </a>
                                    <a href="http://localhost:3000/createOffers">
                                        <Button variant="outline" className="text-sm font-medium transition-colors hover:text-primary">
                                            Create Service
                                        </Button>
                                    </a>
                                </>
                            )}
                            <a href="http://localhost:3000/offers">
                                <Button variant="outline" className="text-sm font-medium transition-colors hover:text-primary">
                                    Services
                                </Button>
                            </a>
                            {userInfo?.userType !== "Administrator" && userInfo?.userType !== "Premium" && isAuthenticated && (
                                <a href="http://localhost:3000/plans">
                                    <Button variant="outline" className="text-sm font-medium transition-colors hover:text-primary">
                                        Subscribe
                                    </Button>
                                </a>
                            )}
                            {userInfo?.userType === "Administrator" && (
                                <a href="http://localhost:3000/dashboard">
                                    <Button variant="outline" className="text-sm font-medium transition-colors hover:text-primary">
                                        Dashboard
                                    </Button>
                                </a>
                            )}
                            {!isAuthenticated && (
                                <>
                                    <a href="http://localhost:3000/auth/sign-up">
                                        <Button variant="outline" className="text-sm font-medium transition-colors hover:text-primary">
                                            Sign Up
                                        </Button>
                                    </a>
                                    <a href="http://localhost:3000/auth/sign-in">
                                        <Button variant="outline" className="text-sm font-medium transition-colors hover:text-primary">
                                            Sign In
                                        </Button>
                                    </a>
                                </>
                            )}
                            {userInfo?.userType === "Default" && (
                                <a href="https://docs.google.com/forms/d/e/1FAIpQLSfi5FXjKZ2cYE7FJDd0vVsNbH8ejOyHebCOxvPj1Q-TQ3MZQA/viewform?usp=sf_link">
                                    <Button variant="outline" className="text-sm font-medium transition-colors hover:text-primary">
                                        Become a Nest
                                    </Button>
                                </a>
                            )}
                        </div>
                        {isAuthenticated && (
                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    asChild
                                    className='flex cursor-pointer flex-row items-center justify-between space-x-2 whitespace-nowrap rounded-md p-1.5  align-middle ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'>
                                    <div>
                                        <Avatar>
                                            {userInfo?.avatar && userInfo.avatar !== "" ? (
                                                <AvatarImage
                                                    src={userInfo.avatar}
                                                    alt='Avatar'
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            ) : (
                                                <AvatarImage
                                                    src={"/defaultAvatar.png"}
                                                    alt='Avatar2'
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            )}
                                            <AvatarFallback>{`${userInfo?.firsName} ${userInfo?.lastName}`}</AvatarFallback>
                                        </Avatar>
                                        <div className='flex flex-col items-start'>
                                            <span className='text-base font-medium'>
                                                {`${userInfo?.firsName} ${userInfo?.lastName}`}
                                            </span>
                                        </div>
                                        <ChevronDown className='h-5 w-5' />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <Link
                                                href={"/profile"}
                                                className='flex flex-row justify-center align-middle'>
                                                <User className='mr-2 h-4 w-4' />
                                                Profile
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link
                                                href={"/settings"}
                                                className='flex flex-row justify-center align-middle'>
                                                <Settings className='mr-2 h-4 w-4' />
                                                Settings
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuSub>
                                            <DropdownMenuSubTrigger className='cursor-pointer'>
                                                <Contrast className='mr-2 h-4 w-4' />
                                                Appearance
                                            </DropdownMenuSubTrigger>
                                            <DropdownMenuPortal>
                                                <DropdownMenuSubContent>
                                                    <DropdownMenuItem className='cursor-pointer'>
                                                        <ThemeButton
                                                            themeType='light'
                                                            title='Light'
                                                            icon='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXN1biI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iNCIvPjxwYXRoIGQ9Ik0xMiAydjIiLz48cGF0aCBkPSJNMTIgMjB2MiIvPjxwYXRoIGQ9Im00LjkzIDQuOTMgMS40MSAxLjQxIi8+PHBhdGggZD0ibTE3LjY2IDE3LjY2IDEuNDEgMS40MSIvPjxwYXRoIGQ9Ik0yIDEyaDIiLz48cGF0aCBkPSJNMjAgMTJoMiIvPjxwYXRoIGQ9Im02LjM0IDE3LjY2LTEuNDEgMS40MSIvPjxwYXRoIGQ9Im0xOS4wNyA0LjkzLTEuNDEgMS40MSIvPjwvc3ZnPg=='
                                                        />
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className='cursor-pointer'>
                                                        <ThemeButton
                                                            themeType='dark'
                                                            title='Dark'
                                                            icon='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLW1vb24iPjxwYXRoIGQ9Ik0xMiAzYTYgNiAwIDAgMCA5IDkgOSA5IDAgMSAxLTktOVoiLz48L3N2Zz4='
                                                        />
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className='cursor-pointer'>
                                                        <ThemeButton
                                                            themeType='system'
                                                            title='System'
                                                            icon='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXN1bi1tb29uIj48cGF0aCBkPSJNMTIgOGEyLjgzIDIuODMgMCAwIDAgNCA0IDQgNCAwIDEgMS00LTQiLz48cGF0aCBkPSJNMTIgMnYyIi8+PHBhdGggZD0iTTEyIDIwdjIiLz48cGF0aCBkPSJtNC45IDQuOSAxLjQgMS40Ii8+PHBhdGggZD0ibTE3LjcgMTcuNyAxLjQgMS40Ii8+PHBhdGggZD0iTTIgMTJoMiIvPjxwYXRoIGQ9Ik0yMCAxMmgyIi8+PHBhdGggZD0ibTYuMyAxNy43LTEuNCAxLjQiLz48cGF0aCBkPSJtMTkuMSA0LjktMS40IDEuNCIvPjwvc3ZnPg=='
                                                        />
                                                    </DropdownMenuItem>
                                                </DropdownMenuSubContent>
                                            </DropdownMenuPortal>
                                        </DropdownMenuSub>
                                        <DropdownMenuSub>
                                            <DropdownMenuSubTrigger className='cursor-pointer'>
                                                <Languages className='mr-2 h-4 w-4' />
                                                Language
                                            </DropdownMenuSubTrigger>
                                            <DropdownMenuPortal>
                                                <DropdownMenuSubContent>
                                                    <DropdownMenuItem className='cursor-pointer'>
                                                        Portuguese
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className='cursor-pointer'>
                                                        English
                                                    </DropdownMenuItem>
                                                </DropdownMenuSubContent>
                                            </DropdownMenuPortal>
                                        </DropdownMenuSub>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className='cursor-pointer'>
                                        <HelpCircle className='mr-2 h-4 w-4' />
                                        Help
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className='cursor-pointer'>
                                        <Link
                                            href={"/auth/sign-in"}
                                            onClick={signOut}
                                            className='flex w-full flex-row items-center justify-start align-middle'>
                                            <LogOut className='mr-2 h-4 w-4' />
                                            Log Out
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                </div>
            </div>
        </div >
    )
}