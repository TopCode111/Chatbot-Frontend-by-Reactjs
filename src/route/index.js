import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "../route/middleware";
import Layout from "../components/Layout/MainLayout";
import AuthLayout from "../components/Layout/AuthLayout";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import Home from "../pages/Home";
import Users from "../pages/userData";
import Profile from "../pages/Profile";
import ForgetPassword from "../pages/Forgetpassword";
import ResetPassword from "../pages/ResetPassword";
import ChatPage from "../pages/ChatBot";
import FamilyList from "../pages/FamilyList";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path={`/login`}>
          <AuthLayout>
            <Login />
          </AuthLayout>
        </Route>
        <Route path={`/forgetpassword`}>
          <AuthLayout>
            <ForgetPassword />
          </AuthLayout>
        </Route>
        <Route path={`/resetpassword/:token`}>
          <AuthLayout>
            <ResetPassword />
          </AuthLayout>
        </Route>
        <Route path={`/signup`}>
          <AuthLayout>
            <Registration />
          </AuthLayout>
        </Route>
        <Route path={`/`} exact>
          <Layout>{/* <Home /> */}</Layout>
        </Route>
        <ProtectedRoute path={`/chat`} layout={Layout} exact>
          <ChatPage />
        </ProtectedRoute>
        <Route path={`/users`} exact>
          <Layout>
            <Users />
          </Layout>
        </Route>
        <ProtectedRoute path={`/profile`}>
          <Layout>
            <Profile />
          </Layout>
        </ProtectedRoute>
        <ProtectedRoute path={`/familypage`}>
          <Layout>
            <FamilyList />
          </Layout>
        </ProtectedRoute>
        {/* <ProtectedRoute>
          <h4> Not Found </h4>
        </ProtectedRoute> */}
      </Switch>
    </Router>
  );
};

export default Routes;
