import { classNames } from '../utils';
import Image from './Image';

const ImageLoading = ({
    src = '',
    className = '',
}: {
    src: string;
    className?: string;
}) => {
    return (
        <>
            <Image
                alt=""
                src={src}
                className={classNames('absolute inset-0 blur-xl', className)}
            />
            <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-10 h-10">
                <div className="w-full h-full border-4 border-blue border-t-transparent rounded-full animate-spin" />
            </div>
        </>
    );
};

export default ImageLoading;
