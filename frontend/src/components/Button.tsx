import { ReactElement, useMemo, useState } from 'react';
import { Link, LinkProps } from 'react-router-dom';

const Button = ({
    href = '',
    to = '',
    children,
    icon,
    className = '',
    onClick = () => {},
}: {
    href?: string;
    to?: string;
    children?: ReactElement;
    icon?: ReactElement;
    className?: string;
    onClick?: () => void;
}) => {
    let Type: React.ElementType = 'button';
    const styles = useMemo(() => {
        let style: string[] = [className];

        if (children === undefined && icon !== undefined) {
            style.push(
                'flex justify-center items-center w-12 h-12 shadow-icon-btn bg-white rounded-full',
            );
        }

        return style.join(' ');
    }, [children, className, icon]);
    const [props, setProps] = useState<
        LinkProps | { to?: string; href?: string }
    >({});

    if (to !== '') {
        Type = Link;
        setProps(() => ({ to }));
    } else if (href !== '') {
        Type = 'a';
        setProps(() => ({ href }));
    }

    return (
        <Type className={styles} onClick={onClick} {...props}>
            {icon}
            {children}
        </Type>
    );
};

export default Button;
