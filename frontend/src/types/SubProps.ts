import { MemoExoticComponent } from 'react';
import { ISubTweet } from '../interfaces';

type SubProps = MemoExoticComponent<
    ({ handleHiddenSub }: ISubTweet) => JSX.Element
>;

export default SubProps;
