import React, { Component, Fragment } from 'react'
import Product from './Product';
import axios from "axios";
import * as XLSX from 'xlsx'
import moment from 'moment';
import Amplify, { Storage } from 'aws-amplify';
import Popup from './Popup';
import PopupSaveFile from './PopupSaveFile';
import PopupDanger from './PopupDanger';
import PopupLoading from './PopupLoading';
const config = require('../config.json');

export default class Upload_academy extends Component {

    state = { fileUrl: '', file: '', filename: '' }
    state = {
        professor: '',
        department: '',
        version: '',
    }

    state = {
        checkRound1: '',
        checkRound2: '',
        checkRoundLoop: '',
        nameFloderRound1: '',
        nameFloderRound2: '',
        fileNameSemesterR1: '',
        fileNameYearR1: '',
        fileNameSemesterR2: '',
        fileNameYearR2: '',
        versionTimestamp: '',
        checkRoundToSave: '',
        checkRound: '',
    }

    onChangeProfessor = (e) => {
        this.setState({ professor: e.target.value })
    }
    onChangeDepartment = (e) => {
        this.setState({ department: e.target.value })
    }
    onChangeVersion = (e) => {
        this.setState({ version: e.target.value })
    }

    // เพิ่มเติม popup
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
        typeToSendApi: '',
    }
    clickPopup = (e) => {
        this.setState({ showPopup: !this.state.showPopup })
        window.location.reload(false);
        this.setState({ fileUrl: '', file: '', filename: '' })
    }
    clickPopupSave = (e) => {
        this.setState({ showPopupSave: !this.state.showPopupSave })
        window.location.reload(false);
        this.setState({ fileUrl: '', file: '', filename: '' })
    }
    clickPopupDanger = (e) => {
        this.setState({ showPopupDanger: !this.state.showPopupDanger })
    }
    clickNotification = (e) => {
        this.setState({ showNotification: !this.state.showNotification })
    }

    compareTableName = (department, version) => {

        let departmentName = '';
        //department
        if (department === 'สาขาวิชาวิทยาการคอมพิวเตอร์') {
            departmentName = 'ComputerScience';
        }
        else if (department === 'สาขาวิชาฟิสิกส์') {
            departmentName = 'Physics';
        }
        else if (department === 'สาขาวิชาเคมี') {
            departmentName = 'Chemistry';
        }
        else if (department === 'สาขาวิชาเทคโนโลยีชีวภาพ') {
            departmentName = 'Biotechnology';
        }
        else if (department === 'สาขาวิชาคณิตศาสตร์และสถิติ') {
            departmentName = 'MathematicsAndStatistics';
        }
        else if (department === 'สาขาวิชาเทคโนโลยีการเกษตร') {
            departmentName = 'Agricultural';
        }
        else if (department === 'สาขาวิชาวิทยาศาสตร์สิ่งเเวดล้อม') {
            departmentName = 'EnvironmentalScience';
        }
        else if (department === 'สาขาวิชาเทคโนโลยีเพื่อการพัฒนายั่งยืน') {
            departmentName = 'SustainableDevelopment';
        }
        else if (department === 'สาขาวิชาวิทยาศาสตร์และเทคโนโลยีการอาหาร') {
            departmentName = 'FoodScience';
        }
        else if (department === 'สาขาวิชาเทคโนโลยีวัสดุและสิ่งทอ') {
            departmentName = 'MaterialsAndTextile';
        }

        let versionName = '';
        if (version === 'รายงานบทความ/ผลงานตีพิมพ์ในวารสารวิชาการต่างๆ') {
            versionName = 'Artical';
        }
        if (version === 'รายงานการเสนอผลงานในที่ประชุมวิชาการ') {
            versionName = 'Conference';
        }

        let semester = '';
        let year = '';
        if (this.state.checkRound1 > 0) {
            semester = this.state.fileNameSemesterR1;
            year = this.state.fileNameYearR1
        }
        if (this.state.checkRound2 > 0) {
            semester = this.state.fileNameSemesterR2;
            year = this.state.fileNameYearR2
        }

        return departmentName + "_" + versionName + "_" + semester + "-" + year;
    }

    sendMessageApi = (e) => {
        console.log("send message to API Academy");
        //ต้องการไฟล์ path
        // var filePath = [];
        // filePath.push({
        //     ['filePath']: this.state.filePathToSendApi,
        //     ['type']: this.state.typeToSendApi
        // })
        // console.log(filePath);
        var filePath = "public/" + this.state.filePathToSendApi;
        var tableName = this.compareTableName(this.state.department, this.state.version);


        if (this.state.version === 'รายงานบทความ/ผลงานตีพิมพ์ในวารสารวิชาการต่างๆ') {
            var arrToSend = {
                "bucketName": "amplifys3smartreport142809-dev", // ต้อง map ค่า thai -> eng 
                "fileName": filePath, // this.state.filePath
                "tableName": tableName, // this.state.fileName
                "versionRG300": this.state.versionTimestamp,
            }
            console.log(arrToSend);
            // call lambda lecture
            var apiUrl = "https://h5r2je6zp5.execute-api.us-east-1.amazonaws.com/Prod/rg300function";
            axios.post(apiUrl, arrToSend)
                .then((res => {
                    console.log(res);
                    console.log(res.data.Response);
                    if (res.status === '200') {
                        alert('The email has been sent')
                    }
                }))
                .catch((error) => {
                    if (error.response) {
                        console.log(error.response);
                    } else if (error.request) {
                        console.log(error.request);
                    }
                })
            console.log("call API");

        }
        if (this.state.version === 'รายงานการเสนอผลงานในที่ประชุมวิชาการ') {
            var arrToSend = {
                "bucketName": "amplifys3smartreport142809-dev", // ต้อง map ค่า thai -> eng 
                "fileName": filePath, // this.state.filePath
                "tableName": tableName, // this.state.fileName
                "versionRG301": this.state.versionTimestamp,
            }
            console.log(arrToSend);
            //call lambda lecture
            var apiUrl = "https://h5r2je6zp5.execute-api.us-east-1.amazonaws.com/Prod/rg301function";
            axios.post(apiUrl, arrToSend)
                .then((res => {
                    console.log(res);
                    console.log(res.data.Response);
                    if (res.status === '200') {
                        alert('The email has been sent')
                    }
                }))
                .catch((error) => {
                    if (error.response) {
                        console.log(error.response);
                    } else if (error.request) {
                        console.log(error.request);
                    }
                })
            console.log("call API");

        }

    }


    // เช็คตั้งเเต่ตอน read เมื่อตรวจสอบเเล้วว่า format ถูกจึงตรวจสอบ รอบเดือนต่อ เเล้ว setstate รอบเดือนเพื่อนำไปใส่ path 

    readExcel = (file) => {
        console.log(file.name);
        // เพิ่ม
        var rage;

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

                //---------------------------------------------
                rage = XLSX.utils.decode_range(ws['!ref']);

                // --------- ทดสอบ -----------------------------------------------------------------------------------------------------
                //รอบ 1
                var startdate1 = new Date((new Date().getFullYear()) - 1, '06', '01'); //  01 / 07 / 20
                var enddate1 = new Date((new Date().getFullYear()) - 1, '11', '31'); //   31 / 12 / 20
                // รอบ2
                var startdate2 = new Date(new Date().getFullYear() - 1, '12', '01'); //   01 / 01 /20
                var enddate2 = new Date(new Date().getFullYear(), '05', '30'); //   30 / 06 / 20
                var datePresent = new Date();
                var CheckRound = '';
                if (datePresent >= startdate1 && datePresent <= enddate1) {
                    CheckRound = 'รอบ1';
                }
                else if (datePresent >= startdate2 && datePresent <= enddate2) {
                    CheckRound = 'รอบ2';
                }
                console.log(CheckRound);
                this.setState({ checkRound: CheckRound });
                // ------------------------------------------------------------------------------------------------------

                // loop ในไฟล์ว่าข้อมูลอยู่ไหนช่วงไหน
                var CheckRound1 = 0;
                var CheckRound2 = 0;
                console.log(new Date().getFullYear());
                var yearThai = (new Date().getFullYear()) + 543;
                console.log(rage.e.r);
                for (let i = 0; i <= rage.e.r; i++) {
                    // r: i, c: 49
                    // var serial = d.AX+{i};
                    // console.log(serial);
                    var serial;
                    if (this.state.version === 'รายงานบทความ/ผลงานตีพิมพ์ในวารสารวิชาการต่างๆ') {
                        serial = ws[XLSX.utils.encode_cell({ r: i, c: 49 })].v;
                    }

                    if (this.state.version === 'รายงานการเสนอผลงานในที่ประชุมวิชาการ') {
                        serial = ws[XLSX.utils.encode_cell({ r: i, c: 8 })].v;
                    }

                    var utc_days = Math.floor(serial - 25569);
                    var utc_value = utc_days * 86400;
                    var date_info = new Date(utc_value * 1000);
                    var dateFile = new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate());// Year now , น่าจะใช้ getYear ปัจจุบัน
                    console.log(dateFile);

                    //รอบ 1
                    var startdate1 = new Date((new Date().getFullYear()) - 1, '06', '01'); //  01 / 07 / 20
                    var enddate1 = new Date((new Date().getFullYear()) - 1, '11', '31'); //   31 / 12 / 20
                    // รอบ2
                    var startdate2 = new Date(new Date().getFullYear() - 1, '12', '01'); //   01 / 01 /20
                    var enddate2 = new Date(new Date().getFullYear(), '05', '30'); //   30 / 06 / 20

                    console.log(startdate1);
                    console.log(enddate1);
                    console.log(startdate2);
                    console.log(enddate2);

                    if (dateFile >= startdate1 && dateFile <= enddate1) {
                        console.log('รอบ1');
                        CheckRound1++;
                    }
                    else if (dateFile >= startdate2 && dateFile <= enddate2) {
                        console.log('รอบ2');
                        CheckRound2++;

                    }

                }//loop
                console.log(CheckRound1);
                console.log(CheckRound2);

                // --------- ทดสอบ -----------------------------------------
                var CheckRoundToSave = 'false';
                if (CheckRound === 'รอบ1') {
                    if (CheckRound1 >= 1 && CheckRound2 >= 1) {
                        CheckRoundToSave = 'true';
                    }
                    else if (CheckRound1 >= 1) {
                        CheckRoundToSave = 'true';
                    }
                    else if (CheckRound2 >= 1) {
                        CheckRoundToSave = 'false';
                    }
                }
                if (CheckRound === 'รอบ2') {
                    if (CheckRound1 >= 1 && CheckRound2 >= 1) {
                        CheckRoundToSave = 'true';
                    }
                    else if (CheckRound1 >= 1) {
                        CheckRoundToSave = 'false';
                    }
                    else if (CheckRound2 >= 1) {
                        CheckRoundToSave = 'true';
                    }
                }
                console.log(CheckRoundToSave);
                this.setState({ checkRound: CheckRound });
                this.setState({ checkRoundToSave: CheckRoundToSave });
                // ---------------------------------------------------------

                //checkRoundLoop
                var countRoundLoop = 0;
                if (CheckRound1 >= 1) {
                    countRoundLoop++;
                    this.setState({ nameFloderRound1: 'รอบ1 เดือน เมษายน_' + yearThai });
                    this.setState({
                        fileNameSemesterR1: "1",
                        fileNameYearR1: yearThai
                    })

                }
                if (CheckRound2 >= 1) {
                    countRoundLoop++;
                    this.setState({ nameFloderRound2: 'รอบ2 เดือน ตุลาคม_' + yearThai });
                    this.setState({
                        fileNameSemesterR2: "2",
                        fileNameYearR2: yearThai
                    })
                }

                this.setState({
                    checkRound1: CheckRound1,
                    checkRound2: CheckRound2,
                    checkRoundLoop: countRoundLoop,
                });
                console.log(countRoundLoop);
                console.log(this.state.nameFloderRound1);
                console.log(this.state.nameFloderRound2);

                //---------------------------------------------

                resolve(ws);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });

        promise.then((d) => {

            if (this.state.version == 'รายงานบทความ/ผลงานตีพิมพ์ในวารสารวิชาการต่างๆ') {

                var DepartmentFromFile = d.A2.v;
                var VersionFromFile = d.AE2.v;
                var ProfessorFromFile = d.K2.v;



                if (DepartmentFromFile == this.state.department && VersionFromFile == this.state.version && ProfessorFromFile == this.state.professor
                    && this.state.checkRoundToSave === 'true' && this.state.checkRound1 >= 1 || this.state.checkRound2 >= 1) {
                    this.setState({
                        showNotification: true
                    })
                }
                else {
                    //เเจ้งว่าผิดพลาดอะไรบ้าง
                    var arrTextAleart = [];
                    if (DepartmentFromFile != this.state.department) {
                        arrTextAleart.push('"สาขาวิชา"ไม่ตรงกับข้อมูลนำเข้า');
                    }
                    if (VersionFromFile != this.state.version) {
                        arrTextAleart.push('"ประเภท" ไม่ตรงกับข้อมูลนำเข้า');
                    }
                    if (ProfessorFromFile != this.state.professor) {
                        arrTextAleart.push('"ชื่อเจ้าของผลงาน" ไม่ตรงกับข้อมูลนำเข้า');
                    }
                    if (this.state.checkRound1 < 1 && this.state.checkRound2 < 1) {
                        arrTextAleart.push('"ข้อมูลไม่อัพเดท" ผลงานไม่อยู่ในช่วงที่กำหนด');
                    }
                    if (this.state.checkRoundToSave === 'false') {
                        arrTextAleart.push('"ข้อมูลไม่อัพเดท" ผลงานไม่อยู่ในช่วงที่กำหนด');
                    }
                    this.setState({
                        textAleart: arrTextAleart,
                        showPopup: true
                    })
                }
            }
            if (this.state.version == 'รายงานการเสนอผลงานในที่ประชุมวิชาการ') {

                var DepartmentFromFile = d.A2.v;
                var VersionFromFile = d.AH2.v;
                var ProfessorFromFile = d.N2.v;


                if (DepartmentFromFile == this.state.department && VersionFromFile == this.state.version && ProfessorFromFile == this.state.professor
                    && this.state.checkRoundToSave === 'true' && this.state.checkRound1 >= 1 || this.state.checkRound2 >= 1) {
                    this.setState({
                        showNotification: true
                    })
                }
                else {
                    //เเจ้งว่าผิดพลาดอะไรบ้าง
                    var arrTextAleart = [];
                    if (DepartmentFromFile != this.state.department) {
                        arrTextAleart.push('"สาขาวิชา"ไม่ตรงกับข้อมูลนำเข้า');
                    }
                    if (VersionFromFile != this.state.version) {
                        arrTextAleart.push('"ประเภท" ไม่ตรงกับข้อมูลนำเข้า');
                    }
                    if (ProfessorFromFile != this.state.professor) {
                        arrTextAleart.push('"ชื่อเจ้าของผลงาน" ไม่ตรงกับข้อมูลนำเข้า');
                    }
                    if (this.state.checkRound1 < 1 && this.state.checkRound2 < 1) {
                        arrTextAleart.push('"ข้อมูลไม่อัพเดท" ผลงานไม่อยู่ในช่วงที่กำหนด');
                    }
                    if (this.state.checkRoundToSave === 'false') {
                        arrTextAleart.push('"ข้อมูลไม่อัพเดท" ผลงานไม่อยู่ในช่วงที่กำหนด');
                    }
                    this.setState({
                        textAleart: arrTextAleart,
                        showPopup: true
                    })
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
        this.setState({ isPending: true });
        const DASH_DMYHMS = 'DD-MM-YYYY HH:mm:ss';
        const timeStamp = moment().format(DASH_DMYHMS);
        this.setState({ versionTimestamp: timeStamp });
        if (this.state.version == 'รายงานบทความ/ผลงานตีพิมพ์ในวารสารวิชาการต่างๆ') {
            var bufferVersion = 'รายงานบทความ-ผลงานตีพิมพ์ในวารสารวิชาการต่างๆ';
        }
        if (this.state.version == 'รายงานการเสนอผลงานในที่ประชุมวิชาการ') {
            var bufferVersion = 'รายงานการเสนอผลงานในที่ประชุมวิชาการ';
        }

        //---------------------------------------------

        // if (this.state.checkRoundLoop === 1) {
        console.log("checkRoundLoop");
        if (this.state.checkRound === 'รอบ1') { //รอบ1
            var fileName = this.state.department + "/" + "ผลงานทางวิชาการ" + "/" + bufferVersion + "/" + this.state.nameFloderRound1 + "/" +
                this.state.professor + "_" + this.state.department + "_" + bufferVersion + "_" + timeStamp + ".xlsx";
        }
        if (this.state.checkRound === 'รอบ2') { //รอบ2
            var fileName = this.state.department + "/" + "ผลงานทางวิชาการ" + "/" + bufferVersion + "/" + this.state.nameFloderRound2 + "/" +
                this.state.professor + "_" + this.state.department + "_" + bufferVersion + "_" + timeStamp + ".xlsx";
        }
        Storage.put(fileName, this.state.file)
            .then(() => {
                this.setState({
                    filePathToSendApi: fileName,
                    typeToSendApi: bufferVersion
                });
                this.sendMessageApi();
                setTimeout(() => {
                    e.preventDefault();
                    this.setState({
                        isPending: false,
                        showNotification: false
                    })
                    console.log('Successfully save file!')
                    this.setState({
                        textAleartSave: 'Successfully save file!',
                        showPopupSave: true
                    })
                }, 20000);

                this.setState({ fileUrl: '', file: '', filename: '' })
                //this.state.filename;
                e.preventDefault();
            })
            .catch(err => {
                console.log('error upload file!', err)
                this.setState({
                    textAleartDanger: 'ข้อมูลไม่ถูกต้องโปรดตรวจสอบอีกครั้ง',
                    showPopupDanger: true
                })
            })
        // }



        // if (this.state.checkRoundLoop === 2) {
        //     for (let i = 0; i < 2; i++) {
        //         if (i === 0) {// รอบ1
        //             var fileName = this.state.department + "/" + "ผลงานทางวิชาการ" + "/" + bufferVersion + "/" + this.state.nameFloderRound1 + "/" +
        //                 this.state.professor + "_" + this.state.department + "_" + bufferVersion + "_" + timeStamp + ".xlsx";

        //             Storage.put(fileName, this.state.file)
        //                 .then(() => {
        //                     this.setState({
        //                         filePathToSendApi: fileName,
        //                         typeToSendApi: bufferVersion
        //                     });
        //                     this.sendMessageApi();
        //                     // e.preventDefault();
        //                     this.setState({
        //                         isPending: false,
        //                         showNotification: false
        //                     })
        //                     console.log('Successfully save file!')
        //                     this.setState({
        //                         textAleartSave: 'Successfully save file!',
        //                         showPopupSave: true
        //                     })

        //                     this.setState({ fileUrl: '', file: '', filename: '' })
        //                     //this.state.filename;
        //                     // e.preventDefault();
        //                 })
        //                 .catch(err => {
        //                     console.log('error upload file!', err)
        //                     this.setState({
        //                         textAleartDanger: 'ข้อมูลไม่ถูกต้องโปรดตรวจสอบอีกครั้ง',
        //                         showPopupDanger: true
        //                     })
        //                 })
        //         }
        //         if (i === 1) {// รอบ2
        //             var fileName = this.state.department + "/" + "ผลงานทางวิชาการ" + "/" + bufferVersion + "/" + this.state.nameFloderRound2 + "/" +
        //                 this.state.professor + "_" + this.state.department + "_" + bufferVersion + "_" + timeStamp + ".xlsx";

        //             Storage.put(fileName, this.state.file)
        //                 .then(() => {
        //                     this.setState({
        //                         filePathToSendApi: fileName,
        //                         typeToSendApi: bufferVersion
        //                     });
        //                     this.sendMessageApi();
        //                     // e.preventDefault();
        //                     this.setState({
        //                         isPending: false,
        //                         showNotification: false
        //                     })
        //                     console.log('Successfully save file!')
        //                     this.setState({
        //                         textAleartSave: 'Successfully save file!',
        //                         showPopupSave: true
        //                     })

        //                     this.setState({ fileUrl: '', file: '', filename: '' })
        //                     //this.state.filename;
        //                     // e.preventDefault();
        //                 })
        //                 .catch(err => {
        //                     console.log('error upload file!', err)
        //                     this.setState({
        //                         textAleartDanger: 'ข้อมูลไม่ถูกต้องโปรดตรวจสอบอีกครั้ง',
        //                         showPopupDanger: true
        //                     })
        //                 })
        //         }
        //     }
        //     this.setState({ fileUrl: '', file: '', filename: '' })
        //     e.preventDefault();
        // }




        //เพิ่มาจากด้านล่าง
        // this.setState({
        //     professor: '',
        //     department: '',
        //     version: ''
        // })
    }


    render() {
        return (
            <Fragment>

                <div className="box cta ">

                    {/* Tabs */}
                    <div class="tabs is-centered">
                        <ul>
                            <li >
                                <a href="/Upload_lecture" className="navbar-item" ><span class="icon is-small" ><i class="far fa-file-alt" aria-hidden="true"></i></span>
                                     อัปโหลดข้อมูลผลงานวิชาการ
                                </a>
                            </li>

                            <li class="is-active">
                                <a href="/Upload_academy" className="navbar-item" ><span class="icon is-small" ><i class="far fa-file-alt" aria-hidden="true"></i></span>
                                     อัปโหลดข้อมูลผลงานวิชาการ
                                </a>
                            </li>

                            {/* <li>
                                <a href="/Upload_History" className="navbar-item" ><span class="icon is-small" ><i class="far fa-file-alt" aria-hidden="true"></i></span>
                                    ประวัติอัปโหลดข้อมูล
                                </a>
                            </li> */}
                        </ul>
                    </div>

                    <div class="columns">
                        <div class="column"></div>
                        <div class="column is-four-fifths">
                            <div class="card">
                                <div class="card-content ">
                                    <section class="section is-small ">

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
                                                <label class="label">ประเภท:</label>
                                            </div>
                                            <div class="field-body">
                                                <div class="field">
                                                    <div class="control">
                                                        <div class="select is-fullwidth" value={this.state.version} onChange={this.onChangeVersion}>
                                                            <select>
                                                                <option>โปรดเลือก</option>
                                                                <option>รายงานบทความ/ผลงานตีพิมพ์ในวารสารวิชาการต่างๆ</option>
                                                                <option>รายงานการเสนอผลงานในที่ประชุมวิชาการ</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="field is-horizontal">
                                            <div class="field-label is-normal">
                                                <label class="label">ชื่อเจ้าของผลงาน:</label>
                                            </div>
                                            <div class="field-body">
                                                <div class="field">
                                                    <div class="control">
                                                        <div class="select is-fullwidth" value={this.state.professor} onChange={this.onChangeProfessor}>
                                                            <select>
                                                                <option>โปรดเลือก</option>
                                                                <option>ประภาพร รัตนธำรง</option>
                                                                <option>วนิดา พฤทธิวิทยา</option>
                                                                <option>นุชชากร งามเสาวรส</option>
                                                                <option>เสาวลักษณ์ วรรธนาภา</option>
                                                                <option>ธนาธร ทะนานทอง</option>
                                                                <option>เยาวดี เต็มธนาภัทร์</option>
                                                                <option>เด่นดวง ประดับสุวรรณ</option>
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


                                        {this.state.showNotification &&
                                            <article class="message is-primary">
                                                <div class="message-body ">
                                                    Format ไฟล์ข้อมูลถูกต้องสามารถอัปโหลดไฟล์ข้อมูลได้<br />
                                                    {/* {this.state.nameFloderRound1}<br />
                                                    {this.state.nameFloderRound2} */}
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

                                    </section>
                                </div>

                            </div>


                        </div>
                        <div class="column"></div>
                    </div>


                </div>

                {this.state.isPending && <PopupLoading />}
                {this.state.showPopup && <Popup clickPopup={this.clickPopup} textAleart={this.state.textAleart} />}
                {this.state.showPopupSave && <PopupSaveFile clickPopupSave={this.clickPopupSave} textAleart={this.textAleartSave} sendApi={this.sendMessageApi} />}
                {this.state.showPopupDanger && <PopupDanger clickPopupDanger={this.clickPopupDanger} textAleart={this.textAleartDanger} />}


            </Fragment>
        )
    }
}
