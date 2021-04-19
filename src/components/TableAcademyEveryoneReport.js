import React, { Fragment } from 'react'
import { useState, useEffect } from 'react';
import CheckBox3 from './CheckBox3';
export const TableAcademyEveryoneReport = props => {

    // Test get งานวิชาการ #####################################################
    const AWS = require('aws-sdk/global');

    AWS.config.update({
        accessKeyId: 'AKIAJJOOQS6RRWQUJKNQ',
        secretAccessKey: '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',
        region: 'us-east-1'
    });
    const s3 = new AWS.S3();
    var instructor = ["ประภาพร รัตนธำรง", "วนิดา พฤทธิวิทยา", "นุชชากร งามเสาวรส", "เสาวลักษณ์ วรรธนาภา", "ธนาธร ทะนานทอง",
        "เยาวดี เต็มธนาภัทร์", "เด่นดวง ประดับสุวรรณ"];

    var prefix = 'public/'+props.department+'/ผลงานทางวิชาการ/';
    const paramsTest = {
        Bucket: 'amplifys3smartreport142809-dev',
        Delimiter: '',
        Prefix: prefix,
    };

    const [listFiles, setListFiles] = useState([]);
    useEffect(() => {
        var arrData = [];
        var arr = [];
        var arrArtical = [];
        var arrPresentation = [];
        s3.listObjectsV2(paramsTest, (err, data) => {
            console.log(data.Contents);
            var contents = data.Contents;

            var id = 'id';
            var name = 'name';
            var isChecked = 'isChecked';
            var file = 'file';
            var count = 1;
            contents.forEach(content => {
                arrData.push({
                    [id]: count,
                    [name]: ((content.Key).split('/')[4]).split('_')[0],
                    [file]: (content.Key).split('/')[3],
                    [isChecked]: false
                })
            });
            count++;

            console.log(arrData);
            setListFiles(arrData);
        })
    }, [])

    function handleCheckChieldElement(event) {
        let fruites = listFiles;
        fruites.forEach(fruite => {
            if (fruite.name === event.target.name)
                fruite.isChecked = event.target.checked
        })
        setListFiles(fruites);
        console.log(listFiles);
    }

    function handleAllChecked(event) {
        let lists = listFiles;
        lists.forEach(list => list.isChecked = event.target.checked)
        setListFiles(lists);
        console.log(listFiles);
    }




    return (
        <Fragment>
            <div class="columns is-multiline is-centered">
                <table class="table is-striped is-fullwidth">
                    <thead>
                        <tr>
                            <th>รายชื่อ</th>
                            <th>ชื่อไฟล์</th>
                            <th>เลือก</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th></th>
                            <th></th>
                            <th><input type="checkbox" value="checkedall" onClick={handleAllChecked} />เลือกทั้งหมด</th>
                        </tr>
                        {/* {listFiles &&
                            listFiles.map((list) => (
                                <CheckBox3 handleCheckChieldElement={handleCheckChieldElement} {...list} />
                            ))} */}

                        {listFiles &&
                            listFiles.map((list) => (
                                <tr>
                                    <td>{list.name}</td>
                                    <td>{list.file}</td>
                                    <td><input key={list.id} onChange={handleCheckChieldElement} type="checkbox" name={list.name} checked={list.isChecked} ></input></td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </Fragment>


    )
}

export default TableAcademyEveryoneReport