import { LikeIcon, MessagesIcon, RetweetIcon, ShareIcon } from '../Icons';
import Image from '../Image';
import CardButton from './CardButton';

const CardInformation = () => {
    return (
        <div className="flex flex-col gap-5 ml-[56px]">
            <p className="font-medium text-sm leading-[21px] text-[#000] dark:text-white">
                Allah first 😍👏proudly Muslimat 💞 daddy's love & mummy's pride
                🙌 Be patient 🙌
            </p>
            <Image
                className="rounded-[10px]"
                alt=""
                src="https://images.unsplash.com/photo-1685985081360-1d6021f77bc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1157&q=80"
            ></Image>
            <div className="flex justify-between">
                <div className="flex gap-5">
                    <CardButton
                        icon={
                            <ShareIcon className="stroke-white-45 dark:stroke-white-9" />
                        }
                    />
                    <CardButton
                        icon={
                            <RetweetIcon className="stroke-white-45 dark:stroke-white-9" />
                        }
                    />
                    <CardButton
                        icon={
                            <MessagesIcon className="stroke-white-45 dark:stroke-white-9" />
                        }
                    />
                </div>
                <div className="flex items-center gap-[6px]">
                    <CardButton
                        icon={
                            <LikeIcon className="stroke-white-45 dark:stroke-white-9" />
                        }
                    />
                    <span className="text-xs leading-[15px] text-black-8">
                        100
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CardInformation;
