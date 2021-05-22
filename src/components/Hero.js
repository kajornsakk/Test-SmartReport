import React from 'react';
export default function Hero() {
  
  function onClickDownload () {
    window.location.href="/DownloadTemplate"
  }

  return (


    <section className="hero">
      <div className="hero-body">
        <div class="columns pt-6">
          <div class="column mt-6">
            {/* <span class="icon has-text-warning">
              <i class="far fa-chart-bar fa-lg"></i>
            </span> */}
            <br/>
            <br/>
            <br/>
            {/* <br/> */}
            <h1 class="is-size-1 has-text has-text-weight-semibold">
              SCI-TU Workload<br />
              
              </h1>

            <div class="is-size-3 has-text-primary has-text-weight-semibold">
            ระบบจัดการข้อมูลรายงานผลการปฏิบัติงานอาจารย์
            </div>

            <p class="has-text-primary ">
              คณะวิทยาศาสตร์และเทคโนโลยี มหาวิทยาลัยธรรมศาสตร์
            </p>
            <br/>
            <button class="button is-warning mt-4" onClick={onClickDownload}>
              ดาวน์โหลดเทมเพลต
            </button>
          </div>
          <div class="column mt-6">
            <img src="Data2.png" alt="conserve energy" />
          </div>
        </div>
      </div>
    </section>



  )
}
