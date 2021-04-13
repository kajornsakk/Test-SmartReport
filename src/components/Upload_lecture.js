import React, { Component, Fragment } from 'react';
import Product from './Product';
import Upload_academy from './Upload_academy';
import axios from "axios";
import * as XLSX from 'xlsx';
import moment from 'moment';
import Amplify,{ Storage } from 'aws-amplify'

const config = require('../config.json');


export default class Upload_lecture extends Component {

  constructor(props) {
    super(props);
    this.state = {
      year: '',
      semester: '',
      department: '',
      version: '',
      educationlevel: '',
    }

    this.onChangeYear = this.onChangeYear.bind(this);
    this.onChangeSemester = this.onChangeSemester.bind(this);
    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.onChangeVersion = this.onChangeVersion.bind(this);
    this.onChangeEducationLevel = this.onChangeEducationLevel.bind(this);
  }

  state = { fileUrl: '', file: '', filename: '' }
  state = {
    chack: false
}

  onChangeYear = (e) => {
    this.setState({ year: e.target.value })
  }
  onChangeSemester = (e) => {
    this.setState({ semester: e.target.value })
  }
  onChangeDepartment = (e) => {
    this.setState({ department: e.target.value })
  }
  onChangeVersion = (e) => {
    this.setState({ version: e.target.value })
  }
  onChangeEducationLevel = (e) => {
    this.setState({ educationlevel: e.target.value })
  }

  handleChange = e => {
    const file = e.target.files[0]
    this.setState({
      fileUrl: URL.createObjectURL(file),
      file,
      filename: file.name
    })
    this.readExcel(file);

  }

