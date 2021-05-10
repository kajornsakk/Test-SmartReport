// import React, { Fragment, useState } from 'react'
import * as XLSX from 'xlsx';
import axios from 'axios';
import moment from 'moment';
import PopupSendSuccess from './PopupSendSuccess';

import React, { Component, Fragment, useState } from 'react'

// export default class SendEmail extends Component {
export const SendEmail = props => {

    // state = {
    //     showPopupSendSuccess: false,
    // }
    const [showPopupSendSuccess, setshowPopupSendSuccess] = useState(false);
    const [showMessageSendSuccess, setshowMessageSendSuccess] = useState([]);

    function clickPopupClose() {
        setshowPopupSendSuccess(!showPopupSendSuccess);
        console.log(showMessageSendSuccess);
    }

    async function onClickSend() {

        let dataFromProps = props.data;
        const listTosend = [];
        console.log(dataFromProps);
        for (let i = 0; i < dataFromProps.length; i++) {
            // ถ้าติดเลือกอันไหนค่าจะเป็น true เเล้วเอาใน arr listTosend
            if (dataFromProps[i].isChecked) {
                console.log(dataFromProps[i].value);
                listTosend.push(dataFromProps[i].name);
            }
        }
        // alert(listTosend + "To send in your Email");

        // เพิ่มเติม
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
        var arrInstructorsListExcel = [];
        var arrEmail = [];
        var arrToSend = [];
        await s3.getObject(
            {
                Bucket: "amplifys3storagegetestnd132251-dev",
                Key: "email/email-instructor.xlsx"
            },
            function (error, data) {
                if (error != null) {
                    alert("Failed to retrieve an object: " + error);
                } else {
                    wb = XLSX.read(data.Body, { type: "buffer" });
                    ws = wb.Sheets["Sheet1"];
                    var rage = XLSX.utils.decode_range(ws['!ref']);

                    for (let i = 1; i <= rage.e.r; i++) {
                        var bufferInstructor = ws[XLSX.utils.encode_cell({ r: i, c: 0 })].v;
                        arrInstructorsListExcel.push(bufferInstructor);
                    }

                    for (let j = 1; j <= rage.e.r; j++) {
                        var bufferEmail = ws[XLSX.utils.encode_cell({ r: j, c: 2 })].v;
                        arrEmail.push(bufferEmail);
                    }

                    // map ชื่อที่มาจาก checkbox กับชื่อเเละอีเมลใน s3 เเละเเปะลิงค์ดาวน์โหลด

                    let monthSearchFile = '';
                    let yearSearchFile = '';
                    if (props.salaryRound === "รอบ1 เดือน เมษายน") {
                        monthSearchFile = 'กรกฎาคม-ธันวาคม';
                        yearSearchFile = props.year;
                    }
                    if (props.salaryRound === "รอบ2 เดือน ตุลาคม") {
                        monthSearchFile = 'มกราคม-มิถุนายน';
                        yearSearchFile = props.year;
                    }

                    console.log(monthSearchFile);
                    console.log(yearSearchFile);

                    let d = 'สาขาวิชาวิทยาการคอมพิวเตอร์';
                    let y = '2562';
                    let s = 'รอบ1 เดือน เมษายน';
                    console.log(d);
                    console.log(y);
                    console.log(typeof s);
                    console.log(props.salaryRound);

                    let count = 1;
                    for (let j = 0; j < listTosend.length; j++) {
                        for (let i = 0; i < arrInstructorsListExcel.length; i++) {
                            if (listTosend[j] === arrInstructorsListExcel[i]) {
                                const s3 = new AWS.S3();
                                var keyName = `reports/${props.department}/${props.year}/${props.salaryRound}/แบบฟอร์มรายงานผลการปฏิบัติงาน_${arrInstructorsListExcel[i]}_${props.department}_${monthSearchFile}_${yearSearchFile}.xlsx`;
                                var params = { Bucket: "guy-bucket-test", Key: keyName };

                                console.log(listTosend[j]);
                                var url = s3.getSignedUrl('getObject', params);
                                console.log(url);

                                let round = keyName.split("/")[3];
                                let year = (keyName.split("/")[2]);
                                let salaryRound = '';
                                if (round === 'รอบ1 เดือน เมษายน') {
                                    salaryRound = "round1_" + year;
                                }
                                if (round === 'รอบ2 เดือน ตุลาคม') {
                                    salaryRound = "round2_" + year;
                                }

                                let department = keyName.split("/")[1];
                                let status = 'ส่งเเล้ว';
                                const DASH_DMYHMS = 'DD-MM-YYYY HH:mm:ss';
                                let time = moment().format(DASH_DMYHMS);

                                arrToSend.push(
                                    {
                                        ['ID']: time + " " + count,
                                        ['instructor']: arrInstructorsListExcel[i],
                                        ['email']: arrEmail[i],
                                        ['link']: url,
                                        ['department']: department,
                                        ['salaryround']: salaryRound,
                                        ['year']: year,
                                        ['status']: status,
                                        ['time']: time
                                    })
                                count++;

                            }
                        }
                    }
                    console.log(arrToSend);

                    if (arrToSend.length >= 1) {
                        // Send Email
                        // https://amy1ptw2q6.execute-api.us-east-1.amazonaws.com/dev/lecture
                        var apiUrl = "https://haw3rvgwd2.execute-api.us-east-1.amazonaws.com/dev/sendEmail";
                        let axiosConfig = {
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8',
                                "Access-Control-Allow-Origin": "*",
                                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                            }
                        };
                        axios.post(apiUrl, arrToSend)
                            .then((res => {

                                console.log(res);
                                console.log(res.data);
                                setshowMessageSendSuccess(res.data.resFromSave);

                                console.log(res.status);
                                if (res.status === 200) {
                                    setshowPopupSendSuccess(true);
                                }

                            }))
                            .catch((error) => {
                                if (error.response) {
                                    console.log(error.response);
                                } else if (error.request) {
                                    console.log(error.request);
                                }
                            })
                        // this.setState({ showPopupSendSuccess: true })
                    }
                    else {
                        alert('โปรดเลือกรายการส่งอีเมล')
                    }

                }
            }
        );



    }

    // render() {
    return (
        <Fragment>

            <section class="section is-small">
                <div class="columns is-multiline">
                    <div class="column"></div>
                    <div class="field">
                        <button class="button is-primary" onClick={onClickSend}>ส่งฟอร์มภาระงาน</button>
                    </div>
                </div>
            </section>

            {showPopupSendSuccess && <PopupSendSuccess
                clickPopup={clickPopupClose}
                department={props.department}
                year={props.year}
                salaryRound={props.salaryRound}
                dataToShow={showMessageSendSuccess}
            />}
        </Fragment>
    )
    // }
}
export default SendEmail


