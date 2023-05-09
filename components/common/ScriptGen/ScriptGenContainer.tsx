import { useState } from 'react';
import ScriptGenView from './ScriptGenView';
import { useToast, BoxProps } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ShibaSchema } from '@/schemas/ShibaSchema';
import { getContent } from '@/utils/utils';
import _get from 'lodash/get';

interface ScriptGenContainerProps extends BoxProps {
    onScriptChange?: (script: string) => void | undefined;
}


const saveFormDataToLocalStorage = (key: string, data: any) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving form data to localStorage:', error);
    }
};

const loadFormDataFromLocalStorage = (key: string) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error loading form data from localStorage:', error);
        return null;
    }
};

const DEFAULT_VALUE = loadFormDataFromLocalStorage('shibaFormData') || {
    style: 'Instagram',
    length: 'Medium',
    description: '',
    region: 'Global 🌎',
    hashtagCount: 15,
    tone: 'Casual 🤣',
    language: 'English'
};

const ScriptGenContainer = (props: ScriptGenContainerProps) => {
    const { onScriptChange, ...rest } = props;
    const [script, setScript] = useState('');

    // Get the toasts object
    const toasts = useToast();

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: DEFAULT_VALUE,
        resolver: yupResolver(ShibaSchema)
    });

    const handleGenerateClick = async (data: any) => {
        saveFormDataToLocalStorage('shibaFormData', data);
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
                        prompt: `You are now an ${data.language} ${data.style} social media script writer and your tone style is ${data.tone}! The output must follow the json format (the newline symbol "\n" must be replace to "\\n"!) {"content": ""}! Please extend and generate a ${data.length} size script and include emoji with ${data.region} style script with ${data.language} and give ${data.hashtagCount} related topic popular hashtags based on the given reference description: ${data.description}.`
                    })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const responseData: any = await response.json();
                const result = getContent(responseData.result);
                if (result) {
                    setScript(_get(result, 'content', ''));
                    (onScriptChange || (() => {}))(_get(result, 'content', ''));
                } else {
                    throw new Error('Result content is empty or invalid');
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
                    setScript('');
                    (onScriptChange || (() => {}))('');
                }
            }
        };

        await fetchData(0);
    };

    return (
        <ScriptGenView
            {...{
                handleSubmit,
                register,
                errors,
                isSubmitting,
                script,
                handleGenerateClick,
                ...rest
            }}
        />
    );
};

export default ScriptGenContainer;
