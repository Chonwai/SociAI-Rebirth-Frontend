import { Feature } from './Feature';
import { ScriptGen } from '@/components/common/ScriptGen';
import { Box } from '@chakra-ui/react';

const ShibaView = () => {
    return (
        <Box mx="auto" p={{ base: 4, md: 8 }}>
            <ScriptGen />
            <Feature />
        </Box>
    );
};

export default ShibaView;
