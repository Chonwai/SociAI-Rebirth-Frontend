export const getContentOnNote = (str: string) => {
    const jsonRegex = /{.*}/s;
    const jsonMatch = str.match(jsonRegex);

    if (jsonMatch) {
        const jsonStr = jsonMatch[0];
        const jsonObj = JSON.parse(jsonStr);
        console.log(jsonObj);
        return jsonObj;
    } else {
        console.log('No JSON found in the paragraph');
    }

    return {};
};

export const getContent = (str: string) => {
    const content = getContentOnNote(str);
    console.log(content);
    return content;
};
