import { classNames } from '../utils';
import Image from './Image';

// 24 32 36 40 60
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'ex';

export interface IAvatarProps {
    src: string;
    alt?: string;
    className?: string;
    size?: Size;
}

function getWidth(size: Size) {
    switch (size) {
        case 'ex':
            return 60;
        case 'lg':
            return 40;
        case 'md':
            return 36;
        case 'xs':
            return 24;
        default:
            return 32;
    }
}

export default function Avatar({
    src,
    alt = '',
    className = '',
    size = 'sm',
}: IAvatarProps) {
    const width = getWidth(size);

    return (
        <Image
            src={src}
            alt={alt}
            style={{
                width: `${width}px`,
            }}
            className={classNames(className, 'rounded-full aspect-square')}
        />
    );
}
