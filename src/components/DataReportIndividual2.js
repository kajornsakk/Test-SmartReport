import React, { Fragment, useState } from 'react'
import AWS from 'aws-sdk';

export const DataReportIndividual2 = props => {

    const AWS = require('aws-sdk/global');
    AWS.config.update({
        accessKeyId: 'AKIAJJOOQS6RRWQUJKNQ',
        secretAccessKey: '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',
        region: 'us-east-1'
    });
    const s3 = new AWS.S3();

    const [listFiles, setListFiles] = useState([]);
    const [listFilesMaster, setListFilesMaster] = useState([]);
    const [listFilesDoctor, setListFilesDoctor] = useState([]);

    const [showTableForindividual, setshowTableForindividual] = useState(false);
    // 

    const [nameArticleForIndividual, setnameArticleForIndividual] = useState();
    const [statusArticleForIndividual, setstatusArticleForIndividual] = useState();

    const [namePresentationForIndividual, setnamePresentationForIndividual] = useState();
    const [statusPresentationForIndividual, setstatusPresentationForIndividual] = useState();


    function CallAPI() {
        console.log(listFiles);
        console.log(listFilesMaster);
        console.log(listFilesDoctor);
        console.log(nameArticleForIndividual);
        console.log(statusArticleForIndividual);
        console.log(namePresentationForIndividual);
        console.log(statusPresentationForIndividual);
    }

    async function ShowTable() {

        if (props.salaryRound === 'รอบ1 เดือน เมษายน') {
            var numyear = parseInt(props.year) - 1;
            // console.log(numyear);
            var semeter = 1;
        }
        else if (props.salaryRound === 'รอบ2 เดือน ตุลาคม') {
            var numyear = parseInt(props.year) - 1;
            var semeter = 2;
        }
        var numyear_semeter = numyear + '_' + semeter + '_';


        // ------------ตรี----------------------------------------------------------------

        var prefixLectrue = 'public/' + props.department + '/ภาระงานสอน/ปริญญาตรี/';
        const paramsLecture = {
            Bucket: 'amplifys3smartreport142809-dev',
            Delimiter: '',
            Prefix: prefixLectrue,
        };
        var arrData = [];
        var arrBufferCourse = [];
        var count = 1;
        // await 
        await s3.listObjectsV2(paramsLecture, (err, data) => {

            var contents = data.Contents;

            // console.log(data.Contents);
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
                    var checkYearSemester = ((content.Key).split('public/' + props.department + '/ภาระงานสอน/ปริญญาตรี/')[1]).split('/')[1];
                    var checkCourse = ((content.Key).split('public/' + props.department + '/ภาระงานสอน/ปริญญาตรี/')[1]).split('/')[0];
                    var checkLecture = ((content.Key).split('public/' + props.department + '/ภาระงานสอน/ปริญญาตรี/')[1]).split('/')[2];

                    if (course == checkCourse && checkLecture == 'วิชาบรรยาย-วิชาปฏิบัติ' && checkYearSemester == numyear_semeter) { //เพิ่มเงือนไข 2563_1
                        arrBufferLecture.push(content.Key);
                    }
                    if (course == checkCourse && checkLecture == 'ซีเนียร์โปรเจค-ปัญหาพิเศษ-สัมมนา' && checkYearSemester == numyear_semeter) {
                        arrBufferAcademy.push(content.Key);
                    }

                })
                var lengthh = arrBufferLecture.length;
                test.push(arrBufferLecture[lengthh - 1])

                var lengthhh = arrBufferAcademy.length;
                test.push(arrBufferAcademy[lengthhh - 1])
            })
            // console.log(arrBufferLecture);
            // console.log(test);
            var arrShow = [];
            var count = 1;
            test.forEach(list => {
                // console.log(list);
                //ตรวจสอบเเต่ละไฟล์ว่สตรงกับรอบเงินเดือนไหม ถ้าตรงให้ใส่ true หรือ tag is-primary (เพื่อบอกสี)

                var value = '';
                var buffer1 = ((list).split('/')[7]).split('_');
                var bufferYear = buffer1[0];
                var bufferSemester = buffer1[1];
                var semesterYear = bufferYear + "_" + bufferSemester + "_";
                var statuss = '';

                // console.log(semesterYear);
                // console.log(numyear_semeter);

                if (semesterYear === numyear_semeter) {
                    value = 'tag is-primary';
                    statuss = 'อัปโหลดเเล้ว';
                } else {
                    value = 'tag is-warning';
                    statuss = 'ยังไม่อัปโหลด';
                }

                // 
                arrShow.push({
                    ['id']: count,
                    ['department']: props.department,
                    ['level']: (list).split('/')[3],
                    ['course']: (((list).split('/')[4]).split(' ')[1]).split('สาขาวิชา')[1],
                    ['lecture']: (list).split('/')[6],
                    ['filePath']: list,
                    ['isChecked']: value,
                    ['status']: statuss
                })
                count++;
            })
            // console.log(arrShow);
            setListFiles(arrShow);

        });

        // ------------โท----------------------------------------------------------------

        var prefixLectrue2 = 'public/' + props.department + '/ภาระงานสอน/ปริญญาโท/';
        const paramsLecture2 = {
            Bucket: 'amplifys3smartreport142809-dev',
            Delimiter: '',
            Prefix: prefixLectrue2,
        };
        var arrData = [];
        var arrBufferCourse2 = [];
        var count = 1;
        await s3.listObjectsV2(paramsLecture2, (err, data) => {

            var contents = data.Contents;

            // console.log(data.Contents);
            contents.forEach(content => {
                arrBufferCourse2.push({
                    ['course']: (content.Key).split('/')[4]
                })
            })
            const arrCourse = [...(new Set(arrBufferCourse2.map(({ course }) => course)))];
            // console.log(arrCourse);

            var test = [];
            arrCourse.forEach(course => {
                var arrBufferLecture = [];
                var arrBufferAcademy = [];
                contents.forEach(content => {
                    // console.log(content);
                    // console.log(((content.Key).split('public/' + props.department + '/ภาระงานสอน/ปริญญาตรี/')[1]).split('/')[0]);
                    var checkYearSemester = ((content.Key).split('public/' + props.department + '/ภาระงานสอน/ปริญญาโท/')[1]).split('/')[1];
                    var checkCourse = ((content.Key).split('public/' + props.department + '/ภาระงานสอน/ปริญญาโท/')[1]).split('/')[0];
                    var checkLecture = ((content.Key).split('public/' + props.department + '/ภาระงานสอน/ปริญญาโท/')[1]).split('/')[2];

                    if (course == checkCourse && checkLecture == 'วิชาบรรยาย-วิชาปฏิบัติ' && checkYearSemester == numyear_semeter) { //เพิ่มเงือนไข 2563_1
                        arrBufferLecture.push(content.Key);
                    }
                    if (course == checkCourse && checkLecture == 'วิทยานิพนธ์-สารนิพนธ์' && checkYearSemester == numyear_semeter) {
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
                var buffer1 = ((list).split('/')[7]).split('_');
                var bufferYear = buffer1[0];
                var bufferSemester = buffer1[1];
                var semesterYear = bufferYear + "_" + bufferSemester + "_";
                var statuss = '';

                console.log(semesterYear);
                console.log(numyear_semeter);

                if (semesterYear === numyear_semeter) {
                    value = 'tag is-primary';
                    statuss = 'อัปโหลดเเล้ว';
                } else {
                    value = 'tag is-warning';
                    statuss = 'ยังไม่อัปโหลด';
                }

                // 
                arrShow.push({
                    ['id']: count,
                    ['course']: (((list).split('/')[4]).split(' ')[1]).split('สาขาวิชา')[1],
                    ['lecture']: (list).split('/')[6],
                    ['file']: list,
                    ['isChecked']: value,
                    ['status']: statuss
                })
                count++;
            })
            console.log(arrShow);
            setListFilesMaster(arrShow);

        });

        // ------------เอก----------------------------------------------------------------


        var prefixLectrue3 = 'public/' + props.department + '/ภาระงานสอน/ปริญญาเอก/';
        const paramsLecture3 = {
            Bucket: 'amplifys3smartreport142809-dev',
            Delimiter: '',
            Prefix: prefixLectrue3,
        };
        var arrData = [];
        var arrBufferCourse3 = [];
        var count = 1;

        await s3.listObjectsV2(paramsLecture3, (err, data) => {

            var contents = data.Contents;

            // console.log(data.Contents);
            contents.forEach(content => {
                arrBufferCourse3.push({
                    ['course']: (content.Key).split('/')[4]
                })
            })
            const arrCourse = [...(new Set(arrBufferCourse3.map(({ course }) => course)))];
            // console.log(arrCourse);

            var test = [];
            arrCourse.forEach(course => {
                var arrBufferLecture = [];
                var arrBufferAcademy = [];
                contents.forEach(content => {
                    // console.log(content);
                    // console.log(((content.Key).split('public/' + props.department + '/ภาระงานสอน/ปริญญาตรี/')[1]).split('/')[0]);
                    var checkYearSemester = ((content.Key).split('public/' + props.department + '/ภาระงานสอน/ปริญญาเอก/')[1]).split('/')[1];
                    var checkCourse = ((content.Key).split('public/' + props.department + '/ภาระงานสอน/ปริญญาเอก/')[1]).split('/')[0];
                    var checkLecture = ((content.Key).split('public/' + props.department + '/ภาระงานสอน/ปริญญาเอก/')[1]).split('/')[2];

                    if (course == checkCourse && checkLecture == 'วิชาบรรยาย' && checkYearSemester == numyear_semeter) { //เพิ่มเงือนไข 2563_1
                        arrBufferLecture.push(content.Key);
                    }
                    if (course == checkCourse && checkLecture == 'วิทยานิพนธ์' && checkYearSemester == numyear_semeter) {
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
                var buffer1 = ((list).split('/')[7]).split('_');
                var bufferYear = buffer1[0];
                var bufferSemester = buffer1[1];
                var semesterYear = bufferYear + "_" + bufferSemester + "_";
                var statuss = '';

                console.log(semesterYear);
                console.log(numyear_semeter);

                if (semesterYear === numyear_semeter) {
                    value = 'tag is-primary';
                    statuss = 'อัปโหลดเเล้ว';
                } else {
                    value = 'tag is-warning';
                    statuss = 'ยังไม่อัปโหลด';
                }

                // 
                arrShow.push({
                    ['id']: count,
                    ['course']: (((list).split('/')[4]).split(' ')[1]).split('สาขาวิชา')[1],
                    ['lecture']: (list).split('/')[6],
                    ['file']: list,
                    ['isChecked']: value,
                    ['status']: statuss
                })
                count++;
            })
            console.log(arrShow);
            setListFilesDoctor(arrShow);

        });



        // ------------งานวิชาการ Artical----------------------------------------------------------------


        // article for individual
        console.log(props.salaryRound);
        console.log(props.year);

        var prefixArticle = 'public/' + props.department + '/ผลงานทางวิชาการ/รายงานบทความ-ผลงานตีพิมพ์ในวารสารวิชาการต่างๆ/'+props.salaryRound+"_"+props.year+'/' + props.instructor + '';
        const paramsArticle = {
            Bucket: 'amplifys3smartreport142809-dev',
            Delimiter: '',
            Prefix: prefixArticle,
        };

        await s3.listObjectsV2(paramsArticle, (err, data) => {
            console.log(data);
            var lastFile = ((data.Contents.length) - 1);
            var file_name1 = (data.Contents[lastFile].Key).split('public/'+props.department+'/ผลงานทางวิชาการ/รายงานบทความ-ผลงานตีพิมพ์ในวารสารวิชาการต่างๆ/'+props.salaryRound+"_"+props.year+'/');
            var filename = file_name1[1] + "";
            // console.log(filename);
            var nameArticle = filename.split('_')[0];

            var time = (data.Contents[lastFile]).LastModified;

            //รอบ 1
            var startdate1 = new Date('07/01/2021'); //  01 / 07 / 20
            var enddate1 = new Date('12/31/2021'); //   31 / 12 / 20
            // รอบ2
            var startdate2 = new Date('01/01/2021'); //   01 / 01 /20
            var enddate2 = new Date('06/30/2021'); //   31 / 06 / 20

            var check = 'ไม่พบข้อมูล';
            var statusShow = false;
            if (props.salaryRound === 'รอบ1 เดือน เมษายน') {
                if (time >= startdate1 && time <= enddate1) {
                    check = 'มีผลงาน';
                    statusShow = true;
                }
            }
            else if (props.salaryRound === 'รอบ2 เดือน ตุลาคม') {
                if (time >= startdate2 && time <= enddate2) {
                    check = 'มีผลงาน';
                    statusShow = true;
                }
            }

            setnameArticleForIndividual(nameArticle);
            setstatusArticleForIndividual(check);

            // this.setState({
            //     fileArticleForIndividual: filename,
            //     nameArticleForIndividual: nameArticle,
            //     statusArticleForIndividual: check
            // })
        })




        // ------------งานวิชาการ Presentation----------------------------------------------------------------

        var prefixPresentation = 'public/' + props.department + '/ผลงานทางวิชาการ/รายงานการเสนอผลงานในที่ประชุมวิชาการ/'+props.salaryRound+"_"+props.year+'/' + props.instructor + '';
        const paramsPresentation = {
            Bucket: 'amplifys3smartreport142809-dev',
            Delimiter: '',
            Prefix: prefixPresentation,
        };

        await s3.listObjectsV2(paramsPresentation, (err, data) => {
            var lastFile = ((data.Contents.length) - 1);
            var file_name1 = (data.Contents[lastFile].Key).split('public/'+props.department+'/ผลงานทางวิชาการ/รายงานการเสนอผลงานในที่ประชุมวิชาการ/'+props.salaryRound+"_"+props.year+'/');
            var filename = file_name1[1] + "";
            var namePresentation = filename.split('_')[0];

            var time = (data.Contents[lastFile]).LastModified;

            //รอบ 1
            var startdate1 = new Date('07/01/2021'); //  01 / 07 / 20
            var enddate1 = new Date('12/31/2021'); //   31 / 12 / 20
            // รอบ2
            var startdate2 = new Date('01/01/2021'); //   01 / 01 /20
            var enddate2 = new Date('06/30/2021'); //   31 / 06 / 20

            var check = 'ไม่พบข้อมูล';
            var statusShow = 'has-text-danger';
            if (props.salaryRound === 'รอบ1 เดือน เมษายน') {
                if (time >= startdate1 && time <= enddate1) {
                    check = 'มีผลงาน';
                    statusShow = 'has-text-success';
                }
            }
            else if (props.salaryRound === 'รอบ2 เดือน ตุลาคม') {
                if (time >= startdate2 && time <= enddate2) {
                    check = 'มีผลงาน';
                    statusShow = 'has-text-success';
                }
            }

            setnamePresentationForIndividual(namePresentation);
            setstatusPresentationForIndividual(check);
            // this.setState({
            //     filePresentationForIndividual: filename,
            //     namePresentationForIndividual: namePresentation,
            //     statusPresentationForIndividual: check,
            //     statusShowArticle: statusShow
            // })
        })


        setshowTableForindividual(true);
    }

    return (
        <Fragment>
            {/* <button onClick={ShowTable}>ShowTable</button> */}


            <div class="columns is-multiline is-centered">
                <div class="field">
                    <button class="button is-primary" onClick={ShowTable}>ตรวจสอบข้อมูล</button>
                </div>
            </div>


            {showTableForindividual && <div><br />
                <span class="is-size-4 has-text-primary">
                    หมวดภาระงานสอน
                        </span>
                <br /></div>}


            {showTableForindividual && <div class="card">
                <section class="section is-small">
                    <div class="columns is-multiline is-centered">
                        <table class="table is-striped is-fullwidth">
                            <thead>
                                <tr>
                                    <th>ระดับการศึกษา</th>
                                    <th>หลักสูตร</th>
                                    <th>หมวดวิชา</th>
                                    <th>สถานะ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>ปริญญาตรี</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                {listFiles.map((list, index) => (
                                    <tr key={index}>
                                        <td></td>
                                        <td>{list.course}</td>
                                        <td>{list.lecture}</td>
                                        <td><span class={`${list.isChecked}`}>{list.status}</span></td>

                                    </tr>
                                ))}
                            </tbody>
                            <tbody>
                                <tr>
                                    <th>ปริญญาโท</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                {listFilesMaster.map((list, index) => (
                                    <tr key={index}>
                                        <td></td>
                                        <td>{list.course}</td>
                                        <td>{list.lecture}</td>
                                        <td><span class={`${list.isChecked}`}>{list.status}</span></td>

                                    </tr>
                                ))}
                            </tbody>
                            <tbody>
                                <tr>
                                    <th>ปริญญาเอก</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                {listFilesDoctor.map((list, index) => (
                                    <tr key={index}>
                                        <td></td>
                                        <td>{list.course}</td>
                                        <td>{list.lecture}</td>
                                        <td><span class={`${list.isChecked}`}>{list.status}</span></td>

                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </section>

            </div>}

            {showTableForindividual && <div><br />
                <span class="is-size-4 has-text-primary">
                    หมวดผลงานทางวิชาการ
                        </span>
                <br /></div>}

                {showTableForindividual && <div class="card">
                <section class="section is-small">
                    <div class="columns is-multiline is-centered">
                        <table class="table is-striped is-fullwidth">
                            <thead>
                                <tr>
                                    <th>ชื่อ</th>
                                    <th>หัวข้อ</th>
                                    <th>สถานะ</th>
                                    {/* <th>สถานะ</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{nameArticleForIndividual}</td>
                                    <td>บทความ/ผลงานตีพิมพ์ในวารสารวิชาการ</td>
                                    <td>{statusArticleForIndividual}</td>

                                </tr>
                                <tr>
                                    <td>{namePresentationForIndividual}</td>
                                    <td>การเสนอผลงานในที่ประชุมวิชาการ</td>
                                    <td>{statusPresentationForIndividual}</td>

                                </tr>

                            </tbody>
                        </table>
                    </div>
                </section>
            </div>}


            {showTableForindividual && 
            <section class="section is-small">
                <div class="columns is-multiline is-centered">
                    <div class="field">
                        <button class="button is-primary" onClick={CallAPI} >สร้างแบบฟอร์ม</button>
                    </div>
                </div>
            </section>
            }



        </Fragment>

    )
}

export default DataReportIndividual2