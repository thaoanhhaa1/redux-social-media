interface IComment {
    _id: string;
    post: string;
    user: {
        _id: string;
        name?: string;
        avatar: string;
        username: string;
    };
    content: string;
    likes: string[];
    parent?: string;
    createdAt: string;
    level: number;
    numberOfLikes: number;
    numberOfComments: number;
    comments: IComment[];
}

export default IComment;
