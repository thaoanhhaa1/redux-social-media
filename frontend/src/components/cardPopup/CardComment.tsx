import TextareaAutosize from 'react-textarea-autosize';
import { useSearch } from '../../hooks';
import { IPersonTweet } from '../../interfaces';
import { classNames } from '../../utils';
import { SendIcon } from '../Icons';
import Image from '../Image';
import ScrollbarCustomize from '../ScrollbarCustomize';

const CardComment = ({ user }: { user: IPersonTweet }) => {
    const { value, handleChangeSearch } = useSearch();

    return (
        <div className='flex bg-white -mt-5 p-5 gap-2 xxs:gap-4 rounded-b-lg'>
            <Image className='w-8 h-8' alt='' src={user.avatar} rounded />
            <ScrollbarCustomize
                containerClassName='flex-1'
                className='max-h-[389px] flex gap-3 px-3 py-2 bg-[#F0F2F5] rounded-[18px] overflow-y-auto'
            >
                <form className='flex-1 flex h-full items-center'>
                    <TextareaAutosize
                        value={value}
                        onChange={handleChangeSearch}
                        placeholder='Write a comment...'
                        className='flex-1 text-sm leading-sm bg-[#F0F2F5] resize-none outline-none'
                    />
                    <button
                        disabled={!value}
                        className={classNames(
                            '-mx-2 p-2 self-end',
                            (value && 'text-blue') ||
                                'cursor-not-allowed opacity-40',
                        )}
                    >
                        <SendIcon />
                    </button>
                </form>
            </ScrollbarCustomize>
        </div>
    );
};

export default CardComment;
