import React, { Component } from "react";
import CSS from "./style.module.css";
import { Redirect } from "react-router-dom"
import { connect } from "react-redux"
import Toolbar from "../../components/ToolBar";
import BurgerPage from "../BurgerPage";
import Sidebar from "../../components/Sidebar";
import OrderPage from "../OrderPage";
import { Route, Switch } from "react-router-dom";
import ShippingPage from "../ShippingPage";
import LoginPage from "../LoginPage"
import SignUpPage from "../SignUpPage";
import Logout from "../../components/Logout";
import * as actions from "../../redux/actions/loginActions"
import * as signUpActions from "../../redux/actions/SignUpActions"



class App extends Component {
  state = {
    showSideBar: false,
  };

  toggleSideBar = () => {
    this.setState((prevState) => {
      return { showSideBar: !prevState.showSideBar };
    });
  };

  componentDidMount = () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const expireDate = new Date(localStorage.getItem('expireDate'));
    const refreshToken = localStorage.getItem('refreshToken');
    if (token) {
      if (expireDate > new Date()) {
        // Tokenii hugatsaa duusaagui baina. automat login hiine
        this.props.autoLogin(token, userId);
        // Token huchingui bolgohod uldej baigaa hugatsaag tootsoolj ter hugatsaanii daraa automataar logout hiine.
        this.props.autoLogOutAfterMillisec
          (expireDate.getTime() - new Date().getTime());
      } else {
        // Tokenii hugatsaa ni duussan baina. Logout hiine
        this.props.logout();
      }

    }
  }

  render() {
    return (
      <div>
        <Toolbar toggleSideBar={this.toggleSideBar} />
        <Sidebar
          showSidebar={this.state.showSideBar}
          toggleSidebar={this.toggleSideBar}
        />
        <main className={CSS.Content}>

          {this.props.userId ? <Switch>
            <Route path="/logout" component={Logout} />
            <Route path="/orders" component={OrderPage} />
            <Route path="/ship" component={ShippingPage} />
            <Route path="/" component={BurgerPage} />
          </Switch> :
            <Switch>
              <Route path="/signup" component={SignUpPage} />
              <Route path="/login" component={LoginPage} />
              <Redirect to="/login" />
            </Switch>
          }
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {

  return {
    userId: state.signUpReducer.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    autoLogin: (token, userId) => dispatch(actions.loginUserSuccess(token, userId)),
    logout: () => dispatch(signUpActions.logout()),
    autoLogOutAfterMillisec: () => dispatch(signUpActions.autoLogOutAfterMillisec())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
