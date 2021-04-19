import React, { Component, Fragment } from 'react'
import DataLectureUploadHistory from './DataLectureUploadHistory'

export default class SelectDataLectureUploadHistory extends Component {
    state = {
        department: '',
        category: '',
        education: '',
        type: ''
    }
    state = {
        showDataSearchHistory: false
    }

    onChangeDepartment = (e) => {
        this.setState({ department: e.target.value })
    }
    onChangeCategory = (e) => {
        this.setState({ category: e.target.value })
    }
    onChangeEducation = (e) => {
        this.setState({ education: e.target.value })
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
                                            <label class="label">หมวดงาน :</label>
                                        </div>

                                        <div class="select" value={this.state.category} onChange={this.onChangeCategory}>
                                            <select>
                                                <option>โปรดเลือก</option>
                                                <option>ภาระงานสอน</option>
                                                <option>ผลงานทางวิชาการ</option>
                                            </select>
                                        </div>

                                    </div>

                                </div>

                                <div class="container">
                                    <div class="columns is-multiline is-centered">

                                        <div class="column is-one-quarter">
                                            <div class="field">
                                                <label class="label">ระดับการศึกษา :</label>
                                            </div>

                                            <div class="select" value={this.state.education} onChange={this.onChangeEducation}>
                                                <select>
                                                    <option>โปรดเลือก</option>
                                                    <option>ปริญญาตรี</option>
                                                    <option>ปริญญาโทและปริญญาเอก</option>
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
                                                    <option>วิชาบรรยาย-วิชาปฏิบัติ</option>
                                                    <option>ซีเนียร์โปรเจค-ปัญหาพิเศษ-สัมมนา</option>
                                                    <option>วิทยานิพนธ์-สารนิพนธ์-ปัญหาพิเศษ-สัมมนา</option>
                                                </select>
                                            </div>

                                        </div>

                                    </div>
                                    <div class="container ">
                                        <div class="columns is-multiline is-centered">
                                            <div class="colum is-one-quarter">
                                                <button class="button is-primary " onClick={this.onClickSearchHistory}>
                                                    <span>ค้นหาข้อมูล</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </section>

                        {this.state.showDataSearchHistory && <DataLectureUploadHistory
                            department={this.state.department}
                            category={this.state.category}
                            education={this.state.education}
                            type={this.state.type} />
                        }
                    </div>
                    <div class="column"></div>
                </div>
            </Fragment>
        )
    }
}
