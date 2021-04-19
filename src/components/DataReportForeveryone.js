import React, { Component } from 'react'
import TableAcademyEveryoneReport from './TableAcademyEveryoneReport';
import TableLectureEveryoneReport from './TableLectureEveryoneReport';

export default class DataReportForeveryone extends Component {
    state = {
        lectureFilenameForeveryone: '',
        seniorProjectFilenameForeveryone: '',
        articleForeveryone: '',
        presentationForeveryone: '',
    }
    state = {
        showTableForeveryone: false
    }

    state = {
        departmentLectureForeveryone: '',
        yearLectureForeveryone: '',
        semesterLectureForeveryone: '',
        timeLectureForeveryone: '',

        departmentSeniorProjectForeveryone: '',
        yearSeniorProjectForeveryone: '',
        semesterSeniorProjectForeveryone: '',
        timeSeniorProjectForeveryone: ''
    }

    chackFileForEveryone = () => {
        this.setState({ showTableForeveryone: true });

        const AWS = require('aws-sdk/global');
        // const S3 = require('aws-sdk/clients/s3');

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

        var branch = ["สาขาวิชาวิทยาการคอมพิวเตอร์", "สาขาวิชาเคมี", "สาขาวิชาฟิสิกส์", "สาขาวิชาเทคโนโลยีชีวภาพ", "สาขาวิชาคณิตศาสตร์ประกันภัย",
            "สาขาวิชาเทคโนโลยีการเกษตร", "สาขาวิชาวิทยาศาสตร์สิ่งเเวดล้อม", "สาขาวิชาเทคโนโลยีเพื่อการพัฒนายั่งยืน", "สาขาวิชาวิทยาศาสตร์และเทคโนโลยีการอาหาร",
            "สาขาวิชาเทคโนโลยีวัสดุและสิ่งทอ"];
        var i;
        for (i = 0; i < branch.length; i++) {
            if (this.props.department === branch[i]) {
                var prefixLectrue1 = 'public/' + branch[i] + '/ภาระงานสอน/ปริญญาตรี/วิชาบรรยาย-วิชาปฏิบัติ/' + numyear_semeter + '';
                var prefixLectrue2 = 'public/' + branch[i] + '/ภาระงานสอน/ปริญญาตรี/วิชาบรรยาย-วิชาปฏิบัติ/';
                var prefixPathSenior1 = 'public/' + branch[i] + '/ภาระงานสอน/ปริญญาตรี/ซีเนียร์โปรเจค-ปัญหาพิเศษ-สัมมนา/' + numyear_semeter + '';
                var prefixPathSenior2 = 'public/' + branch[i] + '/ภาระงานสอน/ปริญญาตรี/ซีเนียร์โปรเจค-ปัญหาพิเศษ-สัมมนา/';
            }
        }
        
        // Lecture for everyone
        const paramsLecture = {
            Bucket: 'amplifys3smartreport142809-dev',
            Delimiter: '',
            Prefix: prefixLectrue1,
        };

        s3.listObjectsV2(paramsLecture, (err, data) => {
            var file_name1 = (data.Contents[0].Key).split(prefixLectrue2);
            var filename = file_name1[1] + "";
            // this.setState({ lectureFilenameForeveryone: filename })
            this.setState({
                departmentLectureForeveryone: (filename).split('_')[2],
                yearLectureForeveryone: (filename).split('_')[0],
                semesterLectureForeveryone: (filename).split('_')[1],
                timeLectureForeveryone: (filename).split('_')[4]
            })

        })

        //Senior  for everyone
        const paramsSenior = {
            Bucket: 'amplifys3smartreport142809-dev',
            Delimiter: '',
            Prefix: prefixPathSenior1,
        };

        s3.listObjectsV2(paramsSenior, (err, data) => {
            var file_name1 = (data.Contents[0].Key).split(prefixPathSenior2);
            var filename = file_name1[1] + "";
            // this.setState({ seniorProjectFilenameForeveryone: filename })
            this.setState({
                departmentSeniorProjectForeveryone: (filename).split('_')[2],
                yearSeniorProjectForeveryone: (filename).split('_')[0],
                semesterSeniorProjectForeveryone: (filename).split('_')[1],
                timeSeniorProjectForeveryone: (filename).split('_')[4]
            })

        })

        // article for individual
        // var prefixArticle = 'public/สาขาวิชาวิทยาการคอมพิวเตอร์/ผลงานทางวิชาการ/รายงานบทความ-ผลงานตีพิมพ์ในวารสารวิชาการต่างๆ/ประภาพร รัตนธำรง_';
        // const paramsArticle = {
        //     Bucket: 'amplifys3storagegetestnd132251-dev',
        //     Delimiter: '',
        //     Prefix: prefixArticle,
        // };

        // s3.listObjectsV2(paramsArticle, (err, data) => {
        //     // console.log(data);
        //     var file_name1 = (data.Contents[0].Key).split('public/สาขาวิชาวิทยาการคอมพิวเตอร์/ผลงานทางวิชาการ/รายงานบทความ-ผลงานตีพิมพ์ในวารสารวิชาการต่างๆ/');
        //     var filename = file_name1[1] + "";
        //     this.setState({ articleForeveryone: filename })
        // })

        // // Presentation for individual
        // var prefixPresentation = 'public/สาขาวิชาวิทยาการคอมพิวเตอร์/ผลงานทางวิชาการ/รายงานการเสนอผลงานในที่ประชุมวิชาการ/ประภาพร รัตนธำรง_';
        // const paramsPresentation = {
        //     Bucket: 'amplifys3storagegetestnd132251-dev',
        //     Delimiter: '',
        //     Prefix: prefixPresentation,
        // };

        // s3.listObjectsV2(paramsPresentation, (err, data) => {
        //     var file_name1 = (data.Contents[0].Key).split('public/สาขาวิชาวิทยาการคอมพิวเตอร์/ผลงานทางวิชาการ/รายงานการเสนอผลงานในที่ประชุมวิชาการ/');
        //     var filename = file_name1[1] + "";
        //     this.setState({ presentationForeveryone: filename })
        // })

        // Test get งานวิชาการ #####################################################
        // var instructor = ["ประภาพร รัตนธำรง", "วนิดา พฤทธิวิทยา", "นุชชากร งามเสาวรส", "เสาวลักษณ์ วรรธนาภา", "ธนาธร ทะนานทอง",
        //     "เยาวดี เต็มธนาภัทร์", "เด่นดวง ประดับสุวรรณ"];
        // const paramsTest = {
        //     Bucket: 'amplifys3storagegetestnd132251-dev',
        //     Delimiter: '',
        //     Prefix: 'public/',
        // };

        // var arr = [];
        // var arrArtical = [];
        // var arrPresentation = [];
        // s3.listObjectsV2(paramsTest, (err, data) => {
        //     console.log(data.Contents);
        //     // วนลูปสาขา กับ ชื่ออาจารย์
        //     var iT;
        //     for (iT = 0; iT < data.Contents.length; iT++) {
        //         // console.log(data.Contents[iT].Key);
        //         arr.push(data.Contents[iT].Key);
        //     }
        //     for (let index = 0; index < arr.length; index++) {
        //         // console.log(arr[index]);
        //         var buffer = arr[index].split('/');
        //         // console.log(buffer);
        //         if (buffer[1] == this.state.department && buffer[3] == 'รายงานบทความ-ผลงานตีพิมพ์ในวารสารวิชาการต่างๆ') {
        //             // console.log(arr[index]);
        //             arrArtical.push(arr[index]);
        //         }
        //         if (buffer[1] == this.state.department && buffer[3] == 'รายงานการเสนอผลงานในที่ประชุมวิชาการ') {
        //             arrPresentation.push(arr[index]);
        //             // this.setState({objectList: arr[index]})
        //         }
        //     }
        // })
    }

