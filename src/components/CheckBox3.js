import React, { Fragment } from 'react'

export const CheckBox3 = props => {
    return (
        <Fragment>
            <tr>
                <td>{props.name}</td>
                <td>{props.file}</td>
                <td><input key={props.id} onChange={props.handleCheckChieldElement} type="checkbox" checked={props.isChecked} ></input></td>
            </tr>
        </Fragment>


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