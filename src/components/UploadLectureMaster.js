import React, { Component, Fragment } from 'react'
import * as XLSX from 'xlsx';
import moment from 'moment';
import Amplify, { Storage } from 'aws-amplify';
import Popup from './Popup';
import PopupSaveFile from './PopupSaveFile';
import PopupDanger from './PopupDanger';
import PopupLoading from './PopupLoading';

const config = require('../config.json');

export default class UploadLectureMaster extends Component {

    constructor(props) {
        super(props);
        this.state = {
            year: '',
            semester: '',
            department: '',
            course: '',
            version: '',
            educationlevel: '',
        }

        this.onChangeYear = this.onChangeYear.bind(this);
        this.onChangeSemester = this.onChangeSemester.bind(this);
        this.onChangeDepartment = this.onChangeDepartment.bind(this);
        this.onChangeVersion = this.onChangeVersion.bind(this);
        this.onChangeEducationLevel = this.onChangeEducationLevel.bind(this);

    }

    state = { fileUrl: '', file: '', filename: '' }
    state = {
        chack: false
    }

    // เพิ่มมา 23/04/64
    state = {
        showPopup: false,
        showPopupSave: false,
        showPopupDanger: false,
        showNotification: false,
        textAleart: [],
        textAleartSave: '',
        textAleartDanger: ''
    }
    state = {
        isPending :false,
        filePathToSendApi :''
    }
    clickPopup = (e) => {
        this.setState({ showPopup: !this.state.showPopup })
    }
    clickPopupSave = (e) => {
        this.setState({ showPopupSave: !this.state.showPopupSave })
    }
    clickPopupDanger = (e) => {
        this.setState({ showPopupDanger: !this.state.showPopupDanger })
    }
    clickNotification = (e) => {
        this.setState({ showNotification: !this.state.showNotification })
    }
    //

    onChangeYear = (e) => {
        this.setState({ year: e.target.value })
    }
    onChangeSemester = (e) => {
        this.setState({ semester: e.target.value })
    }
    onChangeDepartment = (e) => {
        this.setState({ department: e.target.value })
    }
    onChangeVersion = (e) => {
        this.setState({ version: e.target.value })
    }
    onChangeEducationLevel = (e) => {
        this.setState({ educationlevel: e.target.value })
    }
    onChangeCourse = (e) => {
        this.setState({ course: e.target.value })
    }

