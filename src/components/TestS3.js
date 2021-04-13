import React, { Component } from 'react'
import { Storage } from 'aws-amplify'

export default class TestS3 extends Component {
    state = { fileUrl: '', file: '', filename: '' }

    // handleChange = e => {
    //     const file = e.target.file[0]
    //     this.setState({
    //         fileUrl: URL.createObjectURL(file),
    //         file,
    //         filename: file.name
    //     })
    // }

    onChange=(e)=> {
        const file = e.target.files[0];
        try {
          Storage.put(file.name, file,);
          alert("success")
        } catch (err) {
          console.log('Error uploading file: ', err);
        }  
    }

    // saveFile = () => {
    //     Storage.put(this.state.filename, this.state.file)
    //         .then(() => {
    //             console.log('Success');
    //             this.setState({fileUrl: '', file: '', filename: '' })
    //         })
    //         .catch(err => {
    //             console.log('error uploading file', err);
    //         })
    // }

    render() {
        return (
            <div>
                <input type='file' onChange={this.onChange} />
                <button onClick={this.saveFile}>Save</button>
            </div>
        )
    }
}
