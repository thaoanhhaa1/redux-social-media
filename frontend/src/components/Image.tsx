import { useMemo } from 'react';
import { classNames } from '../utils';

const Image = ({
    src,
    alt,
    className = '',
}: {
    src: string;
    alt: string;
    className?: string;
}) => {
    const newClass = useMemo(() => {
        const classList: string[] = ['object-cover'];

        if (!className.includes('w-')) classList.push('w-full');
        if (!className.includes('h-')) classList.push('h-full');

        return classNames(...classList, ...className.split(' '));
    }, [className]);

    return <img className={newClass} src={src} alt={alt} />;
};

export default Image;
