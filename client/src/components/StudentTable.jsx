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

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  table: {
    minWidth: 400,
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 20,
  },
 
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
 * @desc Renders a table containing data fetched from a backend
 * @author Ante 
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
              <TableCell><h3 className={classes.bold}>Name</h3></TableCell>
              <TableCell align="right"><h3 className={classes.bold}>Email</h3></TableCell>
              <TableCell align="right"><h3 className={classes.bold}>City</h3></TableCell>
              <TableCell align="right"><h3 className={classes.bold}>Street</h3></TableCell>
              <TableCell align="right"><h3 className={classes.bold}>Zip</h3></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
            {rows.map((row, index) => (
              <TableRow key={index} id={index}>
                <TableCell>
                  <button style={{border:'none'}} onClick={(e) => {
                    document.getElementsByTagName('TBODY')[0].removeChild(document.getElementById(index));
                    // Removes row from table based on map index
                    console.log(rows[index]._id)
                    deleteStudent(rows[index]._id)
                      .then((response) => console.log(response))

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
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField 
            id="input-name" 
            label="Name" 
            name="name"
            variant="outlined" 
            onChange={(e) => setInputValue({
              ...inputValue,
              [e.target.name]: e.target.value
            })}/>
          <TextField 
            id="input-email" 
            label="Email" 
            name="email"
            variant="outlined" 
            onChange={(e) => setInputValue({
              ...inputValue,
              [e.target.name]: e.target.value
            })}/>
        </div>
        <div>
          <TextField 
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
        </div>
        <button onClick={(e) => {
          createStudent('http://localhost:4000/students', inputValue)
            .then(response => {
              if(response.status == 201) 
                setRows([...rows, inputValue])
            })
          e.preventDefault();
        }}>Create</button>
      </form>
    </React.Fragment>
  );
}

export default StudentTable;