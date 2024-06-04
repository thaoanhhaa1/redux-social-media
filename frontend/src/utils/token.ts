const KEY = 'redux-social-media-token';

const get = () => localStorage.getItem(KEY);

const set = (token: string) => localStorage.setItem(KEY, token);

const remove = () => localStorage.removeItem(KEY);

const token = { get, set, remove };

export default token;
