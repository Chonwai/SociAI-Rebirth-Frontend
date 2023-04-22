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

const DEFAULT_VALUE = {
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
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: `You are now an ${data.language} ${data.style} social media script writer and your tone style is ${data.tone}. The output must follow the format '''json\n {"content": ""} '''. Please extend and generate a ${data.length} size script and include emoji with ${data.region} style script with ${data.language} and give ${data.hashtagCount} related topic popular hashtags based on the given reference description: "${data.description}".`
            })
        });

        if (response.ok) {
            const data: any = await response.json();
            const result = getContent(data.result);
            if (result) {
                setScript(_get(result, 'content', ''));
                (onScriptChange || (() => {}))(_get(result, 'content', ''));
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
            setScript('');
            (onScriptChange || (() => {}))('');
        }
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
