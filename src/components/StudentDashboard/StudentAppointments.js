import React, { useState, useEffect } from 'react';
import { Box, Text, Button, Input, VStack, HStack } from 'native-base';
import firebase from 'firebase/app';
import 'firebase/firestore';

const StudentAppointments = ({ studentId }) => {
  const [appointments, setAppointments] = useState([]);
  const [appointmentName, setAppointmentName] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      const db = firebase.firestore();
      const appointmentsRef = db.collection('students').doc(studentId).collection('appointments');
      const querySnapshot = await appointmentsRef.get();
      const appointmentsData = querySnapshot.docs.map((doc) => ({
        appointmentId: doc.id,
        appointmentName: doc.data().appointmentName,
      }));
      setAppointments(appointmentsData);
    };

    fetchAppointments();
  }, []);

  const handleAddAppointment = async () => {
    if (appointmentName.trim() !== '') {
      const db = firebase.firestore();
      const appointmentsRef = db.collection('students').doc(studentId).collection('appointments');
      const appointmentRef = await appointmentsRef.add({
        appointmentName: appointmentName,
      });
      setAppointments([
        ...appointments,
        {
          appointmentId: appointmentRef.id,
          appointmentName: appointmentName,
        },
      ]);
      setAppointmentName('');
    }
  };

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" mt={4}>
        Appointments
      </Text>
      <VStack space={2} mt={4}>
        {appointments.map((appointment) => (
          <Box key={appointment.appointmentId} borderWidth={1} borderRadius="lg" p={2}>
            <Text>{appointment.appointmentName}</Text>
          </Box>
        ))}
      </VStack>
      <HStack space={2} mt={4}>
        <Input
          placeholder="New appointment"
          value={appointmentName}
          onChangeText={(text) => setAppointmentName(text)}
        />
        <Button onPress={handleAddAppointment}>Add</Button>
      </HStack>
    </Box>
  );
};

export default StudentAppointments;