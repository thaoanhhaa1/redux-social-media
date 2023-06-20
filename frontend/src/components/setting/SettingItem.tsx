import { ReactNode } from 'react';
import { ArrowRightIcon } from '../Icons';

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
        <div className="bg-white rounded-2.5 p-3 flex items-center gap-4">
            <span>{icon}</span>
            <div className="flex-1 font-semibold">
                <div className="mb-[5px] text-black">{title}</div>
                <p className="text-sm leading-sm text-black-8 line-clamp-1">
                    {description}
                </p>
            </div>
            <span className="flex justify-center items-center w-6 h-6">
                <ArrowRightIcon className="text-black-8" />
            </span>
        </div>
    );
};

export default SettingItem;
