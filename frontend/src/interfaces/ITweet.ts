interface ITweet {
    _id?: string;
    content?: string;
    images?: string[];
    videos?: string[];
    createdAt?: string;
    likes?: string[];
    group?: string;
    feeling?: {
        title: string;
        image: string;
    };
    location?: string;
    tagPeople?: string[];
    gif?: {
        title: string;
        url: string;
    };
}

export default ITweet;
