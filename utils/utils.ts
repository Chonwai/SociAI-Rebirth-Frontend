export const getContentBetweenSymbols = (str: string, startSymbol: string, endSymbol: string) => {
    const startIndex = str.indexOf(startSymbol);
    if (startIndex === -1) return '';

    const endIndex = str.indexOf(endSymbol, startIndex + startSymbol.length);
    if (endIndex === -1) return '';

    return str.slice(startIndex + startSymbol.length, endIndex);
};

export const getContent = (str: string) => {
    const symbolList = ['```json', '```'];
    for (const symbol of symbolList) {
        const content = getContentBetweenSymbols(str, symbol, '```');
        if (content) return content;
    }
    return '';
};
