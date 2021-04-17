import React, { Fragment } from 'react'
import { useState, useEffect } from 'react';
import AWS from 'aws-sdk';
import CheckBox2 from './CheckBox2';

export const ListObjects = props => {

    AWS.config.update({
        accessKeyId: 'AKIAJJOOQS6RRWQUJKNQ',
        secretAccessKey: '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',
        region: 'us-east-1'
    });
    const s3 = new AWS.S3();

    var prefix1 = 'reports/' + props.department + '/ปีงบประมาณ' + props.year + '/' + props.salaryRound + '/';
    const paramsLecture = {
        Bucket: 'amplifys3smartreport142809-dev',
        Delimiter: '',
        Prefix: prefix1,
    };

    const [listFiles, setListFiles] = useState([]);

    useEffect(() => {
        s3.listObjectsV2(paramsLecture, (err, data) => {
            if (err) {
                console.log(err, err.stack);
            } else {
                var contents = data.Contents;
                var arrData = [];
                var name = 'name';
                var time = 'time';
                let department = 'department';
                let salaryRound = 'salaryRound';
                let isChecked = 'isChecked';
                let id = 'id';
                let count = 1;
                contents.forEach((content) => {
                    arrData.push({
                        [id]: count,
                        [name]: ((((content.Key).split('/'))[4]).split('_'))[1],
                        [department]: ((((content.Key).split('/'))[4]).split('_'))[2],
                        [salaryRound]: ((((content.Key).split('/'))[4]).split('_'))[3],
                        [time]: content.LastModified,
                        [isChecked]: false
                    });
                    count++;
                })
                console.log(arrData);
                setListFiles(arrData);
                // console.log(listFiles);
            }
        });
    }, []);

    function handleAllChecked (event) {  
        let lists = listFiles;
        lists.forEach(list => list.isChecked = event.target.checked)
        setListFiles(lists);
        console.log(listFiles);
    }

    function handleCheckChieldElement (event) {
        let lists = listFiles
        lists.forEach(list => {
            if (list.name === event.target.name)
                list.isChecked = event.target.checked
        })
        setListFiles(lists);
        console.log(listFiles);
    }

    return (
        <Fragment>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><input type="checkbox"  value="checkedall" onClick={handleAllChecked}/>เลือกทั้งหมด</td>
            </tr>
            {listFiles &&
                listFiles.map((name, index) => (
                    <CheckBox2 handleCheckChieldElement={handleCheckChieldElement} {...name} />
                ))}
        </Fragment>

    )
}

export default ListObjects