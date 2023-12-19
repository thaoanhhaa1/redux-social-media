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
}

export default IComment;
