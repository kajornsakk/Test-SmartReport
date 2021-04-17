import React, { Component } from 'react'

export default class DataReportForeveryone extends Component {
    state ={
        lectureFilenameForeveryone:'',
        seniorProjectFilenameForeveryone:'',
        articleForeveryone:'',
        presentationForeveryone:'',

    }
    chackFileForEveryone=()=>{
            this.setState({ showTableForeveryone: true });

            const AWS = require('aws-sdk/global');
            const S3 = require('aws-sdk/clients/s3');
    
            AWS.config.update({
                accessKeyId: 'AKIAJJOOQS6RRWQUJKNQ',
                secretAccessKey: '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',
                region: 'us-east-1'
            });
            const s3 = new AWS.S3();
    
            if (this.props.salaryRound == 'รอบ1 เดือน เมษายน') {
                var numyear = parseInt(this.props.year) - 1;
                console.log(numyear);
                var semeter = 1;
            }
            else if (this.props.salaryRound == 'รอบ2 เดือน ตุลาคม') {
                var numyear = parseInt(this.props.year) - 1;
                var semeter = 2;
            }
            var numyear_semeter = numyear + '_' + semeter + '_';
    
            var branch = ["สาขาวิชาวิทยาการคอมพิวเตอร์", "สาขาวิชาเคมี", "สาขาวิชาฟิสิกส์", "สาขาวิชาเทคโนโลยีชีวภาพ", "สาขาวิชาคณิตศาสตร์ประกันภัย",
                "สาขาวิชาเทคโนโลยีการเกษตร", "สาขาวิชาวิทยาศาสตร์สิ่งเเวดล้อม", "สาขาวิชาเทคโนโลยีเพื่อการพัฒนายั่งยืน", "สาขาวิชาวิทยาศาสตร์และเทคโนโลยีการอาหาร",
                "สาขาวิชาเทคโนโลยีวัสดุและสิ่งทอ"];
            var i;
            for (i = 0; i < branch.length; i++) {
                if (this.props.department == branch[i]) {
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

                    <div class="columns is-multiline is-centered">
                        <div class="column is-centered">
                            <div class="card">
                                <header class="card-header">
                                    <p class="card-header-title">
                                        <h4 class="subtitle is-4 has-text-primary">หมวดงานสอน</h4>
                                    </p>
                                </header>
                                <div class="card-content">
                                    <div class="content">
                                    <table class="table is-striped is-fullwidth">
                                <thead>
                                    <th>หัวข้อ</th>
                                    <th>ชื่อไฟล์</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>วิชาบรรยายเเละปฎิบัติการ</td>
                                        <td>{this.state.lectureFilenameForeveryone}</td>
                                    </tr>
                                    <tr>
                                        <td>ซีเนียร์โปรเจคหรือปัญหาพิเศษ</td>
                                        <td>{this.state.seniorProjectFilenameForeveryone}</td>
                                    </tr>
                                </tbody>
                            </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="columns is-multiline is-centered">
                        <div class="column is-centered">
                            <div class="card">
                                <header class="card-header">
                                    <p class="card-header-title">
                                        <h4 class="subtitle is-4 has-text-primary">หมวดงานวิชาการ</h4>
                                    </p>
                                </header>
                                <div class="card-content">
                                    <div class="content">
                                    <table class="table is-striped is-fullwidth">
                                <thead>
                                    <th>รายชื่อ</th>
                                    <th>ชื่อไฟล์</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ประภาพร รัตนธำรง</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>วนิดา พฤทธิวิทยา</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

        )
    }
}
