import config from '../config';

const { vneseUpper, vneseLower } = config;

const message = {
    name: {
        require: 'Please enter your name',
        regex: 'Name must start with a capital letter',
    },
    bio: {
        require: 'Please enter your bio',
    },
    location: {
        require: 'Please enter your location',
    },
    website: {
        url: 'Invalid website',
    },
    birthday: {
        require: 'Please enter your birth day',
    },
    username: {
        require: 'Please enter your username',
        regex: 'Username contains only characters A-Z, a-z, 0-9 and the character _',
        existed: 'Username already exists',
    },
    email: {
        require: 'Please enter your email',
        regex: 'Invalid email',
    },
    password: {
        require: 'Please enter your password',
        regex: 'Password must be at least 8 characters and contain at least one uppercase character, one lowercase character, one number and one special character',
    },
    confirmPassword: {
        match: 'Passwords do NOT match',
    },
};

const regex = {
    name: new RegExp(
        `^[A-Z${vneseUpper}][a-z${vneseLower}]*(\\s[A-Z${vneseUpper}][a-z${vneseLower}]*)*$`,
    ),
    username: /^[A-Za-z0-9_]+$/,
    password: /^(?=.*[A-Z]+)(?=.*[a-z]+)(?=.*[0-9]+)(?=.*[^A-Za-z0-9]+).{8,}$/,
};

export { regex, message };
