import React, { Component } from 'react';
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";
import { Auth } from "aws-amplify";

class ForgotPassword extends Component {
  state = {
    email: "",
    errors: {
      cognito: null,
      blankfield: false
    }
  }

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false
      }
    });
  }

  forgotPasswordHandler = async event => {
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
    try {
      await Auth.forgotPassword(this.state.email);
      this.props.history.push('/forgotPasswordVerification')
    } catch (error) {
      console.log(error);
    }

  }

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
          <h1>ลืมรหัสผ่านหรือไม่</h1>
          <p>
            โปรดป้อนที่อยู่อีเมลที่เชื่อมโยงกับบัญชีของคุณ
            ระบบจะส่งอีเมลลิงก์รีเซ็ตรหัสผ่านให้คุณ
          </p>
          <FormErrors formerrors={this.state.errors} />

          <form onSubmit={this.forgotPasswordHandler}>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  type="email"
                  className="input"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="กรอกอีเมล"
                  value={this.state.email}
                  onChange={this.onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </p>
            </div>
            {/* <div className="field">
              <p className="control">
                <a href="/forgotpassword">Forgot password?</a>
              </p>
            </div> */}
            <div className="field">
              <p className="control">
                <button className="button is-primary">
                  ยืนยัน
                </button>
              </p>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default ForgotPassword;