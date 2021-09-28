import React, { useEffect } from "react";
import { useFetchAllUsers } from "../../hooks/users/useUsers";
import Table from "./table";
import LocalStorageService from "../../utils/localStorageService";
import "./style.css";
import "./style.css";
import { Redirect } from 'react-router-dom'

export default function Users() {
  const { data } = useFetchAllUsers();
  const localStorageService = LocalStorageService.getService();
  const getCurrentUser = localStorageService.getCurrentUser() ? localStorageService.getCurrentUser() : "";
  
  const is_superuser = getCurrentUser.is_superuser;
  return (
    <>
      {
        is_superuser && is_superuser == true ? <Table data={data} />
          : <Redirect to='/' />
      }
    </>
  );
}
