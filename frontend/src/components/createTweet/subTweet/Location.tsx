import Header from '../Header';

const Location = ({ handleHiddenSub }: { handleHiddenSub: () => void }) => {
    return (
        <>
            <Header onClick={handleHiddenSub} isSub>
                How are you feeling?
            </Header>
        </>
    );
};

export default Location;
