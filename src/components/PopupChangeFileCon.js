import React, { Fragment, useEffect, useState } from 'react'
import CheckBoxChangeFile from './CheckBoxChangeFile';

export const PopupChangeFileCon = props => {

    const [listCon, setlistCon] = useState();
    const [listConferance, setlistConferance] = useState();
    const [noImformation, setNoImformation] = useState(false);



    function ClickSubmit() {
        var arrToParent = [];
        var checkClickFromSubmit = 'submit';
        listConferance.forEach(list => {
            if (list.isChecked) {
                arrToParent.push({
                    ['id']: 1,
                    ['departmwnt']: list.department,
                    ['type']: list.type,
                    ['time']: list.file,
                    ['isChecked']: list.isChecked
                })
            }
        })
        props.SetFileChange(arrToParent, checkClickFromSubmit);
    }

    function ClickCancel() {
        var checkClickFromCancel = 'cancel';
        props.SetFileChange('', checkClickFromCancel);
    }


    useEffect(() => {

        console.log(props.department);
        console.log(props.salaryRound);
        console.log(props.year);
        console.log(props.instructor);

        const AWS = require('aws-sdk/global');
        AWS.config.update({
            accessKeyId: 'AKIAJJOOQS6RRWQUJKNQ',
            secretAccessKey: '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',
            region: 'us-east-1'
        });
        const s3 = new AWS.S3();

        var prefixPresentation = 'public/' + props.department + '/ผลงานทางวิชาการ/รายงานการเสนอผลงานในที่ประชุมวิชาการ/' + props.salaryRound + "_" + props.year + '/' + props.instructor + '';
        const paramsPresentation = {
            Bucket: 'amplifys3smartreport142809-dev',
            Delimiter: '',
            Prefix: prefixPresentation,
        };

        s3.listObjectsV2(paramsPresentation, (err, data) => {

            if (data.Contents.length >= 1) {
                if (err) {
                    console.log(err, err.stack);
                }
                else {
                    var count = 1;
                    var arrData = [];
                    var content = data.Contents;
                    content.forEach(list => {
                        arrData.push({
                            ['id']: count,
                            ['name']: props.instructor,
                            ['department']: props.department,
                            ['type']: 'การเสนอผลงานในที่ประชุมวิชาการ',
                            ['file']: ((list.Key).split("/")[5]).split("_")[3],
                            ['isChecked']: false
                        })
                        count++;
                    });
                    console.log(arrData);
                    setlistConferance(arrData);
                }
            }
            else {
                setNoImformation(true);
            }

        })

    }, [])

    function handleCheckChieldElement(event) {
        let lists = listConferance
        lists.forEach(list => {

            console.log(list.file);
            console.log(event.target.value);
            console.log(list.isChecked);
            console.log(event.target.checked);

            if (list.file === event.target.value)
                list.isChecked = event.target.checked

        })
        setlistConferance(lists);
        console.log(listConferance);
    }



    return (

        <Fragment>
            <div class={"modal is-active"}>
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">
                            <div class="icon-text">
                                <span class="icon has-text-success">
                                    <i class="fas fa-check-square"></i>
                                </span>
                                <span>เปลี่ยนไฟล์ข้อมูล</span>
                            </div>
                        </p>
                    </header>
                    {listConferance && <section class="modal-card-body">

                        {<section>

                            <span class="is-size-6 has-text-weight-medium">ชื่ออาจารย์ : </span>
                            <h6>{props.instructor}</h6><br />
                            <span class="is-size-6 has-text-weight-medium">สาขาวิชา : </span>
                            <h6>{props.department}</h6>



                        </section>
                        }

                        <table class="table is-striped is-fullwidth">
                            <thead>

                                <th>ลำดับ</th>
                                <th>ชื่อ</th>
                                <th>สาขาวิชา</th>
                                <th>หัวข้อ</th>
                                <th>วันที่อัปโหลด</th>
                                <th>เลือก</th>

                            </thead>
                            {listConferance.map(list => (
                                <CheckBoxChangeFile handleCheckChieldElement={handleCheckChieldElement} {...list} />

                            ))}
                        </table>

                    </section>}

                    {noImformation && <section class="modal-card-body">
                        <span class="is-size-6 has-text-weight-medium">ไม่พบข้อมูลเพิ่มเติม</span>
                    </section>}

                    <footer class="modal-card-foot">
                        <button class="button is-primary " onClick={ClickSubmit} >บันทึกการเปลี่ยนเเปลง</button>
                        <button class="button" onClick={ClickCancel}>ยกเลิก</button>
                    </footer>
                </div>
            </div>
        </Fragment>

    )
}

export default PopupChangeFileCon