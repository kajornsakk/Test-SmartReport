import React, { Component } from 'react'
import { Storage } from 'aws-amplify'

export default class TestS3 extends Component {


    clickList =() =>{
        
    }




    render() {
        return (
            <div>
                <button onClick={this.clickList}>Click</button>
            </div>
        )
    }
}