    compareTableName = () => {

        let departmentName = '';
        //department
        if (this.state.department === 'สาขาวิชาวิทยาการคอมพิวเตอร์') {
            departmentName = 'ComputerScience';
        }
        else if (this.state.department === 'สาขาวิชาฟิสิกส์') {
            departmentName = 'Physics';
        }
        else if (this.state.department === 'สาขาวิชาเคมี') {
            departmentName = 'Chemistry';
        }
        else if (this.state.department === 'สาขาวิชาเทคโนโลยีชีวภาพ') {
            departmentName = 'Biotechnology';
        }
        else if (this.state.department === 'สาขาวิชาคณิตศาสตร์และสถิติ') {
            departmentName = 'MathematicsAndStatistics';
        }
        else if (this.state.department === 'สาขาวิชาเทคโนโลยีการเกษตร') {
            departmentName = 'Agricultural';
        }
        else if (this.state.department === 'สาขาวิชาวิทยาศาสตร์สิ่งเเวดล้อม') {
            departmentName = 'EnvironmentalScience';
        }
        else if (this.state.department === 'สาขาวิชาเทคโนโลยีเพื่อการพัฒนายั่งยืน') {
            departmentName = 'SustainableDevelopment';
        }
        else if (this.state.department === 'สาขาวิชาวิทยาศาสตร์และเทคโนโลยีการอาหาร') {
            departmentName = 'FoodScience';
        }
        else if (this.state.department === 'สาขาวิชาเทคโนโลยีวัสดุและสิ่งทอ') {
            departmentName = 'MaterialsAndTextile';
        }

        //course
        let courseName = '';
        if (this.state.course === 'วิทยาศาสตรมหาบัณฑิต สาขาวิชาการจัดการเกษตรอินทรีย์') {
            courseName = '';//////
        }
        else if (this.state.course === 'วิทยาศาสตรมหาบัณฑิต สาขาวิชาการพัฒนาทรัพยากรมนุษย์และผลิตภัณฑ์นวัตกรรมอาหาร') {
            courseName = '';//////
        }
        else if (this.state.course === 'วิทยาศาสตรมหาบัณฑิต สาขาวิชาคณิตศาสตร์') {
            courseName = 'Mathematics';
        }
        else if (this.state.course === 'วิทยาศาสตรมหาบัณฑิต สาขาวิชาสถิติประยุกต์') {
            courseName = 'AppliedStatistics';
        }
        else if (this.state.course === 'วิทยาศาสตรมหาบัณฑิต สาขาวิชาเคมี') {
            courseName = 'Chemistry';
        }
        else if (this.state.course === 'วิทยาศาสตรมหาบัณฑิต สาขาวิชาเทคโนโลยีการเกษตร') {
            courseName = 'Agricultural';
        }
        else if (this.state.course === 'วิทยาศาสตรมหาบัณฑิต สาขาวิชาเทคโนโลยีชีวภาพ') {
            courseName = 'Biotechnology';
        }
        else if (this.state.course === 'วิทยาศาสตรมหาบัณฑิต สาขาวิชาเทคโนโลยีเพื่อการพัฒนายั่งยืน') {
            courseName = 'SustainableDevelopment';
        }
        else if (this.state.course === 'วิทยาศาสตรมหาบัณฑิต สาขาวิชานวัตกรรมและเทคโนโลยีวัสดุ') {
            courseName = 'Materials';
        }
        else if (this.state.course === 'วิทยาศาสตรมหาบัณฑิต สาขาวิชาฟิสิกส์') {
            courseName = 'Physics';
        }
        else if (this.state.course === 'วิทยาศาสตรมหาบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์') {
            courseName = 'ComputerScience';
        }
        else if (this.state.course === 'วิทยาศาสตรมหาบัณฑิต สาขาวิชาวิทยาศาสตร์และเทคโนโลยีการอาหาร') {
            courseName = 'FoodScience';
        }
        else if (this.state.course === 'วิทยาศาสตรมหาบัณฑิต สาขาวิชาวิทยาศาสตร์สิ่งแวดล้อม') {
            courseName = 'EnvironmentalScience';
        }
        

        // version
        let versionName = ''
        if(this.state.version === 'วิชาบรรยาย-วิชาปฏิบัติ'){
            versionName = 'Class';
        }
        else if(this.state.version === 'วิทยานิพนธ์-สารนิพนธ์'){
            versionName = 'Thesis';
        }


        return "Master_"+departmentName+"_"+courseName+"_"+versionName+"_"+this.state.semester+"-"+this.state.year;
    }

    sendMessageApi = (e)=>{
        console.log("send message to API Master");

        let tableNameFromFunction = this.compareTableName()
        let fileName = (this.state.filePathToSendApi).split("/")[6];
        let filePath = (this.state.filePathToSendApi).split(fileName)[0];

        console.log(tableNameFromFunction);
        var arrToSend = {
            "httpMethod": "POST",
            "tableName": tableNameFromFunction, // ต้อง map ค่า thai -> eng 
            "bucketName": filePath, // this.state.filePath
            "fileName": fileName // this.state.fileName
        }
        console.log(arrToSend);

        // if (this.state.version === 'วิชาบรรยาย-วิชาปฏิบัติ') {
        //     //call lambda lecture
            
        // }
        // if (this.state.version === 'ซีเนียร์โปรเจค-ปัญหาพิเศษ-สัมมนา') {
        //     //call lambda specail Project
        // }


    }


    handleChange = e => {
        const file = e.target.files[0]
        this.setState({
            fileUrl: URL.createObjectURL(file),
            file,
            filename: file.name
        })
        this.readExcel(file);

    }

