import React, { Component, Fragment } from 'react'
import DataReportIndividual from './DataReportIndividual';
import DataReportForeveryone from './DataReportForeveryone';

export default class Report extends Component {

    constructor(props) {
        super(props);
        this.state = { selectFileShow: false }
    }

    state = {
        dataFile: [
            { filename: '', lastmodified: '' },
            { filename: '', lastmodified: '' },
            { filename: '', lastmodified: '' }
        ],
        showDataFiles: false,
        showList: '---- ไม่มีรายการ ----'
    }

    state = {
        salaryRound: '',
        year: '',
        department: '',
        instructorName: '',
    }

    state = {
        lectureFilenameForindividual: '',
        seniorProjectFilenameForindividual: '',
        articleForindividual: '',
        presentationForindividual: '',
    }

    state = {
        lectureFilenameForeveryone: '',
        seniorProjectFilenameForeveryone: '',
        articleForeveryone: '',
        presentationForeveryone: '',
    }

    state = { objectList: ['ประภาพร รัตนธำรง', 'วนิดา พฎธิวิทยา'] };

    state = { showSelectRadioForindividual: false }
    state = { showSelectRadioForeveryone: false }
    state = { showTableForeveryone: false }
    
    handleRadiosForIndividual = () => {
        this.setState({ showSelectRadioForindividual: true });
        this.setState({ showSelectRadioForeveryone: false });
    }
    handleRadiosForEveryone = () => {
        this.setState({ showSelectRadioForeveryone: true });
        this.setState({ showSelectRadioForindividual: false });
    }
    onChangeSalaryRound = (e) => {
        this.setState({ salaryRound: e.target.value });
    }
    onChangeYear = (e) => {
        this.setState({ year: e.target.value });
    }
    onChangeDepartment = (e) => {
        this.setState({ department: e.target.value });
    }

    onChangeinstructorName = (e) => {
        this.setState({ instructorName: e.target.value });
    }

