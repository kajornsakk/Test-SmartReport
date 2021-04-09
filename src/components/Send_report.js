import React, { Component } from 'react'

export default class Send_report extends Component {
    render() {
        return (
            <Fragment>
                <div className="box cta ">
                    {/* Tabs */}
                    <div class="tabs is-centered">
                        <ul>
                            <li class="is-active">
                                <a href="" className="navbar-item" ><span class="icon is-small" ><i class="far fa-file-alt" aria-hidden="true"></i></span>
                                     สร้างแบบฟอร์มภาระงานอาจารย์
                                </a>
                            </li>

                            <li >
                                <a href="" className="navbar-item" ><span class="icon is-small" ><i class="far fa-file-alt" aria-hidden="true"></i></span>
                                     ส่งแบบฟอร์มภาระงานอาจารย์
                                </a>
                            </li>

                        </ul>
                    </div>

                    <div class="columns">
                        <div class="column">Test</div>
                        <div class="column is-four-fifths">
                            <div class="card">
                                <section class="section is-small">
                                    <div class="container">
                                        <div class="columns is-multiline is-centered">
                                            
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                        <div class="column">Test</div>
                    </div>





                </div>
            </Fragment>
        )
    }
}
