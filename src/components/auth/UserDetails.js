import React, { useState } from 'react';
import { Box, VStack, FormControl, Input, Button, Text } from 'native-base';
import firebase from '../../utils/firebase';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import uuid from 'react-native-uuid'; // Import uuid from react-native-uuid

const UserDetailsScreen = ({ route, navigation }) => {
  const { role, email } = route.params;
  const [name, setName] = useState('');

  const db = getFirestore(firebase);

  const handleSubmit = async () => {
    try {
      const usersCollection = collection(db, role === 'tutor' ? 'Tutors' : 'Students');
      const generatedId = `${role === 'tutor' ? 'tu-' : 'st-'}${uuid.v4()}`; // Add prefixes back
      const userDocRef = doc(usersCollection, generatedId);

      const userData = {
        name,
        email,
        [`${role}Id`]: generatedId,
      };

      await setDoc(userDocRef, userData);

      // Navigate to TutorDashboard or StudentDashboard based on the user's role
      navigation.navigate(role === 'tutor' ? 'Tutor Dashboard' : 'Student Dashboard');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <Box flex={1} justifyContent="center" p={4} backgroundColor={'white'}>
      <VStack space={4}>
        <FormControl>
          <FormControl.Label>Name</FormControl.Label>
          <Input value={name} onChangeText={setName} />
        </FormControl>
        <Button onPress={handleSubmit}>
          <Text color={'white'}>Confirm</Text>
        </Button>
      </VStack>
    </Box>
  );
};

export default UserDetailsScreen;