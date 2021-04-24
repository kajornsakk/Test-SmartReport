import React, { Fragment } from 'react'

export const PopupReportIndividual = props => {


    const show = props.classActive;
    function handlerClick() {
        // show = "";
    }
    return (
        <Fragment>
            <div class={`modal ${show}`}>
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Modal title</p>
                        <button class="delete" aria-label="close" onClick={handlerClick}></button>
                    </header>
                    <section class="modal-card-body">
                        <p>test</p>
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button is-success">Save changes</button>
                        <button class="button">Cancel</button>
                    </footer>
                </div>
            </div>
        </Fragment>

    )
}

export default PopupReportIndividual
