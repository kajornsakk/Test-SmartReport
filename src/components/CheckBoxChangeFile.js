import { Fragment } from "react"
import React from 'react'

export const CheckBoxChangeFile = props => {
    return (

        // <frameElement>

            <tbody>
                <tr>
                    <td>{props.id}</td>
                    <td>{props.name}</td>
                    <td>{props.department}</td>
                    <td>{props.type}</td>
                    <td>{props.file}</td>
                    <td><input key={props.id} onChange={props.handleCheckChieldElement} type="checkbox" 
                    name={props.name} ischecked={props.isChecked} value={props.file} ></input> เลือก</td>
                </tr>
            </tbody>


        // </frameElement>

    )
}

export default CheckBoxChangeFile