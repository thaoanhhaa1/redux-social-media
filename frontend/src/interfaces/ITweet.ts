interface ITweet {
    _id: string;
    user: string;
    images: string[] | undefined;
    videos: string[] | undefined;
    createdAt: Date;
    likes: string[];
    group: string | undefined;
}

export default ITweet;
