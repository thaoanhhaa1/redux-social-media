import { classNames } from '../../utils';
import Image from '../Image';

const CriketItem = ({
    src,
    name,
    labels,
    backgroundColor,
}: {
    src: string;
    name: string;
    labels: string[];
    backgroundColor: string;
}) => {
    return (
        <div className={classNames('flex gap-4 p-4', backgroundColor)}>
            <Image className="w-[66px] h-[42px]" alt="" src={src} />
            <div className="font-semibold text-white flex-1 flex items-center justify-between">
                <span>{name}</span>
                <div className="text-center">
                    <span>{labels[0]}</span>
                    <br />
                    <span>({labels[1]})</span>
                </div>
            </div>
        </div>
    );
};

export default CriketItem;