    chackFileForEveryone = () => {

        this.setState({ showTableForeveryone: true });

        const AWS = require('aws-sdk/global');
        const S3 = require('aws-sdk/clients/s3');

        AWS.config.update({
            accessKeyId: 'AKIAJJOOQS6RRWQUJKNQ',
            secretAccessKey: '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',
            region: 'us-east-1'
        });
        const s3 = new AWS.S3();

        if (this.state.salaryRound == 'รอบ1 เดือน เมษายน') {
            var numyear = parseInt(this.state.year) - 1;
            console.log(numyear);
            var semeter = 1;
        }
        else if (this.state.salaryRound == 'รอบ2 เดือน ตุลาคม') {
            var numyear = parseInt(this.state.year) - 1;
            var semeter = 2;
        }
        var numyear_semeter = numyear + '_' + semeter + '_';

        var branch = ["สาขาวิชาวิทยาการคอมพิวเตอร์", "สาขาวิชาเคมี", "สาขาวิชาฟิสิกส์", "สาขาวิชาเทคโนโลยีชีวภาพ", "สาขาวิชาคณิตศาสตร์ประกันภัย",
            "สาขาวิชาเทคโนโลยีการเกษตร", "สาขาวิชาวิทยาศาสตร์สิ่งเเวดล้อม", "สาขาวิชาเทคโนโลยีเพื่อการพัฒนายั่งยืน", "สาขาวิชาวิทยาศาสตร์และเทคโนโลยีการอาหาร",
            "สาขาวิชาเทคโนโลยีวัสดุและสิ่งทอ"];
        var i;
        for (i = 0; i < branch.length; i++) {
            if (this.state.department == branch[i]) {
                var prefixLectrue1 = 'public/' + branch[i] + '/ภาระงานสอน/ปริญญาตรี/วิชาบรรยาย-วิชาปฏิบัติ/' + numyear_semeter + '';
                var prefixLectrue2 = 'public/' + branch[i] + '/ภาระงานสอน/ปริญญาตรี/วิชาบรรยาย-วิชาปฏิบัติ/';
                var prefixPathSenior1 = 'public/' + branch[i] + '/ภาระงานสอน/ปริญญาตรี/ซีเนียร์โปรเจค-ปัญหาพิเศษ-สัมมนา/' + numyear_semeter + '';
                var prefixPathSenior2 = 'public/' + branch[i] + '/ภาระงานสอน/ปริญญาตรี/ซีเนียร์โปรเจค-ปัญหาพิเศษ-สัมมนา/';
            }
        }

        // Lecture for everyone
        const paramsLecture = {
            Bucket: 'amplifys3storagegetestnd132251-dev',
            Delimiter: '',
            Prefix: prefixLectrue1,
        };

        s3.listObjectsV2(paramsLecture, (err, data) => {
            var file_name1 = (data.Contents[0].Key).split(prefixLectrue2);
            var filename = file_name1[1] + "";
            this.setState({ lectureFilenameForeveryone: filename })
        })

        //Senior  for everyone
        const paramsSenior = {
            Bucket: 'amplifys3storagegetestnd132251-dev',
            Delimiter: '',
            Prefix: prefixPathSenior1,
        };

        s3.listObjectsV2(paramsSenior, (err, data) => {
            var file_name1 = (data.Contents[0].Key).split(prefixPathSenior2);
            var filename = file_name1[1] + "";
            this.setState({ seniorProjectFilenameForeveryone: filename })
        })

        // article for individual
        var prefixArticle = 'public/สาขาวิชาวิทยาการคอมพิวเตอร์/ผลงานทางวิชาการ/รายงานบทความ-ผลงานตีพิมพ์ในวารสารวิชาการต่างๆ/ประภาพร รัตนธำรง_';
        const paramsArticle = {
            Bucket: 'amplifys3storagegetestnd132251-dev',
            Delimiter: '',
            Prefix: prefixArticle,
        };

        s3.listObjectsV2(paramsArticle, (err, data) => {
            // console.log(data);
            var file_name1 = (data.Contents[0].Key).split('public/สาขาวิชาวิทยาการคอมพิวเตอร์/ผลงานทางวิชาการ/รายงานบทความ-ผลงานตีพิมพ์ในวารสารวิชาการต่างๆ/');
            var filename = file_name1[1] + "";
            this.setState({ articleForeveryone: filename })
        })

        // Presentation for individual
        var prefixPresentation = 'public/สาขาวิชาวิทยาการคอมพิวเตอร์/ผลงานทางวิชาการ/รายงานการเสนอผลงานในที่ประชุมวิชาการ/ประภาพร รัตนธำรง_';
        const paramsPresentation = {
            Bucket: 'amplifys3storagegetestnd132251-dev',
            Delimiter: '',
            Prefix: prefixPresentation,
        };

        s3.listObjectsV2(paramsPresentation, (err, data) => {
            var file_name1 = (data.Contents[0].Key).split('public/สาขาวิชาวิทยาการคอมพิวเตอร์/ผลงานทางวิชาการ/รายงานการเสนอผลงานในที่ประชุมวิชาการ/');
            var filename = file_name1[1] + "";
            this.setState({ presentationForeveryone: filename })
        })

        // Test get งานวิชาการ #####################################################
        var instructor = ["ประภาพร รัตนธำรง", "วนิดา พฤทธิวิทยา", "นุชชากร งามเสาวรส", "เสาวลักษณ์ วรรธนาภา", "ธนาธร ทะนานทอง",
            "เยาวดี เต็มธนาภัทร์", "เด่นดวง ประดับสุวรรณ"];
        const paramsTest = {
            Bucket: 'amplifys3storagegetestnd132251-dev',
            Delimiter: '',
            Prefix: 'public/',
        };

        var arr = [];
        var arrArtical = [];
        var arrPresentation = [];
        s3.listObjectsV2(paramsTest, (err, data) => {
            console.log(data.Contents);
            // วนลูปสาขา กับ ชื่ออาจารย์
            var iT;
            for (iT = 0; iT < data.Contents.length; iT++) {
                // console.log(data.Contents[iT].Key);
                arr.push(data.Contents[iT].Key);
            }
            for (let index = 0; index < arr.length; index++) {
                // console.log(arr[index]);
                var buffer = arr[index].split('/');
                // console.log(buffer);
                if (buffer[1] == this.state.department && buffer[3] == 'รายงานบทความ-ผลงานตีพิมพ์ในวารสารวิชาการต่างๆ') {
                    // console.log(arr[index]);
                    arrArtical.push(arr[index]);
                }
                if (buffer[1] == this.state.department && buffer[3] == 'รายงานการเสนอผลงานในที่ประชุมวิชาการ') {
                    arrPresentation.push(arr[index]);
                    // this.setState({objectList: arr[index]})
                }
            }
        })

    }

