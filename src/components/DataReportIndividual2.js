import React, { Fragment, useState } from 'react'
import AWS from 'aws-sdk';
import axios from 'axios';
import PopupChangeFileCon from './PopupChangeFileCon';
import PopupChangeFileArtical from './PopupChangeFileArtical';
import PopupWarningReportIndividual from './PopupWarningReportIndividual';
import PopupCreateSuccess from './PopupCreateSuccess';
import PopupCreateForm from './PopupCreateForm';

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

    const [filePathArticleForIndividual, setfilePathArticleForIndividual] = useState();
    const [statusArticleForIndividual, setstatusArticleForIndividual] = useState();

    const [filePathPresentationForIndividual, setfilePathPresentationForIndividual] = useState();
    const [statusPresentationForIndividual, setstatusPresentationForIndividual] = useState();

    //
    const [showPopupCreateForm, setshowPopupCreateForm] = useState(false);
    const [showPopupChangeFileCon, setshowPopupChangeFileCon] = useState(false);
    const [showPopupChangeFileArtical, setshowPopupChangeFileArtical] = useState(false);
    const [statusShowColorCon, setstatusShowColorCon] = useState();
    const [statusShowColorArtical, setstatusShowColorArtical] = useState();
    const [noInformationBachelor, setnoInformationBachelor] = useState(false);
    const [noInformationMaster, setnoInformationMaster] = useState(false);
    const [noInformationDoctor, setnoInformationDoctor] = useState(false);
    const [showPopupWarning, setShowPopupWarning] = useState(false);
    const [textAlertWarning, settextAlertWarning] = useState([]);
    const [showPopupSuccess, setshowPopupSuccess] = useState(false);
    const [timeUploadArtical, settimeUploadArtical] = useState('');
    const [timeUploadCon, settimeUploadCon] = useState('');
    const [semesterYear, setsemesterYear] = useState();

    function CheckBeforeSend() {

        var courseLength = listFiles.length + listFilesMaster.length + listFilesDoctor.length;
        var countB = 0;
        listFiles.forEach(list => {
            if (list.status === 'อัปโหลดเเล้ว') {
                countB++;
            }
        });
        var countM = 0;
        listFilesMaster.forEach(list => {
            if (list.status === 'อัปโหลดเเล้ว') {
                countM++;
            }
        });
        var countD = 0;
        listFilesDoctor.forEach(list => {
            if (list.status === 'อัปโหลดเเล้ว') {
                countD++;
            }
        });
        var totalCount = countB + countM + countD;

        var arrTextAlert = [];
        if (totalCount === courseLength && statusArticleForIndividual === 'มีผลงาน' && statusPresentationForIndividual === 'มีผลงาน') {
            return true;
        }
        else {
            if (totalCount !== courseLength) {
                arrTextAlert.push('ข้อมูล "หมวดภาระงานสอน" ไม่พร้อมสร้างฟอร์มรายงานผลการปฏิบัติงาน');
            }
            if (statusArticleForIndividual !== 'มีผลงาน' || statusPresentationForIndividual !== 'มีผลงาน') {
                arrTextAlert.push('ข้อมูล "หมวดผลงานทางวิชาการ" ไม่พร้อมสร้างฟอร์มรายงานผลการปฏิบัติงาน');
            }
            console.log(arrTextAlert);
            setShowPopupWarning(true);
            settextAlertWarning(arrTextAlert);
        }


        //else เเจ้งเป็นหมวดงานเลยว่าหมวดไหนข้อมูลไม่พร้อม
        //กรณีไม่พร้อมทั้ง 2 หมวดทำไง
    }

    function handleClickFromPopup() {
        setShowPopupWarning(!showPopupWarning);
    }

    function CliclPopupCloseSuccess() {
        setshowPopupSuccess(!showPopupSuccess);
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
        else if (lecture === 'ปัญหาพิเศษ-วิชาสัมมนา') {
            lectureName = 'SpecialTopic';
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



        return levelName + "_" + departmentName + "_" + courseName + "_" + lectureName + "_" + semesterYear;
    }

    function CallAPI() {
        console.log(listFiles);
        console.log(listFilesMaster);
        console.log(listFilesDoctor);
        // console.log(nameArticleForIndividual);
        console.log(statusArticleForIndividual);
        // console.log(namePresentationForIndividual);
        console.log(statusPresentationForIndividual);



        var bufferArr1 = listFiles.concat(listFilesMaster);
        var arrMerge = bufferArr1.concat(listFilesDoctor);
        console.log(arrMerge);

        var rangeFoMonth = '';
        var semesterTableName = '';
        if (props.salaryRound === 'รอบ1 เดือน เมษายน') {
            rangeFoMonth = 'กรกฎาคม-ธันวาคม';
            semesterTableName = '1';
        }
        else if (props.salaryRound === 'รอบ2 เดือน ตุลาคม') {
            rangeFoMonth = 'มกราคม-มิถุนายน';
            semesterTableName = '2';
        }

        // -------------
        var json = '{}';
        var obj = JSON.parse(json);
        obj['queryName'] = props.instructor;
        // console.log(obj);
        // console.log(JSON.stringify(obj));
        // -------------

        var arrTosend = [];
        arrTosend.push({
            ['queryName']: props.instructor,
        })
        arrMerge.forEach(list => {
            // ปริญญาตรี
            if (list.level === 'ปริญญาตรี') {
                if (list.status === 'อัปโหลดเเล้ว' && list.lecture === 'วิชาบรรยาย-วิชาปฏิบัติ') {
                    var b1 = compareTableName(list.level, list.department, list.course, list.lecture);
                    obj['tableBacherlorLecture'] = b1;
                    var b2 = compareTableName(list.level, list.department, list.course, list.lecture);
                    obj['tableBachelorLab'] = b2;
                }
                if (list.status === 'อัปโหลดเเล้ว' && list.lecture === 'ซีเนียร์โปรเจค-ปัญหาพิเศษ-สัมมนา') {
                    var b1 = compareTableName(list.level, list.department, list.course, list.lecture);
                    obj['tableBachelorSeminar'] = b1;
                    var b2 = compareTableName(list.level, list.department, list.course, list.lecture);
                    obj['tableBachelorSpecialProject'] = b2;
                }
            }

            //ปริญญาโท
            if (list.level === 'ปริญญาโท') {
                if (list.status === 'อัปโหลดเเล้ว' && list.lecture === 'วิชาบรรยาย-วิชาปฏิบัติ') {
                    var b1 = compareTableName(list.level, list.department, list.course, list.lecture);
                    obj['tableMasterLecture'] = b1;
                    var b2 = compareTableName(list.level, list.department, list.course, list.lecture);
                    obj['tableMasterLab'] = b2;
                }
                if (list.status === 'อัปโหลดเเล้ว' && list.lecture === 'วิทยานิพนธ์-สารนิพนธ์') {
                    var b1 = compareTableName(list.level, list.department, list.course, list.lecture);
                    obj['tableMasterThesis'] = b1;
                    var b2 = compareTableName(list.level, list.department, list.course, list.lecture);
                    obj['tableMasterIndependentStudy'] = b2;
                }
                if (list.status === 'อัปโหลดเเล้ว' && list.lecture === 'ปัญหาพิเศษ-วิชาสัมมนา') {
                    var b1 = compareTableName(list.level, list.department, list.course, list.lecture);
                    obj['tableMasterSeminar'] = b1;
                    var b2 = compareTableName(list.level, list.department, list.course, list.lecture);
                    obj['tableMasterSpecialProject'] = b2;
                }
            }

            //ปริญญาเอก
            if (list.level === 'ปริญญาเอก') {
                if (list.status === 'อัปโหลดเเล้ว' && list.lecture === 'วิชาบรรยาย') {
                    var b1 = compareTableName(list.level, list.department, list.course, list.lecture);
                    obj['tableDoctoralLecture'] = b1;
                    var b2 = compareTableName(list.level, list.department, list.course, list.lecture);
                    obj['tableDoctoralLab'] = b2;
                }
                if (list.status === 'อัปโหลดเเล้ว' && list.lecture === 'วิทยานิพนธ์') {
                    var b1 = compareTableName(list.level, list.department, list.course, list.lecture);
                    obj['tableDoctoralThesis'] = b1;
                    var b2 = compareTableName(list.level, list.department, list.course, list.lecture);
                    obj['tableDoctoralIndependentStudy'] = b2;
                }
                if (list.status === 'อัปโหลดเเล้ว' && list.lecture === 'ปัญหาพิเศษ-วิชาสัมมนา') {
                    var b1 = compareTableName(list.level, list.department, list.course, list.lecture);
                    obj['tableDoctoralSeminar'] = b1;
                    var b2 = compareTableName(list.level, list.department, list.course, list.lecture);
                    obj['tableDoctoralSpecialProject'] = b2;
                }
            }


        })

        obj['bucketName'] = 'willy-bucket';
        obj['fileName'] = 'ฟอร์มรายงานผลการปฏิบัติงานอาจารย์.xlsx';
        obj['signedBucketName'] = 'guy-bucket-test';

        let fileName = 'reports/' + props.department + '/' + props.year + '/' + props.salaryRound + '/แบบฟอร์มรายงานผลการปฏิบัติงาน_' + props.instructor + '_' + props.department + '_' + rangeFoMonth + '_' + props.year + '.xlsx';
        obj['signedFileName'] = fileName;


        // วิชาการ
        // ComputerScience_Artical_2-2564
        // ComputerScience_Conference_2-2564

        var departmentTableName = compareTableName('', props.department, '', '').split('_')[1];
        // var timeRG300 = ((filePathArticleForIndividual.split('/')[5]).split('_')[3]).split('.')[0];
        // var timeRG301 = ((filePathPresentationForIndividual.split('/')[5]).split('_')[3]).split('.')[0];
        var timeRG300 = timeUploadArtical.split('.')[0];
        var timeRG301 = timeUploadCon.split('.')[0];

        obj['tableRG300'] = departmentTableName + '_' + 'Artical_' + semesterTableName + '-' + props.year;
        obj['versionRG300'] = timeRG300;
        obj['tableRG301'] = departmentTableName + '_' + 'Conference_' + semesterTableName + '-' + props.year;
        obj['versionRG301'] = timeRG301;


        console.log(arrTosend);
        console.log(obj);
        // console.log(JSON.stringify(obj));




        var checkToSend = CheckBeforeSend();
        if (checkToSend) {
            setshowPopupCreateForm(true);
            console.log('call API');

            // call API create form
            var apiUrl = "https://h5r2je6zp5.execute-api.us-east-1.amazonaws.com/Prod/write-form-function";
            axios.post(apiUrl, obj)
                .then((res => {
                    console.log(res);
                    console.log(res.data.Response);

                    if (res.status === 200) {
                        setshowPopupCreateForm(false);
                        setshowPopupSuccess(true);
                    }
                    else{
                        alert("สร้างฟอร์มไม่สำเร็จ โปรดลองใหม่อีกครั้ง")
                    }

                }))
                .catch((error) => {
                    if (error.response) {
                        console.log(error.response);
                    } else if (error.request) {
                        console.log(error.request);
                    }
                })

            // when create succes show popup success
            // setTimeout(() => {
            //     setshowPopupCreateForm(false);
            //     setshowPopupSuccess(true);
            // }, 25000);
        }


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

            // 
            // data.Contents.forEach(list =>{
            //     var content = list.Key;
            //     content.split(prefixLectrue);
            //     console.log();
            // })
            // 

            var contents = data.Contents;
            console.log(contents);
            if (data.Contents.length === 0) {
                setnoInformationBachelor(true);
            }
            else {
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
                        console.log(checkYearSemester);

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
                // console.log(arrShow);
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
                console.log(data.Contents);
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
                    var arrBufferSpecialProblem = [];
                    contents.forEach(content => {
                        console.log(content);
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

                        // 
                        var chackSpecail = ((content.Key).split('public/' + props.department + '/ภาระงานสอน/ปริญญาโท/')[1]).split('/')[2];

                        if (course == checkCourse && chackSpecail == 'ปัญหาพิเศษ-วิชาสัมมนา' && checkYearSemester == numyear_semeter) {
                            arrBufferSpecialProblem.push(content.Key);
                        }
                        // 

                    })
                    var lengthh = arrBufferLecture.length;
                    test.push(arrBufferLecture[lengthh - 1])

                    var lengthhh = arrBufferAcademy.length;
                    test.push(arrBufferAcademy[lengthhh - 1])

                    if (arrBufferSpecialProblem.length >= 1) {
                        var lengthhhh = arrBufferSpecialProblem.length;
                        test.push(arrBufferSpecialProblem[lengthhhh - 1])
                    }
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
                    var arrBufferSpecialProblem = [];
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
                        // 
                        var chackSpecail = ((content.Key).split('public/' + props.department + '/ภาระงานสอน/ปริญญาเอก/')[1]).split('/')[2];

                        if (course == checkCourse && chackSpecail == 'ปัญหาพิเศษ-วิชาสัมมนา' && checkYearSemester == numyear_semeter) {
                            arrBufferSpecialProblem.push(content.Key);
                        }
                        // 

                    })
                    var lengthh = arrBufferLecture.length;
                    test.push(arrBufferLecture[lengthh - 1])

                    var lengthhh = arrBufferAcademy.length;
                    test.push(arrBufferAcademy[lengthhh - 1])

                    if (arrBufferSpecialProblem.length >= 1) {
                        var lengthhhh = arrBufferSpecialProblem.length;
                        test.push(arrBufferSpecialProblem[lengthhhh - 1])
                    }
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



        // ------------งานวิชาการ Artical----------------------------------------------------------------


        // article for individual
        console.log(props.salaryRound);
        console.log(props.year);

        var prefixArticle = 'public/' + props.department + '/ผลงานทางวิชาการ/รายงานบทความ-ผลงานตีพิมพ์ในวารสารวิชาการต่างๆ/' + props.salaryRound + "_" + props.year + '/' + props.instructor + '';
        console.log(prefixArticle);
        const paramsArticle = {
            Bucket: 'amplifys3smartreport142809-dev',
            Delimiter: '',
            Prefix: prefixArticle,
        };

        await s3.listObjectsV2(paramsArticle, (err, data) => {
            console.log(data);
            if (data.Contents.length >= 1) {
                var lastFile = ((data.Contents.length) - 1);
                var file_name1 = (data.Contents[lastFile].Key).split('public/' + props.department + '/ผลงานทางวิชาการ/รายงานบทความ-ผลงานตีพิมพ์ในวารสารวิชาการต่างๆ/' + props.salaryRound + "_" + props.year + '/');
                console.log(file_name1);
                var filename = file_name1[1] + "";
                var nameArticle = filename.split('_')[0];
                var timeFromFile = filename.split('_')[3];

                var check = 'ไม่พบข้อมูล';
                var statusShow = 'is-size-6 has-text-grey';
                if (props.salaryRound === 'รอบ1 เดือน เมษายน') {
                    check = 'มีผลงาน';
                    statusShow = 'is-size-6 has-text-primary';
                }
                else if (props.salaryRound === 'รอบ2 เดือน ตุลาคม') {
                    check = 'มีผลงาน';
                    statusShow = 'is-size-6 has-text-primary';
                }
                setstatusArticleForIndividual(check);
                setstatusShowColorArtical(statusShow);
                settimeUploadArtical(timeFromFile);
                setfilePathArticleForIndividual(data.Contents[lastFile].Key);
            }
            else {
                var check = 'ไม่พบข้อมูล';
                var statusShow = 'is-size-6 has-text-grey';
                setstatusArticleForIndividual(check);
                setstatusShowColorArtical(statusShow);
            }

        })




        // ------------งานวิชาการ Presentation----------------------------------------------------------------

        var prefixPresentation = 'public/' + props.department + '/ผลงานทางวิชาการ/รายงานการเสนอผลงานในที่ประชุมวิชาการ/' + props.salaryRound + "_" + props.year + '/' + props.instructor + '';
        const paramsPresentation = {
            Bucket: 'amplifys3smartreport142809-dev',
            Delimiter: '',
            Prefix: prefixPresentation,
        };

        await s3.listObjectsV2(paramsPresentation, (err, data) => {

            if (data.Contents.length >= 1) {
                var lastFile = ((data.Contents.length) - 1);
                var file_name1 = (data.Contents[lastFile].Key).split('public/' + props.department + '/ผลงานทางวิชาการ/รายงานการเสนอผลงานในที่ประชุมวิชาการ/' + props.salaryRound + "_" + props.year + '/');
                var filename = file_name1[1] + "";
                var namePresentation = filename.split('_')[0];
                var timeFromFile = filename.split('_')[3];


                var check = 'ไม่พบข้อมูล';
                var statusShow = 'is-size-6 has-text-grey';
                if (props.salaryRound === 'รอบ1 เดือน เมษายน') {
                    check = 'มีผลงาน';
                    statusShow = 'is-size-6 has-text-primary';
                }
                else if (props.salaryRound === 'รอบ2 เดือน ตุลาคม') {
                    check = 'มีผลงาน';
                    statusShow = 'is-size-6 has-text-primary';
                }
                setstatusPresentationForIndividual(check);
                setstatusShowColorCon(statusShow);
                settimeUploadCon(timeFromFile);
                setfilePathPresentationForIndividual(data.Contents[lastFile].Key);
            }
            else {
                var check = 'ไม่พบข้อมูล';
                var statusShow = 'is-size-6 has-text-grey';
                setstatusPresentationForIndividual(check);
                setstatusShowColorCon(statusShow);
            }

        })


        setshowTableForindividual(true);
    }

    function ChangeFileCon() {
        setshowPopupChangeFileCon(!showPopupChangeFileCon);
    }

    function ChangeFileArtical() {
        setshowPopupChangeFileArtical(!showPopupChangeFileArtical);
    }

    function SetFileChangeCon(param, clickFromChild) {
        if (clickFromChild === 'submit') {
            setshowPopupChangeFileCon(!showPopupChangeFileCon);
            // console.log(param[0]);
            setfilePathPresentationForIndividual(param[0]);
            console.log(param[0].time);
            settimeUploadCon(param[0].time);
        }
        if (clickFromChild === 'cancel') {
            setshowPopupChangeFileCon(!showPopupChangeFileCon);
        }

    }

    function SetFileChangeArtical(paramArtical, clickFromChild) {
        if (clickFromChild === 'submit') {
            setshowPopupChangeFileArtical(!showPopupChangeFileArtical);
            // console.log(paramArtical[0]);
            setfilePathArticleForIndividual(paramArtical[0]);
            console.log(paramArtical[0].time);
            settimeUploadArtical(paramArtical[0].time);
        }
        if (clickFromChild === 'cancel') {
            setshowPopupChangeFileArtical(!showPopupChangeFileArtical);
        }
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
                                {noInformationBachelor &&
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td><span class="is-size-6 has-text-grey">ไม่พบข้อมูล</span></td>
                                        <td></td>
                                    </tr>
                                }
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
                                {noInformationMaster &&
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td><span class="is-size-6 has-text-grey">ไม่พบข้อมูล</span></td>
                                        <td></td>
                                    </tr>
                                }



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
                                {noInformationDoctor &&
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td><span class="is-size-6 has-text-grey">ไม่พบข้อมูล</span></td>
                                        <td></td>
                                    </tr>
                                }
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
                                    <th>อัปโหลดเมื่อ</th>
                                    <th>สถานะ</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{props.instructor}</td>
                                    <td>บทความ/ผลงานตีพิมพ์ในวารสารวิชาการ</td>
                                    <td>{timeUploadArtical}</td>
                                    <td><span class={`${statusShowColorArtical}`}>{statusArticleForIndividual}</span></td>
                                    <td><button class="button are-small is-primary" onClick={ChangeFileArtical}>เปลี่ยนไฟล์</button></td>

                                </tr>
                                <tr>
                                    <td>{props.instructor}</td>
                                    <td>การเสนอผลงานในที่ประชุมวิชาการ</td>
                                    <td>{timeUploadCon}</td>
                                    <td><span class={`${statusShowColorCon}`}>{statusPresentationForIndividual}</span></td>
                                    <td><button class="button are-small is-primary" onClick={ChangeFileCon}>เปลี่ยนไฟล์</button></td>

                                </tr>

                            </tbody>
                        </table>
                    </div>
                </section>
            </div>}

            {/* เพิ่มเติม */}
            {showPopupChangeFileCon && <PopupChangeFileCon
                department={props.department}
                salaryRound={props.salaryRound}
                year={props.year}
                instructor={props.instructor}
                SetFileChange={SetFileChangeCon}
            />}

            {showPopupChangeFileArtical && <PopupChangeFileArtical
                department={props.department}
                salaryRound={props.salaryRound}
                year={props.year}
                instructor={props.instructor}
                SetFileChange={SetFileChangeArtical}
            />}

            {showPopupWarning && <PopupWarningReportIndividual
                textAlert={textAlertWarning}
                handleClick={handleClickFromPopup}
            />}

            {showPopupCreateForm && <PopupCreateForm />}

            {showPopupSuccess && <PopupCreateSuccess
                textAleart={'สร้างฟอร์มรายงานผลสำเร็จ'}
                clickPopupClose={CliclPopupCloseSuccess}
            />}


            {showTableForindividual &&
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

export default DataReportIndividual2