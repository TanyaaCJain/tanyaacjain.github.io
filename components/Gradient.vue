<template>
  <div id="js-scroll" data-scroll-section class="gradient full-width">
    <div class="vintage -center in-view" data-scroll data-scroll-speed="2" data-scroll-repeat>
      <img src="../assets/img/vintage/vintage_telephone.png">
    </div>
    <div class="gradient-row justify-center">
      <div
        id="box00"
        class="gradient-box in-view"
        data-scroll
        data-scroll-delay="0.13"
        data-scroll-speed="3"
        data-scroll-id="box00"
        data-scroll-repeat
      />
      <div
        id="box01"
        class="gradient-box in-view"
        data-scroll
        data-scroll-delay="0.11"
        data-scroll-speed="4"
        data-scroll-id="box01"
        data-scroll-repeat
      />
      <div
        id="box02"
        class="gradient-box in-view"
        data-scroll
        data-scroll-delay="0.09"
        data-scroll-speed="5"
        data-scroll-id="box02"
        data-scroll-repeat
      />
      <div
        id="box03"
        class="gradient-box in-view"
        data-scroll
        data-scroll-delay="0.07"
        data-scroll-speed="6"
        data-scroll-id="box03"
        data-scroll-repeat
      />
    </div>
    <div class="gradient-row justify-center">
      <div
        id="box10"
        class="gradient-box in-view"
        data-scroll
        data-scroll-delay="0.13"
        data-scroll-speed="3"
        data-scroll-id="box10"
        data-scroll-repeat
      />
      <div
        id="box11"
        class="gradient-box in-view"
        data-scroll
        data-scroll-delay="0.11"
        data-scroll-speed="4"
        data-scroll-id="box11"
        data-scroll-repeat
      />
      <div
        id="box12"
        class="gradient-box in-view"
        data-scroll
        data-scroll-delay="0.09"
        data-scroll-speed="5"
        data-scroll-id="box12"
        data-scroll-repeat
      />
      <div
        id="box13"
        class="gradient-box in-view"
        data-scroll
        data-scroll-delay="0.07"
        data-scroll-speed="6"
        data-scroll-id="box13"
        data-scroll-repeat
      />
    </div>
    <div class="gradient-row justify-center">
      <div
        id="box20"
        class="gradient-box in-view"
        data-scroll
        data-scroll-delay="0.13"
        data-scroll-speed="3"
        data-scroll-id="box20"
        data-scroll-repeat
      />
      <div
        id="box21"
        class="gradient-box in-view"
        data-scroll
        data-scroll-delay="0.11"
        data-scroll-speed="4"
        data-scroll-id="box21"
        data-scroll-repeat
      />
      <div
        id="box22"
        class="gradient-box in-view"
        data-scroll
        data-scroll-delay="0.09"
        data-scroll-speed="5"
        data-scroll-id="box22"
        data-scroll-repeat
      />
      <div
        id="box23"
        class="gradient-box in-view"
        data-scroll
        data-scroll-delay="0.07"
        data-scroll-speed="6"
        data-scroll-id="box23"
        data-scroll-repeat
      />
    </div>
  </div>
</template>

<style lang="scss">
.gradient {
  padding-top: 100px;
  padding-bottom: 50px;

  .vintage {
    position: absolute;
    width: 100vw;
    height: 100vh;

    img {
      max-width: 90vw;
    }
  }

  .gradient-row {
    display: inline-flex;
  }
  .gradient-box {
    width: 20vw;
    height: 20vw;
    margin: 1.5vw;
  }
  #box00 {
    background: #3c2d16;
  }
  #box01 {
    background: #4c391c;
  }
  #box02 {
    background: #695023;
  }
  #box03 {
    background: #826139;
  }
  #box10 {
    background: #3e2f19db;
  }
  #box11 {
    background: #4b3a1bd9;
  }
  #box12 {
    background: #695024d9;
  }
  #box13 {
    background: #816139db;
  }
  #box20 {
    background: #5a4d39c2;
  }
  #box21 {
    background: #67583eba;
  }
  #box22 {
    background: #806b46cf;
  }
  #box23 {
    background: #947755d1;
  }
}
</style>
