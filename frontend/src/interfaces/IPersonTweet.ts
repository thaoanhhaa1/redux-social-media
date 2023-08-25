import IPerson from './IPerson';

interface IPersonTweet extends IPerson {
    isInList?: boolean;
    follow?: boolean;
}

export default IPersonTweet;
