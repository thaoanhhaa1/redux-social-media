import { IBookmark } from '../interfaces';

function getBookmarkDTO(bookmark: IBookmark): IBookmark {
    bookmark.tweets = [];
    bookmark.page = 0;
    bookmark.pages = Math.ceil(bookmark.numberOfTweets / 10);

    return bookmark;
}

export default getBookmarkDTO;
