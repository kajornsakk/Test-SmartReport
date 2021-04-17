import React, { Component } from 'react'

export default class DataReportIndividual extends Component {
    render() {
        return (
            <div class="container">
                    <div class="columns is-multiline is-centered">
                        <div class="column is-one-quarter">
                            <div class="field">
                                <label class="label">รายชื่อ :</label>
                            </div>

                            <div class="select">
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
                            <button class="button is-primary">Primary</button>
                        </div>


                    </div>


                    <div class="columns is-multiline is-centered">
                        <div class="column is-centered">
                            <table class="table is-striped is-fullwidth">
                                <thead>
                                    <th>หัวข้อ</th>
                                    <th>ชื่อไฟล์</th>
                                    <th>เปลี่ยนไฟล์</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>วิชาบรรยายเเละปฎิบัติการ</td>
                                        <td></td>
                                        <td><button class="button is-small is-primary">เลือกไฟล์</button></td>
                                    </tr>
                                    <tr>
                                        <td>ซีเนียร์โปรเจคหรือปัญหาพิเศษ</td>
                                        <td></td>
                                        <td><button class="button is-small is-primary">เลือกไฟล์</button></td>
                                    </tr>
                                    <tr>
                                        <td>บทความ/ผลงานตีพิมพ์ในวารสารวิชาการ</td>
                                        <td></td>
                                        <td><button class="button is-small is-primary">เลือกไฟล์</button></td>
                                    </tr>
                                    <tr>
                                        <td>การเสนอผลงานในที่ประชุมวิชาการ</td>
                                        <td></td>
                                        <td><button class="button is-small is-primary">เลือกไฟล์</button></td>
                                    </tr>
                                </tbody>


                            </table>
                        </div>
                    </div>

                </div>
        )
    }
}
