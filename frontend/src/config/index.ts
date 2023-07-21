import feelings from './feelings';
import images from './images';
import routes from './routes';
import sidebar from './sidebar';

const vnese =
    'ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ';

const config = {
    THEME_KEY: 'hoque-darkTheme',
    vneseUpper: vnese,
    vneseLower: vnese.toLowerCase(),
    routes,
    sidebar,
    images,
    feelings,
};

export default config;
