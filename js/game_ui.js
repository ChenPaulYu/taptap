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
      '0.mp3', 
      '1.mp3', 
      '2.mp3', 
      '3.mp3', 
      '4.mp3',
      '5.mp3',
      '6.mp3',
      '7.mp3',
      '8.mp3',
      '9.mp3',
      '10.mp3',
      '11.mp3'],
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
    Tone.Transport.scheduleRepeat(this.repeat, '4n');
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
      // console.log(this.soundPlayer[ind].start())
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