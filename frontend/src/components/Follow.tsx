import Button from './Button';
import Image from './Image';

const Follow = () => {
    return (
        <div className="flex gap-5 cursor-pointer">
            <Image
                alt=""
                src="https://images.unsplash.com/photo-1686934220820-946b570462da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1334&q=80"
                className="w-10 h-10"
                rounded
            />
            <div className="flex-1 flex justify-between items-center gap-2">
                <div className="flex-1">
                    <div className="font-semibold text-sm leading-sm text-black dark:text-white">
                        Mushfiqur Rahim
                    </div>
                    <div className="font-semibold text-xs leading-sm text-black-8 dark:text-white">
                        @mushfiqur15
                    </div>
                </div>
                <Button className="bg-black dark:bg-dark-black-1 text-white text-xs leading-xs w-[86px] h-8.5">
                    Follow
                </Button>
            </div>
        </div>
    );
};

export default Follow;
