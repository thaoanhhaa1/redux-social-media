import { ISubTweet } from '../interfaces';

type SubProps = (({ handleHiddenSub }: ISubTweet) => JSX.Element) | undefined;

export default SubProps;
