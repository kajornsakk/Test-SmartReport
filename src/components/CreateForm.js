import React, { Fragment } from 'react'

export const CreateForm = props => {

    function creactReport() {
        console.log("testtttttttt");
        var test = props.sendMessage;
        console.log(test);
        window.location.reload(false);
    }

    return (
        <Fragment>
            <div class="columns is-multiline is-centered">
                <div class="field">
                    <button class="button is-primary" onClick={creactReport}>สร้างแบบฟอร์ม</button>
                </div>
            </div>
        </Fragment>
 
    )
}

export default CreateForm