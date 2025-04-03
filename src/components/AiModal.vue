<template>
  <BModal
    ref="modalRef"
    id="ai-modal"
    title="AI解析"
  >
    <div class="row">
      <div class="col-12 mb-3">
        <div id="ai-status-message" class="alert alert-info" role="alert">
          AIの状態メッセージがここに表示されます
        </div>
      </div>

      <div class="col-md-8">
        <h3 class="fs-6 mb-2">探索履歴</h3>
        <div id="ai-move-history" class="list-group ai-history-container">
          <div class="text-center py-3 text-muted">
            <em>まだ履歴がありません</em>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="d-grid gap-2">
          <button
            id="ai-search-button"
            class="btn btn-primary"
            type="button"
          >
            探索開始
          </button>
          <button
            id="ai-apply-button"
            class="btn btn-success"
            type="button"
            disabled
          >
            適用
          </button>
          <button
            id="ai-reset-history-button"
            class="btn btn-outline-danger"
            type="button"
          >
            履歴リセット
          </button>
        </div>
      </div>
    </div>
  </BModal>
</template>

<script setup lang="ts">
import { ref, defineExpose } from 'vue';
import { BModal } from 'bootstrap-vue-next';

const modalRef = ref<InstanceType<typeof BModal> | null>(null);

const open = () => {
  modalRef.value?.show();
};

defineExpose({
  open,
});
</script>

<style lang="scss" scoped>
.ai-history-container {
  max-height: 400px;
  overflow-y: auto;
}
</style>