    render() {

        return (
            <Fragment>
                <div className="box cta ">
                    {/* Tabs */}
                    <div class="tabs is-centered">
                        <ul>
                            <li class="is-active">
                                <a href="" className="navbar-item" ><span class="icon is-small" ><i class="far fa-file-alt" aria-hidden="true"></i></span>
                                     สร้างแบบฟอร์มภาระงานอาจารย์
                                </a>
                            </li>

                            <li >
                                <a href="/Send_report" className="navbar-item" ><span class="icon is-small" ><i class="far fa-file-alt" aria-hidden="true"></i></span>
                                     ส่งแบบฟอร์มภาระงานอาจารย์
                                </a>
                            </li>

                        </ul>
                    </div>

                    <div class="columns">
                        <div class="column"></div>
                        <div class="column is-four-fifths">
                            <div class="card">
                                <section class="section is-small">
                                    <div class="container">
                                        <div class="columns is-multiline is-centered">

                                            <div class="column is-one-quarter">
                                                <div class="field">
                                                    <label class="label">รอบเลื่อนเงินเดือน :</label>
                                                </div>

                                                <div class="select" value={this.state.salaryRound} onChange={this.onChangeSalaryRound}>
                                                    <select>
                                                        <option>โปรดเลือก</option>
                                                        <option>รอบ1 เดือน เมษายน</option>
                                                        <option>รอบ2 เดือน ตุลาคม</option>
                                                    </select>
                                                </div>

                                            </div>

                                            <div class="column is-one-quarter">
                                                <div class="field">
                                                    <label class="label">ปี พ.ศ. :</label>
                                                </div>

                                                <div class="select" value={this.state.year} onChange={this.onChangeYear}>
                                                    <select>
                                                        <option>โปรดเลือก</option>
                                                        <option>2564</option>
                                                        <option>2563</option>
                                                        <option>2562</option>
                                                        <option>2561</option>
                                                    </select>
                                                </div>

                                            </div>

                                        </div>
                                    </div>

                                    <div class="container">
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
                                                    <label class="label">เลือก :</label>
                                                </div>
                                                <div className="radios-group">

                                                    <label for="flexRadioDefault1">
                                                        <input type="radio" value="option1" name="flexRadioDefault" id="flexRadioDefault1" onChange={this.handleRadiosForEveryone} />สำหรับทุกคน
                                                    </label>

                                                    <label for="flexRadioDefault2">
                                                        <input type="radio" value="option1" name="flexRadioDefault" id="flexRadioDefault2" onChange={this.handleRadiosForIndividual} />สำหรับรายบุคคล
                                                    </label>

                                                </div>

 
                                            </div>
                                        </div>
                                    </div>
                                                                      
                                    {this.state.showSelectRadioForeveryone && <DataReportForeveryone 
                                        salaryRound={this.state.salaryRound} year={this.state.year} department={this.state.department} />}
                                    {this.state.showSelectRadioForindividual && <DataReportIndividual 
                                        salaryRound={this.state.salaryRound} year={this.state.year} department={this.state.department} />}
                                
                                </section>
                            </div>
                        </div>
                        <div class="column"></div>
                    </div>

                    <div class="columns is-multiline is-centered">
                        <div class="field">
                            <button class="button is-primary">สร้างแบบฟอร์ม</button>
                        </div>
                    </div>




                </div>
            </Fragment>
        )
    }
}
