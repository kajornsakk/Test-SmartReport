import React, { Component, useState } from 'react'
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import Auth from '@aws-amplify/auth';

export default class Navbar extends Component {

  render() {
    // const [loggedin, setLoggedIn] = useState(false);
    const signOut = async () => {
      try {
        await Auth.signOut();
      } catch (error) {
        console.log('error signing out:', error);
      }
    }

    return (
      <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            {/* <img src="hexal-logo.png" width="112" height="28" alt="hexal logo" /> */}
            <h2>SCI-TU Workload</h2>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a href="/" className="navbar-item">
              หน้าหลัก
            </a>
            <a href="/Upload_lecture" className="navbar-item">
              อัพโหลดข้อมูล
            </a>
            <a href="/Report" className="navbar-item">
              สร้างฟอร์มภาระงาน
            </a>
            {/* <a href="/TestS3" className="navbar-item">
              Test
            </a> */}
          </div>

          <div className="navbar-end">
            <div className="navbar-item">


              {this.props.auth.isAuthenticated && this.props.auth.user && (
                <p>
                  {this.props.auth.user.attributes.email}
                </p>
              )}

              <div className="buttons">
                {!this.props.auth.isAuthenticated && (
                  <div>
                    <a href="/register" className="button is-primary">
                      <strong>ลงทะเบียน</strong>
                    </a>
                    <a href="/login" className="button is-light" >
                      เข้าสู่ระบบ
                </a>
                  </div>
                )}
                {this.props.auth.isAuthenticated && (
                <a href="/">
                  <button onClick={signOut} className="button is-light">
                    ออกจากระบบ
                  </button>
                </a>
                )}

              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
