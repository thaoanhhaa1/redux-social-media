import { v4 } from 'uuid';
import Card from '../components/card/Card';
import Stories from '../components/story/Stories';

const Home = () => {
    return (
        <div className="flex gap-5">
            <div className="flex flex-col gap-5 overflow-auto flex-1">
                <Stories />
                {new Array(3).fill(null).map(() => (
                    <Card key={v4()} />
                ))}
            </div>
            <div className="flex-shrink-0 w-[335px]">sponsored</div>
        </div>
    );
};

export default Home;
