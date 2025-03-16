import React from 'react'
import TextField from "@mui/material/TextField";
const Textfieldreuse = (props) => {
   
  return (
    <TextField
    autoComplete={props.autoComplete}
    name={props.name}
    placeholder={props.placeholder}
    margin={props.margin}
    required
    className={props.className}
    value={props.value}
    onChange={props.onChange}
    variant="outlined"
    type={props.type}
    size={props.size}
    multiline
    rows={props.rows}
    InputProps={props.InputProps}
    onKeyPress={props.onKeyPress}
  />
  )
}

export default Textfieldreuse


