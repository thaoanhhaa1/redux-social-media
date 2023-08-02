import feelings from './feelings';
import images from './images';
import routes from './routes';
import sidebar from './sidebar';
import createTweetActions from './createTweetActions';

const vnese =
    'ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ';

const config = {
    THEME_KEY: 'hoque-darkTheme',
    GIFS_PER_PAGE: 5,
    CREATE_TWEET_ACTION_NUMBER: 5,
    vneseUpper: vnese,
    vneseLower: vnese.toLowerCase(),
    routes,
    sidebar,
    images,
    feelings,
    createTweetActions,
};

export default config;
