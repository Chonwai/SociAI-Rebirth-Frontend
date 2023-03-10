import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Select
} from '@chakra-ui/react';
import { HashtagDogController } from '../controllers/HashtagDogController';

const hashtagStyles = ['Instagram', 'Twitter', 'Facebook'];

const HashtagDogView = () => {
    const {
        script,
        hashtagStyle,
        hashtagAmount,
        isAmountInvalid,
        handleHashtagAmountChange,
        handleHashtagStyleChange,
        handleGenerateClick
    } = HashtagDogController();

    return (
        <Box p={4}>
            <FormControl isRequired mb={4} isInvalid={isAmountInvalid}>
                <FormLabel>Amount of Hashtags (1-30)</FormLabel>
                <Input value={hashtagAmount} onChange={handleHashtagAmountChange} />
                <FormErrorMessage>Invalid amount</FormErrorMessage>
            </FormControl>
            <FormControl mb={4}>
                <FormLabel>Hashtag Style</FormLabel>
                <Select value={hashtagStyle} onChange={handleHashtagStyleChange}>
                    {hashtagStyles.map((style) => (
                        <option key={style} value={style}>
                            {style}
                        </option>
                    ))}
                </Select>
            </FormControl>
            <FormControl isRequired mb={4}>
                <FormLabel>Input Script</FormLabel>
                <Input as="textarea" rows={6} value={script} onChange={() => {}} />
            </FormControl>
            <Button onClick={handleGenerateClick}>Generate Hashtags</Button>
        </Box>
    );
};

export default HashtagDogView;
