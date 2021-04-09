import React, { Component, Fragment } from 'react'
import Product from './Product';
import axios from "axios";
import * as XLSX from 'xlsx'
const config = require('../config.json');

export default class Upload_academy extends Component {

    state = { fileUrl: '', file: '', filename: '' }
    state = {
        professor: '',
        department: '',
        version: '',
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
        console.log(file.name);

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

            if (this.state.version == 'รายงานบทความ/ผลงานตีพิมพ์ในวารสารวิชาการต่างๆ') {

                var DepartmentFromFile = d.A2.v;
                var VersionFromFile = d.AE2.v;
                var ProfessorFromFile = d.K2.v;

                if (DepartmentFromFile == this.state.department && VersionFromFile == this.state.version && ProfessorFromFile == this.state.professor) {
                    alert('Correct 1 --> Format ถูกต้องสามารถอัปโหลดข้อมูลได้');
                }
                else {
                    //เเจ้งว่าผิดพลาดอะไรบ้าง
                    var text_alert = "";
                    if (DepartmentFromFile != this.state.department) {
                        text_alert = text_alert + "!! สาขาวิชาไม่ตรงกับข้อมูลนำเข้า \n";
                    }
                    if (VersionFromFile != this.state.version) {
                        text_alert = text_alert + "!! ประเภทไม่ตรงกับข้อมูลนำเข้า \n";
                    }
                    if (ProfessorFromFile != this.state.professor) {
                        text_alert = text_alert + "!! ชื่อเจ้าของผลงานไม่ตรงกับข้อมูลนำเข้า \n";
                    }
                    alert(text_alert);
                }
            }
            if (this.state.version == 'รายงานการเสนอผลงานในที่ประชุมวิชาการ') {

                var DepartmentFromFile = d.A2.v;
                var VersionFromFile = d.AH2.v;
                var ProfessorFromFile = d.N2.v;

                if (DepartmentFromFile == this.state.department && VersionFromFile == this.state.version && ProfessorFromFile == this.state.professor) {
                    alert('Correct 2 --> Format ถูกต้องสามารถอัปโหลดข้อมูลได้')
                }
                else {
                    //เเจ้งว่าผิดพลาดอะไรบ้าง
                    var text_alert = "";
                    if (DepartmentFromFile != this.state.department) {
                        text_alert = text_alert + "!! สาขาวิชาไม่ตรงกับข้อมูลนำเข้า \n";
                    }
                    if (VersionFromFile != this.state.version) {
                        text_alert = text_alert + "!! ประเภทไม่ตรงกับข้อมูลนำเข้า \n";
                    }
                    if (ProfessorFromFile != this.state.professor) {
                        text_alert = text_alert + "!! ชื่อเจ้าของผลงานไม่ตรงกับข้อมูลนำเข้า \n";
                    }
                    alert(text_alert);
                }

            }

        })
            .catch(err => {
                alert('Format ไฟล์ข้อมูลไม่ถูกต้อง!!');
            })

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
                        <div class="column"></div>
                    </div>


                </div>



            </Fragment>
        )
    }
}
