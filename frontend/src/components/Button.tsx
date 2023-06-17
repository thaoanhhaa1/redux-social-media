import { CSSProperties, ReactElement, ReactNode, useMemo } from 'react';
import { Link, LinkProps } from 'react-router-dom';

const Button = ({
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
    onClick = () => {},
    ...passProps
}: {
    isWidthFull?: boolean;
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
    onClick?: () => void;
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

        if (isWidthFull) style.push('w-full');
        if (!className.includes('h-')) {
            if (children === undefined)
                style.push(
                    small ? 'w-7 h-7' : large ? 'w-12 h-12' : 'w-10 h-10',
                );
            else
                style.push(
                    small
                        ? 'px-[30px] h-8'
                        : large
                        ? 'px-2.5 h-12'
                        : 'px-5 h-10',
                );
        }

        return style.join(' ');
    }, [align, children, className, gap, isWidthFull, large, rounded, small]);

    const props: LinkProps | { to?: string; href?: string } = {
        to,
        href,
        onClick,
        ...passProps,
    };

    if (to !== '') Type = Link;
    else if (href !== '') Type = 'a';

    if (disabled) {
        Object.keys(props).forEach(
            (key) =>
                key.startsWith('on') && delete props[key as keyof typeof props],
        );
    }

    return (
        <Type className={styles} onClick={onClick} {...props} {...passProps}>
            {icon}
            {children && <span>{children}</span>}
        </Type>
    );
};

export default Button;
