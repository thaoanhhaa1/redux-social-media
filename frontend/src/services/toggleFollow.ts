import api from '../api';
import axiosClient from '../api/axiosClient';

function toggleFollow(userId: string, isFollow?: boolean) {
    return axiosClient.post(api[isFollow ? 'unfollow' : 'follow'](), {
        userId,
    });
}

export default toggleFollow;
