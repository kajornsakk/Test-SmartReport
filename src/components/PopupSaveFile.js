import React, { Component,Fragment } from 'react'

export default class PopupSaveFile extends Component {

    handleClick = () => {
        this.props.clickPopupSave();
        // this.props.sendApi();
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
                                    <span>อัปโหลดข้อมูลสำเร็จ</span>
                                </div>
                            </p>
                            <button class="delete" aria-label="close" onClick={this.handleClick} ></button>
                        </header>
                        <section class="modal-card-body">
                            <p>{this.props.textAleart}</p>
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
