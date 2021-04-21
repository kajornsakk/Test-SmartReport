import React, { Component } from 'react'
import AWS from 'aws-sdk';
import PopupReportIndividual from './PopupReportIndividual';

export default class DataReportIndividual extends Component {

    state = {
        instructor: ''
    }
    state = {
        fileLectureForIndividual: '',
        fileSeniorForIndividual: '',
        fileArticleForIndividual: '',
        filePresentationForIndividual: ''
    }
    state = {
        showPopup: false
    }

    onChangeInstructor = (e) => {
        this.setState({ instructor: e.target.value })
    }

    onClickPopup = () => {
        this.setState({ showPopup: true })
    }

    chackFileForIndividual = () => {
        console.log(this.props.salaryRound);
        console.log(this.props.year);
        console.log(this.props.department);
        console.log(this.state.instructor);

        AWS.config.update({
            accessKeyId: 'AKIAJJOOQS6RRWQUJKNQ',
            secretAccessKey: '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',
            region: 'us-east-1'
        });
        const s3 = new AWS.S3();

        if (this.props.salaryRound === 'รอบ1 เดือน เมษายน') {
            var numyear = parseInt(this.props.year) - 1;
            console.log(numyear);
            var semeter = 1;
        }
        else if (this.props.salaryRound === 'รอบ2 เดือน ตุลาคม') {
            var numyear = parseInt(this.props.year) - 1;
            var semeter = 2;
        }
        var numyear_semeter = numyear + '_' + semeter + '_';

        // Lecture for individual
        var prefixLectrue1 = 'public/' + this.props.department + '/ภาระงานสอน/ปริญญาตรี/วิชาบรรยาย-วิชาปฏิบัติ/' + numyear_semeter + '';
        const paramsLecture = {
            Bucket: 'amplifys3smartreport142809-dev',
            Delimiter: '',
            Prefix: prefixLectrue1,
        };

        s3.listObjectsV2(paramsLecture, (err, data) => {
            var file_name1 = (data.Contents[0].Key).split(prefixLectrue1);
            var filename = file_name1[1] + "";
            this.setState({
                fileLectureForIndividual: filename
            })

        })

        //Senior  for individual
        var prefixPathSenior1 = 'public/' + this.props.department + '/ภาระงานสอน/ปริญญาตรี/ซีเนียร์โปรเจค-ปัญหาพิเศษ-สัมมนา/' + numyear_semeter + '';
        const paramsSenior = {
            Bucket: 'amplifys3smartreport142809-dev',
            Delimiter: '',
            Prefix: prefixPathSenior1,
        };

        s3.listObjectsV2(paramsSenior, (err, data) => {
            var file_name1 = (data.Contents[0].Key).split(prefixPathSenior1);
            var filename = file_name1[1] + "";
            this.setState({
                fileSeniorForIndividual: filename
            })

        })

        // article for individual
        var prefixArticle = 'public/' + this.props.department + '/ผลงานทางวิชาการ/รายงานบทความ-ผลงานตีพิมพ์ในวารสารวิชาการต่างๆ/' + this.state.instructor + '';
        const paramsArticle = {
            Bucket: 'amplifys3smartreport142809-dev',
            Delimiter: '',
            Prefix: prefixArticle,
        };

        s3.listObjectsV2(paramsArticle, (err, data) => {
            // console.log(data);
            var lastFile = ((data.Contents.length) - 1);
            var file_name1 = (data.Contents[lastFile].Key).split('public/สาขาวิชาวิทยาการคอมพิวเตอร์/ผลงานทางวิชาการ/รายงานบทความ-ผลงานตีพิมพ์ในวารสารวิชาการต่างๆ/');
            var filename = file_name1[1] + "";
            // console.log(filename);
            this.setState({ fileArticleForIndividual: filename })
        })

        // Presentation for individual
        var prefixPresentation = 'public/' + this.props.department + '/ผลงานทางวิชาการ/รายงานการเสนอผลงานในที่ประชุมวิชาการ/' + this.state.instructor + '';
        const paramsPresentation = {
            Bucket: 'amplifys3smartreport142809-dev',
            Delimiter: '',
            Prefix: prefixPresentation,
        };

        s3.listObjectsV2(paramsPresentation, (err, data) => {
            var lastFile = ((data.Contents.length) - 1);
            var file_name1 = (data.Contents[lastFile].Key).split('public/สาขาวิชาวิทยาการคอมพิวเตอร์/ผลงานทางวิชาการ/รายงานการเสนอผลงานในที่ประชุมวิชาการ/');
            var filename = file_name1[1] + "";
            this.setState({ filePresentationForIndividual: filename })
        })

    }

    render() {
        const active = this.state.showPopup ? "is-active" : "";
        return (
            <div class="container">
                <div class="columns is-multiline is-centered">
                    <div class="column is-one-quarter">
                        <div class="field">
                            <label class="label">รายชื่อ :</label>
                        </div>

                        <div class="select" value={this.state.instructor} onChange={this.onChangeInstructor}>
                            <select>
                                <option>โปรดเลือก</option>
                                <option>ประภาพร รัตนธำรง</option>
                                <option>วนิดา พฤทธิวิทยา</option>
                                <option>นุชชากร งามเสาวรส</option>
                                <option>เสาวลักษณ์ วรรธนาภา</option>
                                <option>ธนาธร ทะนานทอง</option>
                                <option>เยาวดี เต็มธนาภัทร์</option>
                                <option>เด่นดวง ประดับสุวรรณ</option>
                            </select>
                        </div>
                    </div>

                </div>
                <div class="columns is-multiline is-centered">
                    <div class="field">
                        <button class="button is-primary" onClick={this.chackFileForIndividual}>ตรวจสอบข้อมูล</button>
                    </div>
                </div>


                <div class="columns is-multiline is-centered">
                    {/* <div class="column is-centered"> */}
                    <table class="table is-striped is-fullwidth">
                        <thead>
                            <tr>
                                <th>หัวข้อ</th>
                                <th>ชื่อไฟล์</th>
                                <th>เปลี่ยนไฟล์</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>วิชาบรรยายเเละปฎิบัติการ</td>
                                <td>{this.state.fileLectureForIndividual}</td>
                                <td><button class="button is-small is-primary" onClick={this.onClickPopup}>เลือกไฟล์</button></td>
                            </tr>
                            <tr>
                                <td>ซีเนียร์โปรเจคหรือปัญหาพิเศษ</td>
                                <td>{this.state.fileSeniorForIndividual}</td>
                                <td><button class="button is-small is-primary">เลือกไฟล์</button></td>
                            </tr>
                            <tr>
                                <td>บทความ/ผลงานตีพิมพ์ในวารสารวิชาการ</td>
                                <td>{this.state.fileArticleForIndividual}</td>
                                <td><button class="button is-small is-primary">เลือกไฟล์</button></td>
                            </tr>
                            <tr>
                                <td>การเสนอผลงานในที่ประชุมวิชาการ</td>
                                <td>{this.state.filePresentationForIndividual}</td>
                                <td><button class="button is-small is-primary">เลือกไฟล์</button></td>
                            </tr>
                        </tbody>
                    </table>
                    {/* </div> */}

                </div>
                {this.state.showPopup && <PopupReportIndividual classActive={active}/>}
            </div>
        )
    }
}
