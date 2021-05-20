import React, { Component } from "react";

class ChangePasswordConfirmation extends Component {
  render() {
    return (
      <section className="section auth">
        <div className="container">
          <h1>เปลี่ยนรหัสผ่านสำเร็จ</h1>
          <p>ระบบอัปเดตรหัสผ่านของคุณเรียบร้อยแล้ว!</p>
          <div className="field">
            <p className="control">
              <a href="/login">เข้าสู่ระบบ</a>
            </p>
          </div>
        </div>

      </section>
    );
  }
}

export default ChangePasswordConfirmation;