import React from 'react';
import { Box, Text } from 'native-base';
import Navbar from '../Navbar';
import TutorAppointments from './TutorAppointments';

const TutorDashboard = () => {
  const tutorId = 'XlQ4lgitPTn2RpghRQfy'; // Replace with the actual student ID

  return (
    <Box flex={1} justifyContent="flex-start" alignItems="center" mt={0}>
      <Navbar />
      <Text fontSize="xl" fontWeight="bold">
        Welcome to the tutor Dashboard page!
      </Text>
      <TutorAppointments tutorId={tutorId} />
    </Box>
  );
};

export default TutorDashboard;

