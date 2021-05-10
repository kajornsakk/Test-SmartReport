import React, { Component, Fragment } from 'react'

export default class PopupSendSuccess extends Component {

    handleClick = () => {
        this.props.clickPopup();
    }

    render() {

        return (
            <Fragment>
                <div class={"modal is-active"}>
                    <div class="modal-background"></div>
                    <div class="modal-card">
                        <header class="modal-card-head">
                            <p class="modal-card-title">
                                <div class="icon-text">
                                    <span class="icon has-text-success">
                                        <i class="fas fa-check-square"></i>
                                    </span>
                                    <span>ส่งอีเมลสำเร็จ</span>
                                </div>
                            </p>
                            <button class="delete" aria-label="close" onClick={this.handleClick}></button>
                        </header>
                        <section class="modal-card-body">

                            <span class="is-size-6 has-text-primary">
                                สาขาวิชา :
                            </span>
                            {" " + this.props.department}<br />

                            <span class="is-size-6 has-text-primary">
                                รอบเลื่อนเงินเดือน :
                            </span>
                            {" " + this.props.salaryRound}<br />

                            <span class="is-size-6 has-text-primary">
                                ปี พ.ศ. :
                            </span>
                            {" " + this.props.year}<br />


                            <table class="table is-striped is-fullwidth">
                                <thead>
                                    <th>ชื่ออาจารย์</th>
                                    <th>อีเมล</th>
                                    <th>สถานะ</th>
                                </thead>
                                <tbody>


                                    {this.props.dataToShow.map((list) => (
                                        <tr>
                                            <td>{list.instructor}</td>
                                            <td>{list.email}</td>
                                            <td><span class="is-size-6 has-text-primary">{list.status}</span></td>
                                        </tr>
                                    ))}


                                </tbody>
                            </table>






                        </section>
                        <footer class="modal-card-foot">
                            {/* <button class="button is-success">Save changes</button> */}
                            {/* <button class="button">Cancel</button> */}
                        </footer>
                    </div>
                </div>
            </Fragment>
        )
    }
}
