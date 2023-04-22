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

export const hashtags2String = (hashtags: string[]) => {
    if (hashtags.length > 0) {
        const newHashtags = hashtags.map((hashtag) => {
            if (hashtag.startsWith('#')) {
                return hashtag;
            } else {
                return `#${hashtag}`;
            }
        });
        return newHashtags.join(' ');
    } else {
        return '';
    }
};

export const getSocialMedias = () => {
    const socialMedia = ['Instagram', 'Twitter', 'Facebook', 'LinkedIn', '小紅書', 'TikTok'];
    return socialMedia;
};

export const getRegions = () => {
    const regions = [
        'Global 🌎',
        'Australia 🇦🇺',
        'Canada 🇨🇦',
        'China 🇨🇳',
        'Hong Kong 🇭🇰',
        'India 🇮🇳',
        'Macau 🇲🇴',
        'Signapore 🇸🇬',
        'Taiwan 🇹🇼',
        'United Kingdom 🇬🇧',
        'United States 🇺🇸'
    ];
    return regions;
};

export const getTones = () => {
    const tone = [
        'Casual 🤣',
        'Professional 🧔',
        'Formal 🤔',
        'Humorous 🤪',
        'Emotional 🥹',
        'Storytelling 📖'
    ];
    return tone;
};

export const getScriptLengths = () => {
    const scriptLength = ['Short', 'Medium', 'Long'];
    return scriptLength;
};

export const getLanguages = () => {
    const languages = ['English', '繁體中文', '简体中文'];
    return languages;
};
