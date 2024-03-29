import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { useUserContext } from "../store/UserContext";
import LocalStorageService from "../utils/localStorageService";
const localStorageService = LocalStorageService.getService();

const RouteMiddleWare = ({ children, layout: Layout, ...rest }) => {
  const { authData, authStatus } = useUserContext();
  const isValid = authData;
  const isLoading = (authStatus === 'idle' || authStatus === 'pending');
  console.log(authData, authStatus)
  return (
    <>
      { isLoading
        ?
          <div>Loading</div>
        :
          <Route
            {...rest}
            render={({ location }) =>
              isValid ? (
                Layout ? (
                  <Layout>{children}</Layout>
                ) : (
                  <> {children} </>
                )
              ) : (
                <Redirect
                  to={{
                    pathname: "/login",
                    state: { from: location },
                  }}
                />
              )
            }
          />
      }
    </>
  );
};
export default RouteMiddleWare;
