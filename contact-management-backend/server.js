const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/contactsdb', { useNewUrlParser: true, useUnifiedTopology: true });

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Please enter a valid email address'] 
  },
  phoneNumber: { 
    type: String, 
    required: true, 
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v);
      },
      message: 'Phone number must be 10 digits'
    }
  },
  company: { type: String, required: true },
  jobTitle: { type: String, required: true }
});

const Contact = mongoose.model('Contact', contactSchema);

// Middleware for handling errors
const errorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  }
  if (err.code === 11000) {
    return res.status(400).json({ message: 'Duplicate entry detected' });
  }
  return res.status(500).json({ message: 'Internal server error' });
};

app.post('/api/contacts', async (req, res, next) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.send(contact);
  } catch (err) {
    next(err);
  }
});

app.get('/api/contacts', async (req, res) => {
  const contacts = await Contact.find();
  res.send(contacts);
});

app.put('/api/contacts/:id', async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.send(contact);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/contacts/:id', async (req, res, next) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.send({ message: 'Contact deleted' });
  } catch (err) {
    next(err);
  }
});

app.use(errorHandler);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
