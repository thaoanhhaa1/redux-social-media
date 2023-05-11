import { Link } from 'react-router-dom';
import { v4 } from 'uuid';
import Story from './Story';

const Stories = () => {
    return (
        <div className="flex-1 overflow-auto font-semibold px-[18px] py-[16.5px] bg-white rounded-[10px]">
            <div className="flex items-center justify-between">
                <span className="text-base text-black leading-[19px]">
                    Stories
                </span>
                <Link className="text-sm text-blue leading-[17px]" to="/">
                    See All
                </Link>
            </div>
            <div className="mt-5 flex gap-[10px]">
                {new Array(4).fill(0).map(() => (
                    <Story key={v4()} />
                ))}
            </div>
        </div>
    );
};

export default Stories;
