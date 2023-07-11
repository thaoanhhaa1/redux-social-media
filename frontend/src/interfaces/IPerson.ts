import IUserTweet from './IUserTweet';

interface IPerson extends IUserTweet {
    email: string;
    background: string;
}

export default IPerson;
