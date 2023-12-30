import IPerson from './IPerson';
import IStoryDetail from './IStoryDetail';

interface IStoriesDetail {
    user: IPerson;
    stories: Array<IStoryDetail>;
}

export default IStoriesDetail;
