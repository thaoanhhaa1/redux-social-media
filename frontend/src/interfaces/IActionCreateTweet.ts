import SubProps from '../types/SubProps';

interface IActionCreateTweet {
    title?: string;
    tooltip?: string;
    image: string;
    sub?: SubProps;
    backgroundColor?: string;
    disabled?: string[];
    link?: string;
}

export default IActionCreateTweet;
