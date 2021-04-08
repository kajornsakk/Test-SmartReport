import React, { Component, Fragment } from 'react';
import Product from './Product';
import axios from "axios";
const config = require('../config.json');

export default class Products extends Component {

  state = {
    newproduct: null,
    products: []
  }

  fetchProducts = async () => {
    // add call to AWS API Gateway to fetch products here
    // then set them in state
    try {
      const res = await axios.get(`${config.api.invokeUrl}/products`);
      const products = res.data;
      this.setState({ products: products });
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  componentDidMount = () => {
    this.fetchProducts();
  }

  render() {
    return (

      <Fragment>
        {/* <section className="section">
          <div className="container">
            <h1>Energy Products</h1>
            <p className="subtitle is-5">Invest in a clean future with our efficient and cost-effective green energy products:</p>
            <br />
            <div className="columns">
              <div className="column">
                <div className="tile is-ancestor">
                  <div className="tile is-4 is-parent  is-vertical">
                    { 
                      this.state.products && this.state.products.length > 0
                      ? this.state.products.map(product => <Product name={product.productname} id={product.id} key={product.id} />)
                      : <div className="tile notification is-warning">No products available</div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}



        {/*  */}
        <div className="box cta">

          <div class="tabs is-boxed">
            <ul>
              <li class="is-active">
                <a>
                  <span class="icon is-small" ><i class="fas fa-image" aria-hidden="true"></i></span>
                  <span>อัปโหลดข้อมูลภาระงานสอน</span>
                </a>
              </li>
              <li>
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

          <div class="card-content">
            <div class="content">
              <h4>Energy conservation</h4>

              <div class="select is-rounded">
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
          </div>

        </div>

      </Fragment>


    )
  }
}
