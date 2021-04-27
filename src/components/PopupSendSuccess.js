import React, { Component,Fragment } from 'react'

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
                            <button class="delete" aria-label="close"  onClick={this.handleClick}></button>
                        </header>
                        <section class="modal-card-body">
                            {/* {this.props.listSuccess.map((list) => (
                                <li>ชื่อ : {list.name}  อีเมล : {list.email}</li>
                            ))} */}
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
