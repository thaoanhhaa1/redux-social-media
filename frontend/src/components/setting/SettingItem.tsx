import { ReactNode } from 'react';
import { ArrowRightIcon } from '../Icons';
import Button from '../Button';

const SettingItem = ({
    title,
    description,
    icon,
}: {
    title: string;
    description: string;
    icon: ReactNode;
}) => {
    return (
        <div className="bg-white dark:bg-dark-black-2 rounded-2.5 p-3 flex items-center gap-4">
            <span className="flex justify-center items-center w-6 h-6 text-black-8 dark:text-white">
                {icon}
            </span>
            <div className="flex-1 font-semibold">
                <div className="mb-[5px] text-black dark:text-white">
                    {title}
                </div>
                <p className="text-sm leading-sm text-black-8 dark:text-white line-clamp-1">
                    {description}
                </p>
            </div>
            <Button className="w-6 h-6">
                <ArrowRightIcon className="text-black-8 dark:text-white" />
            </Button>
        </div>
    );
};

export default SettingItem;
