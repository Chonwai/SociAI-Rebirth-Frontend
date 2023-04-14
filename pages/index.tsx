import Head from 'next/head';
import HashtagDogController from '@/components/containers/HashtagDog/HashtagDogContainer';
import { withLayout } from '@/hocs/withLayout';
import SimpleLayout from '@/layouts/SimpleLayout';
import ShibaContainer from '@/components/containers/Shiba/ShibaContainer';
import ScriptGenerator from '@/components/features/ScriptGenerator/ScriptGenerator';
import { Feature } from '@/components/views/Shiba/Feature';
import { useBreakpointValue } from '@chakra-ui/react';

const Home = () => {
    const variant = useBreakpointValue({ base: 'simple', md: 'circles-alt' }) as
        | 'circles'
        | 'circles-alt'
        | 'simple'
        | undefined;
    return (
        <>
            <Head>
                <title>SociAI</title>
                <meta
                    name="description"
                    content="🚀 Are you tired of spending hours searching for the perfect hashtags for your social media posts? Look no further than SociAI Hashtag Generator! Our fast and easy to use hashtag generator analyzes your content and suggests the most effective hashtags for multiple social media platforms. Save time ⏰ and boost engagement 💬 with SociAI. Try it out today!"
                />
                <meta name="author" content="SociAI" />
                <meta
                    name="keywords"
                    content="Hashtag Generator, Hashtag, Hashtags, Social Media, Social Media Marketing, Social Media Post, Social Media Content, Social Media Engagement, Social Media Strategy, Social Media Analytics, Social Media Management, Social Media Marketing Tools, Social Media Marketing Software, Social Media Marketing Agency, Social Media Marketing Services, Social Media Marketing Company, Social Media Marketing Platform"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                <meta property="og:title" content="SociAI Hashtag Generator" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.sociai.app" />
                <meta
                    property="og:image"
                    content="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F0855b34a-f749-498a-a33b-fc59e06b0350%2F336512779_929932591758511_737083373618479070_n.png?id=e903d791-4e2a-4248-8287-695684d944b9&table=block&spaceId=54feed23-6771-4a46-bf43-72dc7d22e0cf&width=2000&userId=c6fb95f0-4b77-47dd-864e-a32f6912a243&cache=v2"
                />
                <meta
                    property="og:description"
                    content="SociAI is a hashtag generator that analyzes your content and suggests the most effective hashtags for multiple social media platforms. Save time and boost engagement with SociAI. Try it out today!"
                />
                <meta property="og:site_name" content="SociAI" />
            </Head>
            <ScriptGenerator variant={variant} />
            <Feature py={{ base: '8', md: '12' }} px={{ base: '4', md: '8' }} />
        </>
    );
};

export default withLayout(Home, SimpleLayout);
