import React, { Fragment } from 'react'
import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import CheckBox3 from './CheckBox3';
export const TableAcademyEveryoneReport = props => {

    // Test get งานวิชาการ #####################################################
    const AWS = require('aws-sdk/global');

    AWS.config.update({
        accessKeyId: 'AKIAJJOOQS6RRWQUJKNQ',
        secretAccessKey: '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',
        region: 'us-east-1'
    });
    const s3 = new AWS.S3();
    var instructor = ["ประภาพร รัตนธำรง", "วนิดา พฤทธิวิทยา", "นุชชากร งามเสาวรส", "เสาวลักษณ์ วรรธนาภา", "ธนาธร ทะนานทอง",
        "เยาวดี เต็มธนาภัทร์", "เด่นดวง ประดับสุวรรณ"];

    var prefix = 'public/' + props.department + '/ผลงานทางวิชาการ/';
    const paramsTest = {
        Bucket: 'amplifys3smartreport142809-dev',
        Delimiter: '',
        Prefix: prefix,
    };

    const [listFiles, setListFiles] = useState([]);
    const [listShow, setlistShow] = useState([]);
    useEffect(() => {
        // async function test() {
        var arrData = [];
        var arr = [];
        var arrArtical = [];
        var arrPresentation = [];
        s3.listObjectsV2(paramsTest, (err, data) => {
            console.log(data.Contents);
            var contents = data.Contents;

            var id = 'id';
            var name = 'name';
            var isChecked = 'isChecked';
            var file = 'file';
            var count = 1;
            contents.forEach(content => {
                arrData.push({
                    [id]: count,
                    [name]: ((content.Key).split('/')[4]).split('_')[0],
                    [file]: (content.Key).split('/')[3],
                    ['filePath']: content.Key,
                    [isChecked]: false,
                    ['time']: content.LastModified
                })
                count++;
            });


            console.log(arrData);
            setListFiles(arrData);

            // เพิ่มเติม ----------------------------------------------------------------

            // var arrFilePath = [];
            // arrData.forEach(file => {
            //     arrFilePath.push(file.filePath);
            // })
            // console.log(arrFilePath);
            var arrOutput = [];
            var wb;
            var ws;

            // sort file ใน arrData ก่อน
            var arrBufferCon = [];
            var arrBufferArtical = [];
            arrData.forEach(list => {
                if (list.file === 'รายงานการเสนอผลงานในที่ประชุมวิชาการ') {
                    arrBufferCon.push({
                        ['name']: list.name,
                        ['file']: list.file,
                        ['filePath']: list.filePath,
                        ['time']: list.time
                    })
                }
                else if (list.file === 'รายงานบทความ-ผลงานตีพิมพ์ในวารสารวิชาการต่างๆ') {
                    arrBufferArtical.push({
                        ['name']: list.name,
                        ['file']: list.file,
                        ['filePath']: list.filePath,
                        ['time']: list.time
                    })
                }
            })

            // หาจำนวนอาจารย์
            const arrInstructor = [...(new Set(arrData.map(({ name }) => name)))];

            // console.log(arrBufferCon.reverse()); // reverse ให้ไฟล์ล่าสุดอยู่ตัวเเรก
            // console.log(arrBufferArtical.reverse()); // reverse ให้ไฟล์ล่าสุดอยู่ตัวเเรก

            var arrCon = [];
            arrInstructor.forEach(instructor => {
                var count = 0;
                arrBufferCon.forEach(list => {
                    if (list.name === instructor) {

                        if (count === 0) {
                            arrCon.push({
                                ['name']: list.name,
                                ['file']: list.file,
                                ['filePath']: list.filePath,
                                ['time']: list.time
                            })
                        }
                        count++; //break

                    }
                })
            })
            // console.log(arrCon);

            var arrArtical = [];
            arrInstructor.forEach(instructor => {
                var count = 0;
                arrBufferArtical.forEach(list => {
                    if (list.name === instructor) {

                        if (count === 0) {
                            arrArtical.push({
                                ['name']: list.name,
                                ['file']: list.file,
                                ['filePath']: list.filePath,
                                ['time']: list.time
                            })
                        }
                        count++; //break

                    }
                })
            })
            // console.log(arrArtical);
            var arrMerge = arrCon.concat(arrArtical);
            console.log(arrMerge);

            //รอบ 1
            var startdate1 = new Date('07/01/2021'); //  01 / 07 / 20
            var enddate1 = new Date('12/31/2021'); //   31 / 12 / 20
            // รอบ2
            var startdate2 = new Date('01/01/2021'); //   01 / 01 /20
            var enddate2 = new Date('06/31/2021'); //   31 / 06 / 20

            var date = new Date('02/02/2020');

            // var time = (((list.filePath).split('/')[4]).split('_')[3]).split(' ')[0];

            arrInstructor.forEach(instructor => {
                arrMerge.forEach(list => {
                    if (instructor === list.name) {
                        var check = 'ไม่มีผลงาน';
                        var statusShow = false;
                        if (props.salaryRound === 'รอบ1 เดือน เมษายน') {
                            if (list.time >= startdate1 && list.time <= enddate1) {
                                check = 'มีผลงาน';
                                statusShow = true;
                            }
                        }
                        else if (props.salaryRound === 'รอบ2 เดือน ตุลาคม') {
                            if (list.time >= startdate2 && list.time <= enddate2) {
                                check = 'มีผลงาน';
                                statusShow = true;
                            }
                        }
                        // console.log(check);
                        arrOutput.push({
                            ['name']: list.name,
                            ['file']: list.file,
                            ['filePath']: list.filePath,
                            ['status']: check,
                            ['isChecked']: false,
                            ['statusShow']: statusShow
                        })
                    }

                })
            })
            // console.log(arrOutput);
            setlistShow(arrOutput);





        })
        // }



    }, [])


    function handleAllChecked(event) {
        let lists = listShow;
        lists.forEach(list => list.isChecked = event.target.checked)
        setlistShow(lists);
        console.log(listShow);
    }

    function handleCheckChieldElement(event) {
        let lists = listShow;
        lists.forEach(list => {
            if (list.name === event.target.name)
                list.isChecked = event.target.checked
        })
        setlistShow(lists);
        console.log(listShow);
    }






    return (
        <Fragment>
            {/* <button onClick={test}>Click</button> */}
            <br />
            <span class="is-size-4 has-text-primary">
                หมวดผลงานวิชาการ
            </span>
            <br />
            <div class="card">
                <section class="section is-small">
                    <div class="columns is-multiline is-centered">
                        <table class="table is-striped is-fullwidth">
                            <thead>
                                <tr>
                                    <th>รายชื่อ</th>
                                    <th>ชื่อไฟล์</th>
                                    <th>สถานะ</th>
                                    <th>เลือก</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th><input type="checkbox" value="checkedall" onClick={handleAllChecked} /> เลือกทั้งหมด</th>
                                </tr>
                                {/* {listFiles &&
                                    listFiles.map((list) => (
                                        <CheckBox3 handleCheckChieldElement={handleCheckChieldElement} {...list} />
                                    ))} */}

                                {/* {listFiles &&
                                    listFiles.map((list) => (
                                        <tr>
                                            <td>{list.name}</td>
                                            <td>{list.file}</td>
                                            <td><input key={list.id} onChange={handleCheckChieldElement} type="checkbox" name={list.name} ischecked={list.isChecked} /> เลือก</td>
                                        </tr>
                                    ))} */}

                                {/* ------------------------------------------------ */}

                                {listShow &&
                                    listShow.map((list) => (
                                        <CheckBox3 handleCheckChieldElement={handleCheckChieldElement} {...list} />
                                    ))}

                                {/* {listShow &&
                                    listShow.map((list) => (
                                        <tr>
                                            <td>{list.name}</td>
                                            <td>{list.file}</td>
                                            <td>{list.status}</td>
                                            <td><input key={list.id} type="checkbox" /> เลือก</td>
                                        </tr>
                                    ))} */}





                            </tbody>
                        </table>
                    </div>
                </section>
            </div>

        </Fragment>


    )
}

export default TableAcademyEveryoneReport