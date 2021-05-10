import React, { Fragment } from 'react'

export const CheckBox3 = props => {

    // ({
    //     ['name']: 'ประภาพร รัตนธำรง',
    //     ['วารสาร']: 'true',
    //     ['ประชุม'] : 'false'
    // })

    return (
        <Fragment>
            <tr>
                <td>{props.name}</td>
                <td>{props.file}</td>
                <td>{props.time}</td>
                <td><span class={`${props.statusShow}`}>{props.status}</span></td>
                <td><input key={props.id} onChange={props.handleCheckChieldElement} type="checkbox" 
                    name={props.name} ischecked={props.isChecked} ></input> เลือก</td>
                
            </tr>
        </Fragment>


        // original
        // <tr>
        //     <td>{props.name}</td>
        //     <td>{props.department}</td>
        //     <td>{props.salaryRound}</td>
        //     <td></td>
        //     <td>
        //         <input key={props.id} onClick={props.handleCheckChieldElement} type="checkbox" 
        //             name={props.name} checked={props.isChecked}   /> 
        //     </td>
        // </tr>
    )
}

export default CheckBox3