import { ISubTweet } from '../../../../interfaces';
import Header from '../../Header';

const Gif = ({ handleHiddenSub }: ISubTweet) => {
    return (
        <>
            <Header onClick={handleHiddenSub} isSub>
                Choose a GIF
            </Header>
        </>
    );
};

export default Gif;
