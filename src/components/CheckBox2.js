import React from 'react'

export const CheckBox2 = props => {
    return (

        <tr>
            <td>{props.name}</td>
            <td>{props.department}</td>
            <td>{props.month}</td>
            <td>{props.salaryRound}{" "}{props.year}</td>
            
            <td>
                <input key={props.id} onClick={props.handleCheckChieldElement} type="checkbox" 
                    name={props.name} checked={props.isChecked}   /> 
            </td>
        </tr>
    )
}

export default CheckBox2