import { CSSProperties, useMemo, useState } from 'react';
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
    const [srcImage, setSrcImage] = useState(src);

    return (
        <img
            className={newClass}
            onError={() => setSrcImage('/no-avatar.png')}
            src={srcImage}
            alt={alt}
            {...props}
        />
    );
};

export default Image;
