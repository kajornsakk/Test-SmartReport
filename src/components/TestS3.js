import React, { Component, Fragment, useState } from 'react'
import { Storage } from 'aws-amplify'
import * as XLSX from 'xlsx';
import axios from 'axios';
import { jsPDF } from "jspdf";


// -----------------------------------------------------------------------------



// -----------------------------------------------------------------------------

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

        <section className="hero">
            <div className="hero-body">
                <div class="columns pt-6">
                    <div class="column mt-6">
                        <img src="3094352.jpg" alt="conserve energy" />
                    </div>
                    <div class="column mt-6">
                        <section class="section auth">
                        <h1>เข้าสู่ระบบ</h1>
                            <form >
                                <div className="field">
                                    <p className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            id="username"
                                            aria-describedby="usernameHelp"
                                            placeholder="กรอกอีเมล"

                                        />
                                    </p>
                                </div>
                                <div className="field">
                                    <p className="control has-icons-left">
                                        <input
                                            className="input"
                                            type="password"
                                            id="password"
                                            placeholder="รหัสผ่าน"

                                        />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-lock"></i>
                                        </span>
                                    </p>
                                </div>
                                <div className="field">
                                    <p className="control">
                                        <a href="/register">ลงทะเบียน</a>
                                    </p>
                                </div>
                                <div className="field">
                                    <p className="control">
                                        <a href="/forgotpassword">ลืมรหัสผ่าน?</a>
                                    </p>
                                </div>
                                <div className="field">
                                    <p className="control">
                                        <button className="button is-primary">
                                            เข้าสู่ระบบ
                                        </button>
                                    </p>
                                </div>
                            </form>
                        </section>
                    </div>

                </div>
            </div>
        </section>



        // <section className="hero ">
        //     <div className="hero-body">
        //         <div className="container">

        //             <div class="columns is-multiline">
        //                 <div class="column is-one-quarter">
        //                     <form >
        //                         <div className="field">
        //                             <p className="control">
        //                                 <input
        //                                     className="input"
        //                                     type="text"
        //                                     id="username"
        //                                     aria-describedby="usernameHelp"
        //                                     placeholder="กรอกอีเมล"

        //                                 />
        //                             </p>
        //                         </div>
        //                         <div className="field">
        //                             <p className="control has-icons-left">
        //                                 <input
        //                                     className="input"
        //                                     type="password"
        //                                     id="password"
        //                                     placeholder="รหัสผ่าน"

        //                                 />
        //                                 <span className="icon is-small is-left">
        //                                     <i className="fas fa-lock"></i>
        //                                 </span>
        //                             </p>
        //                         </div>
        //                         <div className="field">
        //                             <p className="control">
        //                                 <a href="/register">ลงทะเบียน</a>
        //                             </p>
        //                         </div>
        //                         <div className="field">
        //                             <p className="control">
        //                                 <a href="/forgotpassword">ลืมรหัสผ่าน?</a>
        //                             </p>
        //                         </div>
        //                         <div className="field">
        //                             <p className="control">
        //                                 <button className="button is-primary">
        //                                     เข้าสู่ระบบ
        //                                 </button>
        //                             </p>
        //                         </div>
        //                     </form>
        //                 </div>
        //                 <div class="column is-one-quarter">
        //                 </div>
        //                 <figure class="image is-128x128">
        //                     <img src="3094352.jpg" alt="conserve energy" />
        //                 </figure>
        //             </div>
        //         </div>


        //     </div>
        // </section>

    )
}

export default TestS3











{/* <Fragment>

<section className="section auth">
    <div className="container">


        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">ระดับการศึกษา: </label>
            </div>
            <div class="field-body">
                <div class="field ">
                    <div class="control">
                        <label class="radio">
                            <input type="radio" name="member"/>
                                ปริญญาตรี
                        </label>
                    </div>
                </div>
                <div class="field ">
                    <div class="control">
                        <label class="radio">
                            <input type="radio" name="member"/>
                                ปริญญาโท
                        </label>
                    </div>
                </div>
                <div class="field ">
                    <div class="control">
                        <label class="radio">
                            <input type="radio" name="member"/>
                                ปริญญาเอก
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label class="label">สาขาวิชา:</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <div class="select is-fullwidth">
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
                        <div class="select is-fullwidth">
                            <select>
                                <option>โปรดเลือก</option>
                                <option>วิทยาศาสตรบัณฑิต สาขาวิชาเคมี</option>
                                <option>วิทยาศาสตรบัณฑิต สาขาวิชาฟิสิกส์</option>
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
                        <div class="select is-fullwidth">
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
                        <input class="input" type="text" placeholder="ปีการศึกษา"></input>
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <div class="select is-fullwidth">
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



    </div>
</section>




</Fragment> */}


{/* <div class="field is-horizontal">
<div class="field-label is-normal">
    <label class="label">From</label>
</div>
<div class="field-body">
    <div class="field is-narrow">
        <div class="control">
            <div class="select is-fullwidth">
                <select>
                    <option>โปรดเลือก</option>
                    <option>วิชาบรรยาย-วิชาปฏิบัติ</option>
                    <option>ซีเนียร์โปรเจค-ปัญหาพิเศษ-สัมมนา</option>
                </select>
            </div>
        </div>
    </div>
</div>
</div> */}














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