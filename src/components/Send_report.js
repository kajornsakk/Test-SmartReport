import React, { Component, Fragment } from 'react'
import {  useEffect } from 'react';
import CheckBox from './CheckBox';
import ListObjects from './ListObjects';
import SendEmail from './SendEmail';

export default class Send_report extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listFileNameSends: [
                // { id: 1, value: "ประภาพร รัตนธำรง_สาขาวิชาวิทยาการคอมพิวเตอร์_มกราคม-มิถุนายน_2562", time: "April 14, 2021, 14:05:58", isChecked: false },
                // { id: 2, value: "วนิดา พฤทธิวิทยา_สาขาวิชาวิทยาการคอมพิวเตอร์_มกราคม-มิถุนายน_2562", time: "April 14, 2021, 14:05:56", isChecked: false },
                // { id: 1, name: "วนิดา พฤทธิวิทยา", department: "วิทยาการคอมพิวเตอร์", value: "มกราคม-มิถุนายน_2562", time: "April 14, 2021, 14:05:56", isChecked: false },
                // { id: 2, name: "ประภาพร รัตนธำรง", department: "วิทยาการคอมพิวเตอร์", value: "มกราคม-มิถุนายน_2562", time: "April 14, 2021, 14:05:58", isChecked: false },

            ]
        }
    }

    state = {
        departmemtSend: '',
        yearSend: '',
        salaryRoundSend: ''
    }
    state = { listDataWorkload: [] }
    state = { showObjectList: false}
    state = {showTable : false}



    onChangeDepartmentSend = (e) => {
        this.setState({ departmemtSend: e.target.value })
    }
    onChangeYearSend = (e) => {
        this.setState({ yearSend: e.target.value })
    }
    onChangeSalaryRoundSend = (e) => {
        this.setState({ salaryRoundSend: e.target.value })
    }

    onClickSearch = () => {
        console.log(this.state.departmemtSend);
        console.log(this.state.yearSend);
        console.log(this.state.salaryRoundSend);

        this.setState({showTable:true})
        this.setState({showObjectList: true});

        // const AWS = require('aws-sdk/global');
        // const S3 = require('aws-sdk/clients/s3');

        // AWS.config.update({
        //     accessKeyId: 'AKIAJJOOQS6RRWQUJKNQ',
        //     secretAccessKey: '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',
        //     region: 'us-east-1'
        // });
        // const s3 = new AWS.S3();

        // var prefix1 = 'reports/' + this.state.departmemtSend + '/ปีงบประมาณ' + this.state.yearSend + '/' + this.state.salaryRoundSend + '/';
        // const paramsLecture = {
        //     Bucket: 'amplifys3smartreport142809-dev',
        //     Delimiter: '',
        //     Prefix: prefix1,
        // };

        // // useEffect(()=>{
            
        // // })
        // s3.listObjectsV2(paramsLecture, (err, data) => {
        //     var contents = data.Contents;
        //     var time = 'time';
        //     let value = 'value';
        //     let isChecked = 'isChecked';
        //     let id = 'id';
        //     let count = 1;
        //     contents.forEach((content) => {
        //         this.state.listFileNameSends.push({
        //             [id]: count,
        //             [value]: ((content.Key).split('/'))[4],
        //             [time]: content.LastModified,
        //             [isChecked]: false
        //         });
        //         count++;
        //     })
        //     console.log(this.state.listFileNameSends);
        // })
    }

    handleAllChecked = (event) => {
        let listFiles = this.state.listFileNameSends
        listFiles.forEach(listFile => listFile.isChecked = event.target.checked)
        this.setState({ listFileNameSends: listFiles })
        // console.log(this.state.fruites);
    }

    handleCheckChieldElement = (e) => {
        let listFileNameSends = this.state.listFileNameSends
        listFileNameSends.forEach(listFile => {
            if (listFile.name === e.target.name)
                listFile.isChecked = e.target.checked
        })
        this.setState({ listFileNameSends: listFileNameSends })
        console.log(this.state.listFileNameSends);
    }

    render() {
        return (
            <Fragment>
                <div className="box cta ">
                    {/* Tabs */}
                    <div class="tabs is-centered">
                        <ul>
                            <li >
                                <a href="/Report" className="navbar-item" ><span class="icon is-small" ><i class="far fa-file-alt" aria-hidden="true"></i></span>
                                     สร้างแบบฟอร์มภาระงานอาจารย์
                                </a>
                            </li>

                            <li class="is-active">
                                <a href="" className="navbar-item" ><span class="icon is-small" ><i class="far fa-file-alt" aria-hidden="true"></i></span>
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
                                                    <label class="label">สาขาวิชา :</label>
                                                </div>

                                                <div class="select" value={this.state.departmemtSend} onChange={this.onChangeDepartmentSend}>
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
                                                {/* <div class="field">
                                                    <label class="label">ปีงบประมาณ :</label>
                                                </div>

                                                <input class="input" type="text" placeholder="25XX" value={this.state.yearSend} onChange={this.onChangeYearSend}></input> */}
                                                <div class="field">
                                                    <label class="label">ปีงบประมาณ :</label>
                                                </div>

                                                <div class="select" value={this.state.yearSend} onChange={this.onChangeYearSend}>
                                                    <select>
                                                        <option>โปรดเลือก</option>
                                                        <option>2562</option>
                                                        <option>2563</option>
                                                        <option>2564</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="column is-one-quarter">
                                                <div class="field">
                                                    <label class="label">รอบเลื่อนเงินเดือน :</label>
                                                </div>

                                                <div class="select" value={this.state.salaryRoundSend} onChange={this.onChangeSalaryRoundSend}>
                                                    <select>
                                                        <option>โปรดเลือก</option>
                                                        <option>รอบเลื่อนเงินเดือน1</option>
                                                        <option>รอบเลื่อนเงินเดือน2</option>
                                                    </select>
                                                </div>

                                            </div>

                                            <div class="columns is-multiline is-centered">
                                                <div class="field1">
                                                    <button class="button is-primary" onClick={this.onClickSearch}>ค้นหา</button>
                                                </div>
                                            </div>

                                        </div>

                                        {this.state.showTable && <div class="columns is-multiline is-centered">
                                            <div class="column is-centered">
                                                <table class="table is-striped is-fullwidth">
                                                    <thead>
                                                        <th>ชื่ออาจารย์</th>
                                                        <th>สาขาวิชา</th>
                                                        <th>สำหรับเลื่อนเงินเดือน</th>
                                                        <th>ช่วงเวลาผลงาน</th>
                                                        <th>เลือก</th>
                                                    </thead>
                                                    <tbody>

                                                        {/* <tr>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td><input type="checkbox" onClick={this.handleAllChecked} value="checkedall" />เลือกทั้งหมด</td>
                                                        </tr> */}
                                                        {/* {
                                                            this.state.listFileNameSends.map((listFile) => {
                                                                return (<CheckBox handleCheckChieldElement={this.handleCheckChieldElement} {...listFile} />)
                                                            })
                                                        } */}

                                                        {this.state.showObjectList&&<ListObjects department={this.state.departmemtSend} year={this.state.yearSend} salaryRound={this.state.salaryRoundSend}/>}

                                                    </tbody>
 

                                                </table>
                                            </div>
                                        </div>}
                                    </div>
                                </section>
                            </div>
                        </div>
                        <div class="column"></div>
                    </div>
                    
                    {/* <SendEmail data={this.state.listFileNameSends} /> */}

                    
                </div>
            </Fragment>
        )
    }
}
