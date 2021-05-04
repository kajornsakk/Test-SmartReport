import React, { Component, Fragment } from 'react'
import DataUploadHistory from './DataLectureUploadHistory'
import SelectDataAcademyUploadHistory from './SelectDataAcademyUploadHistory'
import SelectDataLectureUploadHistory from './SelectDataLectureUploadHistory'

export default class Upload_History extends Component {

    state = {
        showRadiosDataLecture: true,
        showRadiosDataAcademy: false
    }

    // state = {
    //     value : 'option1'
    // }

    handleRadiosDataLecture = (e) => {
        this.setState({ 
            value : e.target.value,
            showRadiosDataLecture: true,
            showRadiosDataAcademy: false
         })
    }

    handleRadiosDataAcademy = (e) => {
        this.setState({ 
            value : e.target.value,
            showRadiosDataAcademy: true,
            showRadiosDataLecture: false
         })
    }

    render() {
        return (
            <Fragment>
                <div className="box cta ">

                    {/* Tabs */}
                    <div class="tabs is-centered">
                        <ul>
                            <li>
                                <a href="/Upload_lecture" className="navbar-item" ><span class="icon is-small" ><i class="far fa-file-alt" aria-hidden="true"></i></span>
                                    อัปโหลดข้อมูลภาระงานสอน
                                 </a>
                            </li>

                            <li >
                                <a href="/Upload_academy" className="navbar-item" ><span class="icon is-small" ><i class="far fa-file-alt" aria-hidden="true"></i></span>
                                    อัปโหลดข้อมูลผลงานวิชาการ
                                 </a>
                            </li>

                            <li class="is-active">
                                <a>
                                    <span class="icon is-small"><i class="far fa-file-alt" aria-hidden="true"></i></span>
                                    <span>ประวัติอัปโหลดข้อมูล</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div class="columns">
                        <div class="column"></div>
                        <div class="column is-four-fifths">
                            <div class="card">
                                <section class="section is-small">
                                    
                                        {/* Radio Button */}
                                        <div class="columns is-multiline is-centered">
                                            <div class="column is-one-quarter">
                                                <label for="flexRadioDefault1">
                                                    <input type="radio" value="option1"  name="flexRadioDefault" id="flexRadioDefault1"
                                                        onChange={this.handleRadiosDataLecture} />ข้อมูลภาระงานสอน</label>
                                            </div>

                                            <div class="column is-one-quarter">
                                                <label for="flexRadioDefault1">
                                                    <input type="radio" value="option2"  name="flexRadioDefault" id="flexRadioDefault2"
                                                        onChange={this.handleRadiosDataAcademy} />ข้อมูลผลงานวิชาการ</label>
                                            </div>

                                        </div>

                                        {this.state.showRadiosDataLecture && <SelectDataLectureUploadHistory />}
                                        {this.state.showRadiosDataAcademy && <SelectDataAcademyUploadHistory />}

                                </section>
                            </div>
                        </div>
                        <div class="column"></div>
                    </div>


                </div>
            </Fragment>
        )
    }
}
