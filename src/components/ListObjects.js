import React, { Fragment } from 'react'
import { useState, useEffect } from 'react';
import AWS from 'aws-sdk';
import CheckBox2 from './CheckBox2';
import SendEmail from './SendEmail';

export const ListObjects = props => {

    AWS.config.update({
        accessKeyId: 'AKIAJJOOQS6RRWQUJKNQ',
        secretAccessKey: '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',
        region: 'us-east-1'
    });
    const s3 = new AWS.S3();

    var prefix1 = 'reports/' + props.department + '/ปีงบประมาณ' + props.year + '/' + props.salaryRound + '/';
    const paramsLecture = {
        Bucket: 'amplifys3smartreport142809-dev',
        Delimiter: '',
        Prefix: prefix1,
    };

    const [listFiles, setListFiles] = useState([]);
    const [showTable, setshowTable] = useState(false);
    const [isPending, setisPending] = useState(false)

    // useEffect(() => {
    async function listObjectFroms3() {
        await s3.listObjectsV2(paramsLecture, (err, data) => {
            if (err) {
                console.log(err, err.stack);
            } else {
                setisPending(true);
                console.log(data.Contents);
                var contents = data.Contents;
                var arrData = [];
                var name = 'name';
                var time = 'time';
                let department = 'department';
                let salaryRound = 'salaryRound';
                let isChecked = 'isChecked';
                let id = 'id';
                let year = 'year';
                let month = 'month';
                let count = 1;
                // สำหรับเลื่อนเงินเดือน

                contents.forEach((content) => {
                    var rangMonth = ((((content.Key).split('/'))[4]).split('_'))[3];
                    var monthSalaryRound = '';
                    if (rangMonth === 'กรกฎาคม-ธันวาคม') {
                        monthSalaryRound = '1 เมษายน';
                    }
                    if (rangMonth === 'มกราคม-มิถุนายน') {
                        monthSalaryRound = '1 ตุลาคม';
                    }
                    arrData.push({
                        [id]: count,
                        [name]: ((((content.Key).split('/'))[4]).split('_'))[1],
                        [department]: ((((content.Key).split('/'))[4]).split('_'))[2],
                        [month]: monthSalaryRound,
                        [salaryRound]: ((((content.Key).split('/'))[4]).split('_'))[3],
                        [year]: ((((content.Key).split('/'))[4]).split('_'))[4],
                        [isChecked]: false
                    });
                    count++;
                })
                console.log(arrData);
                setListFiles(arrData);
                // console.log(listFiles);
                setshowTable(true);
                setisPending(false)
            }
        });
    }
    // }, []);

    function handleAllChecked(event) {
        let lists = listFiles
        lists.forEach(list => {
            list.isChecked = event.target.checked
            console.log(event.target.checked);
        })
        setListFiles(lists);
        console.log(listFiles);
    }

    function handleCheckChieldElement(event) {
        let lists = listFiles
        lists.forEach(list => {
            if (list.name === event.target.name)
                list.isChecked = event.target.checked
        })
        setListFiles(lists);
        console.log(listFiles);
    }


    return (
        <Fragment>

            <div class="container">
                <div class="columns is-multiline is-centered">
                    <div class="field">
                        <button class="button is-primary" onClick={listObjectFroms3}>
                            {!isPending && <span>ค้นหา</span>}
                            {isPending && <span>กำลังค้นหา...</span>}</button>
                    </div>
                </div>
            </div>

            <div class="columns is-multiline is-centered">

                {/* <div class="columns is-multiline is-centered">
                    <div class="field1">
                        <button class="button is-primary" onClick={listObjectFroms3}>
                            {!isPending && <span>ค้นหา</span>}
                            {isPending && <span>กำลังค้นหา...</span>}</button>
                    </div>
                </div> */}

                {showTable && <div class="column is-centered">
                    <table class="table is-striped is-fullwidth">
                        <thead>
                            <th>ชื่ออาจารย์</th>
                            <th>สาขาวิชา</th>
                            <th>สำหรับเลื่อนเงินเดือน</th>
                            <th>ช่วงเวลาผลงาน</th>
                            <th>เลือก</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><input type="checkbox" value="checkedall" onClick={handleAllChecked} />เลือกทั้งหมด</td>
                            </tr>
                            {listFiles &&
                                listFiles.map((namee, index) => (
                                    <CheckBox2 handleCheckChieldElement={handleCheckChieldElement} {...namee} />
                                ))}
 
                        </tbody>
                    </table>
                </div>}
            </div>
            {showTable && <SendEmail data={listFiles} />}
        </Fragment>

    )
}

export default ListObjects