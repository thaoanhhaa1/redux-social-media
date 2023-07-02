import {
    CSSProperties,
    MouseEvent,
    ReactElement,
    ReactNode,
    useMemo,
} from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { classNames } from '../utils';

const Button = ({
    isLoading = false,
    isWidthFull = false,
    href = '',
    to = '',
    rounded = false,
    children,
    icon,
    className = '',
    small = false,
    large = false,
    gap = '2',
    disabled = false,
    align = 'center',
    type = 'button',
    onClick = () => {},
    ...passProps
}: {
    isWidthFull?: boolean;
    isLoading?: boolean;
    href?: string;
    to?: string;
    rounded?: boolean;
    children?: ReactNode;
    icon?: ReactElement;
    className?: string;
    style?: CSSProperties;
    small?: boolean;
    large?: boolean;
    gap?: string;
    disabled?: boolean;
    align?: 'left' | 'center' | 'right';
    type?: 'button' | 'submit';
    onClick?: (e: MouseEvent) => void;
}) => {
    let Type: React.ElementType = 'button';
    const styles = useMemo(() => {
        let style: string[] = [className];

        style.push(
            'flex items-center whitespace-nowrap',
            `gap-${gap}`,
            `justify-${align}`,
            rounded ? 'rounded-full' : 'rounded-2.5',
        );

        if (disabled || isLoading) style.push('opacity-60 pointer-events-none');
        if (isWidthFull) style.push('w-full');
        if (!className.includes('h-')) {
            if (children === undefined)
                style.push(
                    small ? 'w-7 h-7' : large ? 'w-12 h-12' : 'w-10 h-10',
                );
            else
                style.push(
                    small ? 'px-7.5 h-8' : large ? 'px-2.5 h-12' : 'px-5 h-10',
                );
        }

        return classNames(...style);
    }, [
        align,
        children,
        className,
        disabled,
        gap,
        isLoading,
        isWidthFull,
        large,
        rounded,
        small,
    ]);

    const props:
        | LinkProps
        | { to?: string; href?: string; onClick: (e: MouseEvent) => void } = {
        to,
        href,
        onClick,
        ...passProps,
    };

    if (to !== '') Type = Link;
    else if (href !== '') Type = 'a';

    if (disabled || isLoading) {
        Object.keys(props).forEach(
            (key) =>
                key.startsWith('on') && delete props[key as keyof typeof props],
        );
    }

    return (
        <Type
            disabled={disabled || isLoading}
            type={type}
            className={styles}
            {...props}
            {...passProps}
        >
            {(isLoading && (
                <div className="h-4/5 aspect-square border-4 border-white border-t-transparent rounded-full animate-spin" />
            )) || (
                <>
                    {icon}
                    {children && <span>{children}</span>}
                </>
            )}
        </Type>
    );
};

export default Button;
