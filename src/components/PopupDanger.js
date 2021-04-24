import React, { Component, Fragment } from 'react'

export default class PopupDanger extends Component {
    handleClick = () => {
        this.props.clickPopupDanger();
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
                                    <span class="icon has-text-danger">
                                        <i class="fas fa-ban"></i>
                                    </span>
                                    <span>อัปโหลดข้อมูลไม่สำเร็จ</span>
                                </div>
                            </p>
                            <button class="delete" aria-label="close" onClick={this.handleClick}></button>
                        </header>
                        <section class="modal-card-body">
                            <p>{this.props.textAleart}</p>
                        </section>
                        <footer class="modal-card-foot">
                            {/* <button class="button is-success">Save changes</button>
                            <button class="button">Cancel</button> */}
                        </footer>
                    </div>
                </div>
            </Fragment>
        )
    }
}
