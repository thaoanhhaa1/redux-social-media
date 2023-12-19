import IComment from '../interfaces/IComment';
import { getTimeComment } from '../utils';
import Avatar from './Avatar';
import { MoreIcon } from './Icons';

export interface ICommentTweetProps {
    comment: IComment;
}

export default function CommentTweet({ comment }: ICommentTweetProps) {
    return (
        <div>
            <div className='pl-4 pt-1 flex gap-[6px] group/more'>
                <Avatar src={comment.user.avatar} className='mt-[2px]' />
                <div>
                    <div className='flex gap-[6px]'>
                        <div className='rounded-[18px] pb-2 px-3 bg-[#F0F2F5]'>
                            <span className='text-xs leading-none font-semibold'>
                                {comment.user.name || comment.user.username}
                            </span>
                            <p className='text-sm leading-sm'>
                                {comment.content}
                            </p>
                        </div>
                        <button
                            className='text-white group-hover/more:text-[#65676B] self-center flex justify-center items-center w-8 h-8 rounded-full ease-linear hover:bg-[rgba(0,_0,_0,_0.05)]'
                            type='button'
                        >
                            <MoreIcon />
                        </button>
                    </div>
                    <div className='mt-1 flex gap-4 px-2 text-[#65676B] text-xs leading-xs font-bold'>
                        <span className='font-normal'>
                            {getTimeComment(comment.createdAt)}
                        </span>
                        <span>Like</span>
                        <span>Reply</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
