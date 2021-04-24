import React, { Component } from 'react'
import TableAcademyEveryoneReport from './TableAcademyEveryoneReport';
import TableLectureEveryoneReport from './TableLectureEveryoneReport';
import TableReportBachelor from './TableReportBachelor';
import TableReportDoctor from './TableReportDoctor';
import TableReportMaster from './TableReportMaster';

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
        yearAndSemesterForSalaryRound: ''
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
        this.setState({ yearAndSemesterForSalaryRound: numyear_semeter })

    }

    render() {

        return (
            <div class="container">
                <div class="columns is-multiline is-centered">
                    <div class="field">
                        <button class="button is-primary" onClick={this.chackFileForEveryone}>ตรวจสอบข้อมูล</button>
                    </div>
                </div>
                <br />
                <span class="is-size-4 has-text-primary">
                    หมวดภาระงานสอน
                </span>
                <br />

                {this.state.showTableForeveryone &&

                    <div class="card">
                        <section class="section is-small">
                            <div class="columns is-multiline is-centered">
                                <table class="table is-striped is-fullwidth">
                                    <thead>
                                        <tr>
                                            <th>ระดับการศึกษา</th>
                                            <th>หลักสูตร</th>
                                            <th>หมวดวิชา</th>
                                            <th>ภาคการศึกษา</th>
                                            <th>สถานะ</th>
                                        </tr>
                                    </thead>

                                    {this.state.showTableForeveryone && <TableReportBachelor
                                        yearSemesterSalaryRound={this.state.yearAndSemesterForSalaryRound}
                                        department={this.props.department}
                                    />}
                                    {this.state.showTableForeveryone && <TableReportMaster
                                        yearSemesterSalaryRound={this.state.yearAndSemesterForSalaryRound}
                                        department={this.props.department}
                                    />}
                                    {this.state.showTableForeveryone && <TableReportDoctor 
                                        yearSemesterSalaryRound={this.state.yearAndSemesterForSalaryRound}
                                        department={this.props.department}
                                    />}


                                </table>
                            </div>
                        </section>

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