// export const SendEmail = props => {

//     const [responseFromSendEmail, setresponseFromSendEmail] = useState([]);
//     const [showPopupSendSuccess, setShowPopupSendSuccess] = useState(false);

    // const onClickSend = () => {

    //     let dataFromProps = props.data;
    //     const listTosend = [];
    //     console.log(dataFromProps);
    //     for (let i = 0; i < dataFromProps.length; i++) {
    //         // ถ้าติดเลือกอันไหนค่าจะเป็น true เเล้วเอาใน arr listTosend
    //         if (dataFromProps[i].isChecked) {
    //             console.log(dataFromProps[i].value);
    //             listTosend.push(dataFromProps[i].name);
    //         }
    //     }
    //     alert(listTosend + "To send in your Email");

    //     // เพิ่มเติม
    //     var AWS = require('aws-sdk');
    //     AWS.config.update(
    //         {
    //             accessKeyId: "AKIAJJOOQS6RRWQUJKNQ",
    //             secretAccessKey: "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",
    //             region: 'us-east-1'
    //         }
    //     );

    //     var s3 = new AWS.S3();
    //     var wb;
    //     var ws;
    //     var arrInstructorsListExcel = [];
    //     var arrEmail = [];
    //     var arrToSend = [];
    //     s3.getObject(
    //         {
    //             Bucket: "amplifys3storagegetestnd132251-dev",
    //             Key: "email/email-instructor.xlsx"
    //         },
    //         function (error, data) {
    //             if (error != null) {
    //                 alert("Failed to retrieve an object: " + error);
    //             } else {
    //                 wb = XLSX.read(data.Body, { type: "buffer" });
    //                 ws = wb.Sheets["Sheet1"];
    //                 var rage = XLSX.utils.decode_range(ws['!ref']);

    //                 for (let i = 1; i <= rage.e.r; i++) {
    //                     var bufferInstructor = ws[XLSX.utils.encode_cell({ r: i, c: 0 })].v;
    //                     arrInstructorsListExcel.push(bufferInstructor);
    //                 }

    //                 for (let j = 1; j <= rage.e.r; j++) {
    //                     var bufferEmail = ws[XLSX.utils.encode_cell({ r: j, c: 2 })].v;
    //                     arrEmail.push(bufferEmail);
    //                 }

    //                 // map ชื่อที่มาจาก checkbox กับชื่อเเละอีเมลใน s3 เเละเเปะลิงค์ดาวน์โหลด
    //                 let name = 'name';
    //                 let email = 'email';
    //                 let link = 'link';
    //                 for (let j = 0; j < listTosend.length; j++) {
    //                     for (let i = 0; i < arrInstructorsListExcel.length; i++) {
    //                         if (listTosend[j] === arrInstructorsListExcel[i]) {
    //                             const s3 = new AWS.S3();
    //                             var params = { Bucket: "guy-bucket-test", Key: listTosend[j] };
    //                             var url = s3.getSignedUrl('getObject', params);
    //                             arrToSend.push(
    //                                 {
    //                                     [name]: arrInstructorsListExcel[i],
    //                                     [email]: arrEmail[i],
    //                                     [link]: url
    //                                 })
    //                         }
    //                     }
    //                 }
    //                 console.log(arrToSend);

    //                 if (arrToSend.length >= 1) {
    //                     // Send Email
    //                     var apiUrl = "https://amy1ptw2q6.execute-api.us-east-1.amazonaws.com/dev/lecture";
    //                     let axiosConfig = {
    //                         headers: {
    //                             'Content-Type': 'application/json;charset=UTF-8',
    //                             "Access-Control-Allow-Origin": "*",
    //                             'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    //                         }
    //                     };
    //                     axios.post(apiUrl, arrToSend)
    //                         .then((res => {
    //                             console.log(res);
    //                             //set arr respone to sate
    //                             setresponseFromSendEmail(res.data.Response)
    //                             console.log(res.data.Response);
    //                             setShowPopupSendSuccess(true);

    //                             if (res.status === '200') {
    //                                 alert('The email has been sent')
    //                             }

    //                         }))
    //                         .catch((error) => {
    //                             if (error.response) {
    //                                 console.log(error.response);
    //                             } else if (error.request) {
    //                                 console.log(error.request);
    //                             }
    //                         })
    //                 }
    //                 else {
    //                     alert('โปรดเลือกรายการส่งอีเมล')
    //                 }



    //             }
    //         }
    //     );



    // }
//     return (

        // <Fragment>
        //     <div class="columns is-multiline is-centered">
        //         <div class="field">
        //             <button class="button is-primary" onClick={onClickSend}>ส่งฟอร์มภาระงาน</button>
        //         </div>
        //     </div>
        //     {/* {showPopupSendSuccess && <PopupSendSuccess listSuccess = {responseFromSendEmail}/>} */}
        //     {showPopupSendSuccess && <PopupSendSuccess />}
        // </Fragment>


//     )
// }

// export default SendEmail