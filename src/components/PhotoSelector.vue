<template>
  <div></div>
</template>

<script>
  export default {
    name: 'PhotoSelector',
    props: {
      maxWidth: Number,
      maxHeight: Number,
    },
    data: () => ({
      currentPositionX: 0,
      currentPositionY: 0,
    }),
    mounted() {
      window.addEventListener('keydown', this.detectArrowPress);
    },
    methods: {
      detectArrowPress(event) {
        if (event.keyCode === 37) {
          // left
          this.currentPositionX--;
          if (this.currentPositionX < 0) {
            this.currentPositionX = 0;
          }
        } else if (event.keyCode === 38) {
          // up
          this.currentPositionY--;
          if (this.currentPositionY < 0) {
            this.currentPositionY = 0;
          }
        } else if (event.keyCode === 39) {
          // right
          this.currentPositionX++;
        } else if (event.keyCode === 40) {
          // down
          this.currentPositionY++;
          if (this.currentPositionY > this.maxHeight - 1) {
            this.currentPositionY = this.maxHeight - 1;
          }
        }

        this.$emit('keypressed', this.currentPositionX, this.currentPositionY);
      }
    }
  }
</script>
