/** @format */
"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { usePathname } from "next/navigation";

// icons
import { RiArrowLeftDoubleFill } from "react-icons/ri";
import { LiaHandshakeSolid, LiaCheckCircle, LiaMoneyBillWaveSolid } from "react-icons/lia";
import { UserCog, Inbox, List, Crown } from 'lucide-react';

type Props = {};

interface SideNavItemType {
    icon?: {
        icon: React.ReactNode;
        fillIcon: React.ReactNode;
    };
    label: string;
    href: string;
}

const sidebarItmes: SideNavItemType[] = [
    {
        icon: {
            icon: <UserCog />,
            fillIcon: <UserCog />
        },
        label: "Users",
        href: "/dashboard/User"
    },
    {
        icon: {
            icon: <Inbox />,
            fillIcon: <Inbox />
        },
        label: "Offers",
        href: "/dashboard/Offer"
    },
    {
        icon: {
            icon: <List />,
            fillIcon: <List />
        },
        label: "Categories",
        href: "/dashboard/Category"
    },
];
export default function Sidebar({ }: Props) {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div
            className={cn(
                "min-h-screen max-h-screen overflow-y-auto w-fit md:p-8 p-4 flex flex-col gap-3 border-r",
                isSidebarOpen && "md:w-[250px]"
            )}
        >

            {sidebarItmes.map((d, i) => (
                <HoverContainer key={i}>
                    <SideNavItem
                        icon={d.icon}
                        href={d.href}
                        isSidebarOpen={isSidebarOpen}
                        label={d.label}
                    />
                </HoverContainer>
            ))}

            <section
                className={cn(
                    "hidden md:flex w-full justify-end",
                    !isSidebarOpen && "justify-start"
                )}
            >
                <HoverContainer>
                    <RiArrowLeftDoubleFill
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                        className={cn(
                            "text-gray-400 transition-all text-3xl",
                            !isSidebarOpen && "rotate-180"
                        )}
                    />
                </HoverContainer>
            </section>
        </div>
    );
}

function SideNavItem({
    href,
    isSidebarOpen,
    icon,
    label
}: SideNavItemType & { isSidebarOpen: boolean }) {
    const [animationParent] = useAutoAnimate();
    const pathname = usePathname();
    const isActivePage = pathname == href;
    return (
        <Link
            ref={animationParent}
            href={href}
            className="flex gap-2 items-center cursor-pointer "
        >
            <div className="w-[35px] h-[35px] text-xl flex items-center">
                {isActivePage ? icon?.fillIcon : icon?.icon}
            </div>
            {isSidebarOpen && (
                <p
                    className={cn(
                        "text-lg hidden md:block pr-4  transition-all ",
                        isActivePage && "font-bold"
                    )}
                >
                    {label}
                </p>
            )}
        </Link>
    );
}

function HoverContainer({
    children,
    className
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className="p-3 transition-all rounded-full cursor-pointer hover:bg-gray-200 w-fit group-hover:dark:bg-zinc-900 group-hover:bg-gray-200 ">
            {children}
        </div>
    );
}