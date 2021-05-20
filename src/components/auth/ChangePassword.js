import React, { Component } from 'react';
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";
import { Auth } from "aws-amplify";

class ChangePassword extends Component {
  state = {
    oldpassword: "",
    newpassword: "",
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
    try{
      const user = await Auth.currentAuthenticatedUser();
      console.log(user);
      await Auth.changePassword(
        user,
        this.state.oldpassword,
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
  }

  render() {
    return (
      <section className="section auth">
        <div className="container">
          <h1>เปลี่ยนรหัสผ่าน</h1>
          <FormErrors formerrors={this.state.errors} />

          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <p className="control has-icons-left">
                <input 
                  className="input" 
                  type="password"
                  id="oldpassword"
                  placeholder="รหัสผ่าน"
                  value={this.state.oldpassword}
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
                <a href="/forgotpassword">ลืมรหัสผ่าน?</a>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button className="button is-success">
                  เปลี่ยนรหัสผ่าน
                </button>
              </p>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default ChangePassword;