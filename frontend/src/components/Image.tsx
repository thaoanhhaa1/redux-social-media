import { CSSProperties, useMemo } from 'react';
import { classNames } from '../utils';

const Image = ({
    src,
    alt,
    rounded = false,
    className = '',
    ...props
}: {
    src: string;
    alt: string;
    className?: string;
    rounded?: boolean;
    style?: CSSProperties;
}) => {
    const newClass = useMemo(() => {
        const classList: string[] = ['object-cover'];

        if (rounded) classList.push('rounded-full');
        if (!className.includes('w-')) classList.push('w-full');
        if (!className.includes('h-')) classList.push('h-full');

        return classNames(...classList, ...className.split(' '));
    }, [className, rounded]);

    return <img className={newClass} src={src} alt={alt} {...props} />;
};

export default Image;
