import {
    CSSProperties,
    LegacyRef,
    memo,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { classNames } from '../utils';

const Image = ({
    src,
    alt,
    rounded = false,
    className = '',
    fallback = '/no-avatar.png',
    imageRef,
    ...props
}: {
    src: string;
    alt: string;
    className?: string;
    rounded?: boolean;
    style?: CSSProperties;
    fallback?: string;
    imageRef?: LegacyRef<HTMLImageElement> | undefined;
}) => {
    const newClass = useMemo(() => {
        const classList: string[] = ['object-cover'];

        if (rounded) classList.push('rounded-full');
        if (!className.includes('w-')) classList.push('w-full');
        if (!className.includes('h-')) classList.push('h-full');

        return classNames(...classList, ...className.split(' '));
    }, [className, rounded]);
    const [srcImage, setSrcImage] = useState(src || fallback);

    useEffect(() => {
        setSrcImage(src || fallback);
    }, [src, fallback]);

    return (
        <img
            ref={imageRef}
            loading="lazy"
            className={newClass}
            onError={() => setSrcImage(fallback)}
            src={srcImage}
            alt={alt}
            {...props}
        />
    );
};

export default memo(Image);
