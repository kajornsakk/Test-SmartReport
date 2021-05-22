import React, { Component, Fragment } from 'react'
import HomeContent from './HomeContent';

export default class downloadTemplate extends Component {
    render() {
        return (
            <div className="box cta">
                <div className="columns">
                    <div className="column"></div>
                    <div className="column is-four-fifths">

                        {/* <div className="card">
                            <div className="crad-content"> */}
                        <div className="section is-small ">
                            <span class="is-size-4 has-text">
                                ดาวน์โหลดเทมเพลตกรอกข้อมูล
                            </span>

                            {/* <div class="notification is-warning is-light">
                                <button class="delete"></button>
                                {<p>ข้อปฎิบัติในการใช้งานฟอร์มเทมเพลต</p>}
                                {<li>ผู้ใช้ต้องข้อปฏิบัติในการใช้ฟอร์มเทมเพลต</li>}
                                {<li>ผู้ใช้ต้องเปลี่ยนเเปลลงข้อมูลตามสีที่มาคเอาไว้</li>}
                                {<li>ผู้ใช้ห้ามเปลี่ยนแปลงช่องกรอกข้อมูล ในส่วนหัวของแบบฟอร์ม</li>}
                            </div> */}

                            <article class="message is-warning">
                                <div class="message-body ">
                                    {<p>ข้อปฎิบัติในการใช้งานฟอร์มเทมเพลต</p>}
                                    {<li>ผู้ใช้ต้องปฏิบัติตามข้อกำหนดในการใช้ฟอร์มเทมเพลต</li>}
                                    {<li>ผู้ใช้ต้องเปลี่ยนเเปลลงข้อมูลตามสีที่มาคเอาไว้</li>}
                                    {<li>ผู้ใช้ห้ามเปลี่ยนแปลงช่องกรอกข้อมูล ในส่วนหัวของแบบฟอร์ม</li>}
                                </div>
                            </article>

                            <table class="table is-striped is-fullwidth">
                                <thead>
                                    <tr class="is-selected">
                                        <th>ระดับการศึกษา</th>
                                        <th>ชื่อเทมเพลต</th>
                                        <th>สถานะ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>ปริญญาตรี</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>ฟอร์มภาระงานสอนวิชาบรรยายเเละวิชาปฎิบัติการ</td>
                                        <td><a class="button is-small is-warning" href="https://drive.google.com/file/d/1_tHQ9K_FNRReltBao2mXqOV_YnsfxtEo/view?usp=sharing">
                                            <span class="icon">
                                                <i class="fas fa-download"></i>
                                            </span>
                                            <span>ดาวน์โหลด</span>
                                        </a></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>ฟอร์มภาระงานสอนซีเนียร์โปรเจค/ปัญหาพิเศษ/สัมมนา</td>
                                        <td><a class="button is-small is-warning" href="https://drive.google.com/file/d/1cM6Qdh67BtyoVdY6kq3Bm3MP9Y5gyBTQ/view?usp=sharing">
                                            <span class="icon">
                                                <i class="fas fa-download"></i>
                                            </span>
                                            <span>ดาวน์โหลด</span>
                                        </a></td>
                                    </tr>
                                </tbody>

                                <tbody>
                                    <tr>
                                        <th>ปริญญาโท</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>ฟอร์มภาระงานสอนวิชาบรรยายเเละวิชาปฎิบัติการ</td>
                                        <td><a class="button is-small is-warning" href="https://drive.google.com/file/d/1NWPwr77zuEmAp6qS09Q2jojTwSlDEmDj/view?usp=sharing">
                                            <span class="icon">
                                                <i class="fas fa-download"></i>
                                            </span>
                                            <span>ดาวน์โหลด</span>
                                        </a></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>ฟอร์มภาระงานสอนวิชาวิทยานิพนธ์หรือสารนิพนธ์</td>
                                        <td><a class="button is-small is-warning" href="https://drive.google.com/file/d/1o4Xtahkh8AMBenW2nOJZfAcGBjuBYKvs/view?usp=sharing">
                                            <span class="icon">
                                                <i class="fas fa-download"></i>
                                            </span>
                                            <span>ดาวน์โหลด</span>
                                        </a></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>ฟอร์มภาระงานสอนวิชาปํญหาพิเศษและวิชาสัมมนา</td>
                                        <td><a class="button is-small is-warning" href="https://drive.google.com/file/d/1Dse6Pf3FR-myz19UQgBF7FGRHdNC7dFs/view?usp=sharing">
                                            <span class="icon">
                                                <i class="fas fa-download"></i>
                                            </span>
                                            <span>ดาวน์โหลด</span>
                                        </a></td>
                                    </tr>
                                </tbody>

                                <tbody>
                                    <tr>
                                        <th>ปริญญาเอก</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>ฟอร์มภาระงานสอนวิชาบรรยาย</td>
                                        <td><a class="button is-small is-warning" href="https://drive.google.com/file/d/1zAcydsGwUUE2cRBYJ-ZFNe5ZVMJSUW-j/view?usp=sharing">
                                            <span class="icon">
                                                <i class="fas fa-download"></i>
                                            </span>
                                            <span>ดาวน์โหลด</span>
                                        </a></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>ฟอร์มภาระงานสอนวิทยานิพนธ์</td>
                                        <td><a class="button is-small is-warning" href="https://drive.google.com/file/d/1tTTr5aWRXtzaFJIV4QXSpIAM91MZH3aD/view?usp=sharing">
                                            <span class="icon">
                                                <i class="fas fa-download"></i>
                                            </span>
                                            <span>ดาวน์โหลด</span>
                                        </a></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>ฟอร์มภาระงานสอนวิชาปํญหาพิเศษและวิชาสัมมนา</td>
                                        <td><a class="button is-small is-warning" href="https://drive.google.com/file/d/1cQqj6Fx6Z4eM1BFrZtqCz4hfKZikFFlm/view?usp=sharing">
                                            <span class="icon">
                                                <i class="fas fa-download"></i>
                                            </span>
                                            <span>ดาวน์โหลด</span>
                                        </a></td>
                                    </tr>
                                </tbody>
                            </table>


                        </div>
                        {/* </div>
                        </div> */}
                    </div>
                    <div className="column"></div>
                </div>
            </div>
            //     <section className="container">
            //     <span class="is-size-4 has-text-primary">
            //         ระดับปริญญาตรี
            //     </span>
            //     <div className="columns features">
            //         <div className="column is-desktop">
            //             <div className="card is-shady">
            //                 <div className="card-content">
            //                     <div className="content">
            //                         <h6>ฟอร์มภาระงานสอนวิชาบรรยายเเละวิชาปฎิบัติการ</h6>
            // <a class="button is-small is-primary" href="https://drive.google.com/file/d/1h6N0rcxfUvBxNAoztggnhFXeFof_9T9I/view?usp=sharing">
            //     <span class="icon">
            //         <i class="fas fa-download"></i>
            //     </span>
            //     <span>Download</span>
            // </a>
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //         <div className="column is-desktop">
            //             <div className="card is-shady">
            //                 <div className="card-content">
            //                     <div className="content">
            //                         <h6>ฟอร์มภาระงานสอนซีเนียร์โปรเจค/ปัญหาพิเศษ/สัมมนา</h6>
            //                         <a class="button is-small is-primary" href="https://drive.google.com/file/d/1SfHSJJ73hM2iwaLILgxVbMPuXVmprOo4/view?usp=sharing">
            //                             <span class="icon">
            //                                 <i class="fas fa-download"></i>
            //                             </span>
            //                             <span>Download</span>
            //                         </a>
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>


            //     <span class="is-size-4 has-text-primary">
            //         ระดับปริญญาโท
            //     </span>
            //     <div className="columns features">
            //         <div className="column is-desktop">
            //             <div className="card is-shady">
            //                 <table class="table is-striped is-fullwidth">
            //                     <thead>
            //                     </thead>
            //                     <tbody>
            //                         <tr>
            //                             <td>
            //                                 <h7>ฟอร์มภาระงานสอน วิชาบรรยายและวิชาปฏิบัติการ</h7>
            //                             </td>
            //                             <td>
            //                             </td>
            //                             <td>
            //                                 <a class="button is-small is-primary" href="https://drive.google.com/file/d/1iNbzWeeAubATkBHXe1SSAi_eYkZYU9dr/view?usp=sharing">
            //                                     <span class="icon">
            //                                         <i class="fas fa-download"></i>
            //                                     </span>
            //                                     <span>Download</span>
            //                                 </a>
            //                             </td>
            //                         </tr>
            //                         <tr>
            //                             <td>
            //                                 <p>ฟอร์มภาระงานสอน วิทยานิพนธ์และสารนิพนธ์</p>
            //                             </td>
            //                             <td>
            //                             </td>
            //                             <td>
            //                                 <a class="button is-small is-primary" href="https://drive.google.com/file/d/1iNbzWeeAubATkBHXe1SSAi_eYkZYU9dr/view?usp=sharing">
            //                                     <span class="icon">
            //                                         <i class="fas fa-download"></i>
            //                                     </span>
            //                                     <span>Download</span>
            //                                 </a>
            //                             </td>
            //                         </tr>
            //                         <tr>
            //                             <td>
            //                                 <p>ฟอร์มภาระงานสอน ปัญหาพิเศษและสัมมนา</p>
            //                             </td>
            //                             <td>
            //                             </td>
            //                             <td>
            //                                 <a class="button is-small is-primary" href="https://drive.google.com/file/d/1iNbzWeeAubATkBHXe1SSAi_eYkZYU9dr/view?usp=sharing">
            //                                     <span class="icon">
            //                                         <i class="fas fa-download"></i>
            //                                     </span>
            //                                     <span>Download</span>
            //                                 </a>
            //                             </td>
            //                         </tr>
            //                     </tbody>
            //                 </table>
            //             </div>
            //         </div>

            //     </div>

            //     <span class="is-size-4 has-text-primary">
            //         ระดับปริญญาเอก
            //     </span>
            //     <div className="columns features">
            //         <div className="column is-desktop">
            //             <div className="card is-shady">
            //                 <table class="table is-striped is-fullwidth">
            //                     <thead>
            //                     </thead>
            //                     <tbody>
            //                         <tr>
            //                             <td>
            //                                 <p>ฟอร์มภาระงานสอน วิชาบรรยาย</p>
            //                             </td>
            //                             <td>
            //                             </td>
            //                             <td>
            //                                 <a class="button is-small is-primary" href="https://drive.google.com/file/d/1iNbzWeeAubATkBHXe1SSAi_eYkZYU9dr/view?usp=sharing">
            //                                     <span class="icon">
            //                                         <i class="fas fa-download"></i>
            //                                     </span>
            //                                     <span>Download</span>
            //                                 </a>
            //                             </td>
            //                         </tr>
            //                         <tr>
            //                             <td>
            //                                 <p>ฟอร์มภาระงานสอน วิทยานิพนธ์</p>
            //                             </td>
            //                             <td>
            //                             </td>
            //                             <td>
            //                                 <a class="button is-small is-primary" href="https://drive.google.com/file/d/1iNbzWeeAubATkBHXe1SSAi_eYkZYU9dr/view?usp=sharing">
            //                                     <span class="icon">
            //                                         <i class="fas fa-download"></i>
            //                                     </span>
            //                                     <span>Download</span>
            //                                 </a>
            //                             </td>
            //                         </tr>
            //                         <tr>
            //                             <td>
            //                                 <p>ฟอร์มภาระงานสอน ปัญหาพิเศษและสัมมนา</p>
            //                             </td>
            //                             <td>
            //                             </td>
            //                             <td>
            //                                 <a class="button is-small is-primary" href="https://drive.google.com/file/d/1iNbzWeeAubATkBHXe1SSAi_eYkZYU9dr/view?usp=sharing">
            //                                     <span class="icon">
            //                                         <i class="fas fa-download"></i>
            //                                     </span>
            //                                     <span>Download</span>
            //                                 </a>
            //                             </td>
            //                         </tr>
            //                     </tbody>
            //                 </table>
            //             </div>
            //         </div>

            //     </div>

            // </section>

        )
    }
}
