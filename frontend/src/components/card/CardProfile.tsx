import { BottomIcon } from '../Icons';
import Image from '../Image';

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
                    <div className="font-semibold text-base leading-[19px]">
                        Aisha ado gay
                    </div>
                    <p className="mt-[5px] font-semibold text-sm leading-[17px] text-black-8">
                        @Ikramgyy
                    </p>
                </div>
                <div className="flex gap-[5px] text-black-8 font-medium text-xs leading-[15px]">
                    <span>1day</span>
                    <BottomIcon className="w-4 h-4" />
                </div>
            </div>
        </div>
    );
};

export default CardProfile;
