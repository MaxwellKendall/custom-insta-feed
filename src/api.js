import { accessToken } from './secrets';

export const getUserInfo = `https://api.instagram.com/v1/users/self/media/recent?access_token=${accessToken}`;
