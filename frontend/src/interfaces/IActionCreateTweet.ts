import SubProps from '../types/SubProps';

interface IActionCreateTweet {
    title?: string;
    tooltip: string;
    image: string;
    sub: SubProps;
    backgroundColor?: string;
}

export default IActionCreateTweet;
