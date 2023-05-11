import Stories from '../components/Stories';

const Home = () => {
    return (
        <div className="flex gap-5">
            <Stories />
            <div className="flex-shrink-0 w-[335px]">sponsored</div>
        </div>
    );
};

export default Home;
