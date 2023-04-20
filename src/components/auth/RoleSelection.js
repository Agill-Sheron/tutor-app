import React from 'react';
import { Box, VStack, Button, Text } from 'native-base';

const RoleSelectionScreen = ({ route, navigation }) => {
  const { email } = route.params;
  const handleRoleSelection = (role) => {
    navigation.navigate('UserDetails', { role, email });
  };

  return (
    <Box flex={1} justifyContent="center" alignItems="center" backgroundColor={'white'}>
      <VStack space={4}>
        <Text fontSize="xl" fontWeight="bold">
          Are you a Tutor or a Student?
        </Text>
        <Button onPress={() => handleRoleSelection('tutor')}>
          <Text color={'white'}>Tutor</Text>
        </Button>
        <Button onPress={() => handleRoleSelection('student')}>
          <Text color={'white'}>Student</Text>
        </Button>
      </VStack>
    </Box>
  );
};

export default RoleSelectionScreen;