    render() {

        return (
            <div class="container">
                <div class="columns is-multiline is-centered">
                    <div class="field">
                        <button class="button is-primary" onClick={this.chackFileForEveryone}>ตรวจสอบข้อมูล</button>
                    </div>
                </div>

                {this.state.showTableForeveryone &&
                    <div class="columns is-multiline is-centered">
                        <table class="table is-striped is-fullwidth">
                            <thead>
                                <tr>
                                    <th>หัวข้อ</th>
                                    <th>สาขาวิชา</th>
                                    <th>ปีการศึกษา</th>
                                    <th>ภาคการศึกษา</th>
                                    <th>อัปโหลดเมื่อ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>วิชาบรรยายเเละปฎิบัติการ</td>
                                    <td>{this.state.departmentLectureForeveryone}</td>
                                    <td>{this.state.yearLectureForeveryone}</td>
                                    <td>{this.state.semesterLectureForeveryone}</td>
                                    <td>{this.state.timeLectureForeveryone}</td>
                                </tr>
                                <tr>
                                    <td>ซีเนียร์โปรเจคหรือปัญหาพิเศษ</td>
                                    <td>{this.state.departmentSeniorProjectForeveryone}</td>
                                    <td>{this.state.yearSeniorProjectForeveryone}</td>
                                    <td>{this.state.semesterSeniorProjectForeveryone}</td>
                                    <td>{this.state.timeSeniorProjectForeveryone}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                }


                {this.state.showTableForeveryone && 
                <TableAcademyEveryoneReport
                    salaryRound={this.props.salaryRound}
                    year={this.props.year}
                    department={this.props.department} />}



                {/* <TableLectureEveryoneReport data={this.props.department}/> */}

            </div>

        )
    }
}
