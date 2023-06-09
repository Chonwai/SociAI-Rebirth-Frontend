import Head from 'next/head';
import { withLayout } from '@/hocs/withLayout';
import SimpleLayout from '@/layouts/SimpleLayout';
import ShibaContainer from '@/components/containers/Shiba/ShibaContainer';

const Shiba = () => {
    return (
        <>
            <Head>
                <title>SociAI - Shiba</title>
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
                    content="https://scontent-tpe1-1.xx.fbcdn.net/v/t39.30808-6/338550188_762914091829144_2784882164821364953_n.png?stp=cp6_dst-png&_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_ohc=kfZ3p9PiLCcAX-s9xtY&_nc_ht=scontent-tpe1-1.xx&oh=00_AfAMtZ0Oe1GPSCKV-9XgSaDonrMZryj3ZsLlW87BQcKGVw&oe=642BBFC5"
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

export default withLayout(Shiba, SimpleLayout);
