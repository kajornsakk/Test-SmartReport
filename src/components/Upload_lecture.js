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
    showUploadBachelor: true,
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
              <span class="is-size-4 has-text-primary">
                อัปโหลดข้อมูลภาระงานสอน
              </span>
              <div class="card ">
                <div class="card-content ">
                  <section class="section is-small ">
                  <div class="field is-horizontal">
                        <div class="field-label">
                            <label class="label">ระดับการศึกษา: </label>
                        </div>
                        <div class="field-body">
                            <div class="field ">
                                <div class="control">
                                    <label class="radio">
                                        <input type="radio" name="member" onChange={this.handleRadiosBachelor} />
                                            ปริญญาตรี
                                    </label>
                                </div>
                            </div>
                            <div class="field ">
                                <div class="control">
                                    <label class="radio">
                                        <input type="radio" name="member" onChange={this.handleRadiosMaster}/>
                                            ปริญญาโท
                                    </label>
                                </div>
                            </div>
                            <div class="field ">
                                <div class="control">
                                    <label class="radio">
                                        <input type="radio" name="member" onChange={this.handleRadiosDoctor}/>
                                            ปริญญาเอก
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div class="columns is-multiline">
                      <div class="column is-one-quarter"></div>

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
                    </div> */}

                    {this.state.showUploadBachelor && <UploadLectureBachelor />}
                    {this.state.showUploadMaster && <UploadLectureMaster />}
                    {this.state.showUploadDoctor && <UploadLectureDoctor />}

                    {/* </div> */}

                  </section>
                  {/* </div> */}
                </div>
              </div>
            </div>
            <div class="column"></div>
          </div>


          {/*  */}
          {/* <article class="message is-primary">
            <div class="message-body">
              <strong>
                Format ไฟล์ข้อมูลถูกต้องสามารถอัปโหลดไฟล์ข้อมูลได้
              </strong>
            </div>
          </article> */}
          {/*  */}


        </div>


      </Fragment>


    )
  }
}
