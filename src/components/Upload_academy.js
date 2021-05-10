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
        nameFloderRound2: ''
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

    sendMessageApi = (e) => {
        console.log("send message to API Academy");
        //ต้องการไฟล์ path
        var filePath = [];
        filePath.push({
            ['filePath']: this.state.filePathToSendApi,
            ['type']: this.state.typeToSendApi
        })
        console.log(filePath);
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

                // loop ในไฟล์ว่าข้อมูลอยู่ไหนช่วงไหน
                var CheckRound1 = 0;
                var CheckRound2 = 0;
                console.log(new Date().getFullYear());
                var yearThai = (new Date().getFullYear()) + 543;
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
                    var startdate2 = new Date((new Date().getFullYear()) - 1, '12', '01'); //   01 / 01 /20
                    var enddate2 = new Date(new Date().getFullYear(), '05', '30'); //   31 / 06 / 20

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

                //checkRoundLoop
                var countRoundLoop = 0;
                if (CheckRound1 >= 1) {
                    countRoundLoop++;
                    this.setState({ nameFloderRound1: 'รอบ1 เดือน เมษายน_' + yearThai });
                }
                if (CheckRound2 >= 1) {
                    countRoundLoop++;
                    this.setState({ nameFloderRound2: 'รอบ2 เดือน ตุลาคม_' + yearThai })
                }

                // if(CheckRound1 >=1 && CheckRound2 >=1){

                // }


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
                    && this.state.checkRound1 >= 1 || this.state.checkRound2 >= 1) {
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
                    if (this.state.checkRound1 < 1 && this.state.checkRound2 < 1){
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
                    && this.state.checkRound1 >= 1 || this.state.checkRound2 >= 1) {
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
                    if (this.state.checkRound1 < 1 && this.state.checkRound2 < 1){
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
        if (this.state.version == 'รายงานบทความ/ผลงานตีพิมพ์ในวารสารวิชาการต่างๆ') {
            var bufferVersion = 'รายงานบทความ-ผลงานตีพิมพ์ในวารสารวิชาการต่างๆ';
        }
        if (this.state.version == 'รายงานการเสนอผลงานในที่ประชุมวิชาการ') {
            var bufferVersion = 'รายงานการเสนอผลงานในที่ประชุมวิชาการ';
        }

        //---------------------------------------------

        if (this.state.checkRoundLoop === 1) {
            console.log("checkRoundLoop");
            if (this.state.checkRound1 >= 1) { //รอบ1
                var fileName = this.state.department + "/" + "ผลงานทางวิชาการ" + "/" + bufferVersion + "/" + this.state.nameFloderRound1 + "/" +
                    this.state.professor + "_" + this.state.department + "_" + bufferVersion + "_" + timeStamp + ".xlsx";
            }
            if (this.state.checkRound2 >= 1) { //รอบ2
                var fileName = this.state.department + "/" + "ผลงานทางวิชาการ" + "/" + bufferVersion + "/" + this.state.nameFloderRound2 + "/" +
                    this.state.professor + "_" + this.state.department + "_" + bufferVersion + "_" + timeStamp + ".xlsx";
            }
        }

        Storage.put(fileName, this.state.file)
            .then(() => {
                this.setState({
                    filePathToSendApi: fileName,
                    typeToSendApi: bufferVersion
                });
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

        if (this.state.checkRoundLoop === 2) {
            for (let i = 0; i < 2; i++) {
                if (i === 0) {// รอบ1
                    var fileName = this.state.department + "/" + "ผลงานทางวิชาการ" + "/" + bufferVersion + "/" + this.state.nameFloderRound1 + "/" +
                        this.state.professor + "_" + this.state.department + "_" + bufferVersion + "_" + timeStamp + ".xlsx";

                    Storage.put(fileName, this.state.file)
                        .then(() => {
                            this.setState({
                                filePathToSendApi: fileName,
                                typeToSendApi: bufferVersion
                            });
                            // e.preventDefault();
                            this.setState({
                                isPending: false,
                                showNotification: false
                            })
                            console.log('Successfully save file!')
                            this.setState({
                                textAleartSave: 'Successfully save file!',
                                showPopupSave: true
                            })

                            // this.setState({ fileUrl: '', file: '', filename: '' })
                            //this.state.filename;
                            // e.preventDefault();
                        })
                        .catch(err => {
                            console.log('error upload file!', err)
                            this.setState({
                                textAleartDanger: 'ข้อมูลไม่ถูกต้องโปรดตรวจสอบอีกครั้ง',
                                showPopupDanger: true
                            })
                        })
                }
                if (i === 1) {// รอบ2
                    var fileName = this.state.department + "/" + "ผลงานทางวิชาการ" + "/" + bufferVersion + "/" + this.state.nameFloderRound2 + "/" +
                        this.state.professor + "_" + this.state.department + "_" + bufferVersion + "_" + timeStamp + ".xlsx";

                    Storage.put(fileName, this.state.file)
                        .then(() => {
                            this.setState({
                                filePathToSendApi: fileName,
                                typeToSendApi: bufferVersion
                            });
                            // e.preventDefault();
                            this.setState({
                                isPending: false,
                                showNotification: false
                            })
                            console.log('Successfully save file!')
                            this.setState({
                                textAleartSave: 'Successfully save file!',
                                showPopupSave: true
                            })

                            // this.setState({ fileUrl: '', file: '', filename: '' })
                            //this.state.filename;
                            // e.preventDefault();
                        })
                        .catch(err => {
                            console.log('error upload file!', err)
                            this.setState({
                                textAleartDanger: 'ข้อมูลไม่ถูกต้องโปรดตรวจสอบอีกครั้ง',
                                showPopupDanger: true
                            })
                        })
                }
            }
            this.setState({ fileUrl: '', file: '', filename: '' })
            e.preventDefault();
        }

        //---------------------------------------------
        // var fileName = this.state.department + "/" + "ผลงานทางวิชาการ" + "/" + bufferVersion + "/" +
        //     this.state.professor + "_" + this.state.department + "_" + bufferVersion + "_" + timeStamp + ".xlsx";



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

                                <section class="section is-small">

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
                                                    <option>สาขาวิชาคณิตศาสตร์และสถิติ</option>
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
                                                <label class="label">ประเภท :</label>
                                            </div>

                                            <div class="select" value={this.state.version} onChange={this.onChangeVersion}>
                                                <select>
                                                    <option>โปรดเลือก</option>
                                                    <option>รายงานบทความ/ผลงานตีพิมพ์ในวารสารวิชาการต่างๆ</option>
                                                    <option>รายงานการเสนอผลงานในที่ประชุมวิชาการ</option>
                                                </select>
                                            </div>

                                        </div>

                                        <div class="column is-one-quarter">
                                            <div class="field">
                                                <label class="label">ชื่อเจ้าของผลงาน :</label>
                                            </div>

                                            <div class="select" value={this.state.professor} onChange={this.onChangeProfessor}>
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

                                    <div class="columns is-multiline is-centered">
                                        <div class="field">
                                            <div class="column is-one-quarter">
                                                <input type='file' className="selectfile" onChange={this.handleChange} />
                                            </div>
                                        </div>

                                    </div>

                                    {this.state.showNotification &&
                                        <article class="message is-primary">
                                            <div class="message-body ">
                                                Format ไฟล์ข้อมูลถูกต้องสามารถอัปโหลดไฟล์ข้อมูลได้<br/>
                                                {this.state.nameFloderRound1}<br/>
                                                {this.state.nameFloderRound2}
                                            </div>
                                        </article>}


                                    <div class="columns is-multiline is-centered">
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
