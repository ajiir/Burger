import React, { Component } from "react"
import { connect } from "react-redux"
import css from "./style.module.css"
import Button from "../../components/General/Button"
import { bindActionCreators } from "redux"
import * as actions from "../../redux/actions/loginActions"
import Spinner from "../../components/General/Spinner"
import { Redirect } from "react-router-dom"

class Login extends Component {
    state = {
        email: "",
        password: "",
    }

    changeEmail = (e) => {
        this.setState({ email: e.target.value })
    }

    changePassword = (e) => {
        this.setState({ password: e.target.value })
    }



    login = () => {
        this.props.login(this.state.email, this.state.password)
    }

    render() {
        return <div className={css.Login}>
            {this.props.userId && <Redirect to="/orders" />}
            <input onChange={this.changeEmail} type="text" placeholder="Имэйл хаяг"></input>
            <input onChange={this.changePassword} type="password" placeholder="Нууц үг"></input>
            {this.props.logginIn && <Spinner />}
            {this.props.firebaseError && <div style={{ color: "red" }}>{this.props.firebaseError} Код нь : {this.props.firebaseErrorCode}</div>}
            <Button text="НЭВТРЭХ" btnType="Success" daragdsan={this.login} />
        </div>
    }
}

const mapStateToProps = state => {
    return {
        logginIn: state.signUpReducer.logginIn,
        firebaseError: state.signUpReducer.firebaseError,
        firebaseErrorCode: state.signUpReducer.firebaseErrorCode,
        userId: state.signUpReducer.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (email, password) => dispatch(actions.loginUser(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)