import React, { useContext, useEffect, useState } from "react";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme/index";
import Routes from "./route";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import UserDataProvider from './store/UserContext';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <UserDataProvider>
          <Routes />
        </UserDataProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
