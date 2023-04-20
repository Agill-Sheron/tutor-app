import React from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import {
    VStack,
    HStack,
    IconButton,
    Text,
    Avatar,
    Box, Pressable,
} from 'native-base';
import { Alert } from "react-native";

const TutorRequest = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const request = route.params.request;

    const handleAcceptRequest = () => {
        Alert.alert(
            'Accept Request',
            'Are you sure you want to accept this request?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'Confirm', onPress: () => console.log('Confirmed') },
            ],
            { cancelable: false }
        );
    };

    const handleDeclineRequest = () => {
        Alert.alert(
            'Decline Request',
            'Are you sure you want to decline this request?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'Confirm', onPress: () => console.log('Confirmed') },
            ],
            { cancelable: false }
        );
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <VStack flex={1} alignItems="center" justifyContent="center">
            <Pressable width={"90%"} >
                <Box
                    bg={'coolGray.100'}
                    p={5}
                    rounded={8}
                    borderWidth={1}
                    borderColor="coolGray.300"
                    shadow={3}
                >
                    <VStack width={"100%"}>
                        <HStack width={"100%"} alignItems={"center"} justifyContent={"space-between"}>
                            <Avatar source={{ uri: request.avatarUrl }} size="lg" />
                            <VStack alignItems="flex-end">
                                <Text fontWeight="bold" fontSize="lg">
                                    {request.studentName}
                                </Text>
                                <Text fontWeight="medium" fontSize="sm">
                                    {request.course}
                                </Text>
                                <Text fontSize="xs" color="coolGray.600">
                                    {request.date}
                                </Text>
                                <Text fontSize="xs" color="coolGray.600">
                                    {request.startTime} to{' '}
                                    {request.endTime}
                                </Text>
                            </VStack>
                        </HStack>
                        <HStack  alignItems="center" justifyContent={"space-between"} mt={4} space={10}>
                            <Text fontSize="xs" color="coolGray.800">
                                Duration: {request.duration}
                            </Text>
                            <Text fontSize="md" fontWeight="bold" color="emerald.600">
                                {request.earnings}
                            </Text>
                        </HStack>
                        <HStack
                            alignItems={'center'}
                            justifyContent={'center'}
                            space={4}
                            mt={4}
                        >
                            <IconButton
                                onPress={handleGoBack}
                                icon={<Ionicons name="arrow-back" size={24} />}
                            />
                            <IconButton
                                onPress={handleAcceptRequest}
                                icon={<Ionicons name="checkmark-circle" size={24} color="green" />}
                                rounded="full"
                            />
                            <IconButton
                                onPress={handleDeclineRequest}
                                icon={<Ionicons name="close-circle" size={24} color="red" />}
                                rounded="full"
                            />
                        </HStack>
                    </VStack>
                </Box>
            </Pressable>
        </VStack>
    );
};

export default TutorRequest;
