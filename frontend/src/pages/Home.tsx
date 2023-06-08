import Stories from '../components/story/Stories';

const Home = () => {
    return (
        <div className="flex gap-5">
            <div className="flex-1 overflow-auto font-semibold px-[18px] py-[16.5px] bg-white rounded-[10px]">
                <Stories />
            </div>
            <div className="flex-shrink-0 w-[335px]">sponsored</div>
        </div>
    );
};

export default Home;
