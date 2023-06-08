import Image from './Image';
import Wrapper from './Wrapper';

const Card = () => {
    return (
        <Wrapper className="p-5 flex gap-4">
            <Image
                alt=""
                src="https://cdn.openai.com/labs/images/A%20cyberpunk%20monster%20in%20a%20control%20room.webp?v=1"
                className="w-10 h-10 rounded-full"
            ></Image>
            <div className="flex-1">
                <div>
                    <div>
                        <div className="font-semibold text-base leading-[19px]">
                            Aisha ado gay
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default Card;