  readExcel = (file) => {

    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        //   ws['!ref'] = "A1:T6";
        //   const data = XLSX.utils.sheet_to_json(ws);

        resolve(ws);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {

      if (this.state.educationlevel === 'ปริญญาตรี') {

        if (this.state.version === 'วิชาบรรยาย-วิชาปฏิบัติ') {

          var buffer = (d.A3.v).split(" ");
          var buffer2 = buffer[1].split("/");
          var DepartmentFromFile = ((d.A1.v).split(" "))[1];
          var SemesterFromFile = buffer2[0];
          var YearFromFile = buffer2[1];
          var LectureFromFile = ((d.P5.v).split(" ", 1))[0];
          var PracticeFromFile = ((d.Q5.v).split(" ", 1))[0];

          if (DepartmentFromFile === this.state.department && LectureFromFile === 'บรรยาย' && PracticeFromFile === 'ปฏิบัติ'
            && SemesterFromFile === this.state.semester && YearFromFile === this.state.year) {
            this.setState({ chack: true })
            alert('Good!! (ป.ตรี บรรยาย/ปฏิบัติ) --> Format ถูกต้องสามารถอัปโหลดข้อมูลได้');
          }
          else {
            var text_alert = "";
            if (DepartmentFromFile !== this.state.department) {
              text_alert = text_alert + "!! สาขาวิชาไม่ตรงกับข้อมูลนำเข้า โปรดเลือกสาขาวิชาใหม่\n";
              this.setState({ department: '' })
            }
            if (LectureFromFile !== 'บรรยาย' && PracticeFromFile !== 'ปฏิบัติ') {
              text_alert = text_alert + "!! ประเภทไม่ตรงกับข้อมูลนำเข้า \n";
              this.setState({ version: '' })
            }
            if (SemesterFromFile !== this.state.semester) {
              text_alert = text_alert + "!! ภาคการศึกษาไม่ตรงกับข้อมูลนำเข้า \n"
              this.setState({ semester: '' })
            }
            if (YearFromFile !== this.state.year) {
              text_alert = text_alert + "!! ปีการศึกษาไม่ตรงกับข้อมูลนำเข้า \n"
              this.setState({ year: '' })
            }
            alert(text_alert);

          }
        }
        else if (this.state.version === 'ซีเนียร์โปรเจค-ปัญหาพิเศษ-สัมมนา') {

          var buffer = (d.A3.v).split(" ");
          var buffer2 = buffer[1].split("/");
          var DepartmentFromFile = ((d.A1.v).split(" "))[1];
          var SemesterFromFile = buffer2[0];
          var YearFromFile = buffer2[1];
          var bufferSeniorproject = (d.N5.v).split("/");
          var SeminarFromFile = d.Q5.v;
          var Seniorproject_SeminarFromFile = bufferSeniorproject[0] + "-" + bufferSeniorproject[1] + "-" + d.Q5.v + "";

          console.log(bufferSeniorproject);
          console.log(Seniorproject_SeminarFromFile);
          console.log(SeminarFromFile);

          if (DepartmentFromFile === this.state.department && YearFromFile === this.state.year && SemesterFromFile === this.state.semester && bufferSeniorproject[0] === 'ซีเนียร์โปรเจค') {
            this.setState({ chack: true })
            alert('Good!! (ป.ตรี ซีเนียร์โปรเจค-ปัญหาพิเศษ-สัมมนา) --> Format ถูกต้องสามารถอัปโหลดข้อมูลได้');
          }
          else {
            var text_alert = "";
            if (DepartmentFromFile !== this.state.department) {
              text_alert = text_alert + "!! สาขาวิชาไม่ตรงกับข้อมูลนำเข้า \n";
              this.setState({ department: '' })
            }
            if (bufferSeniorproject[0] !== 'ซีเนียร์โปรเจค') {
              text_alert = text_alert + "!! ประเภทไม่ตรงกับข้อมูลนำเข้า \n";
              this.setState({ version: '' })
            }
            if (SemesterFromFile !== this.state.semester) {
              text_alert = text_alert + "!! ภาคการศึกษาไม่ตรงกับข้อมูลนำเข้า \n"
              this.setState({ semester: '' })
            }
            if (YearFromFile !== this.state.year) {
              text_alert = text_alert + "!! ปีการศึกษาไม่ตรงกับข้อมูลนำเข้า \n"
              this.setState({ year: '' })
            }
            alert(text_alert);
          }

        }
      }
      else if (this.state.educationlevel === 'ปริญญาโทและปริญญาเอก') {
        // alert(this.state.educationlevel)

        if (this.state.version === 'วิชาบรรยาย-วิชาปฏิบัติ') {

          var buffer = (d.A3.v).split(" ");
          var buffer2 = buffer[1].split("/");
          var DepartmentFromFile = ((d.A1.v).split(" "))[1];
          var SemesterFromFile = buffer2[0];
          var YearFromFile = buffer2[1];
          var LectureFromFile = ((d.P5.v).split(" ", 1))[0];
          var PracticeFromFile = ((d.Q5.v).split(" ", 1))[0];

          console.log(DepartmentFromFile);
          console.log(SemesterFromFile);
          console.log(YearFromFile);
          console.log(LectureFromFile);
          console.log(PracticeFromFile);

          if (DepartmentFromFile === this.state.department && LectureFromFile === 'บรรยาย' && PracticeFromFile === 'ปฏิบัติ'
            && SemesterFromFile === this.state.semester && YearFromFile === this.state.year) {
            this.setState({ chack: true })
            alert('Good!! (ป.โท เอก บรรยาย/ปฏิบัติ) --> Format ถูกต้องสามารถอัปโหลดข้อมูลได้');
          }
          else {
            var text_alert = "";
            if (DepartmentFromFile !== this.state.department) {
              text_alert = text_alert + "!! สาขาวิชาไม่ตรงกับข้อมูลนำเข้า โปรดเลือกสาขาวิชาใหม่\n";
              this.setState({ department: '' })
            }
            if (LectureFromFile !== 'บรรยาย' && PracticeFromFile !== 'ปฏิบัติ') {
              text_alert = text_alert + "!! ประเภทไม่ตรงกับข้อมูลนำเข้า \n";
              this.setState({ version: '' })
            }
            if (SemesterFromFile !== this.state.semester) {
              text_alert = text_alert + "!! ภาคการศึกษาไม่ตรงกับข้อมูลนำเข้า \n"
              this.setState({ semester: '' })
            }
            if (YearFromFile !== this.state.year) {
              text_alert = text_alert + "!! ปีการศึกษาไม่ตรงกับข้อมูลนำเข้า \n"
              this.setState({ year: '' })
            }
            alert(text_alert);

          }
        }

        if (this.state.version === 'วิทยานิพนธ์-สารนิพนธ์-ปัญหาพิเศษ-สัมมนา') {
          // alert(this.state.version)

          var buffer = (d.A4.v).split(" ");
          var buffer2 = buffer[1].split("/");
          var DepartmentFromFile = ((d.A2.v).split(" "))[1];
          var SemesterFromFile = buffer2[0];
          var YearFromFile = buffer2[1];
          var ThesisFromFile = d.I7.v;

          console.log(DepartmentFromFile);
          console.log(SemesterFromFile);
          console.log(YearFromFile);
          console.log(ThesisFromFile);

          if (this.state.department === DepartmentFromFile && 'วิทยานิ-พนธ์' === ThesisFromFile
            && this.state.year === YearFromFile && this.state.semester === SemesterFromFile) {

            this.setState({ chack: true })
            alert('Good!! (ป.โท เอก วิทยานิพนธ์) --> Format ถูกต้องสามารถอัปโหลดข้อมูลได้');
          }
          else {
            var text_alert = "";
            if (DepartmentFromFile !== this.state.department) {
              text_alert = text_alert + "!! สาขาวิชาไม่ตรงกับข้อมูลนำเข้า \n";
              this.setState({ department: '' })
            }
            if (ThesisFromFile !== 'วิทยานิ-พนธ์') {
              text_alert = text_alert + "!! ประเภทไม่ตรงกับข้อมูลนำเข้า \n";
              this.setState({ version: '' })
            }
            if (SemesterFromFile !== this.state.semester) {
              text_alert = text_alert + "!! ภาคการศึกษาไม่ตรงกับข้อมูลนำเข้า \n"
              this.setState({ semester: '' })
            }
            if (YearFromFile !== this.state.year) {
              text_alert = text_alert + "!! ปีการศึกษาไม่ตรงกับข้อมูลนำเข้า \n"
              this.setState({ year: '' })
            }
            alert(text_alert);
          }

        }
      }
    })
      .catch(err => {
        alert('Format ไฟล์ข้อมูลไม่ถูกต้อง!!');
      })

  }

  handleChange = e => {
    const file = e.target.files[0]
    this.setState({
      fileUrl: URL.createObjectURL(file),
      file,
      filename: file.name
    })
    this.readExcel(file);

  }

  saveFile = (e) => {

    Storage.put(this.filename,this.file)
      .then(()=>{
        console.log('sueccessfully saved file!');
        this.setState({fileUrl:'',file:'',filename:''})
      })
      .catch(err=>{
        console.log('error uploading file',err);
      })


    // const DASH_DMYHMS = 'DD-MM-YYYY HH:mm:ss';
    // const timeStamp = moment().format(DASH_DMYHMS);
    // var fileName = this.state.department + "/" + "ภาระงานสอน" + "/" + this.state.educationlevel + "/" + this.state.version + "/" +
    //   this.state.year + "_" + this.state.semester + "_" + this.state.department + "_" + this.state.version + "_" + timeStamp + ".xlsx";

    // if (this.state.chack) {
    //   Storage.put(fileName, this.state.file)
    //     .then(() => {
    //       console.log('Successfully save file!')
    //       alert('Successfully save file!');
    //       this.setState({ fileUrl: '', file: '', filename: '' })
    //       //this.state.filename;
    //       // e.preventDefault();
    //     })
    //     .catch(err => {
    //       console.log('error upload file!', err)
    //     })

    //   //เพิ่มาจากด้านล่าง
    //   this.setState({
    //     year: '',
    //     semester: '',
    //     department: '',
    //     version: '',
    //     educationlevel: '',
    //     chack: false,
    //   })

    // } else {
    //   alert('บันทึกไม่สำเสร็จ \n !! ข้อมูลไม่ถูกต้องโปรดตรวจสอบอีกครั้ง !!')
    // }

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
                <a>
                  <span class="icon is-small"><i class="far fa-file-alt" aria-hidden="true"></i></span>
                  <span>ประวัติอัปโหลดข้อมูล</span>
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
                            <div class="field">
                              <label class="label">สาขาวิชา :</label>
                            </div>

                            <div class="select" value={this.state.department} onChange={this.onChangeDepartment}>
                              <select>
                                <option>โปรดเลือก</option>
                                <option>สาขาวิชาวิทยาการคอมพิวเตอร์</option>
                                <option>สาขาวิชาฟิสิกส์</option>
                                <option>สาขาวิชาเคมี</option>
                                <option>สาขาวิชาเทคโนโลยีชีวภาพ</option>
                                <option>สาขาวิชาคณิตศาสตร์ประกันภัย</option>
                                <option>สาขาวิชาเทคโนโลยีการเกษตร</option>
                                <option>สาขาวิชาวิทยาศาสตร์สิ่งเเวดล้อม</option>
                                <option>สาขาวิชาเทคโนโลยีเพื่อการพัฒนายั่งยืน</option>
                                <option>สาขาวิชาวิทยาศาสตร์และเทคโนโลยีการอาหาร</option>
                                <option>สาขาวิชาเทคโนโลยีวัสดุและสิ่งทอ</option>
                              </select>
                            </div>

                          </div>

                          <div class="column is-one-quarter">
                            <div class="field">
                              <label class="label">ระดับการศึกษา :</label>
                            </div>

                            <div class="select" value={this.state.educationlevel} onChange={this.onChangeEducationLevel}>
                              <select>
                                <option>โปรดเลือก</option>
                                <option>ปริญญาตรี</option>
                                <option>ปริญญาโทและปริญญาเอก</option>
                              </select>
                            </div>
                          </div>

                          <div class="column is-one-quarter">
                            <div class="field">
                              <label class="label">ประเภท :</label>
                            </div>

                            <div class="select" value={this.state.version} onChange={this.onChangeVersion}>
                              <select>
                                <option>โปรดเลือก</option>
                                <option>วิชาบรรยาย-วิชาปฏิบัติ</option>
                                <option>ซีเนียร์โปรเจค-ปัญหาพิเศษ-สัมมนา</option>
                                <option>วิทยานิพนธ์-สารนิพนธ์-ปัญหาพิเศษ-สัมมนา</option>
                              </select>
                            </div>

                          </div>

                        </div>
                      </div>

                      <div class="container">
                        <div class="columns is-multiline is-centered">

                          <div class="column is-one-quarter">
                            <div class="field">
                              <label class="label">ปีการศึกษา :</label>
                            </div>

                            <input class="input" type="text" placeholder="25XX" value={this.state.year} onChange={this.onChangeYear}></input>
                          </div>

                          <div class="column is-one-quarter">
                            <div class="field">
                              <label class="label">ภาคการศึกษา :</label>
                            </div>

                            <div class="select" value={this.state.semester} onChange={this.onChangeSemester}>
                              <select>
                                <option>โปรดเลือก</option>
                                <option>1</option>
                                <option>2</option>
                              </select>
                            </div>
                          </div>

                        </div>
                      </div>

                      <div class="container">
                        <div class="columns is-multiline is-centered">
                          <div class="field">
                            <div class="column is-one-quarter">
                              <input type='file' className="selectfile" onChange={this.handleChange} />
                            </div>
                          </div>

                        </div>
                      </div>


                      <div class="container level-right">
                        <div class="columns is-multiline is-centered">
                          <div class="colum is-one-quarter">
                            <button class="button is-primary " onClick={this.saveFile}>
                              <span class="icon is-small">
                                <i class="fas fa-check"></i>
                              </span>
                              <span>อัพโหลดข้อมูล</span>
                            </button>
                          </div>
                        </div>
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
