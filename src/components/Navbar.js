import React, { Component } from 'react'
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src="hexal-logo.png" width="112" height="28" alt="hexal logo" />
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
            <a href="/TestS3" className="navbar-item">
              Test
            </a>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a href="/register" className="button is-primary">
                  <strong>ลงทะเบียน</strong>
                </a>
                <a href="/login" className="button is-light" >
                  ล๊อกเอาท์<AmplifySignOut />
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
