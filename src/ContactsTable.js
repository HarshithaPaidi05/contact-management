import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Paper,
  Button
} from '@mui/material';
import axios from 'axios';

const ContactsTable = ({ contacts, fetchContacts, handleClickOpen }) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('firstName');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      fetchContacts();
    } catch (error) {
      console.error("There was an error deleting the contact:", error);
    }
  };

  const sortedContacts = contacts.sort((a, b) => {
    if (orderBy) {
      return (order === 'asc' ? 1 : -1) * (a[orderBy] < b[orderBy] ? -1 : 1);
    }
    return 0;
  });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'firstName'}
                direction={orderBy === 'firstName' ? order : 'asc'}
                onClick={(event) => handleRequestSort(event, 'firstName')}
              >
                First Name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'lastName'}
                direction={orderBy === 'lastName' ? order : 'asc'}
                onClick={(event) => handleRequestSort(event, 'lastName')}
              >
                Last Name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'email'}
                direction={orderBy === 'email' ? order : 'asc'}
                onClick={(event) => handleRequestSort(event, 'email')}
              >
                Email
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'phoneNumber'}
                direction={orderBy === 'phoneNumber' ? order : 'asc'}
                onClick={(event) => handleRequestSort(event, 'phoneNumber')}
              >
                Phone Number
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'company'}
                direction={orderBy === 'company' ? order : 'asc'}
                onClick={(event) => handleRequestSort(event, 'company')}
              >
                Company
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'jobTitle'}
                direction={orderBy === 'jobTitle' ? order : 'asc'}
                onClick={(event) => handleRequestSort(event, 'jobTitle')}
              >
                Job Title
              </TableSortLabel>
            </TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedContacts
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((contact) => (
              <TableRow key={contact._id}>
                <TableCell>{contact.firstName}</TableCell>
                <TableCell>{contact.lastName}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phoneNumber}</TableCell>
                <TableCell>{contact.company}</TableCell>
                <TableCell>{contact.jobTitle}</TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => handleClickOpen(contact)}>Edit</Button>
                  <Button color="secondary" onClick={() => handleDelete(contact._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={contacts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default ContactsTable;
