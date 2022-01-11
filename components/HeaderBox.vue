<template>
  <div class="vhcenter position-div">
    <div class="place">NEW DELHI, INDIA</div>
    <div class="year">2022</div>
    <div class="outline vhcenter">
      <div class="text-qual vhcenter">
        Software Developer Engineer<br />Designer<br />+ + +
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Landing page */
#head {
  font-size: 25px;
  padding-left: 30px;
}

#name {
  font-family: 'Great Vibes', serif;
  top: 10px;
  font-size: 35px;
}

.position-div {
  position: absolute;
  width: 66vw;
  max-width: 85vw;
  height: 6em;
}
.outline {
  background-color: rgb(158 128 90);
  background-blend-mode: overlay;
  position: absolute;
  width: 66vw;
  max-width: 85vw;
  height: 10em;
  border: 3px solid #634b27;
  box-sizing: border-box;
}

/* PROGRAMMER & DESIGNER */
.text-qual {
  position: absolute;
  align-content: center;
  text-align: left;
  font-family: 'zxcv', serif;
  font-size: 4vw;
  line-height: 1.2;
  width: 80%;
  color: #fbfbfb;
}

/* 2017 */
.year {
  position: absolute;
  z-index: 2;
  left: 1em;
  top: -3em;
  font-family: 'zxcv', serif;
  letter-spacing: 2px;
  font-weight: bold;
  text-align: center;
  padding: 8px;
  background: #634b27;
  color: #fbfbfb;
}

/* DEL */
.place {
  position: absolute;
  right: 0;
  bottom: -1em;
  width: 12em;
  z-index: 2;
  font-weight: bold;
  font-size: 14px;
  letter-spacing: 0.15em;
  color: #fbfbfb;
}

@media screen and (max-width: 500px) {
  .position-div {
    width: 77vw;
    height: 4em;
  }
  .outline {
    width: 80vw;
    height: 6em;
  }
  .text-qual {
    font-size: 5vw;
    width: 80%;
  }
  .place {
    font-size: 2.5vw;
  }
  .year {
    font-size: 3vw;
    padding: 6px;
  }
}
@media screen and (min-width: 500px) {
  .position-div {
    height: 8em;
  }
  .outline {
    height: 11em;
  }
}
@media screen and (min-width: 1000px) {
  .text-qual {
    font-size: 3vw;
  }
  .position-div {
    width: 50vw;
  }
  .outline {
    width: 50vw;
  }
}
@media screen and (min-width: 1500px) {
  .text-qual {
    font-size: 2.5vw;
  }
  .position-div {
    width: 40vw;
  }
  .outline {
    width: 40vw;
  }
}
</style>
