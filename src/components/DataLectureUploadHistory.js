import React, { Fragment } from 'react'
import { useState, useEffect } from 'react';
import AWS from 'aws-sdk';

export const DataLectureUploadHistory = props => {

    AWS.config.update({
        accessKeyId: 'AKIAJJOOQS6RRWQUJKNQ',
        secretAccessKey: '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',
        region: 'us-east-1'
    });
    const s3 = new AWS.S3();


    var prefix = 'public/' + props.department + '/' + props.category + '/' + props.education + '/' + props.type + '/';
    const params = {
        Bucket: 'amplifys3smartreport142809-dev',
        Delimiter: '',
        Prefix: prefix,
    };

    const [listFilesName, setListFilesName] = useState([]);
    useEffect(() => {
        s3.listObjectsV2(params, (err, data) => {
            if (err) {
                console.log(err, err.stack);
            } else {
                setListFilesName(data.Contents);
            }
        });
    }, []);


    return (
        <Fragment>
            <br/>
            <span class="is-size-4 has-text-primary">
                ประวัติอัปโหลดข้อมูล " ภาระงานสอน"
            </span>
            <br/>
            <div class="card">
            <section class="section is-small">
                <div class="columns is-multiline is-centered">
                    <table class="table is-striped">
                        <thead>
                            <tr>
                                <th>สาขาวิชา</th>
                                <th>ปีการศึกษา</th>
                                <th>ภาคการศึกษา</th>
                                <th>หมวดงาน</th>
                                <th>วันที่อัปโหลด</th>
                            </tr>
                        </thead>
                        <tbody>

                            {listFilesName &&
                                listFilesName.map((list) => (
                                   
                                    <tr>
                                        <td>{((list.Key).split('/')[5]).split('_')[2]}</td>
                                        <td>{((list.Key).split('/')[5]).split('_')[0]}</td>
                                        <td>{((list.Key).split('/')[5]).split('_')[1]}</td>
                                        <td>{((list.Key).split('/')[5]).split('_')[3]}</td>
                                        {/* <td><p>{(list.Key).split('/')[5]}</p></td> */}
                                        <td>{((list.Key).split('/')[5]).split('_')[4]}</td>
                                    </tr>

                                ))}

                        </tbody>
                    </table>
                </div>
            </section>
            </div>

        </Fragment>
    )
}

export default DataLectureUploadHistory

