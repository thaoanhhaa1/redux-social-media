import { IBookmark } from '../interfaces';
import getBookmarkDTO from './getBookmarkDTO';

function getBookmarksDTO(bookmarks: IBookmark[]): IBookmark[] {
    return bookmarks.map(getBookmarkDTO);
}

export default getBookmarksDTO;
