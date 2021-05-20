import React, { Component, Fragment } from 'react'
import * as XLSX from 'xlsx';
import axios from 'axios';
import moment from 'moment';
import Amplify, { Storage } from 'aws-amplify';
import Popup from './Popup';
import PopupSaveFile from './PopupSaveFile';
import PopupDanger from './PopupDanger';
import PopupLoading from './PopupLoading';

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

    // เพิ่มมา 23/04/64
    state = {
        showPopup: false,
        showPopupSave: false,
        showPopupDanger: false,
        showNotification: false,
        textAleart: [],
        textAleartSave: '',
        textAleartDanger: ''
    }
    state = {
        isPending: false,
        filePathToSendApi: '',
    }
    clickPopup = (e) => {
        this.setState({ showPopup: !this.state.showPopup })
        window.location.reload(false);
    }
    clickPopupSave = (e) => {
        this.setState({ showPopupSave: !this.state.showPopupSave })
        window.location.reload(false);
    }
    clickPopupDanger = (e) => {
        this.setState({ showPopupDanger: !this.state.showPopupDanger })
    }
    clickNotification = (e) => {
        this.setState({ showNotification: !this.state.showNotification })
    }
    //

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

    compareTableName = () => {

        let departmentName = '';
        //department
        if (this.state.department === 'สาขาวิชาวิทยาการคอมพิวเตอร์') {
            departmentName = 'ComputerScience';
        }
        else if (this.state.department === 'สาขาวิชาฟิสิกส์') {
            departmentName = 'Physics';
        }
        else if (this.state.department === 'สาขาวิชาเคมี') {
            departmentName = 'Chemistry';
        }
        else if (this.state.department === 'สาขาวิชาเทคโนโลยีชีวภาพ') {
            departmentName = 'Biotechnology';
        }
        else if (this.state.department === 'สาขาวิชาคณิตศาสตร์และสถิติ') {
            departmentName = 'MathematicsAndStatistics';
        }
        else if (this.state.department === 'สาขาวิชาเทคโนโลยีการเกษตร') {
            departmentName = 'Agricultural';
        }
        else if (this.state.department === 'สาขาวิชาวิทยาศาสตร์สิ่งเเวดล้อม') {
            departmentName = 'EnvironmentalScience';
        }
        else if (this.state.department === 'สาขาวิชาเทคโนโลยีเพื่อการพัฒนายั่งยืน') {
            departmentName = 'SustainableDevelopment';
        }
        else if (this.state.department === 'สาขาวิชาวิทยาศาสตร์และเทคโนโลยีการอาหาร') {
            departmentName = 'FoodScience';
        }
        else if (this.state.department === 'สาขาวิชาเทคโนโลยีวัสดุและสิ่งทอ') {
            departmentName = 'MaterialsAndTextile';
        }

        //course
        let courseName = '';
        if (this.state.course === 'วิทยาศาสตรบัณฑิต สาขาวิชาเคมี') {
            courseName = 'Chemistry';
        }
        else if (this.state.course === 'วิทยาศาสตรบัณฑิต สาขาวิชาฟิสิกส์') {
            courseName = 'Physics';
        }
        else if (this.state.course === 'วิทยาศาสตรบัณฑิต สาขาวิชาฟิสิกส์อิเล็กทรอนิกส์') {
            courseName = 'ElectronicsPhysics';
        }
        else if (this.state.course === 'วิทยาศาสตรบัณฑิต สาขาวิชาคณิตศาสตร์') {
            courseName = 'Mathematics';
        }
        else if (this.state.course === 'วิทยาศาสตรบัณฑิต สาขาวิชาคณิตศาสตร์การจัดการ') {
            courseName = 'ManagementMathematics';
        }
        else if (this.state.course === 'วิทยาศาสตรบัณฑิต สาขาวิชาคณิตศาสตร์ประยุกต์') {
            courseName = 'AppliedMathematics';
        }
        else if (this.state.course === 'วิทยาศาสตรบัณฑิต สาขาวิชาวิทยาการประกันภัย') {
            courseName = 'ActuarialScience';
        }
        else if (this.state.course === 'วิทยาศาสตรบัณฑิต สาขาวิชาสถิติ') {
            courseName = 'Statistics';
        }
        else if (this.state.course === 'วิทยาศาสตรบัณฑิต สาขาวิชาสถิติประยุกต์') {
            courseName = 'AppliedStatistics';
        }
        else if (this.state.course === 'วิทยาศาสตรบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์') {
            courseName = 'ComputerScience';
        }
        else if (this.state.course === 'วิทยาศาสตรบัณฑิต สาขาวิชาวิทยาศาสตร์สิ่งแวดล้อม') {
            courseName = 'EnvironmentalScience';
        }
        else if (this.state.course === 'วิทยาศาสตรบัณฑิต สาขาวิชาเทคโนโลยีชีวภาพ') {
            courseName = 'Biotechnology';
        }
        else if (this.state.course === 'วิทยาศาสตรบัณฑิต สาขาวิชาเทคโนโลยีพลังงานชีวภาพและการแปรรูปเคมีชีวภาพ') {
            courseName = 'Beb';
        }
        else if (this.state.course === 'วิทยาศาสตรบัณฑิต สาขาวิชาเทคโนโลยีการเกษตร') {
            courseName = 'Agricultural';
        }
        else if (this.state.course === 'วิทยาศาสตรบัณฑิต สาขาวิชาวัสดุศาสตร์') {
            courseName = 'Materials';
        }
        else if (this.state.course === 'วิทยาศาสตรบัณฑิต สาขาวิชาวิทยาศาสตร์และเทคโนโลยีสิ่งทอ') {
            courseName = 'Textile';
        }
        else if (this.state.course === 'วิทยาศาสตรบัณฑิต สาขาวิชาเทคโนโลยีเพื่อการพัฒนายั่งยืน') {
            courseName = 'SustainableDevelopment';
        }
        else if (this.state.course === 'วิทยาศาสตรบัณฑิต สาขาวิชาวิทยาศาสตร์และเทคโนโลยีการอาหาร') {
            courseName = 'FoodScience';
        }
        else if (this.state.course === 'วิทยาศาสตรบัณฑิต สาขาวิชาวิทยาศาสตร์และนวัตกรรมทางอาหาร') {
            courseName = 'Innovation';
        }

        // version
        let versionName = ''
        if (this.state.version === 'วิชาบรรยาย-วิชาปฏิบัติ') {
            versionName = 'Class';
        }
        else if (this.state.version === 'ซีเนียร์โปรเจค-ปัญหาพิเศษ-สัมมนา') {
            versionName = 'SpecialProject';
        }


        return "Bachelor_" + departmentName + "_" + courseName + "_" + versionName + "_" + this.state.semester + "-" + this.state.year;
    }

    sendMessageApi = () => {
        console.log("send message to API Bachelor");

        // เรียกใช้ func ไปเทียบค่ามาเป็นชื่อ table
        let tableNameFromFunction = this.compareTableName()
        let fileName = (this.state.filePathToSendApi).split("/")[6];
        let filePath = this.state.filePathToSendApi;

        console.log(tableNameFromFunction);
        // var arrToSend = {
        //     "httpMethod": "POST",
        //     "tableName": tableNameFromFunction, // ต้อง map ค่า thai -> eng 
        //     "bucketName": filePath, // this.state.filePath
        //     "fileName": fileName // this.state.fileName
        // }
        var arrToSend = {
            "bucketName": "amplifys3smartreport142809-dev", // ต้อง map ค่า thai -> eng 
            "fileName": filePath, // this.state.filePath
            "tableName": tableNameFromFunction // this.state.fileName
        }
        console.log(arrToSend);

        // if (this.state.version === 'วิชาบรรยาย-วิชาปฏิบัติ') {
        //     //call lambda lecture
        //     var apiUrl = "https://h5r2je6zp5.execute-api.us-east-1.amazonaws.com/Prod/bachelor-class-function";
        //     axios.post(apiUrl, arrToSend)
        //         .then((res => {
        //             console.log(res);
        //             console.log(res.data.Response);
        //             if (res.status === '200') {
        //                 alert('The email has been sent')
        //             }
        //         }))
        //         .catch((error) => {
        //             if (error.response) {
        //                 console.log(error.response);
        //             } else if (error.request) {
        //                 console.log(error.request);
        //             }
        //         })

        // }
        // if (this.state.version === 'ซีเนียร์โปรเจค-ปัญหาพิเศษ-สัมมนา') {
        //     //call lambda specail Project
        //     var apiUrl = "https://h5r2je6zp5.execute-api.us-east-1.amazonaws.com/Prod/bachelor-specialproject-function";
        //     let axiosConfig = {
        //         headers: {
        //             'Content-Type': 'application/json;charset=UTF-8',
        //             'Access-Control-Allow-Origin': "*",
        //             'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        //         }
        //     };
        //     axios.post(apiUrl, arrToSend)
        //         .then((res => {
        //             console.log(res);
        //             console.log(res.data.Response);

        //             if (res.status === '200') {
        //                 alert('The email has been sent')
        //             }

        //         }))
        //         .catch((error) => {
        //             if (error.response) {
        //                 console.log(error.response);
        //             } else if (error.request) {
        //                 console.log(error.request);
        //             }
        //         })
        // }

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
                resolve(ws);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });

        promise.then((d) => {

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
                    // alert('Good!! (ป.ตรี บรรยาย/ปฏิบัติ) --> Format ถูกต้องสามารถอัปโหลดข้อมูลได้');
                    // เพิ่ม
                    this.setState({
                        showNotification: true
                    })
                }
                else {

                    var arrTextAleart = [];
                    if (DepartmentFromFile !== this.state.department) {
                        arrTextAleart.push('"สาขาวิชา" ไม่ตรงกับข้อมูลนำเข้า');
                        this.setState({ department: '' })
                    }
                    if (LectureFromFile !== 'บรรยาย' && PracticeFromFile !== 'ปฏิบัติ') {
                        arrTextAleart.push('"ประเภท" ไม่ตรงกับข้อมูลนำเข้า');
                        this.setState({ version: '' })
                    }
                    if (SemesterFromFile !== this.state.semester) {
                        arrTextAleart.push('"ภาคการศึกษา" ไม่ตรงกับข้อมูลนำเข้า');
                        this.setState({ semester: '' })
                    }
                    if (YearFromFile !== this.state.year) {
                        arrTextAleart.push('"ปีการศึกษา" ไม่ตรงกับข้อมูลนำเข้า');
                        this.setState({ year: '' })
                    }
                    if (CourseFromFile !== this.state.course) {
                        arrTextAleart.push('"หลักสูตร" ไม่ตรงกับข้อมูลนำเข้า');
                        this.setState({ course: '' })
                    }
                    if (EducationFromFile !== 'ปริญญาตรี') {
                        arrTextAleart.push('"ระดับการศึกษา" ไม่ตรงกับข้อมูลนำเข้า');
                        this.setState({ educationlevel: '' })
                    }
                    // เพิ่ม
                    this.setState({
                        textAleart: arrTextAleart,
                        showPopup: true
                    })

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
                    // alert('Good!! (ป.ตรี ซีเนียร์โปรเจค-ปัญหาพิเศษ-สัมมนา) --> Format ถูกต้องสามารถอัปโหลดข้อมูลได้');
                    this.setState({
                        showNotification: true
                    })
                }
                else {
                    // var text_alert = "";
                    var arrTextAleart = [];
                    if (DepartmentFromFile !== this.state.department) {
                        arrTextAleart.push('"สาขาวิชา" ไม่ตรงกับข้อมูลนำเข้า');
                        this.setState({ department: '' })
                    }
                    if (bufferSeniorproject[0] !== 'ซีเนียร์โปรเจค') {
                        arrTextAleart.push('"ประเภท" ไม่ตรงกับข้อมูลนำเข้า');
                        this.setState({ version: '' })
                    }
                    if (SemesterFromFile !== this.state.semester) {
                        arrTextAleart.push('"ภาคการศึกษา" ไม่ตรงกับข้อมูลนำเข้า');
                        this.setState({ semester: '' })
                    }
                    if (YearFromFile !== this.state.year) {
                        arrTextAleart.push('"ปีการศึกษา" ไม่ตรงกับข้อมูลนำเข้า');
                        this.setState({ year: '' })
                    }
                    if (CourseFromFile !== this.state.course) {
                        arrTextAleart.push('"หลักสูตร" ไม่ตรงกับข้อมูลนำเข้า');
                        this.setState({ course: '' })
                    }
                    if (EducationFromFile !== 'ปริญญาตรี') {
                        arrTextAleart.push('"ระดับการศึกษา" ไม่ตรงกับข้อมูลนำเข้า');
                        this.setState({ educationlevel: '' })
                    }
                    // alert(text_alert);

                    // เพิ่ม
                    this.setState({
                        textAleart: arrTextAleart,
                        showPopup: true
                    })
                }

            }
            // }

        })
            .catch(err => {
                alert('Format ไฟล์ข้อมูลไม่ถูกต้อง!!');
            })
    }

    saveFile = (e) => {

        this.setState({ isPending: true });
        const DASH_DMYHMS = 'DD-MM-YYYY HH:mm:ss';
        const timeStamp = moment().format(DASH_DMYHMS);
        var fileName = this.state.department + "/" + "ภาระงานสอน" + "/ปริญญาตรี/" + this.state.course + "/" + this.state.year + "_" + this.state.semester + "_" + "/" + this.state.version + "/" +
            this.state.year + "_" + this.state.semester + "_" + this.state.department + "_" + this.state.version + "_" + timeStamp + ".xlsx";

        if (this.state.chack) {
            Storage.put(fileName, this.state.file)
                .then(() => {
                    // 
                    this.setState({ filePathToSendApi: "public/" + fileName });
                    e.preventDefault();

                    this.sendMessageApi();
                    setTimeout(() => {

                        this.setState({ timer: true })
                        this.setState({
                            isPending: false,
                            showNotification: false
                        })
                        console.log('sueccessfully saved file!');
                        this.setState({
                            textAleartSave: 'Successfully save file!',
                            showPopupSave: true
                        })

                    }, 25000);


                    this.setState({ fileUrl: '', file: '', filename: '' })
                })
                .catch(err => {
                    console.log('error uploading file', err);
                })
        } else {
            // alert('บันทึกไม่สำเสร็จ \n !! ข้อมูลไม่ถูกต้องโปรดตรวจสอบอีกครั้ง !!')
            this.setState({
                textAleartDanger: 'ข้อมูลไม่ถูกต้องโปรดตรวจสอบอีกครั้ง',
                showPopupDanger: true
            })
        }


    }



    render() {
        return (
            <Fragment>

                {/*  */}
                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label class="label">สาขาวิชา:</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <div class="control">
                                <div class="select is-fullwidth" value={this.state.department} onChange={this.onChangeDepartment}>
                                    <select>
                                        <option>โปรดเลือก</option>
                                        <option>สาขาวิชาวิทยาการคอมพิวเตอร์</option>
                                        <option>สาขาวิชาฟิสิกส์</option>
                                        <option>สาขาวิชาเคมี</option>
                                        <option>สาขาวิชาเทคโนโลยีชีวภาพ</option>
                                        <option>สาขาวิชาคณิตศาสตร์และสถิติ</option>
                                        <option>สาขาวิชาเทคโนโลยีการเกษตร</option>
                                        <option>สาขาวิชาวิทยาศาสตร์สิ่งเเวดล้อม</option>
                                        <option>สาขาวิชาเทคโนโลยีเพื่อการพัฒนายั่งยืน</option>
                                        <option>สาขาวิชาวิทยาศาสตร์และเทคโนโลยีการอาหาร</option>
                                        <option>สาขาวิชาเทคโนโลยีวัสดุและสิ่งทอ</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field is-horizontal">

                    <div class="field-label is-normal">
                        <label class="label">หลักสูตร:</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <div class="control">
                                <div class="select is-fullwidth" value={this.state.course} onChange={this.onChangeCourse}>
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
                    </div>
                </div>

                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label class="label">ประเภท:</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <div class="control">
                                <div class="select is-fullwidth" value={this.state.version} onChange={this.onChangeVersion}>
                                    <select>
                                        <option>โปรดเลือก</option>
                                        <option>วิชาบรรยาย-วิชาปฏิบัติ</option>
                                        <option>ซีเนียร์โปรเจค-ปัญหาพิเศษ-สัมมนา</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label class="label">ปี/ภาคการศึกษา:</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <div class="control">
                                <input class="input" type="text" placeholder="ปีการศึกษา" value={this.state.year} onChange={this.onChangeYear}></input>
                            </div>
                        </div>
                        <div class="field">
                            <div class="control">
                                <div class="select is-fullwidth" value={this.state.semester} onChange={this.onChangeSemester}>
                                    <select>
                                        <option>ภาคการศึกษา</option>
                                        <option>1</option>
                                        <option>2</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label class="label">ไฟล์อัปโหลด:</label>
                    </div>
                    <div class="field-body">
                        <span class="file-cta">
                            <span class="file-icon">
                                <i class="fas fa-upload"></i>
                            </span>
                            <span class="file-label">
                                <input type='file' className="selectfile" onChange={this.handleChange} />
                            </span>
                        </span>
                    </div>
                </div>


                {this.state.showNotification && <article class="message is-primary">
                    <div class="message-body ">
                        Format ไฟล์ข้อมูลถูกต้องสามารถอัปโหลดไฟล์ข้อมูลได้
                    </div>
                </article>}


                <div class="columns is-multiline">
                    <div class="column"></div>
                    <div class="field">
                        <div class="column is-one-quarter">
                            <button class="button is-primary " onClick={this.saveFile}>
                                <span class="icon is-small">
                                    <i class="fas fa-check"></i>
                                </span>
                                {!this.state.isPending && <span>บันทึกข้อมูล</span>}
                                {this.state.isPending && <span>กำลังบันทึกข้อมูล...</span>}
                            </button>
                        </div>
                    </div>
                </div>


                {this.state.isPending && <PopupLoading />}

                {this.state.showPopup && <Popup
                    clickPopup={this.clickPopup}
                    textAleart={this.state.textAleart}
                />}

                {this.state.showPopupSave && <PopupSaveFile
                    clickPopupSave={this.clickPopupSave}
                    textAleart={this.textAleartSave}
                // sendApi={this.sendMessageApi}
                />}

                {this.state.showPopupDanger && <PopupDanger
                    clickPopupDanger={this.clickPopupDanger}
                    textAleart={this.textAleartDanger}
                />}

            </Fragment>
        )
    }
}
