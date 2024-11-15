import React, { useState, useEffect } from 'react';
import { Button, Container, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import ContactForm from './ContactForm';
import ContactsTable from './ContactsTable';
import axios from 'axios';
import './App.css';  

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);

  const fetchContacts = async () => {
    const response = await axios.get('/api/contacts');
    setContacts(response.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleClickOpen = (contact = null) => {
    setCurrentContact(contact);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentContact(null);
  };

  return (
    <Container className="container">
      <Typography 
        variant="h4" 
        gutterBottom 
        className="centerHeading"
      >
        Contact Management System
      </Typography>
      <div className="centerButton">
        <Button variant="contained" color="primary" onClick={() => handleClickOpen()}>
          Create Contact
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentContact ? 'Edit Contact' : 'Create Contact'}</DialogTitle>
        <DialogContent>
          <ContactForm fetchContacts={fetchContacts} handleClose={handleClose} currentContact={currentContact} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <ContactsTable contacts={contacts} fetchContacts={fetchContacts} handleClickOpen={handleClickOpen} />
    </Container>
  );
};

export default App;
