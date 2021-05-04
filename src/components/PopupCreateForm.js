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
                        </section>
                        
                    </div>
                </div>
            </Fragment>
        )
    }
}
