import { HTMLInputTypeAttribute } from 'react';
import {
    Control,
    FieldValues,
    Path,
    PathValue,
    useController,
} from 'react-hook-form';

type InputProps<T extends FieldValues> = {
    name: keyof T;
    control: Control<T>;
    placeholder?: string;
    type?: HTMLInputTypeAttribute;
};

function Input<T extends FieldValues>({
    name,
    control,
    placeholder = '',
    ...props
}: InputProps<T>): JSX.Element {
    const { field } = useController({
        control,
        name: name as Path<T>,
        defaultValue: '' as PathValue<T, Path<T>>,
    });

    return (
        <input
            placeholder={placeholder}
            id={name as string}
            className="w-full p-5 rounded-2.5 bg-white-1 dark:bg-dark-black-3 outline-none border-none font-semibold text-black-5 dark:text-white"
            {...field}
            {...props}
        />
    );
}

export default Input;
