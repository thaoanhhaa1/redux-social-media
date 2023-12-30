import { Story } from 'react-insta-stories/dist/interfaces';

interface IStoryDetail extends Story {
    _id: string;
    createdAt: string;
}

export default IStoryDetail;
