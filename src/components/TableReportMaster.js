import React, { Fragment } from 'react'
import { useState, useEffect } from 'react';

export const TableReportMaster = props => {


    const AWS = require('aws-sdk/global');
    AWS.config.update({
        accessKeyId: 'AKIAJJOOQS6RRWQUJKNQ',
        secretAccessKey: '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',
        region: 'us-east-1'
    });
    const s3 = new AWS.S3();

    const [listFiles, setListFiles] = useState([]);

    async function ReadFileFromS3() {

        var prefixLectrue = 'public/' + props.department + '/ภาระงานสอน/ปริญญาโท/';
        const paramsLecture = {
            Bucket: 'amplifys3smartreport142809-dev',
            Delimiter: '',
            Prefix: prefixLectrue,
        };
        var arrData = [];
        var arrBufferCourse = [];
        var count = 1;
        await s3.listObjectsV2(paramsLecture, (err, data) => {

            var contents = data.Contents;

            console.log(data.Contents);
            contents.forEach(content => {
                arrBufferCourse.push({
                    ['course']: (content.Key).split('/')[4]
                })
            })
            const arrCourse = [...(new Set(arrBufferCourse.map(({ course }) => course)))];
            // console.log(arrCourse);

            var test = [];
            arrCourse.forEach(course => {
                var arrBufferLecture = [];
                var arrBufferAcademy = [];
                contents.forEach(content => {
                    // console.log(content);
                    // console.log(((content.Key).split('public/' + props.department + '/ภาระงานสอน/ปริญญาตรี/')[1]).split('/')[0]);
                    var checkCourse = ((content.Key).split('public/' + props.department + '/ภาระงานสอน/ปริญญาโท/')[1]).split('/')[0];
                    var checkLecture = ((content.Key).split('public/' + props.department + '/ภาระงานสอน/ปริญญาโท/')[1]).split('/')[1];

                    if (course == checkCourse && checkLecture == 'วิชาบรรยาย-วิชาปฏิบัติ') {
                        arrBufferLecture.push(content.Key);
                    }
                    if (course == checkCourse && checkLecture == 'วิทยานิพนธ์-สารนิพนธ์') {
                        arrBufferAcademy.push(content.Key);
                    }

                })
                var lengthh = arrBufferLecture.length;
                test.push(arrBufferLecture[lengthh - 1])

                var lengthhh = arrBufferAcademy.length;
                test.push(arrBufferAcademy[lengthhh - 1])
            })
            // console.log(arrBufferLecture);
            console.log(test);
            var arrShow = [];
            var count = 1;
            test.forEach(list => {
                console.log(list);
                //ตรวจสอบเเต่ละไฟล์ว่สตรงกับรอบเงินเดือนไหม ถ้าตรงให้ใส่ true หรือ tag is-primary (เพื่อบอกสี)

                var value = '';
                var buffer1 = ((list).split('/')[6]).split('_');
                var bufferYear = buffer1[0];
                var bufferSemester = buffer1[1];
                var semesterYear = bufferYear + "_" + bufferSemester + "_";

                if (semesterYear === props.yearSemesterSalaryRound) {
                    value = 'tag is-primary';
                } else {
                    value = false;
                }

                // 
                arrShow.push({
                    ['id']: count,
                    ['course']: ((list).split('/')[4]).split(' ')[1],
                    ['lecture']: (list).split('/')[5],
                    ['file']: (list).split('/')[5],
                    ['isChecked']: value
                })
                count++;
            })
            console.log(arrShow);
            setListFiles(arrShow);

        });

    }

    return (
        <Fragment>
            <button onClick={ReadFileFromS3}>test</button>
            <tbody>
                <tr>
                    <th>ปริญญาโท</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                {listFiles.map((list, index) => (
                    <tr key={index}>
                        <td></td>
                        <td>{list.course}</td>
                        <td>{list.lecture}</td>
                        <td></td>
                        <td><span class={`${list.isChecked}`}>อัปโหลดเเล้ว</span></td>

                    </tr>
                ))}
            </tbody>

        </Fragment>

    )
}

export default TableReportMaster