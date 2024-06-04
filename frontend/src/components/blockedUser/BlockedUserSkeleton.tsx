import { PersonSkeleton } from '../person';
import Wrapper from './Wrapper';

const BlockedUserSkeleton = () => {
    return (
        <Wrapper>
            <PersonSkeleton />
        </Wrapper>
    );
};

export default BlockedUserSkeleton;
