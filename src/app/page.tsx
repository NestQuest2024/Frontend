import React from "react";
import {ChevronRight, HelpingHand, Users, Wallet} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function Home(): React.ReactElement {
    return (
        <>
            <div>
                <div className="w-[1440px] h-[814px] relative">
                    <div className="w-[680px] h-[670px] left-[630px] top-[80px] absolute">
                        <img className="w-[680px] h-[400px] left-0 top-0 absolute rounded-[20px]"
                             src="/industria.jpg"/>
                        <img className="w-[279px] h-[250px] left-0 top-[420px] absolute rounded-[20px]"
                             src="/tecnologia.jpg"/>
                        <img className="w-[380px] h-[250px] left-[300px] top-[420px] absolute rounded-[20px]"
                             src="/beleza.jpg"/>
                    </div>
                    <div
                        className="left-[130px] top-[60px] absolute flex-col justify-center items-start gap-10 inline-flex">
                        <div
                            className="text-indigo-950 text-8xl font-bold font-['Poppins'] leading-[120px]">Skills<br/>soar<br/>Triumph<br/>awaits
                        </div>
                        <div className="text-indigo-950 text-opacity-80 text-lg font-normal font-['Poppins']">Your
                            creativity, our inspiration<br/>Whatever your skill, set if free.
                        </div>
                        <Button
                            className="w-[266px] h-20 bg-indigo-800 rounded-[50px] justify-items-center text-white font-semibold text-xl">Start
                            Here</Button>
                    </div>
                </div>
                <div
                    className="w-[1440px] h-[640px] pl-[217px] pr-[216px] py-[120px] justify-center items-center inline-flex">
                    <div className="grow shrink basis-0 self-stretch relative">
                        <div
                            className="left-[313px] top-0 absolute text-indigo-950 text-5xl font-bold font-['Poppins'] leading-[60px]">Why
                            Choose us
                        </div>
                        <div className="w-[1007px] h-[260px] left-0 top-[140px] absolute">
                            <div className="w-[267px] h-[254px] left-0 top-0 absolute">
                                <div
                                    className="w-[267px] h-[94px] left-0 top-[160px] absolute flex flex-col items-center">
                                    <div className="text-indigo-950 text-xl font-bold font-['Poppins'] mb-2">Fair
                                        Payments
                                    </div>
                                    <div
                                        className="text-center text-indigo-950 text-lg font-normal font-['Poppins']">Earn
                                        securely, paid fairly. <br/>Transparent and secure.
                                    </div>
                                </div>
                                <div
                                    className="w-[120px] h-[120px] left-[73px] top-0 absolute flex items-center justify-center">
                                    <div className="w-[120px] h-[120px] absolute bg-white rounded-full shadow"></div>
                                    <Wallet className="w-[80px] h-[80px] absolute text-indigo-800"/>
                                </div>
                            </div>
                            <div className="w-[267px] h-[254px] left-[369px] top-0 absolute flex items-center justify-center">
                                <div className="w-[267px] h-[94px] top-[160px] absolute">
                                    <div
                                        className="top-[40px] absolute text-center text-indigo-950 text-lg font-normal font-['Poppins']">Community
                                        that values collaboration.
                                    </div>
                                    <div
                                        className="left-[45px] absolute text-indigo-950 text-xl font-bold font-['Poppins']">Culture
                                        of Respect
                                    </div>
                                </div>
                                <div
                                    className="w-[120px] h-[120px] left-[73px] top-0 absolute flex items-center justify-center">
                                    <div className="w-[120px] h-[120px] absolute bg-white rounded-full shadow"></div>
                                    <Users className="w-[80px] h-[80px] absolute text-indigo-800"/>
                                </div>
                            </div>
                            <div className="w-[267px] h-[254px] left-[740px] top-[6px] absolute">
                                <div className="w-[267px] h-[94px] top-[160px] absolute flex items-center justify-center">
                                    <div
                                        className="top-[40px] absolute text-center text-indigo-950 text-lg font-normal font-['Poppins']">
                                        Explore exciting projects.<br/>Whatever you want
                                    </div>
                                    <div
                                        className="left-[25px] top-0 absolute text-indigo-950 text-xl font-bold font-['Poppins']">
                                        Diverse Opportunities
                                    </div>
                                </div>
                                <div
                                    className="w-[120px] h-[120px] left-[73px] top-0 absolute flex items-center justify-center">
                                    <div className="w-[120px] h-[120px] absolute bg-white rounded-full shadow"></div>
                                    <HelpingHand className="w-[80px] h-[80px] absolute text-indigo-800"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[1634px] h-[861px] relative">
                    <div className="left-[924px] top-[120px] absolute">
                        <div
                            className="top-0 absolute text-indigo-950 text-5xl font-bold font-['Poppins'] leading-[60px]">
                            Define your destiny,<br/>make<br/>opportunities.
                        </div>
                    </div>
                    <div className="w-[1440px] h-[253px] left-[193px] top-[488px] absolute bg-violet-50"></div>
                    <div className="left-[902px] top-[548px] absolute">
                        <div
                            className="top-[60px] absolute text-indigo-950 text-opacity-80 text-lg font-normal font-['Poppins']">
                            Users
                        </div>
                        <div
                            className="top-0 absolute text-indigo-950 text-5xl font-bold font-['Poppins'] leading-[60px]">
                            58+
                        </div>
                    </div>
                    <div className="left-[1060px] top-[548px] absolute">
                        <div
                            className="top-[60px] absolute text-indigo-950 text-opacity-80 text-lg font-normal font-['Poppins']">
                            Positive Comments
                        </div>
                        <div
                            className="top-0 absolute text-indigo-950 text-5xl font-bold font-['Poppins'] leading-[60px]">
                            38+
                        </div>
                    </div>
                    <div className="left-[1215px] top-[548px] absolute">
                        <div
                            className="top-[60px] absolute text-indigo-950 text-opacity-80 text-lg font-normal font-['Poppins']">
                            Offers Created
                        </div>
                        <div
                            className="top-0 absolute text-indigo-950 text-5xl font-bold font-['Poppins'] leading-[60px]">
                            98+
                        </div>
                    </div>
                    <div className="w-[804px] h-[550px] left-0 top-[120px] absolute">
                        <div className="w-[725px] h-[550px] left-[79px] top-0 absolute">
                            <div
                                className="w-[723px] h-[550px] left-[2px] top-0 absolute opacity-50 bg-white rounded-[20px] shadow"></div>
                            <div
                                className="w-[725px] h-[49.71px] left-0 top-0 absolute bg-slate-100 rounded-tr-[20px]"></div>
                            <div
                                className="w-2.5 h-[10.58px] left-[667px] top-[20.10px] absolute bg-green-400 rounded-full"></div>
                            <div
                                className="w-2.5 h-[10.58px] left-[647px] top-[20.10px] absolute bg-amber-300 rounded-full"></div>
                            <div
                                className="w-2.5 h-[10.58px] left-[627px] top-[20.10px] absolute bg-red-400 rounded-full"></div>
                        </div>
                        <img
                            className="w-[400px] h-[400px] left-[240px] top-[90px] absolute rounded-[10px]"
                            src="/OfferImageIlustration.jpeg"
                            alt="Offer Illustration"
                        />
                    </div>
                </div>
                <div className="w-[1180px] h-[600px] bg-violet-900 rounded-[100px] mx-auto my-10 relative p-10">
                    <div className="text-white text-[64px] font-semibold font-['Poppins']">Get Started With Us</div>
                    <div className="text-white text-opacity-80 text-lg font-normal font-['Poppins']">
                        Your ceremony & reception venues, your vision, your dress, your colours
                        <br/>
                        and anything else you would like to share with us.
                    </div>
                    <img className="w-[568px] h-[568px] absolute top-0 right-0" src="/miudoaosol.png"
                         alt="Sunbathing Kid"/>
                </div>
            </div>
        </>
    );
};
