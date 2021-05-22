import React, { Component, Fragment, useState } from 'react'
import { Storage } from 'aws-amplify'
import * as XLSX from 'xlsx';
import axios from 'axios';
import { jsPDF } from "jspdf";


export const SendEmailHistory = props => {

    const [dataHistory, setdataHistory] = useState([]);
    const [department, setdepartment] = useState();
    const [salaryRound, setsalaryRound] = useState();
    const [year, setyear] = useState();
    const [showDataHistory, setshowDataHistory] = useState(false);

    function onChangeDepartment(e) {
        setdepartment(e.target.value);
    }
    function onChangeSalaryRounf(e) {
        setsalaryRound(e.target.value);
    }
    function onChangeYear(e) {
        setyear(e.target.value);
    }

    function fecthEmailHistory() {

        // console.log(department);
        // console.log(salaryRound);
        // console.log(year);

        let round_year = '';
        if (salaryRound === 'รอบ 1 เดือน เมษายน') {
            round_year = "round1" + "_" + year;
        }
        if (salaryRound === 'รอบ 2 เดือน ตุลาคม') {
            round_year = "round2" + "_" + year;
        }

        const dataRes = [];
        var arrToSend = {
            "department": department,
            "salaryround": round_year,
        }
        var apiUrl = "https://haw3rvgwd2.execute-api.us-east-1.amazonaws.com/dev/fetch-history";
        axios.post(apiUrl, arrToSend)
            .then((res => {
                console.log(res.data.dataResponse.Items);
                // console.log(res.data.Response);


                if (res.status === 200) {
                    setdataHistory(res.data.dataResponse.Items);
                    setshowDataHistory(true);
                }

            }))
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                } else if (error.request) {
                    console.log(error.request);
                }
            })
    }

    function generatePDF() {
        const doc = new jsPDF();

        doc.text("Faculty of Science and Technology ", 10, 10);
        doc.text("Thammsat University", 10, 20)
        doc.save("a4.pdf");
    }

    return (
        <Fragment>

            <div className="box cta ">

                {/* Tabs */}
                <div class="tabs is-centered">
                    <ul>
                        <li >
                            <a href="/Report" className="navbar-item" ><span class="icon is-small" ><i class="far fa-file-alt" aria-hidden="true"></i></span>
                                     สร้างแบบฟอร์มภาระงานอาจารย์
                                </a>
                        </li>

                        <li >
                            <a href="/Send_report" className="navbar-item" ><span class="icon is-small" ><i class="far fa-file-alt" aria-hidden="true"></i></span>
                                     ส่งแบบฟอร์มภาระงานอาจารย์
                                </a>
                        </li>

                        <li class="is-active" >
                            <a href="" className="navbar-item" ><span class="icon is-small" ><i class="far fa-file-alt" aria-hidden="true"></i></span>
                                     ประวัติการส่งแบบฟอร์ม
                                </a>
                        </li>

                    </ul>
                </div>

                {/* Search */}
                <div class="columns">
                    <div class="column"></div>
                    <div class="column is-four-fifths">

                        {/*  */}

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
                                                    <div class="select is-fullwidth" value={department} onChange={onChangeDepartment}>
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
                                            <label class="label">รอบเลื่อนเงินเดือน:</label>
                                        </div>
                                        <div class="field-body">
                                            <div class="field">
                                                <div class="control">
                                                    <div class="select is-fullwidth" value={salaryRound} onChange={onChangeSalaryRounf}>
                                                        <select>
                                                            <option>โปรดเลือก</option>
                                                            <option>รอบ 1 เดือน เมษายน</option>
                                                            <option>รอบ 2 เดือน ตุลาคม</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="field is-horizontal">
                                        <div class="field-label is-normal">
                                            <label class="label">ปีงบประมาณ:</label>
                                        </div>
                                        <div class="field-body">
                                            <div class="field">
                                                <div class="control">
                                                <input class="input" type="text" placeholder="ปีงบประมาณ" value={year} onChange={onChangeYear}></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </section>
                            </div>

                        </div>
                        {/*  */}


                        <section class="section is-small">
                            <div class="columns is-multiline is-centered">
                                <div class="field">
                                    <div class="column is-one-quarter">
                                        <button class="button is-primary " onClick={fecthEmailHistory}>
                                            <span>ค้นหาข้อมูล</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>

                    <div class="column"></div>
                </div>

                {/* Table */}

                {/* {showDataHistory && <div><br />
                <span class="is-size-4 has-text-primary">
                    ประวัติส่งแบบฟอร์มผลการปฏิบัติงาน
                        </span>
                <br /></div>} */}

                {showDataHistory && <div class="columns">
                    <div class="column"></div>
                    <div class="column is-four-fifths">
                        <div class="card">

                            <table class="table is-striped is-fullwidth">
                                <thead>
                                    <th>สาขาวิชา</th>
                                    <th>ชื่ออาจารย์</th>
                                    <th>รอบเลื่อนเงินเดือน</th>
                                    <th>อีเมล</th>
                                    <th>สถานะ</th>
                                    <th>วันเวลา</th>
                                </thead>
                                <tbody>

                                    {dataHistory.map(list => (
                                        <tr>
                                            <td>{list.department}</td>
                                            <td>{list.instructor}</td>
                                            <td>{list.salaryround}</td>
                                            <td>{list.email}</td>
                                            <td><span class="is-size-6 has-text-primary">{list.status}</span></td>
                                            <td>{list.time}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>

                        </div>
                    </div>
                    <div class="column"></div>
                </div>}

                {/* <div class="columns is-multiline is-centered">
                    <div class="field">
                        <div class="column is-one-quarter">
                            <button class="button is-primary " onClick={generatePDF}>
                                <span class="icon is-small">
                                    <i class="fas fa-check"></i>
                                </span>
                                <span>Generate PDF</span>
                            </button>
                        </div>
                    </div>
                </div> */}


            </div>

        </Fragment>

    )
}

export default SendEmailHistory