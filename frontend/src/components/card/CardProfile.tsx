import { BottomIcon } from '../Icons';
import Image from '../Image';
import CardMore from './CardMore';

const CardProfile = () => {
    return (
        <div className="flex gap-4">
            <Image
                alt=""
                src="https://cdn.openai.com/labs/images/A%20cyberpunk%20monster%20in%20a%20control%20room.webp?v=1"
                className="w-10 h-10 rounded-full"
            ></Image>
            <div className="flex justify-between items-center flex-1">
                <div>
                    <div className="font-semibold dark:text-white">
                        Aisha ado gay
                    </div>
                    <p className="mt-[5px] font-semibold text-sm leading-sm text-black-8 dark:text-white-9">
                        @Ikramgyy
                    </p>
                </div>
                <div className="flex gap-[5px] text-black-8 dark:text-white font-medium text-xs leading-[15px]">
                    <span>1day</span>
                    <div className="relative group/more">
                        <BottomIcon className="cursor-pointer w-4 h-4 fill-dark-black-2 dark:fill-white-9 group-hover/more:fill-blue dark:group-hover/more:fill-blue-white-2 transition" />
                        <CardMore />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardProfile;
