import React, { Fragment, Component } from 'react'
import DataAcademyUploadHistory from './DataAcademyUploadHistory'

export default class SelectDataAcademyUploadHistory extends Component {
    // department category type

    state = {
        department: '',
        instructor: '',
        type: ''
    }
    state = {
        showDataSearchHistory: false
    }

    onChangeDepartment = (e) => {
        this.setState({ department: e.target.value })
    }
    onChangeInstructor = (e) => {
        this.setState({ instructor: e.target.value })
    }
    onChangeType = (e) => {
        this.setState({ type: e.target.value })
    }

    onClickSearchHistory = () => {
        this.setState({ showDataSearchHistory: true })
    }

    render() {
        return (
            <Fragment>
                <div class="columns">
                    <div class="column"></div>
                    <div class="column is-four-fifths">
                        <section class="section is-small">

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
                                            <option>สาขาวิชาคณิตศาสตร์ประกันภัย</option>
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
                                        <label class="label">ชื่อเจ้าของผลงาน :</label>
                                    </div>

                                    <div class="select" value={this.state.instructor} onChange={this.onChangeInstructor} >
                                        <select>
                                            <option>โปรดเลือก</option>
                                            <option>ทั้งหมด</option>
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

                                <div class="column is-one-quarter">
                                    <div class="field">
                                        <label class="label">ประเภท :</label>
                                    </div>

                                    <div class="select" value={this.state.type} onChange={this.onChangeType}>
                                        <select>
                                            <option>โปรดเลือก</option>
                                            <option>รายงานบทความ-ผลงานตีพิมพ์ในวารสารวิชาการต่างๆ</option>
                                            <option>รายงานการเสนอผลงานในที่ประชุมวิชาการ</option>
                                        </select>
                                    </div>
                                </div>

                            </div>

                        </section>

                        <div class="columns is-multiline is-centered">
                            <div class="colum is-one-quarter">
                                <button class="button is-primary " onClick={this.onClickSearchHistory}>
                                    <span>ค้นหาข้อมูล</span>
                                </button>
                            </div>
                        </div>

                        {this.state.showDataSearchHistory && <DataAcademyUploadHistory
                            department={this.state.department} type={this.state.type} instructor={this.state.instructor} />}

                    </div>
                    <div class="column"></div>
                </div>
            </Fragment>
        )
    }
}
