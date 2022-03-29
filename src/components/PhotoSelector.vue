<template>
  <div></div>
</template>

<script>
  export default {
    name: 'PhotoSelector',
    props: {
      maxWidth: Number,
      maxHeight: Number,
      canSelect: Boolean
    },
    data: () => ({
      currentPositionX: 0,
      currentPositionY: 0,
      canEmitKeydownEvent: true
    }),
    mounted() {
      window.addEventListener('keydown', this.detectArrowPress);
      window.addEventListener('keydown', this.detectSpacePress);
    },
    unmounted() {
      window.removeEventListener('keydown', this.detectArrowPress);
      window.removeEventListener('keydown', this.detectSpacePress);
    },
    methods: {
      detectArrowPress(event) {
        if (this.canSelect === false) {
          return;
        }
        let pageAdvance = 0;
        let emitEvent = false;

        if (event.keyCode === 37) {
          // left
          this.currentPositionX--;
          if (this.currentPositionX < 0) {
            this.currentPositionX = 0;
            pageAdvance = -1;
          }
          emitEvent = true;
        } else if (event.keyCode === 38) {
          // up
          this.currentPositionY--;
          if (this.currentPositionY < 0) {
            this.currentPositionY = 0;
          }
          emitEvent = true;
        } else if (event.keyCode === 39) {
          // right
          this.currentPositionX++;
          if (this.currentPositionX > this.maxWidth - 1) {
            this.currentPositionX = this.maxWidth - 1;
            pageAdvance = 1;
          }
          emitEvent = true;
        } else if (event.keyCode === 40) {
          // down
          this.currentPositionY++;
          if (this.currentPositionY > this.maxHeight - 1) {
            this.currentPositionY = this.maxHeight - 1;
          }
          emitEvent = true;
        }

        if (emitEvent) {
          this.$emit('arrowPressed', this.currentPositionX, this.currentPositionY, pageAdvance);
        }
        this.canEmitKeydownEvent = false;
      },
      detectSpacePress(event) {
        if (this.canSelect === false) {
          return;
        }

        if (event.keyCode === 32) {
          this.$emit('spacePressed');
        }
      }
    }
  }
</script>
