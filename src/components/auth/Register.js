import React, { Component } from 'react';
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";
import { Auth } from "aws-amplify";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    phone: "",
    confirmCode: "",
    confirmpassword: "",
    errors: {
      cognito: null,
      blankfield: false,
      passwordmatch: false
    }
  }

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false,
        passwordmatch: false
      }
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    // Form validation
    this.clearErrorState();
    const error = Validate(event, this.state);
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error }
      });
    }

    // AWS Cognito integration here
    const { username, email, password, phone } = this.state;
    try {
      const signUpResponse = await Auth.signUp({
        username,
        password,
        attributes: {
          email: email
        }
      });
      console.log(signUpResponse);
      this.props.history.push("/ConfirmSingUp");
    } catch (error) {
      console.log('error signing up:', error);
    }

  };

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  }

  render() {
    return (
      <section className="section auth">
        <div className="container">
          <h1>ลงทะเบียน</h1>
          <FormErrors formerrors={this.state.errors} />

          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <p className="control">
                <input
                  className="input"
                  type="text"
                  id="username"
                  aria-describedby="userNameHelp"
                  placeholder="อีเมล"
                  value={this.state.username}
                  onChange={this.onInputChange}
                />
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="email"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="ยืนยันอีเมล"
                  value={this.state.email}
                  onChange={this.onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  id="password"
                  placeholder="รหัสผ่าน"
                  value={this.state.password}
                  onChange={this.onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  id="confirmpassword"
                  placeholder="ยืนยันรหัสผ่าน"
                  value={this.state.confirmpassword}
                  onChange={this.onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>

            <div className="field">
              <p className="control">
                <a href="/ConfirmSingUp">Confirm Code</a>
              </p>
            </div>

            <div className="field">
              <p className="control">
                <a href="/forgotpassword">ลืมรหัสผ่าน?</a>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button className="button is-primary">
                  ลงทะเบียน
                </button>
              </p>
            </div>
          </form>
        </div>






      </section>


    );
  }
}

export default Register;