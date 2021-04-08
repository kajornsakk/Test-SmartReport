import React, { Fragment } from 'react';
import Hero from './Hero';
import HomeContent from './HomeContent';

export default function Home() {
  return (
    <Fragment>
      <Hero />
      <div className="box cta">
        <p className="has-text-centered">
          <span className="tag is-primary">Download</span> สามารถดาวน์โหลดเทมเพลตฟอร์มการกรอกข้อมูลได้ด้านล่าง
        </p>
      </div>
      <HomeContent />
    </Fragment>
  )
}
