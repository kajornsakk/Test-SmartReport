import React, { Component, Fragment } from 'react';
import Product from './Product';
import axios from "axios";
const config = require('../config.json');

export default class Products extends Component {

  state = {
    newproduct: null,
    products: []
  }

  // fetchProducts = async () => {
  //   // add call to AWS API Gateway to fetch products here
  //   // then set them in state
  //   try {
  //     const res = await axios.get(`${config.api.invokeUrl}/products`);
  //     const products = res.data;
  //     this.setState({ products: products });
  //   } catch (err) {
  //     console.log(`An error has occurred: ${err}`);
  //   }
  // }

  // componentDidMount = () => {
  //   this.fetchProducts();
  // }

  saveFile = () =>{
    alert("test")
  }










  render() {
    return (

      <Fragment>
        <div className="box cta">

          {/* Tabs */}
          <div class="tabs is-centered">
            <ul>
              <li class="is-active">
                <a>
                  <span class="icon is-small" ><i class="fas fa-image" aria-hidden="true"></i></span>
                  <span>อัปโหลดข้อมูลภาระงานสอน</span>
                </a>
              </li>
              <li >
                <a>
                  <span class="icon is-small"><i class="fas fa-music" aria-hidden="true"></i></span>
                  <span>อัปโหลดข้อมูลผลงานวิชาการ</span>
                </a>
              </li>
              <li>
                <a>
                  <span class="icon is-small"><i class="far fa-file-alt" aria-hidden="true"></i></span>
                  <span>ประวัติอัปโหลดข้อมูล</span>
                </a>
              </li>
            </ul>
          </div>

          <div class="columns">
            <div class="column"></div>
            <div class="column is-four-fifths">
              
              <div class="card">

                <div class="card-content ">
                  <div class="content">
                    <section class="section is-small">
                      <div class="container">
                        <div class="columns is-multiline is-centered">

                          <div class="column is-one-quarter">
                            <div class="field">
                              <label class="label">สาขาวิชา :</label>
                            </div>

                            <div class="select">
                              <select>
                                <option>โปรดเลือก</option>
                                <option>สาขาวิชาวิทยาการคอมพิวเตอร์</option>
                                <option>สาขาวิชาฟิสิกส์</option>
                                <option>สาขาวิชาเคมี</option>
                                <option>สาขาวิชาเทคโนโลยีชีวภาพ</option>
                                <option>สาขาวิชาคณิตศาสตร์ประกันภัย</option>
                                <option>สาขาวิชาเทคโนโลยีการเกษตร</option>
                                <option>สาขาวิชาวิทยาศาสตร์สิ่งเเวดล้อม</option>
                                <option>สาขาวิชาเทคโนโลยีเพื่อการพัฒนายั่งยืน</option>
                                <option>สาขาวิชาวิทยาศาสตร์และเทคโนโลยีการอาหาร</option>
                                <option>สาขาวิชาเทคโนโลยีวัสดุและสิ่งทอ</option>
                              </select>
                            </div>

                          </div>

                          <div class="column is-one-quarter">
                            <div class="field">
                              <label class="label">ระดับการศึกษา :</label>
                            </div>

                            <div class="select">
                              <select>
                                <option>โปรดเลือก</option>
                                <option>ปริญญาตรี</option>
                                <option>ปริญญาโทและปริญญาเอก</option>
                              </select>
                            </div>
                          </div>

                          <div class="column is-one-quarter">
                            <div class="field">
                              <label class="label">ประเภท :</label>
                            </div>

                            <div class="select">
                              <select>
                                <option>โปรดเลือก</option>
                                <option>วิชาบรรยาย-วิชาปฏิบัติ</option>
                                <option>ซีเนียร์โปรเจค-ปัญหาพิเศษ-สัมมนา</option>
                                <option>วิทยานิพนธ์-สารนิพนธ์-ปัญหาพิเศษ-สัมมนา</option>
                              </select>
                            </div>

                          </div>

                        </div>
                      </div>

                      <div class="container">
                        <div class="columns is-multiline is-centered">

                          <div class="column is-one-quarter">
                            <div class="field">
                              <label class="label">ปีการศึกษา :</label>
                            </div>

                            <div class="select">
                              <select>
                                <option>โปรดเลือก</option>
                                <option>ปีการศึกษาที่ .....</option>
                              </select>
                            </div>
                          </div>

                          <div class="column is-one-quarter">
                            <div class="field">
                              <label class="label">ภาคการศึกษา :</label>
                            </div>

                            <div class="select">
                              <select>
                                <option>โปรดเลือก</option>
                                <option>ภาคการศึกษาที่ 1</option>
                                <option>ภาคการศึกษที่ 2</option>
                              </select>
                            </div>
                          </div>

                        </div>
                      </div>

                      <div class="container">
                        <div class="columns is-multiline is-centered">
                          <div class="field">
                            <div class="column is-one-quarter">
                              <input type='file' className="selectfile" onChange={this.handleChange} />
                            </div>
                          </div>

                        </div>
                      </div>


                      <div class="container level-right">
                        <div class="columns is-multiline is-centered">
                          <div class="colum is-one-quarter">
                          <button class="button is-primary " onClick={this.saveFile}>
                            <span class="icon is-small">
                              <i class="fas fa-check"></i>
                            </span>
                            <span>อัพโหลดข้อมูล</span>
                          </button>
                          </div>
                        </div>
                      </div>




                    </section>
                  </div>
                </div>
              </div>
            </div>
            <div class="column"></div>
          </div>


        </div>


      </Fragment>


    )
  }
}
