import { v4 } from 'uuid';
import Card from '../components/card/Card';
import Stories from '../components/story/Stories';
import Wrapper from '../components/wrapper/Wrapper';
import WrapperHeader from '../components/wrapper/WrapperHeader';
import Image from '../components/Image';

const Home = () => {
    return (
        <div className="flex gap-5">
            <div className="flex flex-col gap-5 overflow-auto flex-1">
                <Stories />
                {new Array(3).fill(null).map(() => (
                    <Card key={v4()} />
                ))}
            </div>
            <div className="flex-shrink-0 w-[335px] flex flex-col gap-5">
                <Wrapper className="p-5">
                    <WrapperHeader
                        title="sponsored"
                        titleLink="Create Ad"
                        to="/"
                    />
                    <Image
                        className="rounded-[10px]"
                        alt=""
                        src="https://plus.unsplash.com/premium_photo-1686090449366-b7a5a28577aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                    />
                    <div className="font-semibold text-sm leading-sm">
                        <div className="text-black">
                            ali baba online shoping
                        </div>
                        <p className="mt-[5px] text-black-8">ali baba .com</p>
                    </div>
                </Wrapper>
                <Wrapper className="p-5">
                    <WrapperHeader
                        title="Suggested groups"
                        titleLink="See more"
                        to="/"
                    />
                    <Image
                        className="rounded-[10px]"
                        alt=""
                        src="https://plus.unsplash.com/premium_photo-1686090449366-b7a5a28577aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                    />
                    <div className="flex gap-1">
                        <div className="font-semibold">
                            <div className="text-black">Anthony Douglas</div>
                            <p className="mt-[2px] text-sm leading-sm text-black-8">
                                65 friends | 1.5k members
                            </p>
                        </div>
                    </div>
                </Wrapper>
            </div>
        </div>
    );
};

export default Home;
