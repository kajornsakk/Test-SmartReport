import React, { Component, Fragment } from 'react'
import AWS from 'aws-sdk';
import PopupReportIndividual from './PopupReportIndividual';
import TableReportBachelor from './TableReportBachelor';
import TableReportDoctor from './TableReportDoctor';
import TableReportMaster from './TableReportMaster';
import DataReportIndividual2 from './DataReportIndividual2';

export default class DataReportIndividual extends Component {

    state = {
        instructor: ''
    }
    state = {
        fileLectureForIndividual: '',
        fileSeniorForIndividual: '',
        fileArticleForIndividual: '',
        filePresentationForIndividual: '',
        nameArticleForIndividual: '',
        namePresentationForIndividual: '',
        statusArticleForIndividual: '',
        statusPresentationForIndividual: '',
        statusShowArticle: '',
        statusShowPresentation: '',
    }

    state = {
        yearAndSemesterForSalaryRound: ''
    }
    state = {
        showPopup: false
    }

    state = {
        showTableForindividual: false
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

        this.setState({ showTableForindividual: true })

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
        this.setState({ yearAndSemesterForSalaryRound: numyear_semeter })


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
            var nameArticle = filename.split('_')[0];

            var time = (data.Contents[lastFile]).LastModified;

            //รอบ 1
            var startdate1 = new Date('07/01/2021'); //  01 / 07 / 20
            var enddate1 = new Date('12/31/2021'); //   31 / 12 / 20
            // รอบ2
            var startdate2 = new Date('01/01/2021'); //   01 / 01 /20
            var enddate2 = new Date('06/31/2021'); //   31 / 06 / 20

            var check = 'ไม่มีผลงาน';
            var statusShow = false;
            if (this.props.salaryRound === 'รอบ1 เดือน เมษายน') {
                if (time >= startdate1 && time <= enddate1) {
                    check = 'มีผลงาน';
                    statusShow = true;
                }
            }
            else if (this.props.salaryRound === 'รอบ2 เดือน ตุลาคม') {
                if (time >= startdate2 && time <= enddate2) {
                    check = 'มีผลงาน';
                    statusShow = true;
                }
            }

            this.setState({
                fileArticleForIndividual: filename,
                nameArticleForIndividual: nameArticle,
                statusArticleForIndividual: check
            })
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
            var namePresentation = filename.split('_')[0];

            var time = (data.Contents[lastFile]).LastModified;

            //รอบ 1
            var startdate1 = new Date('07/01/2021'); //  01 / 07 / 20
            var enddate1 = new Date('12/31/2021'); //   31 / 12 / 20
            // รอบ2
            var startdate2 = new Date('01/01/2021'); //   01 / 01 /20
            var enddate2 = new Date('06/31/2021'); //   31 / 06 / 20

            var check = 'ไม่มีผลงาน';
            var statusShow = 'has-text-danger';
            if (this.props.salaryRound === 'รอบ1 เดือน เมษายน') {
                if (time >= startdate1 && time <= enddate1) {
                    check = 'มีผลงาน';
                    statusShow = 'has-text-success';
                }
            }
            else if (this.props.salaryRound === 'รอบ2 เดือน ตุลาคม') {
                if (time >= startdate2 && time <= enddate2) {
                    check = 'มีผลงาน';
                    statusShow = 'has-text-success';
                }
            }

            this.setState({
                filePresentationForIndividual: filename,
                namePresentationForIndividual: namePresentation,
                statusPresentationForIndividual: check,
                statusShowArticle: statusShow
            })
        })

    }

    render() {
        const active = this.state.showPopup ? "is-active" : "";
        return (
            <Fragment>
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

                    {this.state.showTableForindividual &&
                        <div><br />
                            <span class="is-size-4 has-text-primary">
                                หมวดภาระงานสอน
                        </span>
                            <br /></div>}

                    {this.state.showTableForindividual &&
                        <div class="card">
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

                                        {/* {this.state.showTableForindividual && <TableReportBachelor
                                            yearSemesterSalaryRound={this.state.yearAndSemesterForSalaryRound}
                                            department={this.props.department}
                                        />}

                                        {this.state.showTableForindividual && <TableReportMaster
                                            yearSemesterSalaryRound={this.state.yearAndSemesterForSalaryRound}
                                            department={this.props.department}
                                        />}
                                        {this.state.showTableForindividual && <TableReportDoctor
                                            yearSemesterSalaryRound={this.state.yearAndSemesterForSalaryRound}
                                            department={this.props.department}
                                        />} */}

                                    {/* ----------------Test--------------------- */}
                                        {this.state.showTableForindividual && <DataReportIndividual2
                                            yearSemesterSalaryRound={this.state.yearAndSemesterForSalaryRound}
                                            department={this.props.department}
                                            salaryRound = {this.props.salaryRound}
                                            year = {this.props.year}
                                        />}


                                    </table>
                                </div>
                            </section>

                        </div>}

                    {this.state.showTableForindividual && <div><br />
                        <span class="is-size-4 has-text-primary">
                            หมวดผลงานทางวิชาการ
                        </span>
                        <br /></div>}

                    {this.state.showTableForindividual && <div class="card">
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
                                            <td>{this.state.nameArticleForIndividual}</td>
                                            <td>บทความ/ผลงานตีพิมพ์ในวารสารวิชาการ</td>
                                            <td>{this.state.statusArticleForIndividual}</td>
                                            {/* <td>สถานะ</td> */}
                                        </tr>
                                        <tr>
                                            <td>{this.state.namePresentationForIndividual}</td>
                                            <td>การเสนอผลงานในที่ประชุมวิชาการ</td>
                                            <td><span class={`${this.state.statusShowPresentation}`}>{this.state.statusPresentationForIndividual}</span></td>
                                            {/* <td>สถานะ</td> */}
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>}

                </div>

                {/* <div class="container">
                    <div class="columns is-multiline is-centered">
                        <div class="field">
                            <button class="button is-primary" >สร้าง</button>
                        </div>
                    </div>
                </div> */}
            </Fragment>


        )
    }
}
