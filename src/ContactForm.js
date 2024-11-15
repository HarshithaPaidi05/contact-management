import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Alert } from '@mui/material';
import axios from 'axios';

const ContactForm = ({ fetchContacts, handleClose, currentContact }) => {
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: '',
    jobTitle: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentContact) {
      setContact(currentContact);
    }
  }, [currentContact]);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    return /^\d{10}$/.test(phoneNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Frontend validation
    if (!validateEmail(contact.email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!validatePhoneNumber(contact.phoneNumber)) {
      setError('Phone number must be 10 digits');
      return;
    }

    try {
      if (currentContact) {
        await axios.put(`/api/contacts/${currentContact._id}`, contact);
      } else {
        await axios.post('/api/contacts', contact);
      }
      fetchContacts();
      handleClose();
      setContact({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        company: '',
        jobTitle: ''
      });
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {error && <Alert severity="error">{error}</Alert>}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="firstName"
            label="First Name"
            value={contact.firstName}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="lastName"
            label="Last Name"
            value={contact.lastName}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="email"
            label="Email"
            value={contact.email}
            onChange={handleChange}
            fullWidth
            required
            error={!validateEmail(contact.email) && contact.email !== ''}
            helperText={!validateEmail(contact.email) && contact.email !== '' ? 'Enter a valid email' : ''}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="phoneNumber"
            label="Phone Number"
            value={contact.phoneNumber}
            onChange={handleChange}
            fullWidth
            required
            error={!validatePhoneNumber(contact.phoneNumber) && contact.phoneNumber !== ''}
            helperText={!validatePhoneNumber(contact.phoneNumber) && contact.phoneNumber !== '' ? 'Phone number must be 10 digits' : ''}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="company"
            label="Company"
            value={contact.company}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="jobTitle"
            label="Job Title"
            value={contact.jobTitle}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {currentContact ? 'Update Contact' : 'Add Contact'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ContactForm;
