import React, { Component, Fragment } from 'react'
import DataReportIndividual from './DataReportIndividual';
import DataReportIndividual2 from './DataReportIndividual2';
import DataReportForeveryone from './DataReportForeveryone';
import DataReportForeveryone2 from './DataReportForeveryone2';
import CreateForm from './CreateForm';

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

                            <li >
                                <a href="/SendEmailHistory" className="navbar-item" ><span class="icon is-small" ><i class="far fa-file-alt" aria-hidden="true"></i></span>
                                     ประวัติการส่งแบบฟอร์ม
                                </a>
                            </li>

                        </ul>
                    </div>

                    <div class="columns">
                        <div class="column"></div>
                        <div class="column is-four-fifths">
                            <div class="card">
                                <div class="card-content ">
                                    <section class="section is-small ">


                                        {/* Radio Button */}
                                        <div class="field is-horizontal">
                                            <div class="field-label">
                                                <label class="label">สร้างฟอร์ม: </label>
                                            </div>
                                            <div class="field-body">
                                                <div class="field ">
                                                    <div class="control">
                                                        <label class="radio">
                                                            <input type="radio" name="member" onChange={this.handleRadiosForIndividual} />
                                                                สำหรับรายบุคคล
                                                        </label>
                                                    </div>
                                                </div>
                                                <div class="field ">
                                                    <div class="control">
                                                        <label class="radio">
                                                            <input type="radio" name="member" onChange={this.handleRadiosForEveryone} />
                                                                สำหรับทุกคน
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div class="columns is-multiline is-centered">

                                            <div class="column is-one-quarter">
                                                <label for="flexRadioDefault1">
                                                    <input type="radio" value="option2" name="flexRadioDefault" id="flexRadioDefault2"
                                                        onChange={this.handleRadiosForIndividual} />สำหรับรายบุคคล</label>
                                            </div>
                                            <div class="column is-one-quarter">
                                                <label for="flexRadioDefault1">
                                                    <input type="radio" value="option1" name="flexRadioDefault" id="flexRadioDefault1"
                                                        onChange={this.handleRadiosForEveryone} />สำหรับทุกคน</label>
                                            </div>

                                        </div> */}

                                        <div class="field is-horizontal">
                                            <div class="field-label is-normal">
                                                <label class="label">สาขาวิชา:</label>
                                            </div>
                                            <div class="field-body">
                                                <div class="field">
                                                    <div class="control">
                                                        <div class="select is-fullwidth" value={this.state.department} onChange={this.onChangeDepartment}>
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
                                                </div>
                                            </div>
                                        </div>
                                        <div class="field is-horizontal">

                                            <div class="field-label is-normal">
                                                <label class="label">รอบเลื่อนเงินเดือน:</label>
                                            </div>
                                            <div class="field-body">
                                                <div class="field">
                                                    <div class="control">
                                                        <div class="select is-fullwidth" value={this.state.salaryRound} onChange={this.onChangeSalaryRound}>
                                                            <select>
                                                                <option>โปรดเลือก</option>
                                                                <option>รอบ1 เดือน เมษายน</option>
                                                                <option>รอบ2 เดือน ตุลาคม</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="field is-horizontal">
                                            <div class="field-label is-normal">
                                                <label class="label">ปีงบประมาณ:</label>
                                            </div>
                                            <div class="field-body">
                                                <div class="field"> 
                                                    <div class="control">
                                                    <input class="input" type="text" placeholder="ปีงบประมาณ" value={this.state.year} onChange={this.onChangeYear}></input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {this.state.showSelectRadioForindividual && <div class="field is-horizontal">
                                            <div class="field-label is-normal">
                                                <label class="label">รายชื่อ:</label>
                                            </div>
                                            <div class="field-body">
                                                <div class="field">
                                                    <div class="control">
                                                        <div class="select is-fullwidth" value={this.state.instructor} onChange={this.onChangeinstructorName}>
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
                                            </div>
                                        </div>}

                                    </section>
                                </div>

                            </div>
                            {this.state.showSelectRadioForindividual &&
                                <section class="section is-small">
                                    <DataReportIndividual2
                                        salaryRound={this.state.salaryRound}
                                        year={this.state.year}
                                        department={this.state.department}
                                        instructor={this.state.instructorName} />
                                </section>}

                            {this.state.showSelectRadioForeveryone &&
                                <section class="section is-small">
                                    <DataReportForeveryone2
                                        salaryRound={this.state.salaryRound}
                                        year={this.state.year}
                                        department={this.state.department}
                                        instructor={this.state.instructorName}
                                    />
                                </section>}


                        </div>
                        <div class="column"></div>
                    </div>

                </div>
            </Fragment>
        )
    }
}
