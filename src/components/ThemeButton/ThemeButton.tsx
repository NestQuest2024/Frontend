'use client';

import {Check} from 'lucide-react';
import Image from 'next/image';
import {useTheme} from 'next-themes';

type ThemeButtonProps = {
    themeType: string;
    title: string;
    icon: string;
};

const ThemeButton: React.FunctionComponent<ThemeButtonProps> = ({
                                                                    themeType,
                                                                    title,
                                                                    icon,
                                                                }): React.ReactNode => {
    const {setTheme, theme} = useTheme();
    return (
        <button
            className='flex w-full flex-row items-center justify-between'
            onClick={() => setTheme(themeType)}>
            <div className='flex flex-row items-center'>
                <Image
                    src={icon}
                    alt='Icon'
                    width={20}
                    height={20}
                    className='dark:nightMode mr-2 h-4 w-4'
                />
                <span className='w-full'>{title}</span>
            </div>
            {theme === themeType && <Check className='ml-2 h-4 w-4'/>}
        </button>
    );
};

export default ThemeButton;