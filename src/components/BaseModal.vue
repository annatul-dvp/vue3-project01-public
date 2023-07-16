<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <Teleport v-if="open" to="#teleport-target">
    <div class="teleport-blackout"></div>
    <div class="teleport-modal" @click="onOutsideClick">
      <div ref="content" class="teleport-modal__content">
        <button type="button" class="teleport-modal__close" @click="doClose">X</button>
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<script>
let openedCount = 0;
let atLeastOneOpened = false;

export default {
  props: {
    open: { type: Boolean },
  },
  methods: {
    onOutsideClick($event) {
      if ($event.target !== this.$refs.content && $event.target.contains(this.$refs.content)) {
        this.doClose();
      }
    },
    doClose() {
      this.$emit('update:open', false);
    },
    checkBlackoutState() {
      if (!openedCount) {
        atLeastOneOpened = false;
        document.body.style.overflow = null;
        document.body.style.paddingRight = null;
      } else if (!atLeastOneOpened && openedCount === 1) {
        atLeastOneOpened = true;
        document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
        document.body.style.overflow = 'hidden';
      }
    },
  },
  watch: {
    open: {
      handler(isOpen) {
        if (isOpen) {
          openedCount += 1;
        } else {
          openedCount -= 1;
        }

        this.checkBlackoutState();
      },
    },
  },
  created() {
    if (this.open) {
      openedCount += 1;
      this.checkBlackoutState();
    }
  },
};
</script>

<style>
.teleport-blackout {
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.75;
  background-color: #000000;
}
.teleport-modal {
  z-index: 1000;
  overflow: auto;
  overflow-y: scroll;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px;
}
.teleport-modal__content {
  position: relative;
  max-width: 1000px;
  margin-top: auto;
  margin-bottom: auto;
  padding: 40px;
  background-color: #ffffff;
}
.teleport-modal__close {
  position: absolute;
  top: 0;
  right: 0;
  padding: 15px;
  line-height: 1;
  background-color: transparent;
  border: none;
  font-size: 20px;
}
</style>
