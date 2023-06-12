import { v4 } from 'uuid';
import Image from './Image';
import { AddStoryIcon } from './Icons';
import Button from './Button';

const Members = () => {
    return (
        <div className="relative w-[115px]">
            {new Array(3).fill(null).map((item, index) => (
                <Image
                    style={{ left: `${25 * index}px`, zIndex: index }}
                    key={v4()}
                    alt=""
                    className="absolute w-10 h-10 rounded-full"
                    src="https://plus.unsplash.com/premium_photo-1669748157807-30514e416843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                />
            ))}
            <Button
                icon={
                    <AddStoryIcon className="fill-black-8 dark:fill-white-5" />
                }
                rounded
                className="bg-white-1 dark:bg-white-2 absolute right-0 z-40"
            />
        </div>
    );
};

export default Members;
