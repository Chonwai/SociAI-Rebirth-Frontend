import { useEffect, useState } from 'react';
import HashtagGenView from './HashtagGenView';
import { BoxProps, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { HashtagDogSchema } from '@/schemas/HashtagDogSchema';
import { getContent } from '@/utils/utils';
import _get from 'lodash/get';
import { useRouter } from 'next/router';

interface HashtagGenContainerProps extends BoxProps {
    onHashtagsChange?: (hashtags: Array<string>) => void | undefined;
}

const DEFAULT_VALUE = {
    style: 'Instagram',
    amount: 10,
    script: '',
    region: 'Global 🌎'
};

const HashtagGenContainer = (props: HashtagGenContainerProps) => {
    const { onHashtagsChange, ...rest } = props;
    const [hashtags, setHashtags] = useState<Array<string>>([]);
    const router = useRouter();
    const toasts = useToast();

    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: DEFAULT_VALUE,
        resolver: yupResolver(HashtagDogSchema)
    });

    useEffect(() => {
        if (router.query.pre_script) {
            setValue('script', router.query.pre_script as string);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router]);

    // const handleGenerateClick = async (data: any) => {
    //     const response = await fetch('/api/chat', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             prompt: `You are now a ${data.style} hashtag writer. The output should follow the format '''json\n {"hashtags": []} '''. Please generate ${data.amount} ${data.region} style useful and popular hashtags based on the given reference sentence "${data.script}".`
    //         })
    //     });

    //     if (response.ok) {
    //         const data: any = await response.json();
    //         const result = getContent(data.result);
    //         if (result) {
    //             setHashtags(_get(result, 'hashtags', []));
    //             (onHashtagsChange || (() => {}))(_get(result, 'hashtags', []));
    //         } else {
    //             toasts({
    //                 title: 'Error',
    //                 description: 'The Network is not working, please try again :(',
    //                 status: 'error',
    //                 duration: 5000,
    //                 isClosable: true,
    //                 position: 'top-right'
    //             });
    //             setHashtags([]);
    //             (onHashtagsChange || (() => {}))([]);
    //         }
    //     } else {
    //         console.log('error');
    //         toasts({
    //             title: 'Error',
    //             description: 'The Network is not working, please try again :(',
    //             status: 'error',
    //             duration: 5000,
    //             isClosable: true,
    //             position: 'top-right'
    //         });
    //         setHashtags([]);
    //         (onHashtagsChange || (() => {}))([]);
    //     }
    // };

    const handleGenerateClick = async (data: any) => {
        const maxRetries = 1;
        const retryDelay = 1000; // 1 second

        const fetchData = async (retryCount: number): Promise<any> => {
            try {
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        prompt: `You are now a ${data.style} hashtag writer. The output should follow the format '''json\n {"hashtags": []} '''. Please generate ${data.amount} ${data.region} style useful and popular hashtags based on the given reference sentence "${data.script}".`
                    })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const responseData: any = await response.json();
                const result = getContent(responseData.result);
                if (result) {
                    setHashtags(_get(result, 'hashtags', []));
                    (onHashtagsChange || (() => {}))(_get(result, 'hashtags', []));
                } else {
                    throw new Error('Result hashtags are empty or invalid');
                }
            } catch (error) {
                console.error('Fetch error:', error);
                if (retryCount < maxRetries) {
                    console.log(`Retrying... (${retryCount + 1}/${maxRetries})`);
                    await new Promise((resolve) => setTimeout(resolve, retryDelay));
                    await fetchData(retryCount + 1);
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
            }
        };

        await fetchData(0);
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
