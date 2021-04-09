import React, { Component, Fragment } from 'react'

export default class Report extends Component {

    state = { showSelectRadioForindividual: false }
    state = { showSelectRadioForeveryone: false }

    handleRadiosForIndividual = () => {
        this.setState({ showSelectRadioForindividual: true });
        this.setState({ showSelectRadioForeveryone: false });
    }

    render() {
        let showDataIndividual = null;
        if (this.state.showSelectRadioForindividual) {
            showDataIndividual = (
                <div>
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
                                            <td><button class="button is-small is-primary">เลิอกไฟล์</button></td>
                                        </tr>
                                        <tr>
                                            <td>ซีเนียร์โปรเจคหรือปัญหาพิเศษ</td>
                                            <td></td>
                                            <td><button class="button is-small is-primary">เลิอกไฟล์</button></td>
                                        </tr>
                                        <tr>
                                            <td>บทความ/ผลงานตีพิมพ์ในวารสารวิชาการ</td>
                                            <td></td>
                                            <td><button class="button is-small is-primary">เลิอกไฟล์</button></td>
                                        </tr>
                                        <tr>
                                            <td>การเสนอผลงานในที่ประชุมวิชาการ</td>
                                            <td></td>
                                            <td><button class="button is-small is-primary">เลิอกไฟล์</button></td>
                                        </tr>
                                    </tbody>


                                </table>
                            </div>
                        </div>

                    </div>
                </div>

            )
        }
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
                                                    <label class="label">รอบเลื่อนเงินเดือน :</label>
                                                </div>

                                                <div class="select">
                                                    <select>
                                                        <option>โปรดเลือก</option>
                                                        <option>รอบ1 เดือน เมษายน</option>
                                                        <option>รอบ2 เดือน ตุลาคม</option>
                                                    </select>
                                                </div>

                                            </div>

                                            <div class="column is-one-quarter">
                                                <div class="field">
                                                    <label class="label">ปี พ.ศ. :</label>
                                                </div>

                                                <div class="select">
                                                    <select>
                                                        <option>โปรดเลือก</option>
                                                        <option>2564</option>
                                                        <option>2563</option>
                                                        <option>2562</option>
                                                        <option>2561</option>
                                                    </select>
                                                </div>

                                            </div>

                                        </div>
                                    </div>

                                    <div class="container">
                                        <div class="columns is-multiline is-centered">
                                            <div class="column is-one-quarter">
                                                <div class="field">
                                                    <label class="label">สาขาวิชา :</label>
                                                </div>

                                                <div class="select">
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
                                                    <label class="label">เลือก :</label>
                                                </div>
                                                <div className="radios-group">

                                                    <label for="flexRadioDefault1">
                                                        <input type="radio" value="option1" name="flexRadioDefault" id="flexRadioDefault1" onChange={this.handleRadiosForEveryone} />สำหรับทุกคน
                                                    </label>

                                                    <label for="flexRadioDefault2">
                                                        <input type="radio" value="option1" name="flexRadioDefault" id="flexRadioDefault2" onChange={this.handleRadiosForIndividual} />สำหรับรายบุคคล
                                                    </label>

                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                    {showDataIndividual}
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
