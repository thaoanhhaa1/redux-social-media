import { HTMLInputTypeAttribute, useState } from 'react';
import {
    Control,
    FieldValues,
    Path,
    PathValue,
    useController,
} from 'react-hook-form';
import { classNames } from '../../utils';
import { EyeHideIcon, EyeIcon } from '../Icons';

type InputProps<T extends FieldValues> = {
    name: keyof T;
    control: Control<T>;
    placeholder?: string;
    type?: HTMLInputTypeAttribute;
};

function Input<T extends FieldValues>({
    name,
    type = 'text',
    control,
    placeholder = '',
    ...props
}: InputProps<T>): JSX.Element {
    const { field } = useController({
        control,
        name: name as Path<T>,
    });
    const [isShow, setShow] = useState(false);

    const handleSetShow = () => setShow(!isShow);

    return (
        <div className="w-full relative">
            <input
                placeholder={placeholder}
                id={name as string}
                className={classNames(
                    'w-full p-5 rounded-2.5 bg-white-1 dark:bg-dark-black-3 outline-none border-none font-semibold text-black-5 dark:text-white',
                )}
                type={isShow ? 'text' : type}
                {...field}
                {...props}
            />
            {type === 'password' && (
                <span
                    onClick={handleSetShow}
                    className="select-none p-2 absolute right-2 top-2/4 -translate-y-2/4 text-black-5 dark:text-white cursor-pointer"
                >
                    {(isShow && <EyeIcon className="w-6 h-6" />) || (
                        <EyeHideIcon className="w-6 h-6" />
                    )}
                </span>
            )}
        </div>
    );
}

export default Input;
