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
import useFamilyMemberAdd from "../../../hooks/family/useFamilyMemberAdd";
import { useGetFamilyMembers } from "../../../hooks/family/useGetFamilyMembers";
import { interceptor } from "../../../utils/interceptor";
import { useFamilyUpdate } from "../../../hooks/family/useFamilyUpdate";
import { useDeleteMember } from "../../../hooks/family/useDeleteMember";

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

export default function FamilyContent() {
  const { mutate: addMember } = useFamilyMemberAdd();
  const { mutate: updateMember } = useFamilyUpdate();
  const { mutate: deleteMember } = useDeleteMember();
  const { data: familyMembers } = useGetFamilyMembers();
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [type, settype] = useState("");
  const [age, setAge] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [status, setStatus] = useState(false);
  const [id, setId] = useState("1");
  // useEffect(() => {
  //   useGetFamilyMembers();
  //   // const request = axiosInstance
  //   //   .get("/api/family/member-view/")
  //   //   .then((res) => set)
  //   //   .catch((err) => console.log(err));
  // }, [useGetFamilyMembers]);

  const classes = useStyles();
  console.log("time==", moment(birthday).format("YYYY年MM月DD日生"));

  const handleChange = (e) => {
    console.log("e=", e.target.value);
    if (e.target.name === "name") {
      setName(e.target.value);
    }
    if (e.target.name === "age") {
      setAge(e.target.value);
    }
    if (e.target.name === "type") {
      settype(e.target.value);
    }
    if (e.target.name === "birthday") {
      setBirthday(e.target.value);
    }
  };

  const handleSave = () => {
    const newRow = {
      // id: rows.length + 1,
      name: name,
      type: type,
      age: age,
      birthday: moment(birthday).format("YYYY-MM-DD"),
    };
    addMember(newRow);
    // const tempRow = [...rows, newRow];
    // setRows(tempRow);
    // setName("");
    // setAge("");
    // settype("");
    // setBirthday("");
    // setEdit(false);
    // console.log("temprow====", rows);
  };

  const handleDelete = (value) => {
    deleteMember(value.id);
  };

  const handleEdit = (value) => {
    let [y, m, d] = value.birthday.split("-");
    let newBirthday = new Date(y, parseInt(m) - 1, parseInt(d));
    console.log("val==========", y, m, d);
    setEdit(true);
    setId(value.id);
    setName(value.name);
    setAge(value.age);
    settype(value.type);
    setBirthday(newBirthday);
    setStatus(true);
  };

  const handleUpdate = () => {
    const newRow = {
      id: id,
      name: name,
      age: age,
      birthday: moment(birthday).format("YYYY-MM-DD"),
      type: type,
    };
    updateMember(newRow);
    //   const tempRows = rows.splice(id, 1, newRow);
    // rows[id - 1] = newRow;
    // setRows([...rows]);
    // setName("");
    // setAge("");
    // settype("");
    // setBirthday("");
    // setEdit(false);
    // setStatus(false);
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
                <TableCell
                  align="center"
                  style={{
                    borderBottom: "1px solid #4472c4",
                    padding: "8px 2px",
                    width: "120px",
                  }}
                >
                  <TextField
                    classes={{ root: classes.input }}
                    inputProps={{ style: { color: "white" } }}
                    className={classes.textField}
                    name="type"
                    placeholder="家族属性"
                    variant="outlined"
                    value={type}
                    onChange={handleChange}
                  ></TextField>
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    borderBottom: "1px solid #4472c4",
                    padding: "8px 2px",
                    width: "60px",
                  }}
                >
                  <TextField
                    classes={{ root: classes.input2 }}
                    inputProps={{ style: { color: "white" } }}
                    className={classes.textField}
                    name="age"
                    placeholder="年齢"
                    variant="outlined"
                    value={age}
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
                    value={moment(birthday).format("YYYY-MM-DD")}
                    name="birthday"
                    id="date"
                    type="date"
                    variant="outlined"
                  />
                  {/* <TextField
                    classes={{
                      root: classes.input1,
                    }}
                    inputProps={{ style: { color: "white" } }}
                    className={classes.textField}
                    name="birthday"
                    placeholder="誕生日"
                    variant="outlined"
                    size="small"
                    value={birthday}
                    onChange={handleChange}
                  ></TextField> */}
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
              {familyMembers &&
                familyMembers.map((row, index) => (
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
                      style={{
                        borderBottom: "1px solid #4472c4",
                        padding: "8px 2px",
                      }}
                    >
                      <Typography variant="h3">{row.type}</Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        borderBottom: "1px solid #4472c4",
                        padding: "8px 2px",
                      }}
                    >
                      <Typography variant="h3">{row.age}歳</Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        borderBottom: "1px solid #4472c4",
                        padding: "8px 2px",
                      }}
                    >
                      <Typography variant="h3">
                        {moment(row.birthday).format("YYYY年MM月DD日生")}
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
