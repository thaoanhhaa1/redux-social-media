import Wrapper from '../wrapper/Wrapper';
import CardInformation from './CardInformation';
import CardProfile from './CardProfile';

const Card = () => {
    return (
        <Wrapper className="p-5">
            <CardProfile />
            <CardInformation />
        </Wrapper>
    );
};

export default Card;
