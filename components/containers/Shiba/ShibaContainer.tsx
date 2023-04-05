import { useState } from 'react';
import ShibaView from '@/components/views/Shiba/ShibaView';
import { useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ShibaSchema } from '@/schemas/ShibaSchema';
import { getContent } from '@/utils/utils';
import _get from 'lodash/get';

const DEFAULT_VALUE = {
    style: 'Instagram',
    length: 'Medium',
    description: '',
    region: 'Global'
};

const ShibaContainer = () => {
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
                prompt: `You are now a ${data.style} script writer. The output should follow the format '''json\n {"script": ""} '''. Please extend and generate a ${data.length} and including emoji ${data.region} style script based on the given reference sentence: "${data.description}".`
            })
        });

        if (response.ok) {
            const data: any = await response.json();
            const result = getContent(data.result);
            if (result) {
                setScript(_get(result, 'script', ''));
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
        }
    };

    return (
        <ShibaView
            {...{
                handleSubmit,
                register,
                errors,
                isSubmitting,
                script,
                handleGenerateClick
            }}
        />
    );
};

export default ShibaContainer;
