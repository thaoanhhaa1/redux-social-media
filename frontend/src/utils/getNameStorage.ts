function getNameStorage(url: string): string {
    const result = new RegExp('(.*)images%2F(.*)?alt=media&token=.*').exec(url);

    if (!result) return '';

    const length = result.length;
    const s = result[length - 1];

    return s.substring(0, s.length - 1);
}

export default getNameStorage;
