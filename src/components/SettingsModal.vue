<template>
  <BModal
    ref="modalRef"
    title="設定"
    @close="closeModal"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <form class="modal-body">
      <h3 class="fs-6 mb-3">盤面設定</h3>
      <div class="mb-3">
        <label class="form-label" for="board-width">
          幅:
          <input
            id="board-width"
            type="range"
            class="form-range flex-grow-1"
            :min="BOARD_CONSTRAINTS.MIN_WIDTH"
            :max="BOARD_CONSTRAINTS.MAX_WIDTH"
            :value="tempSettings.boardSettings.width"
            @input="changeTempSettings('boardSettings.width', $event)"
          />
          <output for="board-width" class="badge bg-secondary">
            {{ tempSettings.boardSettings.width }}
          </output>
        </label>
      </div>
      <div class="mb-3">
        <label class="form-label" for="board-height">
          高さ:
          <input
            id="board-height"
            type="range"
            class="form-range flex-grow-1"
            :min="BOARD_CONSTRAINTS.MIN_HEIGHT"
            :max="BOARD_CONSTRAINTS.MAX_HEIGHT"
            :value="tempSettings.boardSettings.height"
            @input="changeTempSettings('boardSettings.height', $event)"
          />
          <output for="board-height" class="badge bg-secondary">
            {{ tempSettings.boardSettings.height }}
          </output>
        </label>
      </div>
      <div class="mb-3">
        <label class="form-label" for="board-next-count">
          ネクスト表示数:
          <input
            id="board-next-count"
            type="range"
            class="form-range flex-grow-1"
            :min="BOARD_CONSTRAINTS.MIN_NEXT_COUNT"
            :max="BOARD_CONSTRAINTS.MAX_NEXT_COUNT"
            :value="tempSettings.boardSettings.nextCount"
            @input="changeTempSettings('boardSettings.nextCount', $event)"
          />
          <output for="board-next-count" class="badge bg-secondary">
            {{ tempSettings.boardSettings.nextCount }}
          </output>
        </label>
      </div>
    </form>
  </BModal>
</template>

<script setup lang="ts">
import { computed, defineExpose, ref } from 'vue';
import { useStore } from 'vuex';
import { BModal } from 'bootstrap-vue-next';
import type { Settings } from '@/types/settings';
import { BOARD_CONSTRAINTS } from '@/utils/tetrisDef';

const store = useStore();
const settings = computed(() => store.state.settings.settings as Settings);
const modalRef = ref<InstanceType<typeof BModal> | null>(null);
const tempSettings = ref<Settings>({ ...settings.value });

const open = () => {
  if (!modalRef.value) return;
  // モーダルを開く時に現在の設定を一時保存
  tempSettings.value = JSON.parse(JSON.stringify(settings.value));
  modalRef.value.show();
};

const closeModal = () => {
  if (!modalRef.value) return;
  modalRef.value.hide();
};

const handleOk = () => {
  // OKボタンクリック時に一時保存の設定を確定
  store.commit('settings/SET_SETTINGS', tempSettings.value);
  closeModal();
};

const handleCancel = () => {
  // キャンセル時は一時保存の設定を破棄
  tempSettings.value = JSON.parse(JSON.stringify(settings.value));
  closeModal();
};

const changeTempSettings = (path: string, event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = Number(target.value);

  // パスを配列に分割
  const pathArray = path.split('.');

  // 新しい設定オブジェクトを作成
  const newSettings = { ...tempSettings.value };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = newSettings;

  // 最後の要素以外のパスをたどる
  for (let i = 0; i < pathArray.length - 1; i += 1) {
    current = current[pathArray[i]];
  }

  // 最後の要素の値を更新
  current[pathArray[pathArray.length - 1]] = value;

  tempSettings.value = newSettings;
};

defineExpose({
  open,
});
</script>
