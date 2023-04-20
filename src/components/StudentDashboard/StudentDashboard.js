import React from 'react';
import { Box, Text } from 'native-base';
import Navbar from '../Navbar';
import StudentAppointments from './StudentAppointments';

const StudentDashboard = () => {
  const studentId = 'XlQ4lgitPTn2RpghRQfy'; // Replace with the actual student ID

  return (
    <Box flex={1} justifyContent="flex-start" alignItems="center" mt={0}>
      <Navbar />
      <Text fontSize="xl" fontWeight="bold">
        Welcome to the student Dashboard page!
      </Text>
      <StudentAppointments studentId={studentId} />
    </Box>
  );
};

export default StudentDashboard;

