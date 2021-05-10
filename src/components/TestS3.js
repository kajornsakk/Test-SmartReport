import React, { Component, Fragment, useState } from 'react'
import { Storage } from 'aws-amplify'
import * as XLSX from 'xlsx';
import axios from 'axios';
import { jsPDF } from "jspdf";


export const TestS3 = props => {

    const [dataHistory, setdataHistory] = useState([]);

    function clickTest() {
        console.log("TTT");

        var AWS = require('aws-sdk');
        AWS.config.update(
            {
                accessKeyId: "AKIAJJOOQS6RRWQUJKNQ",
                secretAccessKey: "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",
                region: 'us-east-1'
            }
        );

        var s3 = new AWS.S3();
        var wb;
        var ws;
        var arrDateCheck = [];
        var arrFilePath = [
            "public/สาขาวิชาวิทยาการคอมพิวเตอร์/ผลงานทางวิชาการ/รายงานการเสนอผลงานในที่ประชุมวิชาการ/ประภาพร รัตนธำรง_สาขาวิชาวิทยาการคอมพิวเตอร์_รายงานการเสนอผลงานในที่ประชุมวิชาการ_25-04-2021 15:40:04.xlsx",
        ];

        arrFilePath.forEach(filePath => {
            s3.getObject(
                {
                    Bucket: "amplifys3smartreport142809-dev",
                    Key: filePath
                },
                function (error, data) {
                    if (error != null) {
                        alert("Failed to retrieve an object: " + error);
                    }
                    else {
                        wb = XLSX.read(data.Body, { type: "buffer" });
                        ws = wb.Sheets["RG301_Report"];
                        var rage = XLSX.utils.decode_range(ws['!ref']);
                        for (let i = 0; i <= rage.e.r; i++) {
                            var serial = ws[XLSX.utils.encode_cell({ r: i, c: 8 })].v;

                            var utc_days = Math.floor(serial - 25569);
                            var utc_value = utc_days * 86400;
                            var date_info = new Date(utc_value * 1000);

                            var date = new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate());


                            //รอบ 1
                            var startdate1 = new Date('07/01/2020'); //  01 / 07 / 20
                            var enddate1 = new Date('12/31/2020'); //   31 / 12 / 20
                            // รอบ2
                            var startdate2 = new Date('01/01/2020'); //   01 / 01 /20
                            var enddate2 = new Date('06/31/2020'); //   31 / 06 / 20

                            var CheckRound1 = 0;
                            var CheckRound2 = 0;
                            if (date >= startdate1 && date <= enddate1) {
                                console.log('รอบ1');
                                CheckRound1++;
                            }
                            else if (date >= startdate2 && date <= enddate2) {
                                console.log('รอบ2');
                                CheckRound2++;
                            }

                            if (CheckRound1 > 1) {
                                //ให้ true , เเละนำ filepath ยัดใส่ arr
                            }
                            else if (CheckRound2 > 1) {

                            }

                            // console.log(startdate1);
                            // console.log(enddate1);
                            // console.log(date);
                            // arrDateCheck.push()
                        }

                    }

                }
            );
        });


    }

    function CallAPI() {

        var arrToSend = {
            "httpMethod": "POST",
            "tableName": "Test2",
        }
        var obj = JSON.parse('{ "httpMethod":"POST", "tableName":"This is Table Name"}');

        var apiUrl = "";
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': "*",
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            }
        };
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

    }

    function fecthEmailHistory() {

        const dataRes = [];
        var arrToSend = {
            "department": "วิทยาการคอมพิวเตอร์",
            "salaryround": "round2_2563",
        }
        var apiUrl = "https://haw3rvgwd2.execute-api.us-east-1.amazonaws.com/dev/fetch-history";
        axios.post(apiUrl, arrToSend)
            .then((res => {
                console.log(res.data.dataResponse.Items);
                // console.log(res.data.Response);
                setdataHistory(res.data.dataResponse.Items);

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
    }

    function generatePDF() {
        const doc = new jsPDF();

        doc.text("Faculty of Science and Technology ", 10, 10);
        doc.text("Thammsat University", 10, 20)
        doc.save("a4.pdf");
    }

    return (
        <Fragment>
            <button onClick={fecthEmailHistory}>Click Test</button>



            <button onClick={generatePDF}>Generate PDF</button>

            <div class="column is-centered">
                <table class="table is-striped is-fullwidth">
                    <thead>
                        <th>สาขาวิชา</th>
                        <th>ชื่ออาจารย์</th>
                        <th>รอบเลื่อนเงินเดือน</th>
                        <th>สถานะ</th>
                        <th>อีเมล</th>
                        <th>วันเวลา</th>
                    </thead>
                    <tbody>

                        {dataHistory.map(list => (
                            <tr>
                                <td>{list.department}</td>
                                <td>{list.instructor}</td>
                                <td>{list.salaryround}</td>
                                <td>{list.status}</td>
                                <td></td>
                                <td>{list.time}</td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>

            <progress class="progress is-small is-primary" max="100">15%</progress>



        </Fragment>

    )
}

export default TestS3















// export default class TestS3 extends Component {


//     clickList =() =>{

//     }

//     render() {
//         return (
//             <div>
//                 <button onClick={this.clickList}>Click</button>
//             </div>
//         )
//     }
// }