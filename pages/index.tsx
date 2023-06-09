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
                <meta property="og:title" content="SociAI Script Generator" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.sociai.app" />
                <meta
                    property="og:image"
                    content="https://scontent-tpe1-1.xx.fbcdn.net/v/t39.30808-6/336512779_929932591758511_737083373618479070_n.png?stp=cp6_dst-png&_nc_cat=105&ccb=1-7&_nc_sid=730e14&_nc_ohc=S3078TgnoyIAX8jWV5S&_nc_ht=scontent-tpe1-1.xx&oh=00_AfD7pIIaodx4R-ZXARVZdxazoBkpwfNhNVyDGy0gBDw3uw&oe=643E9D67"
                />
                <meta
                    property="og:description"
                    content="SociAI is a hashtag generator that analyzes your content and suggests the most effective hashtags for multiple social media platforms. Save time and boost engagement with SociAI. Try it out today!"
                />
                <meta property="og:site_name" content="SociAI" />
            </Head>
            <ShibaContainer />
        </>
    );
};

export default withLayout(Home, SimpleLayout);
