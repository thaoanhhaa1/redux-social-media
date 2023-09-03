import { Dispatch, SetStateAction } from 'react';
import { IPersonTweet, ITweet } from '../../interfaces';
import Modal from '../Modal';
import ScrollbarCustomize from '../ScrollbarCustomize';
import Card from '../card/Card';
import CardComment from './CardComment';

const CardPopup = ({
    user,
    tweet,
    className = '',
    isShow,
    setShow,
}: {
    user: IPersonTweet;
    tweet: ITweet;
    className?: string;
    isShow: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
}) => {
    return (
        <Modal isShowModal={isShow} handleCloseModal={() => setShow(false)}>
            <div className='max-w-[min(calc(100vw-8px),700px)] rounded-lg overflow-hidden bg-white'>
                <header className='flex items-center justify-center h-15 text-xl leading-xl border-b border-[#CED0D4] bg-white'>
                    <strong>{user.name || user.username}'s Tweet</strong>
                </header>
                <ScrollbarCustomize className='max-h-[calc(100vh-124px)] overflow-y-auto'>
                    <Card
                        isPopup
                        className={className}
                        tweet={tweet}
                        user={user}
                    />
                    <CardComment user={user} />
                </ScrollbarCustomize>
            </div>
        </Modal>
    );
};

export default CardPopup;
