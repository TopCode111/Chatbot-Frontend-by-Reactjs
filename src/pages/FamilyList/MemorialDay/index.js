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
import useAnniversaryAdd from "../../../hooks/anniversary/useAnniversaryAdd";
import { useGetAnniversary } from "../../../hooks/anniversary/useGetAnniversary";
import { interceptor } from "../../../utils/interceptor";
import { useAnniversaryUpdate } from "../../../hooks/anniversary/useAnniversaryUpdate";
import { useDeleteMember } from "../../../hooks/anniversary/useDelete";

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
export default function MemorialDay(props) {
  const { mutate: addMember } = useAnniversaryAdd();
  const { mutate: updateMember } = useAnniversaryUpdate();
  const { mutate: deleteMember } = useDeleteMember();
  const { data: Anniversary } = useGetAnniversary();
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setBirthday] = useState(new Date());
  const [status, setStatus] = useState(false);
  const [id, setId] = useState("1");

  const classes = useStyles();
  console.log("time==", moment(date).format("YYYY年MM月DD日"));

  const handleChange = (e) => {
    console.log("e=", e.target.value);
    if (e.target.name === "title") {
      setTitle(e.target.value);
    }
    
    if (e.target.name === "date") {
      setBirthday(e.target.value);
    }
  };

  const handleSave = () => {
    const newRow = {
      // id: rows.length + 1,
      title: title,
      date: moment(date).format("YYYY-MM-DD"),
    };
    addMember(newRow);
    
  };

  const handleDelete = (value) => {
    deleteMember(value.id);
  };

  const handleEdit = (value) => {
    let [y, m, d] = value.date.split("-");
    let newBirthday = new Date(y, parseInt(m) - 1, parseInt(d));
    console.log("val==========", y, m, d);
    setEdit(true);
    setId(value.id);
    setTitle(value.title);
    setBirthday(newBirthday);
    setStatus(true);
  };

  const handleUpdate = () => {
    const newRow = {
      id: id,
      title: title,
      date: moment(date).format("YYYY-MM-DD"),
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
                    name="title"
                    variant="outlined"
                    placeholder="記念日名"
                    value={title}
                    inputProps={{ style: { color: "white" } }}
                    onChange={handleChange}
                  ></TextField>
                </TableCell>                
                
                <TableCell
                  align="center"
                  style={{
                    borderBottom: "1px solid #4472c4",
                    padding: "8px 2px",
                    width: "180px",
                  }}
                >
                  <TextField
                    classes={{ root: classes.input1 }}
                    inputProps={{ style: { color: "white" } }}
                    className={classes.textField}
                    onChange={handleChange}
                    value={moment(date).format("YYYY-MM-DD")}
                    name="date"
                    id="date"
                    type="date"
                    variant="outlined"
                  />
                 
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
              {Anniversary &&
                Anniversary.map((row, index) => (
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
                      <Typography variant="h3">{row.title}</Typography>
                    </TableCell>                    
                    
                    <TableCell
                      align="center"
                      style={{
                        borderBottom: "1px solid #4472c4",
                        padding: "8px 2px",
                      }}
                    >
                      <Typography variant="h3">
                        {moment(row.date).format("YYYY年MM月DD日")}
                      </Typography>
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
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
