import React, { Fragment, useState } from 'react'
import AWS from 'aws-sdk';
import TableAcademyEveryoneReport from './TableAcademyEveryoneReport';
import CheckBox3 from './CheckBox3';
import PopupCreateForm from './PopupCreateForm';
import PopupCreateSuccess from './PopupCreateSuccess';

export const DataReportForeveryone2 = props => {

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

    const [listShow, setlistShow] = useState([]); // ผลงานวิชาการ

    const [showTableForEveryone, setshowTableForEveryone] = useState(false);
    const [showPopupLoading, setShowPopupLoading] = useState(false);
    const [showPopupSucces, setshowPopupSucces] = useState(false)
    const [noInformationBachelor, setnoInformationBachelor] = useState(false);
    const [noInformationMaster, setnoInformationMaster] = useState(false);
    const [noInformationDoctor, setnoInformationDoctor] = useState(false);
    const [noInformationAcademy, setnoInformationAcademy] = useState(false);
    const [semesterYear, setsemesterYear] = useState();

    function clickPopupClose() {
        setshowPopupSucces(!showPopupSucces);
        // window.location.reload(false);
    }

    function compareTableName(level, department, course, lecture) {

        let departmentName = '';
        //department
        if (department === 'สาขาวิชาวิทยาการคอมพิวเตอร์') {
            departmentName = 'ComputerScience';
        }
        else if (department === 'สาขาวิชาฟิสิกส์') {
            departmentName = 'Physics';
        }
        else if (department === 'สาขาวิชาเคมี') {
            departmentName = 'Chemistry';
        }
        else if (department === 'สาขาวิชาเทคโนโลยีชีวภาพ') {
            departmentName = 'Biotechnology';
        }
        else if (department === 'สาขาวิชาคณิตศาสตร์และสถิติ') {
            departmentName = 'MathematicsAndStatistics';
        }
        else if (department === 'สาขาวิชาเทคโนโลยีการเกษตร') {
            departmentName = 'Agricultural';
        }
        else if (department === 'สาขาวิชาวิทยาศาสตร์สิ่งเเวดล้อม') {
            departmentName = 'EnvironmentalScience';
        }
        else if (department === 'สาขาวิชาเทคโนโลยีเพื่อการพัฒนายั่งยืน') {
            departmentName = 'SustainableDevelopment';
        }
        else if (department === 'สาขาวิชาวิทยาศาสตร์และเทคโนโลยีการอาหาร') {
            departmentName = 'FoodScience';
        }
        else if (department === 'สาขาวิชาเทคโนโลยีวัสดุและสิ่งทอ') {
            departmentName = 'MaterialsAndTextile';
        }

        //course
        let courseName = '';
        if (course === 'เคมี') {
            courseName = 'Chemistry';
        }
        else if (course === 'ฟิสิกส์') {
            courseName = 'Physics';
        }
        else if (course === 'ฟิสิกส์อิเล็กทรอนิกส์') {
            courseName = 'ElectronicsPhysics';
        }
        else if (course === 'คณิตศาสตร์') {
            courseName = 'Mathematics';
        }
        else if (course === 'คณิตศาสตร์การจัดการ') {
            courseName = 'ManagementMathematics';
        }
        else if (course === 'คณิตศาสตร์ประยุกต์') {
            courseName = 'AppliedMathematics';
        }
        else if (course === 'วิทยาการประกันภัย') {
            courseName = 'ActuarialScience';
        }
        else if (course === 'สถิติ') {
            courseName = 'Statistics';
        }
        else if (course === 'สถิติประยุกต์') {
            courseName = 'AppliedStatistics';
        }
        else if (course === 'วิทยาการคอมพิวเตอร์') {
            courseName = 'ComputerScience';
        }
        else if (course === 'วิทยาศาสตร์สิ่งแวดล้อม') {
            courseName = 'EnvironmentalScience';
        }
        else if (course === 'เทคโนโลยีชีวภาพ') {
            courseName = 'Biotechnology';
        }
        else if (course === 'เทคโนโลยีพลังงานชีวภาพและการแปรรูปเคมีชีวภาพ') {
            courseName = 'Beb';
        }
        else if (course === 'เทคโนโลยีการเกษตร') {
            courseName = 'Agricultural';
        }
        else if (course === 'วัสดุศาสตร์') {
            courseName = 'Materials';
        }
        else if (course === 'วิทยาศาสตร์และเทคโนโลยีสิ่งทอ') {
            courseName = 'Textile';
        }
        else if (course === 'เทคโนโลยีเพื่อการพัฒนายั่งยืน') {
            courseName = 'SustainableDevelopment';
        }
        else if (course === 'วิทยาศาสตร์และเทคโนโลยีการอาหาร') {
            courseName = 'FoodScience';
        }
        else if (course === 'วิทยาศาสตร์และนวัตกรรมทางอาหาร') {
            courseName = 'Innovation';
        }

        // lecture
        let lectureName = '';
        if (lecture === 'วิชาบรรยาย-วิชาปฏิบัติ') {
            lectureName = 'Class';
        }
        else if (lecture === 'ซีเนียร์โปรเจค-ปัญหาพิเศษ-สัมมนา') {
            lectureName = 'SpecialProject';
        }
        else if (lecture === 'วิชาบรรยาย') {
            lectureName = 'Class';
        }
        else if (lecture === 'วิทยานิพนธ์' || lecture === 'วิทยานิพนธ์-สารนิพนธ์') {
            lectureName = 'Thesis';
        }

        // level
        let levelName = '';
        if (level === 'ปริญญาตรี') {
            levelName = 'Bachelor';
        }
        else if (level === 'ปริญญาโท') {
            levelName = 'Master';
        }
        else if (level === 'ปริญญาเอก') {
            levelName = 'Doctor';
        }

        // console.log(props.year);
        // console.log(props.salaryRound);


        return levelName + "_" + departmentName + "_" + courseName + "_" + lectureName + "_" + semesterYear;
    }

    function CallAPI() {
        setShowPopupLoading(true);

        console.log(listFiles);
        console.log(listFilesMaster);
        console.log(listFilesDoctor);
        console.log(listShow); // เอา listShow ที่เป็น true เเล้ว get ชื่อส่ง API

        var bufferArr1 = listFiles.concat(listFilesMaster);
        var arrMerge = bufferArr1.concat(listFilesDoctor);
        console.log(arrMerge);

        var rangeFoMonth = '';
        if (props.salaryRound === 'รอบ1 เดือน เมษายน') {
            rangeFoMonth = 'กรกฎาคม-ธันวาคม';
        }
        else if (props.salaryRound === 'รอบ2 เดือน ตุลาคม') {
            rangeFoMonth = 'มกราคม-มิถุนายน';
        }


        var arrTosend = [];

        arrMerge.forEach(list => {
            // ปริญญาตรี
            if (list.level === 'ปริญญาตรี') {
                if (list.status === 'อัปโหลดเเล้ว' && list.lecture === 'วิชาบรรยาย-วิชาปฏิบัติ') {
                    var b1 = compareTableName(list.level, list.department, list.course, list.lecture);
                    arrTosend.push({
                        ['tableBacherlorLecture']: b1,
                    })
                    var b2 = compareTableName(list.level, list.department, list.course, list.lecture);
                    arrTosend.push({
                        ['tableBachelorLab']: b2,
                    })
                }
                if (list.status === 'อัปโหลดเเล้ว' && list.lecture === 'ซีเนียร์โปรเจค-ปัญหาพิเศษ-สัมมนา') {
                    var b1 = compareTableName(list.level, list.department, list.course, list.lecture);
                    arrTosend.push({
                        ['tableBachelorSeminar']: b1,
                    })
                    var b2 = compareTableName(list.level, list.department, list.course, list.lecture);
                    arrTosend.push({
                        ['tableBachelorSpecialProject']: b2,
                    })
                }
            }
            //ปริญญาโท
            if (list.level === 'ปริญญาโท') {
                if (list.status === 'อัปโหลดเเล้ว' && list.lecture === 'วิชาบรรยาย-วิชาปฏิบัติ') {
                    var b1 = compareTableName(list.level, list.department, list.course, list.lecture);
                    arrTosend.push({
                        ['tableMasterLecture']: b1 + props.year,
                    })
                    var b2 = compareTableName(list.level, list.department, list.course, list.lecture);
                    arrTosend.push({
                        ['tableMasterLab']: b2,
                    })
                }
                if (list.status === 'อัปโหลดเเล้ว' && list.lecture === 'วิทยานิพนธ์-สารนิพนธ์') {
                    var b1 = compareTableName(list.level, list.department, list.course, list.lecture);
                    arrTosend.push({
                        ['tableMasterThesis']: b1,
                    })
                    var b2 = compareTableName(list.level, list.department, list.course, list.lecture);
                    arrTosend.push({
                        ['tableMasterIndependentStudy']: b2,
                    })
                }
            }
            //ปริญญาเอก
            if (list.level === 'ปริญญาเอก') {
                if (list.status === 'อัปโหลดเเล้ว' && list.lecture === 'วิชาบรรยาย') {
                    var b1 = compareTableName(list.level, list.department, list.course, list.lecture);
                    arrTosend.push({
                        ['tableDoctoralLecture']: b1,
                    })
                    var b2 = compareTableName(list.level, list.department, list.course, list.lecture);
                    arrTosend.push({
                        ['tableDoctoralLab']: b2,
                    })
                }
                if (list.status === 'อัปโหลดเเล้ว' && list.lecture === 'วิทยานิพนธ์') {
                    var b1 = compareTableName(list.level, list.department, list.course, list.lecture);
                    arrTosend.push({
                        ['tableDoctoralThesis']: b1,
                    })
                    var b2 = compareTableName(list.level, list.department, list.course, list.lecture);
                    arrTosend.push({
                        ['tableDoctoralIndependentStudy']: b2,
                    })
                }
            }
        })
        arrTosend.push({
            ['bucketName']: 'amplifys3smartreport142809-dev',
        })
        arrTosend.push({
            ['fileName']: '',
        })
        arrTosend.push({
            ['signedBucketName']: 'guy-bucket-test',
        })

        // แบบฟอร์มรายงานผลการปฏิบัติงาน_ประภาพร รัตนธำรง_สาขาวิชาวิทยาการคอมพิวเตอร์_กรกฎาคม-ธันวาคม_2561.xlsx
        let fileName = 'แบบฟอร์มรายงานผลการปฏิบัติงาน_' + props.instructor + '_' + props.department + '_' + rangeFoMonth + '_' + props.year + '.xlsx';
        arrTosend.push({
            ['signedFileName']: fileName,
        })

        console.log(arrTosend);



        // var arrTosend = [];
        // listShow.forEach(list => {
        //     if (list.status === "มีผลงาน") {
        //         arrTosend.push({
        //             ['name']: list.name,
        //             ['department']: props.department
        //         })
        //     }
        // })
        // console.log(arrTosend);

        setTimeout(() => {
            setShowPopupLoading(false);
            setshowPopupSucces(true);
        }, 35000);

        // window.location.reload(false);


    }

    async function ShowTable() {

        if (props.salaryRound === 'รอบ1 เดือน เมษายน') {
            var numyear = parseInt(props.year) - 1;
            console.log(numyear);
            var semeter = 1;
        }
        else if (props.salaryRound === 'รอบ2 เดือน ตุลาคม') {
            var numyear = parseInt(props.year) - 1;
            var semeter = 2;
        }
        var numyear_semeter = numyear + '_' + semeter + '_';
        setsemesterYear(semeter + "-" + numyear);

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

            if (data.Contents.length === 0) {
                setnoInformationBachelor(true);
            }
            else {
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
                        value = 'is-size-6 has-text-primary';
                        statuss = 'อัปโหลดเเล้ว';
                    } else {
                        value = 'is-size-6 has-text-grey';
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
                console.log(arrShow);
                setListFiles(arrShow);
            }



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

            if (data.Contents.length === 0) {
                setnoInformationMaster(true);
            }
            else {
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
                        value = 'is-size-6 has-text-primary';
                        statuss = 'อัปโหลดเเล้ว';
                    } else {
                        value = 'is-size-6 has-text-grey';
                        statuss = 'ยังไม่อัปโหลด';
                    }

                    // 
                    arrShow.push({
                        ['id']: count,
                        ['course']: (((list).split('/')[4]).split(' ')[1]).split('สาขาวิชา')[1],
                        ['department']: props.department,
                        ['level']: (list).split('/')[3],
                        ['lecture']: (list).split('/')[6],
                        ['file']: list,
                        ['isChecked']: value,
                        ['status']: statuss
                    })
                    count++;
                })
                console.log(arrShow);
                setListFilesMaster(arrShow);
            }



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

            if (data.Contents.length === 0) {
                setnoInformationDoctor(true);
            }
            else {
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
                        value = 'is-size-6 has-text-primary';
                        statuss = 'อัปโหลดเเล้ว';
                    } else {
                        value = 'is-size-6 has-text-grey';
                        statuss = 'ยังไม่อัปโหลด';
                    }

                    // 
                    arrShow.push({
                        ['id']: count,
                        ['course']: (((list).split('/')[4]).split(' ')[1]).split('สาขาวิชา')[1],
                        ['department']: props.department,
                        ['level']: (list).split('/')[3],
                        ['lecture']: (list).split('/')[6],
                        ['file']: list,
                        ['isChecked']: value,
                        ['status']: statuss
                    })
                    count++;
                })
                console.log(arrShow);
                setListFilesDoctor(arrShow);
            }

        });




        // ------------ผลงานวิชาการ----------------------------------------------------------------

        var prefix = 'public/' + props.department + '/ผลงานทางวิชาการ/';
        const paramsTest = {
            Bucket: 'amplifys3smartreport142809-dev',
            Delimiter: '',
            Prefix: prefix,
        };


        var arrData = [];
        await s3.listObjectsV2(paramsTest, (err, data) => {
            console.log(data.Contents);
            var contents = data.Contents;

            if (data.Contents.length === 0) {
                setnoInformationAcademy(true);
            }
            else {
                var id = 'id';
                var name = 'name';
                var isChecked = 'isChecked';
                var file = 'file';
                var count = 1;
                contents.forEach(content => {
                    arrData.push({
                        [id]: count,
                        [name]: ((content.Key).split('/')[5]).split('_')[0],
                        ['round']: (content.Key).split('/')[4],
                        [file]: (content.Key).split('/')[3],
                        ['filePath']: content.Key,
                        [isChecked]: false,
                        ['time']: ((content.Key).split('/')[5]).split('_')[3]
                    })
                    count++;
                });


                console.log(arrData);
                // setListFiles(arrData);

                var arrOutput = [];
                var wb;
                var ws;

                // sort file ใน arrData ก่อน
                var arrBufferCon = [];
                var arrBufferArtical = [];
                arrData.forEach(list => {
                    if (list.file === 'รายงานการเสนอผลงานในที่ประชุมวิชาการ') {
                        if ((list.round).split(" ")[0] === (props.salaryRound).split(" ")[0])
                            arrBufferCon.push({
                                ['name']: list.name,
                                ['round']: list.round,
                                ['status']: true,
                                ['file']: list.file,
                                ['filePath']: list.filePath,
                                ['time']: list.time
                            })
                    }
                    else if (list.file === 'รายงานบทความ-ผลงานตีพิมพ์ในวารสารวิชาการต่างๆ') {
                        if ((list.round).split(" ")[0] === (props.salaryRound).split(" ")[0]) {
                            arrBufferArtical.push({
                                ['name']: list.name,
                                ['round']: list.round,
                                ['status']: true,
                                ['file']: list.file,
                                ['filePath']: list.filePath,
                                ['time']: list.time
                            })
                        }

                    }
                })

                arrBufferCon.reverse();
                arrBufferArtical.reverse();
                console.log(arrBufferCon);
                console.log(arrBufferArtical);




                // หาจำนวนอาจารย์
                const arrInstructor = [...(new Set(arrData.map(({ name }) => name)))];
                console.log(arrInstructor);


                var roundToCheck = props.salaryRound + "_" + props.year;
                var arrCon = [];
                arrInstructor.forEach(instructor => {
                    var count = 0;
                    arrBufferCon.forEach(list => {
                        if (list.name === instructor && list.round === roundToCheck && list.status === true) {

                            if (count === 0) {
                                arrCon.push({
                                    ['name']: list.name,
                                    ['round']: list.round,
                                    ['status']: list.status,
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
                        if (list.name === instructor && list.round === roundToCheck && list.status === true) {

                            if (count === 0) {
                                arrArtical.push({
                                    ['name']: list.name,
                                    ['round']: list.round,
                                    ['status']: list.status,
                                    ['file']: list.file,
                                    ['filePath']: list.filePath,
                                    ['time']: list.time
                                })
                            }
                            count++; //break

                        }
                    })
                })
                console.log(arrCon);
                console.log(arrArtical);

                var arrMerge = arrCon.concat(arrArtical);
                console.log(arrMerge);


                arrInstructor.forEach(instructor => {
                    var checkCon = false;
                    var checkArtical = false;
                    var time = '';

                    arrMerge.forEach((list, index) => {

                        if (instructor === list.name && list.file === 'รายงานการเสนอผลงานในที่ประชุมวิชาการ') {
                            checkCon = true;
                            time = list.time;
                            if (checkCon === true) {
                                arrOutput.push({
                                    ['name']: instructor,
                                    ['status']: 'มีผลงาน',
                                    ['file']: 'รายงานการเสนอผลงานในที่ประชุมวิชาการ',
                                    ['isChecked']: false,
                                    ['statusShow']: 'is-size-6 has-text-primary',
                                    ['showSelect']: true,
                                    ['time']: time,
                                    ['filaPath']: list.filePath,

                                })
                            }
                        }
                        if (instructor === list.name && list.file === 'รายงานบทความ-ผลงานตีพิมพ์ในวารสารวิชาการต่างๆ') {
                            checkArtical = true;
                            time = list.time;
                            if (checkArtical === true) {
                                arrOutput.push({
                                    ['name']: instructor,
                                    ['status']: 'มีผลงาน',
                                    ['file']: 'รายงานบทความ-ผลงานตีพิมพ์ในวารสารวิชาการต่างๆ',
                                    ['isChecked']: false,
                                    ['statusShow']: 'is-size-6 has-text-primary',
                                    ['showSelect']: true,
                                    ['time']: time,
                                    ['filaPath']: list.filePath,
                                })
                            }
                        }
                    })
                    time = '';


                    // else {
                    if (checkCon === false) {
                        arrOutput.push({
                            ['name']: instructor,
                            ['status']: 'ไม่พบข้อมูล',
                            ['file']: 'รายงานการเสนอผลงานในที่ประชุมวิชาการ',
                            ['isChecked']: false,
                            ['statusShow']: 'is-size-6 has-text-grey',
                            ['showSelect']: false,
                            ['time']: time,
                        })
                    }
                    if (checkArtical === false) {
                        arrOutput.push({
                            ['name']: instructor,
                            ['status']: 'ไม่พบข้อมูล',
                            ['file']: 'รายงานบทความ-ผลงานตีพิมพ์ในวารสารวิชาการต่างๆ',
                            ['isChecked']: false,
                            ['statusShow']: 'is-size-6 has-text-grey',
                            ['showSelect']: false,
                            ['time']: time,
                        })
                    }

                    // }


                })

                console.log(arrOutput);
                //รวมผลงานจากที่เเยกเป็นสอง index ให้รวมมาเป็น index เดียวกัน
                // var arrToShow = [];
                // arrOutput.forEach(list => {
                //     if(){

                //     }
                // })



                setlistShow(arrOutput);
            }


        })

        setshowTableForEveryone(true);
    }

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
            <div class="columns is-multiline is-centered">
                <div class="field">
                    <button class="button is-primary" onClick={ShowTable}>ตรวจสอบข้อมูล</button>
                </div>
            </div>


            {showTableForEveryone && <div><br />
                <span class="is-size-4 has-text-primary">
                    หมวดภาระงานสอน
                        </span>
                <br /></div>}

            {/* Table for lecture */}
            {showTableForEveryone && <div class="card">
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

                                {noInformationBachelor &&
                                    <tr >
                                        <td></td>
                                        <td></td>
                                        <td><span class="is-size-6 has-text-grey">ไม่พบข้อมูล</span></td>
                                        <td></td>

                                    </tr>}

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

                                {noInformationMaster &&
                                    <tr >
                                        <td></td>
                                        <td></td>
                                        <td><span class="is-size-6 has-text-grey">ไม่พบข้อมูล</span></td>
                                        <td></td>

                                    </tr>}

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

                                {noInformationDoctor &&
                                    <tr >
                                        <td></td>
                                        <td></td>
                                        <td><span class="is-size-6 has-text-grey">ไม่พบข้อมูล</span></td>
                                        <td></td>

                                    </tr>}

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


            {showTableForEveryone && <div><br />
                <span class="is-size-4 has-text-primary">
                    หมวดผลงานวิชาการ
            </span>
                <br /></div>}

            {/* Table for academic */}
            {showTableForEveryone && <div class="card">
                <section class="section is-small">
                    <div class="columns is-multiline is-centered">
                        <table class="table is-striped is-fullwidth">
                            <thead>
                                <tr>
                                    <th>รายชื่อ</th>
                                    <th>ชื่อไฟล์</th>
                                    <th>อัปโหลดเมื่อ</th>
                                    <th>สถานะ</th>
                                    <th>เลือก</th>
                                </tr>
                            </thead>
                            <tbody>
                                {noInformationAcademy &&
                                    <tr >
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td><span class="is-size-6 has-text-grey">ไม่พบข้อมูล</span></td>
                                        <td></td>

                                    </tr>}

                                {listShow && <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th><input type="checkbox" value="checkedall" onClick={handleAllChecked} /> เลือกทั้งหมด</th>
                                </tr>}

                                {listShow &&
                                    listShow.map((list) => (
                                        <CheckBox3 handleCheckChieldElement={handleCheckChieldElement} {...list} />
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>}




            {/* <div class="card">
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
                                
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                <tr>
                                    <th>วนิดา พฤทธิวิทยา</th>
                                    <td>รายงานการเสนอผลงานในที่ประชุมวิชาการ</td>
                                    <td><span class="is-size-6 has-text-primary">มีผลงาน</span></td>
                                    <td><input type="checkbox"/> เลือก</td>
                                </tr>
                                <tr>
                                    <th>วนิดา พฤทธิวิทยา</th>
                                    <td>รายงานบทความ-ผลงานตีพิมพ์ในวารสารวิชาการต่างๆ</td>
                                    <td><span class="is-size-6 has-text-primary">มีผลงาน</span></td>
                                    <td><input type="checkbox"/> เลือก</td>
                                </tr>
                                
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                <tr>
                                    <th>ประภาพร รัตนธำรง</th>
                                    <td>รายงานการเสนอผลงานในที่ประชุมวิชาการ</td>
                                    <td><span class="is-size-6 has-text-grey">ไม่พบข้อมูล</span></td>
                                    <td>{false && <input type="checkbox">เลือก</input> }</td>
                                </tr>
                                <tr>
                                    <th>ประภาพร รัตนธำรง</th>
                                    <td>รายงานบทความ-ผลงานตีพิมพ์ในวารสารวิชาการต่างๆ</td>
                                    <td><span class="is-size-6 has-text-primary">มีผลงาน</span></td>
                                    <td><input type="checkbox"/> เลือก</td>
                                </tr>
                                
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                <tr>
                                    <th>ประภาพร รัตนธำรง</th>
                                    <td>รายงานการเสนอผลงานในที่ประชุมวิชาการ</td>
                                    <td><span class="is-size-6 has-text-grey">ไม่พบข้อมูล</span></td>
                                    <td>{false && <input type="checkbox">เลือก</input> }</td>
                                </tr>
                                <tr>
                                    <th>ประภาพร รัตนธำรง</th>
                                    <td>รายงานบทความ-ผลงานตีพิมพ์ในวารสารวิชาการต่างๆ</td>
                                    <td><span class="is-size-6 has-text-primary">มีผลงาน</span></td>
                                    <td><input type="checkbox"/> เลือก</td>
                                </tr>

                                
                            </tbody>
                        </table>
                    </div>
                </section>
            </div> */}

            {/* --------------------------------------------------------------------- */}

            {showPopupLoading && <PopupCreateForm />}
            {showPopupSucces && <PopupCreateSuccess clickPopupClose={clickPopupClose} />}

            {showTableForEveryone &&
                <section class="section is-small">
                    <div class="columns is-multiline">
                        <div class="column"></div>
                        <div class="field">
                            <button class="button is-primary" onClick={CallAPI} >สร้างแบบฟอร์ม</button>
                        </div>
                    </div>
                </section>
            }

        </Fragment>

    )
}

export default DataReportForeveryone2