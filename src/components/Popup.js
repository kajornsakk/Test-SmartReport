import React, { Component, Fragment } from 'react'

export default class Popup extends Component {

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
                                    <span class="icon has-text-warning">
                                        <i class="fas fa-exclamation-triangle"></i>
                                    </span>
                                    <span> คำเตือน</span>
                                </div>
                            </p>
                            <button class="delete" aria-label="close" onClick={this.handleClick}></button>
                        </header>
                        <section class="modal-card-body">
                            {this.props.textAleart.map((list) => (
                                <li>{list}</li>
                            ))}

                        </section>
                    <footer class="modal-card-foot">
                        <div class="icon-text">
                            <span class="icon has-text-info">
                                <i class="fas fa-info-circle"></i>
                            </span>
                            <span>โปรดเลือกข้อมูลให้ถูกต้อง</span>
                        </div>
                        {/* <button class="button is-success">Save changes</button>
                            <button class="button">Cancel</button> */}
                    </footer>
                </div>
                </div>
            </Fragment >
        )
    }
}
