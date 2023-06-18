import BookmarkItem from '../components/BookmarkItem';
import Card from '../components/card/Card';
import ScrollbarFixTop from '../components/scrollbar/ScrollbarFixTop';

const Bookmark = () => {
    return (
        <div className="flex gap-5 px-5">
            <ScrollbarFixTop
                gap="2"
                className="w-[335px]"
                header={
                    <div className="text-center font-semibold text-black-5 dark:text-white">
                        Bookmark Tweet
                    </div>
                }
            >
                <BookmarkItem />
                <BookmarkItem />
                <BookmarkItem />
                <BookmarkItem />
                <BookmarkItem />
                <BookmarkItem />
                <BookmarkItem />
                <BookmarkItem />
                <BookmarkItem />
            </ScrollbarFixTop>
            <div className="flex flex-col gap-5">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    );
};

export default Bookmark;
