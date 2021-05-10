import React, { Component, Fragment } from 'react'

export default class PopupCreateForm extends Component {
    render() {
        return (
            <Fragment>
                <div class={"modal is-active"}>
                    <div class="modal-background"></div>
                    <div class="modal-card">
                        <section class="modal-card-body">
                            <p>กำลังสร้างแบบฟอร์ม...</p>
                            <progress class="progress is-small is-primary" max="100">15%</progress>
                        </section>
                        
                    </div>
                </div>
            </Fragment>
        )
    }
}
