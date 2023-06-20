import { ReactNode } from 'react';

const Label = ({ children, name }: { children: ReactNode; name: string }) => {
    return (
        <label
            className="font-semibold text-dark-black-1 dark:text-white cursor-pointer"
            htmlFor={name}
        >
            {children}
        </label>
    );
};

export default Label;
