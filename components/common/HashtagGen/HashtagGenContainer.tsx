import { useState } from 'react';
import HashtagGenView from './HashtagGenView';
import { BoxProps, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { HashtagDogSchema } from '@/schemas/HashtagDogSchema';
import { getContent } from '@/utils/utils';
import _get from 'lodash/get';

interface HashtagGenContainerProps extends BoxProps {
    onHashtagsChange?: (hashtags: Array<string>) => void | undefined;
}

const DEFAULT_VALUE = {
    style: 'Instagram',
    amount: 10,
    script: '',
    region: 'Global'
};

const HashtagGenContainer = (props: HashtagGenContainerProps) => {
    const { onHashtagsChange, ...rest } = props;
    const [hashtags, setHashtags] = useState<Array<string>>([]);

    const toasts = useToast();

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: DEFAULT_VALUE,
        resolver: yupResolver(HashtagDogSchema)
    });

    const handleGenerateClick = async (data: any) => {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: `You are now a ${data.style} hashtag writer. The output should follow the format '''json\n {"hashtags": []} '''. Please generate ${data.amount} ${data.region} style useful and popular hashtags based on the given reference sentence "${data.script}".`
            })
        });

        if (response.ok) {
            const data: any = await response.json();
            const result = getContent(data.result);
            if (result) {
                setHashtags(_get(result, 'hashtags', []));
                (onHashtagsChange || (() => {}))(_get(result, 'hashtags', []));
            } else {
                toasts({
                    title: 'Error',
                    description: 'The Network is not working, please try again :(',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: 'top-right'
                });
                setHashtags([]);
                (onHashtagsChange || (() => {}))([]);
            }
        } else {
            console.log('error');
            toasts({
                title: 'Error',
                description: 'The Network is not working, please try again :(',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-right'
            });
            setHashtags([]);
            (onHashtagsChange || (() => {}))([]);
        }
    };

    return (
        <HashtagGenView
            {...{
                handleSubmit,
                register,
                errors,
                isSubmitting,
                hashtags,
                handleGenerateClick,
                ...rest
            }}
        />
    );
};

export default HashtagGenContainer;
