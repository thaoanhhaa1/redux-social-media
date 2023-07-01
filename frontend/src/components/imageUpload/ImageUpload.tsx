import { ChangeEvent } from 'react';
import { IImageUpload } from '../../interfaces';
import { classNames } from '../../utils';
import { CameraIcon } from '../Icons';
import Image from '../Image';
import ImageLoading from '../ImageLoading';

const ImageUpload = ({
    wrapperClassName = '',
    cameraClassName = 'top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4',
    className = '',
    fallback = '/no-avatar.png',
    image,
    src,
}: {
    wrapperClassName?: string;
    cameraClassName?: string;
    className?: string;
    fallback?: string;
    image: IImageUpload;
    src: string;
}) => {
    const handleChangeImage = async (e: ChangeEvent) => {
        const inputElement = e.target as HTMLInputElement;
        const file = inputElement?.files?.[0];

        if (!file) return;

        image.setFile(file);
    };

    return (
        <div
            className={classNames('relative overflow-hidden', wrapperClassName)}
        >
            <Image
                imageRef={image.imageRef}
                fallback={fallback}
                alt=""
                src={image.image || src}
                className={classNames(
                    className,
                    image.isLoading ? 'invisible' : '',
                )}
            />
            {(image.isLoading && <ImageLoading src={image.tempImage} />) || (
                <label className={classNames('absolute', cameraClassName)}>
                    <input
                        accept="image/*"
                        name="background"
                        onChange={handleChangeImage}
                        hidden
                        type="file"
                    />
                    <span className="flex items-center whitespace-nowrap gap-2 justify-center rounded-2.5 w-10 h-10">
                        <CameraIcon stroke="white" />
                    </span>
                </label>
            )}
        </div>
    );
};

export default ImageUpload;
