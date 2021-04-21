import React, { Component, Fragment } from 'react';
import Product from './Product';
import Upload_academy from './Upload_academy';
import axios from "axios";
import * as XLSX from 'xlsx';
import moment from 'moment';
import Amplify, { Storage } from 'aws-amplify';
import UploadLectureBachelor from './UploadLectureBachelor';
import UploadLectureMaster from './UploadLectureMaster';
import UploadLectureDoctor from './UploadLectureDoctor';

const config = require('../config.json');


export default class Upload_lecture extends Component {


  state = {
    showUploadBachelor: false,
    showUploadMaster: false,
    showUploadDoctor: false
  }


  handleRadiosBachelor = () => {
    this.setState({ showUploadBachelor: true })
    this.setState({ showUploadMaster: false })
    this.setState({ showUploadDoctor: false })
  }
  handleRadiosMaster = () => {
    this.setState({ showUploadBachelor: false })
    this.setState({ showUploadMaster: true })
    this.setState({ showUploadDoctor: false })
  }
  handleRadiosDoctor = () => {
    this.setState({ showUploadBachelor: false })
    this.setState({ showUploadMaster: false })
    this.setState({ showUploadDoctor: true })
  }


  render() {
    return (

      <Fragment>
        <div className="box cta ">

          {/* Tabs */}
          <div class="tabs is-centered">
            <ul>
              <li class="is-active">
                <a>
                  <span class="icon is-small" ><i class="far fa-file-alt" aria-hidden="true"></i></span>
                  <span>อัปโหลดข้อมูลภาระงานสอน</span>
                </a>
              </li>

              <li >
                <a href="/Upload_academy" className="navbar-item" ><span class="icon is-small" ><i class="far fa-file-alt" aria-hidden="true"></i></span>
                     อัปโหลดข้อมูลผลงานวิชาการ
                </a>
              </li>

              <li>
                <a href="/Upload_History" className="navbar-item" ><span class="icon is-small" ><i class="far fa-file-alt" aria-hidden="true"></i></span>
                    ประวัติอัปโหลดข้อมูล
                </a>
              </li>
            </ul>
          </div>

          <div class="columns">
            <div class="column"></div>
            <div class="column is-four-fifths">

              <div class="card">

                <div class="card-content ">
                  <div class="content">
                    <section class="section is-small">
                      <div class="container">

                        <div class="columns is-multiline is-centered">

                          <div class="column is-one-quarter">
                            <label for="flexRadioDefault1">
                              <input type="radio" value="option1" name="flexRadioDefault" id="flexRadioDefault1"
                                onChange={this.handleRadiosBachelor} />ปริญญาตรี</label>
                          </div>

                          <div class="column is-one-quarter">
                            <label for="flexRadioDefault1">
                              <input type="radio" value="option2" name="flexRadioDefault" id="flexRadioDefault2"
                                onChange={this.handleRadiosMaster} />ปริญญาโท</label>
                          </div>

                          <div class="column is-one-quarter">
                            <label for="flexRadioDefault1">
                              <input type="radio" value="option2" name="flexRadioDefault" id="flexRadioDefault2"
                                onChange={this.handleRadiosDoctor} />ปริญญาเอก</label>
                          </div>

                        </div>

                        {this.state.showUploadBachelor && <UploadLectureBachelor />}
                        {this.state.showUploadMaster && <UploadLectureMaster />}
                        {this.state.showUploadDoctor && <UploadLectureDoctor />}

                      </div>

                    </section>
                  </div>
                </div>
              </div>
            </div>
            <div class="column"></div>
          </div>


        </div>


      </Fragment>


    )
  }
}
