import React, { Component } from 'react';
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";
import { Auth } from "aws-amplify";

class ForgotPasswordVerification extends Component {
  state = {
    verificationcode: "",
    email: "",
    newpassword: "",
    errors: {
      cognito: null,
      blankfield: false
    }
  };

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false
      }
    });
  };

  passwordVerificationHandler = async event => {
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

    try{
      await Auth.forgotPasswordSubmit(
        this.state.email,
        this.state.verificationcode,
        this.state.newpassword
      );
      this.props.history.push("/changepasswordconfirmation");
    }catch(error){
      console.log(error);
    }

  };

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };

  render() {
    return (
      <section className="section auth">
        <div className="container">
          <h1>ตั้งค่ารหัสผ่านใหม่</h1>
          <p>
          โปรดป้อนรหัสยืนยันที่ส่งไปยังที่อยู่อีเมลของคุณด้านล่าง, กรอกที่อยู่อีเมลของคุณและรหัสผ่านใหม่
          </p>
          <FormErrors formerrors={this.state.errors} />

          <form onSubmit={this.passwordVerificationHandler}>
            <div className="field">
              <p className="control">
                <input
                  type="text"
                  className="input"
                  id="verificationcode"
                  aria-describedby="verificationCodeHelp"
                  placeholder="กรอกรหัสยืนยัน"
                  value={this.state.verificationcode}
                  onChange={this.onInputChange}
                />
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input 
                  className="input" 
                  type="email"
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
            <div className="field">
              <p className="control has-icons-left">
                <input
                  type="password"
                  className="input"
                  id="newpassword"
                  placeholder="รหัสผ่านใหม่"
                  value={this.state.newpassword}
                  onChange={this.onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>
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

export default ForgotPasswordVerification;