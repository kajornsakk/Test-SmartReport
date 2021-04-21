import React, { Component, Fragment } from 'react'
import * as XLSX from 'xlsx';
import moment from 'moment';
import Amplify, { Storage } from 'aws-amplify';

const config = require('../config.json');

export default class UploadLectureBachelor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: '',
            semester: '',
            department: '',
            course: '',
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
      onChangeCourse = (e) => {
        this.setState({ course: e.target.value })
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

            // if (this.state.educationlevel === 'ปริญญาตรี') {

                if (this.state.version === 'วิชาบรรยาย-วิชาปฏิบัติ') {

                    var buffer = (d.A3.v).split(" ");
                    var buffer2 = buffer[1].split("/");
                    var DepartmentFromFile = ((d.A1.v).split(" "))[1];
                    var SemesterFromFile = buffer2[0];
                    var YearFromFile = buffer2[1];
                    var LectureFromFile = ((d.P5.v).split(" ", 1))[0];
                    var PracticeFromFile = ((d.Q5.v).split(" ", 1))[0];
                    var CourseFromFile = d.D2.v;
                    var EducationFromFile = d.L2.v;
                    

                    if (DepartmentFromFile === this.state.department && LectureFromFile === 'บรรยาย' && PracticeFromFile === 'ปฏิบัติ'
                        && SemesterFromFile === this.state.semester && YearFromFile === this.state.year
                        && CourseFromFile === this.state.course && EducationFromFile === 'ปริญญาตรี') {
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
                        if (CourseFromFile !== this.state.course) {
                            text_alert = text_alert + "!! หลักสูตรไม่ตรงกับข้อมูลนำเข้า \n"
                            this.setState({ course: '' })
                        }
                        if (EducationFromFile !== 'ปริญญาตรี') {
                            text_alert = text_alert + "!! ระดับการศึกษาไม่ตรงกับข้อมูลนำเข้า \n"
                            this.setState({ educationlevel: '' })
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
                    var CourseFromFile = d.D2.v;
                    var EducationFromFile = d.L2.v;

                    console.log(bufferSeniorproject);
                    console.log(Seniorproject_SeminarFromFile);
                    console.log(SeminarFromFile);

                    if (DepartmentFromFile === this.state.department && YearFromFile === this.state.year && SemesterFromFile === this.state.semester && bufferSeniorproject[0] === 'ซีเนียร์โปรเจค'
                        && CourseFromFile === this.state.course && EducationFromFile === 'ปริญญาตรี') {
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
                        if (CourseFromFile !== this.state.course) {
                            text_alert = text_alert + "!! หลักสูตรไม่ตรงกับข้อมูลนำเข้า \n"
                            this.setState({ course: '' })
                        }
                        if (EducationFromFile !== 'ปริญญาตรี') {
                            text_alert = text_alert + "!! ระดับการศึกษาไม่ตรงกับข้อมูลนำเข้า \n"
                            this.setState({ educationlevel: '' })
                        }
                        alert(text_alert);
                    }

                }
            // }

        })
            .catch(err => {
                alert('Format ไฟล์ข้อมูลไม่ถูกต้อง!!');
            })
    }

    saveFile = (e) => {

        const DASH_DMYHMS = 'DD-MM-YYYY HH:mm:ss';
        const timeStamp = moment().format(DASH_DMYHMS);
        var fileName = this.state.department + "/" + "ภาระงานสอน" + "/ปริญญาตรี/" + this.state.course + "/" + this.state.version + "/" +
            this.state.year + "_" + this.state.semester + "_" + this.state.department + "_" + this.state.version + "_" + timeStamp + ".xlsx";

        if (this.state.chack) {
            Storage.put(fileName, this.state.file)
                .then(() => {
                    console.log('sueccessfully saved file!');
                    alert('Successfully save file!');
                    this.setState({ fileUrl: '', file: '', filename: '' })
                })
                .catch(err => {
                    console.log('error uploading file', err);
                })
        } else {
            alert('บันทึกไม่สำเสร็จ \n !! ข้อมูลไม่ถูกต้องโปรดตรวจสอบอีกครั้ง !!')
        }

    }

    render() {
        return (
            <Fragment>
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
                            <label class="label">หลักสูตร :</label>
                        </div>

                        <div class="select" value={this.state.course} onChange={this.onChangeCourse}>
                            <select>
                                <option>โปรดเลือก</option>
                                <option>วิทยาศาสตรบัณฑิต สาขาวิชาเคมี</option>
                                <option>วิทยาศาสตรบัณฑิต สาขาวิชาฟิสิกส์</option>
                                <option>วิทยาศาสตรบัณฑิต สาขาวิชาฟิสิกส์อิเล็กทรอนิกส์</option>
                                <option>วิทยาศาสตรบัณฑิต สาขาวิชาคณิตศาสตร์</option>
                                <option>วิทยาศาสตรบัณฑิต สาขาวิชาคณิตศาสตร์การจัดการ</option>
                                <option>วิทยาศาสตรบัณฑิต สาขาวิชาคณิตศาสตร์ประยุกต์</option>
                                <option>วิทยาศาสตรบัณฑิต สาขาวิชาวิทยาการประกันภัย</option>
                                <option>วิทยาศาสตรบัณฑิต สาขาวิชาสถิติ</option>
                                <option>วิทยาศาสตรบัณฑิต สาขาวิชาสถิติประยุกต์</option>
                                <option>วิทยาศาสตรบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์</option>
                                <option>วิทยาศาสตรบัณฑิต สาขาวิชาวิทยาศาสตร์สิ่งแวดล้อม</option>
                                <option>วิทยาศาสตรบัณฑิต สาขาวิชาเทคโนโลยีชีวภาพ</option>
                                <option>วิทยาศาสตรบัณฑิต สาขาวิชาเทคโนโลยีพลังงานชีวภาพและการแปรรูปเคมีชีวภาพ</option>
                                <option>วิทยาศาสตรบัณฑิต สาขาวิชาเทคโนโลยีการเกษตร</option>
                                <option>วิทยาศาสตรบัณฑิต สาขาวิชาวัสดุศาสตร์</option>
                                <option>วิทยาศาสตรบัณฑิต สาขาวิชาวิทยาศาสตร์และเทคโนโลยีสิ่งทอ</option>
                                <option>วิทยาศาสตรบัณฑิต สาขาวิชาเทคโนโลยีเพื่อการพัฒนายั่งยืน</option>
                                <option>วิทยาศาสตรบัณฑิต สาขาวิชาวิทยาศาสตร์และเทคโนโลยีการอาหาร</option>
                                <option>วิทยาศาสตรบัณฑิต สาขาวิชาวิทยาศาสตร์และนวัตกรรมทางอาหาร</option>
                            </select>
                        </div>

                    </div>
                </div>

                <div class="container">
                    <div class="columns is-multiline is-centered">

                        <div class="column is-one-quarter">
                            <div class="field">
                                <label class="label">ประเภท :</label>
                            </div>

                            <div class="select" value={this.state.version} onChange={this.onChangeVersion}>
                                <select>
                                    <option>โปรดเลือก</option>
                                    <option>วิชาบรรยาย-วิชาปฏิบัติ</option>
                                    <option>ซีเนียร์โปรเจค-ปัญหาพิเศษ-สัมมนา</option>
                                </select>
                            </div>

                        </div>

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
            </Fragment>
        )
    }
}
