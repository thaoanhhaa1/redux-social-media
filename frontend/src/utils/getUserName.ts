function getUserName(name: string, username: string) {
    return (name && name.split(' ').at(-1)) || username;
}

export default getUserName;
