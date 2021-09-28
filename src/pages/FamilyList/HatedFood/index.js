import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Input, Typography } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TextField from "@mui/material/TextField";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AdapterJalali from "@date-io/date-fns-jalali";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import moment from "moment";
import useFoodAdd from "../../../hooks/food/useFoodAdd";
import { useGetFood } from "../../../hooks/food/useGetFood";
import { interceptor } from "../../../utils/interceptor";
import { useFoodUpdate } from "../../../hooks/food/useFoodUpdate";
import { useDeleteMember } from "../../../hooks/food/useDelete";

const axiosInstance = interceptor();
const useStyles = makeStyles((theme) => ({
  root: { marginTop: "50px" },
  addText: { cursor: "pointer" },
  table: {
    marginTop: "5px",
  },
  textField: {
    [`& fieldset`]: {
      borderRadius: 0,
    },
    background: "#4472c4",
  },
  input: {
    width: "100px",
    "& input::placeholder": {
      color: "white",
      textOverflow: "ellipsis !important",
    },
  },
  input1: {
    width: "180px",
    "& input::placeholder": {
      color: "white",
      textOverflow: "ellipsis !important",
    },
  },
  input2: {
    width: "60px",
    "& input::placeholder": {
      color: "white",
      textOverflow: "ellipsis !important",
    },
  },
}));
export default function FavorFood(props) {
  const { mutate: addMember } = useFoodAdd();
  const { mutate: updateMember } = useFoodUpdate();
  const { mutate: deleteMember } = useDeleteMember();
  const { data: foods } = useGetFood();
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  
  const [status, setStatus] = useState(false);
  const [id, setId] = useState("1");
  const classes = useStyles();

  const handleChange = (e) => {
    console.log("e=", e.target.value);
    if (e.target.name === "name") {
      setName(e.target.value);
    }
      
  };

  const handleSave = () => {
    const newRow = {
      // id: rows.length + 1,
      name: name,      
      likeornot: "false",
    };
    addMember(newRow);
  };

  const handleDelete = (value) => {
    deleteMember(value.id);
  };

  const handleEdit = (value) => {
    setEdit(true);
    setId(value.id);
    setName(value.name);
    setStatus(true);
  };

  const handleUpdate = () => {
    const newRow = {
      id: id,
      name: name,
    };
    updateMember(newRow);
  };
  var number = 0;
  return (
    <div className={classes.root}>
      <Typography
        variant="h3"
        style={{ color: edit ? "blue" : "black" }}
        onClick={() => setEdit(!edit)}
        className={classes.addText}
      >
        ⊕追加
      </Typography>
      <div className={classes.table}>
        <TableContainer>
          <Table
            classes={{ root: classes.customTable }}
            id="customTable"
            className={classes.table}
            aria-label="simple table"
          >
            <TableHead style={{ visibility: edit ? "visible" : "hidden" }}>
              <TableRow>
                <TableCell
                  align="center"
                  style={{
                    padding: "8px 2px",
                    visibility: "hidden",
                    borderBottom: "1px solid #4472c4",
                  }}
                >
                  D
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    borderBottom: "1px solid #4472c4",
                    padding: "8px 2px",
                    width: "100px",
                  }}
                >
                  <TextField
                    classes={{ root: classes.input }}
                    className={classes.textField}
                    name="name"
                    variant="outlined"
                    placeholder="名前"
                    value={name}
                    inputProps={{ style: { color: "white" } }}
                    onChange={handleChange}
                  ></TextField>
                </TableCell>                
                                
                <TableCell align="center" style={{ borderBottom: "none" }}>
                  <Button
                    style={{
                      backgroundColor: "#4472c4",
                      color: "#e5f2fc",
                      borderRadius: "0px",
                      width: "100px",
                      padding: "14px",
                    }}
                    onClick={!status ? handleSave : handleUpdate}
                    variant="contained"
                  >
                    {" "}
                    保管{" "}
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {foods &&
                foods.map((row, index) => (
                  row.likeornot == false ? (
                  <TableRow key={index}>
                    <TableCell
                      align="right"
                      style={{
                        borderBottom: "1px solid #4472c4",
                        padding: "8px 2px",
                      }}
                    >
                      <Typography variant="h3">{number == 0 ? number = 1 : number = number +1}.</Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        borderBottom: "1px solid #4472c4",
                        padding: "8px 2px",
                      }}
                    >
                      <Typography variant="h3">{row.name}</Typography>
                    </TableCell>
                                     
                    <TableCell
                      align="center"
                      style={{ borderBottom: "none", padding: "8px 2px" }}
                    >
                      <Grid container justify="center">
                        <Typography
                          onClick={() => handleEdit(row)}
                          style={{
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                        >
                          編集
                        </Typography>
                        <Typography
                          onClick={() => handleDelete(row)}
                          style={{
                            marginLeft: "6px",
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                        >
                          削除
                        </Typography>
                      </Grid>
                    </TableCell>
                  </TableRow>
                  )
                  : (
                    ""
                  )
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