    readExcel = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = (e) => {
                const bufferArray = e.target.result;
                const wb = XLSX.read(bufferArray, { type: "buffer" });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                //   ws['!ref'] = "A1:T6";
                //   const data = XLSX.utils.sheet_to_json(ws);

                resolve(ws);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });

        promise.then((d) => {

            // alert(this.state.educationlevel)

            if (this.state.version === 'วิชาบรรยาย-วิชาปฏิบัติ') {

                var buffer = (d.A3.v).split(" ");
                var buffer2 = buffer[1].split("/");
                var DepartmentFromFile = ((d.A1.v).split(" "))[1];
                var SemesterFromFile = buffer2[0];
                var YearFromFile = buffer2[1];
                var LectureFromFile = ((d.P5.v).split(" ", 1))[0];
                var PracticeFromFile = ((d.Q5.v).split(" ", 1))[0];
                var CourseFromFile = d.D2.v;
                var EducationFromFile = d.M2.v;

                console.log(DepartmentFromFile);
                console.log(SemesterFromFile);
                console.log(YearFromFile);
                console.log(LectureFromFile);
                console.log(PracticeFromFile);

                if (DepartmentFromFile === this.state.department && LectureFromFile === 'บรรยาย' && PracticeFromFile === 'ปฏิบัติ'
                    && SemesterFromFile === this.state.semester && YearFromFile === this.state.year
                    && CourseFromFile === this.state.course && EducationFromFile === 'ปริญญาโท') {
                    this.setState({ chack: true })
                    // alert('Good!! (ป.โท เอก บรรยาย/ปฏิบัติ) --> Format ถูกต้องสามารถอัปโหลดข้อมูลได้');
                    this.setState({
                        showNotification: true
                    })
                }
                else {
                    var arrTextAleart = [];
                    if (DepartmentFromFile !== this.state.department) {
                        arrTextAleart.push('"สาขาวิชา" ไม่ตรงกับข้อมูลนำเข้า');
                        this.setState({ department: '' })
                    }
                    if (LectureFromFile !== 'บรรยาย' && PracticeFromFile !== 'ปฏิบัติ') {
                        arrTextAleart.push('"ประเภท" ไม่ตรงกับข้อมูลนำเข้า');
                        this.setState({ version: '' })
                    }
                    if (SemesterFromFile !== this.state.semester) {
                        arrTextAleart.push('"ภาคการศึกษา" ไม่ตรงกับข้อมูลนำเข้า');
                        this.setState({ semester: '' })
                    }
                    if (YearFromFile !== this.state.year) {
                        arrTextAleart.push('"ปีการศึกษา" ไม่ตรงกับข้อมูลนำเข้า');
                        this.setState({ year: '' })
                    }
                    if (CourseFromFile !== this.state.course) {
                        arrTextAleart.push('"หลักสูตร" ไม่ตรงกับข้อมูลนำเข้า');
                        this.setState({ course: '' })
                    }
                    if (EducationFromFile !== 'ปริญญาโท') {
                        arrTextAleart.push('"ระดับการศึกษา" ไม่ตรงกับข้อมูลนำเข้า');
                        this.setState({ educationlevel: '' })
                    }
                    // เพิ่ม
                    this.setState({
                        textAleart: arrTextAleart,
                        showPopup: true
                    })

                }
            }

            if (this.state.version === 'วิทยานิพนธ์-สารนิพนธ์') {
                // alert(this.state.version)

                var buffer = (d.A3.v).split(" ");
                var buffer2 = buffer[1].split("/");
                var DepartmentFromFile = ((d.A1.v).split(" "))[1];
                var SemesterFromFile = buffer2[0];
                var YearFromFile = buffer2[1];
                var ThesisFromFile = d.I6.v;
                var CourseFromFile = d.D2.v;
                var EducationFromFile = d.M2.v;

                console.log(DepartmentFromFile);
                console.log(SemesterFromFile);
                console.log(YearFromFile);
                console.log(ThesisFromFile);

                if (this.state.department === DepartmentFromFile && 'วิทยานิ-พนธ์' === ThesisFromFile
                    && this.state.year === YearFromFile && this.state.semester === SemesterFromFile
                    && CourseFromFile === this.state.course && EducationFromFile === 'ปริญญาโท') {

                    this.setState({ chack: true })
                    // alert('Good!! (ป.โท เอก วิทยานิพนธ์) --> Format ถูกต้องสามารถอัปโหลดข้อมูลได้');
                    this.setState({
                        showNotification: true
                    })
                }
                else {
                    var arrTextAleart = [];
                    if (DepartmentFromFile !== this.state.department) {
                        arrTextAleart.push('"สาขาวิชา" ไม่ตรงกับข้อมูลนำเข้า');
                        this.setState({ department: '' })
                    }
                    if (ThesisFromFile !== 'วิทยานิ-พนธ์') {
                        arrTextAleart.push('"ประเภท" ไม่ตรงกับข้อมูลนำเข้า');
                        this.setState({ version: '' })
                    }
                    if (SemesterFromFile !== this.state.semester) {
                        arrTextAleart.push('"ภาคการศึกษา" ไม่ตรงกับข้อมูลนำเข้า');
                        this.setState({ semester: '' })
                    }
                    if (YearFromFile !== this.state.year) {
                        arrTextAleart.push('"ปีการศึกษา" ไม่ตรงกับข้อมูลนำเข้า');
                        this.setState({ year: '' })
                    }
                    if (CourseFromFile !== this.state.course) {
                        arrTextAleart.push('"หลักสูตร" ไม่ตรงกับข้อมูลนำเข้า');
                        this.setState({ course: '' })
                    }
                    if (EducationFromFile !== 'ปริญญาโท') {
                        arrTextAleart.push('"ระดับการศึกษา" ไม่ตรงกับข้อมูลนำเข้า');
                        this.setState({ educationlevel: '' })
                    }
                    // alert(text_alert);
                    // เพิ่ม
                    this.setState({
                        textAleart: arrTextAleart,
                        showPopup: true
                    })
                }

            }

        })
            .catch(err => {
                alert('Format ไฟล์ข้อมูลไม่ถูกต้อง!!');
            })

    }

    saveFile = (e) => {

        this.setState({isPending:true});
        const DASH_DMYHMS = 'DD-MM-YYYY HH:mm:ss';
        const timeStamp = moment().format(DASH_DMYHMS);
        var fileName = this.state.department + "/" + "ภาระงานสอน" + "/ปริญญาโท/" + this.state.course + "/"+ this.state.year+"_"+this.state.semester+"_"+"/" + this.state.version + "/" +
            this.state.year + "_" + this.state.semester + "_" + this.state.department + "_" + this.state.version + "_" + timeStamp + ".xlsx";

        if (this.state.chack) {
            Storage.put(fileName, this.state.file)
                .then(() => {
                    // 
                    this.setState({filePathToSendApi: fileName});
                    e.preventDefault();

                    this.sendMessageApi();
                    setTimeout(() => {

                        this.setState({ timer: true })
                        this.setState({
                            isPending: false,
                            showNotification: false
                        })
                        console.log('sueccessfully saved file!');
                        this.setState({
                            textAleartSave: 'Successfully save file!',
                            showPopupSave: true
                        })

                    }, 35000);

                    this.setState({ fileUrl: '', file: '', filename: '' })
                })
                .catch(err => {
                    console.log('error uploading file', err);
                })
        } else {
            this.setState({
                textAleartDanger: 'ข้อมูลไม่ถูกต้องโปรดตรวจสอบอีกครั้ง',
                showPopupDanger: true
            })
        }

    }

    render() {
        return (
            <Fragment>
                
                <div class="columns is-multiline is-centered">

                    <div class="column is-one-quarter">
                        <div class="field">
                            <label class="label">สาขาวิชา :</label>
                        </div>

                        <div class="select" value={this.state.department} onChange={this.onChangeDepartment}>
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

                    <div class="column is-one-quarter">
                        <div class="field">
                            <label class="label">หลักสูตร :</label>
                        </div>

                        <div class="select" value={this.state.course} onChange={this.onChangeCourse}>
                            <select>
                                <option>โปรดเลือก</option>
                                <option>วิทยาศาสตรมหาบัณฑิต สาขาวิชาการจัดการเกษตรอินทรีย์</option>
                                <option>วิทยาศาสตรมหาบัณฑิต สาขาวิชาการพัฒนาทรัพยากรมนุษย์และผลิตภัณฑ์นวัตกรรมอาหาร</option>
                                <option>วิทยาศาสตรมหาบัณฑิต สาขาวิชาคณิตศาสตร์</option>
                                <option>วิทยาศาสตรมหาบัณฑิต สาขาวิชาเคมี</option>
                                <option>วิทยาศาสตรมหาบัณฑิต สาขาวิชาเทคโนโลยีการเกษตร</option>
                                <option>วิทยาศาสตรมหาบัณฑิต สาขาวิชาเทคโนโลยีชีวภาพ</option>
                                <option>วิทยาศาสตรมหาบัณฑิต สาขาวิชาเทคโนโลยีเพื่อการพัฒนายั่งยืน</option>
                                <option>วิทยาศาสตรมหาบัณฑิต สาขาวิชานวัตกรรมและเทคโนโลยีวัสดุ</option>
                                <option>วิทยาศาสตรมหาบัณฑิต สาขาวิชาฟิสิกส์</option>
                                <option>วิทยาศาสตรมหาบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์</option>
                                <option>วิทยาศาสตรมหาบัณฑิต สาขาวิชาวิทยาศาสตร์และเทคโนโลยีการอาหาร</option>
                                <option>วิทยาศาสตรมหาบัณฑิต สาขาวิชาวิทยาศาสตร์สิ่งแวดล้อม</option>
                                <option>วิทยาศาสตรมหาบัณฑิต สาขาวิชาสถิติประยุกต์</option>
                            </select>
                        </div>

                    </div>
                </div>

                <div class="container">
                    <div class="columns is-multiline is-centered">

                        <div class="column is-one-quarter">
                            <div class="field">
                                <label class="label">ประเภท :</label>
                            </div>

                            <div class="select" value={this.state.version} onChange={this.onChangeVersion}>
                                <select>
                                    <option>โปรดเลือก</option>
                                    <option>วิชาบรรยาย-วิชาปฏิบัติ</option>
                                    <option>วิทยานิพนธ์-สารนิพนธ์</option>
                                </select>
                            </div>

                        </div>

                        <div class="column is-one-quarter">
                            <div class="field">
                                <label class="label">ปีการศึกษา :</label>
                            </div>

                            <input class="input" type="text" placeholder="25XX" value={this.state.year} onChange={this.onChangeYear}></input>
                        </div>

                        <div class="column is-one-quarter">
                            <div class="field">
                                <label class="label">ภาคการศึกษา :</label>
                            </div>

                            <div class="select" value={this.state.semester} onChange={this.onChangeSemester}>
                                <select>
                                    <option>โปรดเลือก</option>
                                    <option>1</option>
                                    <option>2</option>
                                </select>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="container">
                    <div class="columns is-multiline is-centered">
                        <div class="field">
                            <div class="column is-one-quarter">
                                <input type='file' className="selectfile" onChange={this.handleChange} />
                            </div>
                        </div>

                    </div>
                </div>

                {/* เพิ่มเติม */}
                {this.state.showNotification && <article class="message is-primary">
                    <div class="message-body ">
                        Format ไฟล์ข้อมูลถูกต้องสามารถอัปโหลดไฟล์ข้อมูลได้
                    </div>
                </article>}



                <div class="container level-right">
                    <div class="columns is-multiline is-centered">
                        <div class="colum is-one-quarter">
                            <button class="button is-primary " onClick={this.saveFile}>
                                <span class="icon is-small">
                                    <i class="fas fa-check"></i>
                                </span>
                                {!this.state.isPending && <span>บันทึกข้อมูล</span>}
                                {this.state.isPending && <span>กำลังบันทึกข้อมูล...</span>}
                            </button>
                        </div>
                    </div>
                </div>

                {this.state.isPending && <PopupLoading />}

                {this.state.showPopup && <Popup 
                    clickPopup={this.clickPopup} 
                    textAleart={this.state.textAleart} 
                    />}

                {this.state.showPopupSave && <PopupSaveFile 
                    clickPopupSave={this.clickPopupSave} 
                    textAleart={this.textAleartSave} 
                    // sendApi = {this.sendMessageApi} 
                    />}
                
                {this.state.showPopupDanger && <PopupDanger 
                    clickPopupDanger={this.clickPopupDanger} 
                    textAleart={this.textAleartDanger} 
                    />}

            </Fragment>
        )
    }
}
