import React, { Component,Fragment } from 'react'

export default class PopupLoading extends Component {

    // handleClick = () => {
    //     this.props.clickPopupSave();
    //     // this.props.sendApi();
    // }

    render() {

        return (
            <Fragment>
                <div class={"modal is-active"}>
                    <div class="modal-background"></div>
                    <div class="modal-card">
                        <section class="modal-card-body">
                            <p>กำลังอัปโหลดข้อมูล...</p>
                            <progress class="progress is-small is-primary" max="100">15%</progress>
                        </section>
                        
                    </div>
                </div>
            </Fragment>
        )
    }
}
