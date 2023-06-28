function isAdult(date: Date) {
    const year = date.getFullYear();
    const dateNow = new Date(
        new Date().toLocaleDateString().split('/').reverse().join('/'),
    );

    return new Date(date.setFullYear(year + 18)) < dateNow;
}

export default isAdult;
