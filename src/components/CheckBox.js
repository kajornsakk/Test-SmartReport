import React from 'react'

export const CheckBox = props => {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.department}</td>
            <td>{props.value}</td>
            <td>{props.time}</td>
            <td>
                <input key={props.id} onClick={props.handleCheckChieldElement} type="checkbox" 
                name={props.name} department={props.department} checked={props.isChecked} value={props.value} /> 
            </td>
        </tr>

    )
}

export default CheckBox