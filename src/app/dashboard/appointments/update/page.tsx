"use client"
import { FC } from 'react';
import { AppointmentForm } from '../components/appointment-form';

interface UpdateAppointmentProps {};
// Updated AppointmentFormValues interface
interface AppointmentFormValues {
  name: string;
  email: string;
  address: string;
  phone: string;
  status: string;  // e.g., "Pending", "Confirmed", etc.
  date: Date;
  time: string;
}

// Mock data for AppointmentFormValues
const mockAppointment: AppointmentFormValues = {
  name: "John Doe",
  email: "john.doe@example.com",
  address: "123 Main St, Springfield",
  phone: "123-456-7890",
  status: "Pending",
  date: new Date(), // current date
  time: "10:00 AM", // example time
};

// Mock props for AppointmentFormProps
const appointmentFormProps = {
  appointment: mockAppointment,
  onSubmit: (data: AppointmentFormValues) => {
    console.log("Form submitted:", data);
  },
  onCancel: () => {
    console.log("Form canceled");
  },
};



const UpdateAppointment: FC<UpdateAppointmentProps> = ({}) => {
  return <div> 
    <AppointmentForm  
    onCancel={() => {
    console.log("Form canceled");
  }}  
  onSubmit={(data: AppointmentFormValues) => {
    console.log("Form submitted:", data);
  }} 

  />  </div>;
};

export default UpdateAppointment;