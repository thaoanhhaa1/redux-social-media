import { HTMLInputTypeAttribute } from 'react';
import { Control, useController } from 'react-hook-form';

const Input = ({
    name,
    control,
    placeholder = '',
    ...props
}: {
    name: string;
    control: Control;
    placeholder?: string;
    type?: HTMLInputTypeAttribute;
}) => {
    const { field } = useController({
        control,
        name,
        defaultValue: '',
    });

    return (
        <input
            placeholder={placeholder}
            id={name}
            className="p-5 rounded-2.5 bg-white-1 dark:bg-dark-black-3 outline-none border-none font-semibold text-black-5 dark:text-white"
            {...field}
            {...props}
        />
    );
};

export default Input;
