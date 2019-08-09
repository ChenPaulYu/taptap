//import Vue from 'vue';
//import modal from './components/modal.vue';
const socket = io('https://taiwanbeats2019.herokuapp.com/');

var vm = new Vue({
  el: "#app",
  data: {
    musicOrder: [], //sequencer array
    maxOrder: 16, //sequencer length
    nowOrder: 0, // sequencer to fill index
    nowPlayOrder: -1, //sequncer play index
    nowMelody: -5,
    soundDir: './sound/new_sample/',
    bgFile: 'sasa.mp3',
    melodyFile: 'Meloday_8bar_bpm76.wav',
    soundFile: [
      '0.wav', 
      'V1.wav',
      '2.wav',
      '3.wav',
      '4.wav',
      'V2.wav',
      '6.wav',
      'V3.wav',
      '8.wav',
      '9.wav',
      'V4.wav',
      '11.wav'],
    soundPlayer: [],
    bgPlayer: null,
    bgFixPlay: false,
    isModalVisible: false,
    modalStep: 1,
    playState: "triangle-copy-2",
    userName: "",
    soundInd: [],
    melodyArray: [2, 6, 8, 11]
  },
  mounted() {

    this.bgPlayer = new Tone.Player("./sound/" + this.melodyFile).toMaster()
    //this.bgPlayer = new Tone.Player(this.soundDir + this.bgFile).toMaster()

    for (var i=0; i<this.maxOrder; i++) {
      this.musicOrder.push(-1);
    }

    for (var i=0; i<this.soundFile.length; i++) {
      this.soundPlayer[i] = new Tone.Player(this.soundDir + this.soundFile[i]).toMaster()
      this.soundPlayer[i].volume.value = -12;
    }

    // var value = -1;
    // for (var i=0; i<this.maxOrder; i++) {
    //   value++;
    //   if (this.melodyArray.includes(i)) {
    //     value+=3;
    //   }
    //   this.soundInd.push(value);
    // }

    Tone.Transport.bpm.value = 76;
    Tone.Transport.scheduleRepeat(this.repeat, '2n');
    //Tone.Transport.scheduleRepeat(this.backgroundRepeat, '8:0:0');

  },
  components: {
    musiccomp: {
      props: ['seq', 'on'],
      template: `<div class="col-3">
                  <div :class="seqClass">
                    <img :src="imageLink" />
                  </div>
                </div>
      `,
      computed: {
        seqClass() {
          var cstr = "seq-block ";
          if (this.seq != -1) cstr += "seq-in ";
          if (this.on) cstr += "seq-play";
          return cstr;
        },
        imageLink() {
          if (this.seq == -1) return "";
          //$("[data-object-id="+this.id+"]").addClass("seq-in");
          return './chosen_icon/animation-'+this.seq+'.png';
        }

      }
    }, 
    modal: {
      template: `
        <div class="game-modal-backdrop">
          <div class="game-modal game-modal-text">
            <header class="game-modal-header">
              <slot name="header"></slot>
            </header>
            <section class="game-modal-body">
              <slot name="body"></slot>
             </section>
             <footer class="game-modal-footer">
                <slot name="footer"></slot>
            </footer>
          </div>
        </div>
      `,
      methods: {
        close() {
          this.$emit('close');
        },
      }
    }
  },
  computed: {
    playStateImg() {
      return "./img/game/"+this.playState+".png";
    }
  },
  methods: {
    //when click the music paragraph
    stopMusic(ind) {
      this.soundPlayer[ind-1].stop();
    },
    selectMusic(ind) {
      this.stopSeq();
      this.nowPlayOrder = -1;

      // check if it is melody
      var j = 1;
      if (this.melodyArray.includes(ind)) j = 4;

      if (this.nowOrder > 0) this.stopMusic(this.musicOrder[this.nowOrder-1]);
      this.soundPlayer[ind-1].start();

     
      for (var i=0; i<j; i++) {
        // check if it has melody inside
        var nowInd = this.musicOrder[this.nowOrder];
        if (this.melodyArray.includes(nowInd)) {
          for (var r=0; r<4; r++) {
            this.$set(this.musicOrder, this.nowOrder+r, -1);
            if (this.nowOrder+r > 15) break;
          }
        }
        console.log(this.nowOrder);
        this.$set(this.musicOrder, this.nowOrder, ind);
        this.nowOrder++;
        if (this.nowOrder > 15) break;
      }
      this.nowOrder %= this.maxOrder;
    },
    clearMusic() {
      for (var i=0; i<this.maxOrder; i++) {
        this.$set(this.musicOrder, i, -1);
      }
      this.nowOrder = 0;
      this.nowPlayOrder = -1;
    },
    sendOsc(){
      //TODO: send!
      console.log(this.musicOrder, this.userName)
      socket.emit("broadcast", {
        name: this.userName,
        sequencer: this.musicOrder
      })
    },
    playSeq() {
      //if (this.nowPlayOrder != -1 && this.nowPlayOrder != this.maxOrder-1) 
      if (this.nowOrder > 0) this.stopMusic(this.musicOrder[this.nowOrder-1]);

      console.log("nowMelody:"+this.nowMelody+ ", playOrder:"+this.nowPlayOrder);
      if (this.nowMelody > -1 && this.nowPlayOrder > -1 && this.nowPlayOrder < 15
          && (this.nowPlayOrder - this.nowMelody) < 3) 
        this.bgFixPlay = true;
      Tone.Transport.start()
      this.playState = "stop"
    },
    stopSeq() {
      Tone.Transport.pause()
      if (this.musicOrder[this.nowPlayOrder] > 0)
        this.stopMusic(this.musicOrder[this.nowPlayOrder]);
      if (this.nowPlayOrder == 15) 
        this.nowMelody = -5;
      this.playState = "triangle-copy-2"
    },
    play() {
      //TODO: play song here! 
      //      change nowPlayOrder in each schedule repeat
      if (Tone.Transport.state == 'started') {
        this.stopSeq();
        
      } else {
        this.playSeq();
      }
    }, 
    repeat() {
      this.nowPlayOrder = (this.nowPlayOrder + 1) % this.maxOrder
      var ind = this.musicOrder[this.nowPlayOrder]
      if (this.nowPlayOrder == 0) {
        if (this.musicOrder[15] != -1) this.stopMusic(this.musicOrder[15]);
        this.nowMelody = -5;
      }
      if (this.bgFixPlay) {
        var d = this.nowPlayOrder - this.nowMelody;
        var tempo = Math.floor(d/2) + ":" + d%2 + ":0";
        console.log(tempo);
        this.soundPlayer[ind-1].start(Tone.now, tempo);
        this.bgFixPlay = false;
      }
      else if(ind != -1) {
        if (this.melodyArray.includes(ind)) {
          if ((this.nowPlayOrder-this.nowMelody) >= 4 ){
            this.nowMelody = this.nowPlayOrder;
            this.soundPlayer[ind-1].start()
          }
          // console.log("now play order", this.nowPlayOrder);
          // if (this.nowPlayOrder == 1) {
          //   console.log("stop");
          //   this.soundPlayer[ind-1].stop("0:4:0");
          // }
        } else {
          this.soundPlayer[ind-1].start()
          this.nowMelody = -5;
        }        
      } else {
        this.stopSeq();
        this.nowPlayOrder = -1;
      }

      
      console.log('repeat')
    },
    backgroundRepeat() {
      console.log('background');
      this.bgPlayer.start()
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    sendMusic() {
      this.modalStep = 1;
      userName = "";
      this.showModal();
    },
    nextStep() {
      // TODO: add sending page
      this.modalStep += 1;
      if (this.modalStep == 2) { // success
        setTimeout(function(){
          this.closeModal();
        }.bind(this), 1000);
      }
    }

  }
})