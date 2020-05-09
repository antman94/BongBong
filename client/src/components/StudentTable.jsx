import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
      display: 'flex',
    },
  },
  table: {
    minWidth: 400,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  formGroup: {
    border: '2px dotted black',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'coral'
  },
  submitBtnContainer: {
    marginLeft: 10,
  },
  inputField: {
    backgroundColor: 'white',
  }
 
}));


function createStudent(url, data) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}
function deleteStudent(_id) {
  
  return fetch('http://localhost:4000/students/'+ _id, {
    method: 'DELETE',

  });
}

/**
 * @desc Renders a table containing data fetched from a backend, with a form where user can
 * add new students to the table.
 * @author Ante Hellgren
 */
function StudentTable() {

  const [rows, setRows] = useState([]);

  const [inputValue, setInputValue] = useState({
    email: '',
    name: '',
    address: {
      street: '',
      zipcode: '',
      city: ''
    }
  });
  const classes = useStyles();

  // Inital get request
  useEffect(() => {
    fetch('http://localhost:4000/students')
      .then(response => response.json())
      .then(data => {
        setRows(data);
        
      });
  }, [])
  
  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell><h3 className={classes.header}>Name</h3></TableCell>
              <TableCell align="right"><h3 className={classes.header}>Email</h3></TableCell>
              <TableCell align="right"><h3 className={classes.header}>City</h3></TableCell>
              <TableCell align="right"><h3 className={classes.header}>Street</h3></TableCell>
              <TableCell align="right"><h3 className={classes.header}>Zip</h3></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index} id={index}>
                <TableCell>
                  <button style={{border:'none'}} onClick={(e) => {
                    deleteStudent(rows[index]._id)
                      .then((response) => {
                        if(response.status === 200)
                          // Removes row from table based on map index
                          document.getElementsByTagName('TBODY')[0]
                            .removeChild(document.getElementById(index));
                      })
                  }}>
                    <span className="material-icons MuiIcon-root">clear</span>
                  </button>
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.address && row.address.city}</TableCell>
                <TableCell align="right">{row.address && row.address.street}</TableCell>
                <TableCell align="right">{row.address && row.address.zipcode}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.formGroup}>
        <form className={classes.root} noValidate autoComplete="off">
            <TextField 
              className={classes.inputField}
              id="input-name" 
              label="Name" 
              name="name"
              variant="outlined" 
              onChange={(e) => setInputValue({
                ...inputValue,
                [e.target.name]: e.target.value
              })}/>
            <TextField 
              className={classes.inputField}
              id="input-email" 
              label="Email" 
              name="email"
              variant="outlined" 
              onChange={(e) => setInputValue({
                ...inputValue,
                [e.target.name]: e.target.value
              })}/>
            <TextField 
              className={classes.inputField}
              id="input-street" 
              label="Street" 
              name="street"
              variant="outlined" 
              onChange={(e) => setInputValue({
                ...inputValue,
                address: {
                  ...inputValue.address,
                  [e.target.name]: e.target.value
                }
              })}/>
            <TextField 
              className={classes.inputField}
              id="input-city" 
              label="City" 
              name="city"
              variant="outlined" 
              onChange={(e) => setInputValue({
                ...inputValue,
                address: {
                  ...inputValue.address,
                  [e.target.name]: e.target.value
                }
              })}/>
            <TextField 
              className={classes.inputField}
              id="input-zip" 
              label="Zipcode" 
              name="zipcode"
              variant="outlined" 
              onChange={(e) => setInputValue({
                ...inputValue,
                address: {
                  ...inputValue.address,
                  [e.target.name]: e.target.value
                }
              })}/>
          <div className={classes.submitBtnContainer}>
            <Button size="large" variant="contained" color="primary" onClick={(e) => {
              createStudent('http://localhost:4000/students', inputValue)
                .then(response => {
                  if(response.status === 201) 
                    setRows([...rows, inputValue])
                })
              e.preventDefault();
            }}>Create</Button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default StudentTable;