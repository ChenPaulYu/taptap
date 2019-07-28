const socket = io('https://taiwanbeats2019.herokuapp.com/');

var vm = new Vue({
  el: "#app",
  data: {
    musicOrder: [], //sequencer array
    maxOrder: 16, //sequencer length
    nowOrder: 0, // sequencer to fill index
    nowPlayOrder: -1, //sequncer play index
    soundDir: './sound/new_sample/',
    bgFile: 'sasa.mp3',
    soundFile: [
      '0.wav', 
      '1.wav',
      '2.wav',
      '3.wav',
      '4.wav',
      '5.wav',
      '6.wav',
      '7.wav',
      '8.wav',
      '9.wav',
      '10.wav',
      '11.wav'],
      soundPlayer: [],
      bgPlayer: null
  },
  mounted() {

    this.bgPlayer = new Tone.Player(this.soundDir + this.bgFile).toMaster()

    for (var i=0; i<this.maxOrder; i++) {
      this.musicOrder.push(-1);
      this.soundPlayer[i] = new Tone.Player(this.soundDir + this.soundFile[i]).toMaster()
    }

    Tone.Transport.bpm.value = 76
    Tone.Transport.scheduleRepeat(this.repeat, '2n');
    // Tone.Transport.scheduleRepeat(this.background, '4n');

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
    }
  },
  methods: {
    //when click the music paragraph
    selectMusic(ind) {
      this.$set(this.musicOrder, this.nowOrder, ind);
      this.soundPlayer[ind-1].start();
      this.nowOrder++;
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
      console.log(this.musicOrder)
      socket.emit("broadcast", {
        sequencer: this.musicOrder
      })
    },
    play() {
      //TODO: play song here! 
      //      change nowPlayOrder in each schedule repeat
      if (Tone.Transport.state == 'started') {
        Tone.Transport.stop()
      } else {
        Tone.Transport.start()
      }

    }, 
    repeat() {
      this.nowPlayOrder = (this.nowPlayOrder + 1) % this.maxOrder
      console.log(this.musicOrder)
      if(this.musicOrder[this.nowPlayOrder] != -1) {
        this.soundPlayer[this.musicOrder[this.nowPlayOrder]-1].start()
      }
      console.log('repeat')
    },
    background() {
      this.bgPlayer.start()
    }

  }
})