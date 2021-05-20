import React, { Component, Fragment } from 'react'
import { Auth } from "aws-amplify";

export default class ConfirmSingUp extends Component {

    state = {
        confirmCode: "",
        email: ""
    }
    handleSubmit = async event => {
        try {
            const res = await Auth.confirmSignUp(this.state.email, this.state.confirmCode);
            console.log(res);
            this.props.history.push("/");
        } catch (error) {
            console.log('error confirming sign up', error);
        }
    }

    onChangeCode = (e) => {
        this.setState({ confirmCode: e.target.value });
    }
    onChangeEmail = (e) => {
        this.setState({ email: e.target.value });
    }

    render() {
        return (
            <div>
                <section className="section auth">
                    <div className="container">
                        <h1>ยืนยันการลงทะเบียน</h1>
                        <p>
                            โปรดป้อนที่อยู่อีเมล และรหัสยืนยันที่ระบบส่งอีเมลให้คุณ
                        </p>
                        <form >

                            <div className="field">
                                <p className="control has-icons-left has-icons-right">
                                    <input
                                        className="input"
                                        type="email"
                                        placeholder="กรอกอีเมล"
                                        value={this.state.email}
                                        onChange={this.onChangeEmail}
                                    />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-envelope"></i>
                                    </span>
                                </p>
                            </div>

                            <div className="field">
                                <p className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        placeholder="กรอกรหัสยืนยัน"
                                        value={this.state.confirmCode}
                                        onChange={this.onChangeCode}
                                    />
                                </p>
                            </div>
                        </form>
                        <br></br>
                        <button className="button is-primary" onClick={this.handleSubmit}>
                            ยืนยันการลงทะเบียน
                        </button>
                    </div>
                </section>

            </div>

        )
    }
}






{/* <div class="column is-one-quarter">
<div class="field">
    <label class="label">Email :</label>
</div>
<input
    class="input"
    type="text"
    placeholder=""
    value={this.state.email}
    onChange={this.onChangeEmail}>
</input>
</div>
<div class="column is-one-quarter">
<div class="field">
    <label class="label">conFirm Code :</label>
</div>
<input
    class="input"
    type="text"
    placeholder=""
    value={this.state.confirmCode}
    onChange={this.onChangeCode}>
</input>
</div> */}