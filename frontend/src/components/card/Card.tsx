import { classNames } from '../../utils';
import Wrapper from '../wrapper/Wrapper';
import CardInformation from './CardInformation';
import CardProfile from './CardProfile';

const Card = ({ className = '' }: { className?: string }) => {
    return (
        <Wrapper className={classNames('p-5', className)}>
            <CardProfile />
            <CardInformation />
        </Wrapper>
    );
};

export default Card;
