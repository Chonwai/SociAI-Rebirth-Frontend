export const getContentOnNote = (str: string) => {
    const jsonRegex = /{.*}/s;
    const jsonMatch = str.match(jsonRegex);

    if (jsonMatch) {
        const jsonStr = jsonMatch[0];
        const jsonObj = JSON.parse(jsonStr);
        return jsonObj;
    } else {
        console.log('No JSON found in the paragraph');
        return {};
    }

    return {};
};

export const getContent = (str: string) => {
    const content = getContentOnNote(str);
    return content;
};
