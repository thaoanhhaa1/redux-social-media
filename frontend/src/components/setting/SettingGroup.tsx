import { ReactNode } from 'react';

const SettingGroup = ({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) => {
    return (
        <div>
            <div className="font-semibold text-xl leading-xl dark:text-white">
                {title}
            </div>
            <div className="mt-6 grid dl:grid-cols-2 grid-cols-1 gap-5">
                {children}
            </div>
        </div>
    );
};

export default SettingGroup;
