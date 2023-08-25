import { Fragment } from 'react';
import { v4 } from 'uuid';
import { IPerson } from '../interfaces';

const TagPeople = ({ tagPeople }: { tagPeople: IPerson[] }) => {
    return (
        <>
            &nbsp;with&nbsp;
            {tagPeople.map((tag, index) => (
                <Fragment key={v4()}>
                    {index > 0 && ' and '}
                    <span className='font-semibold hover:underline cursor-pointer'>
                        {tag.name || tag.username}
                    </span>
                </Fragment>
            ))}
        </>
    );
};

export default TagPeople;
