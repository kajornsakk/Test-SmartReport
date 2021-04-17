import React from 'react'
import * as XLSX from 'xlsx';
import axios from 'axios';

export const SendEmail = props => {

    const onClickSend = () => {

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
        alert(listTosend + "To send in your Email");

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
        s3.getObject(
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
                    let name = 'name';
                    let email = 'email';
                    let link = 'link';
                    for (let j = 0; j < listTosend.length; j++) {
                        for (let i = 0; i < arrInstructorsListExcel.length; i++) {
                            if (listTosend[j] === arrInstructorsListExcel[i]) {
                                const s3 = new AWS.S3();
                                var params = { Bucket: "guy-bucket-test", Key: listTosend[j] };
                                var url = s3.getSignedUrl('getObject', params);
                                arrToSend.push(
                                {
                                    [name]: arrInstructorsListExcel[i],
                                    [email]: arrEmail[i],
                                    [link] : url
                                })
                            }
                        }
                    }
                    console.log(arrToSend);

                    // Send Email
                    var apiUrl = "https://amy1ptw2q6.execute-api.us-east-1.amazonaws.com/dev/lecture";
                    let axiosConfig = {
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8',
                            "Access-Control-Allow-Origin": "*",
                            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                        }
                    };
                    axios.post(apiUrl, arrToSend, axiosConfig)
                        .then((res =>{
                            console.log(res);
                            if (res.status === '200') {
                                alert('The email has been sent')
                            }

                        }))
                        .catch((error)=>{
                            if (error.response) {
                                console.log(error.response);
                            } else if (error.request) {
                                console.log(error.request);
                            }
                        })

                }
            }
        );



    }
    return (

        <div class="columns is-multiline is-centered">
            <div class="field">
                <button class="button is-primary" onClick={onClickSend}>ส่งฟอร์มภาระงาน</button>
            </div>
        </div>
    )
}

export default SendEmail