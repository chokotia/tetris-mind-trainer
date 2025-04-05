<template>
  <div class="draw-mode-selector">
    <div class="btn-group">
      <button
        class="btn edit-option"
        :class="{
          'btn-warning': currentMode === 'Auto',
          'btn-secondary': currentMode !== 'Auto'
        }"
        data-action="Auto"
        type="button"
        @click="handleAction('Auto')"
      >
        Auto
      </button>
      <button
        class="btn edit-option"
        :class="{
          'btn-warning': currentMode === 'Gray',
          'btn-secondary': currentMode !== 'Gray'
        }"
        data-action="Gray"
        type="button"
        @click="handleAction('Gray')"
      >
        Gray
      </button>
      <button
        class="btn edit-option"
        :class="{
          'btn-warning': currentMode === 'Delete',
          'btn-secondary': currentMode !== 'Delete'
        }"
        data-action="Delete"
        type="button"
        @click="handleAction('Delete')"
      >
        Del
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'DrawModeSelector',
  setup() {
    const store = useStore();
    const currentMode = computed(() => store.getters['drawMode/drawMode']);

    const handleAction = (action: string) => {
      store.commit('drawMode/SET_DRAW_MODE', action);
    };

    return {
      currentMode,
      handleAction,
    };
  },
});
</script>

<style lang="scss" scoped>
.draw-mode-selector {
  display: flex;
  justify-content: center;
}

.btn-group {
  .btn {
    &.edit-option {
      &:hover {
        background-color: darken(#6c757d, 10%);
      }
      &.btn-warning {
        &:hover {
          background-color: darken(#ffc107, 10%);
        }
      }
    }
  }
}
</style>
