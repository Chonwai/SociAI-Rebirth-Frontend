import { HashtagGen } from '@/components/common/HashtagGen';
import { Box } from '@chakra-ui/react';
import { Feature } from './Feature';

const HashtagDogView = () => {
    return (
        <Box mx="auto" p={{ base: 4, md: 8 }}>
            <HashtagGen />
            <Feature />
        </Box>
    );
};

export default HashtagDogView;
