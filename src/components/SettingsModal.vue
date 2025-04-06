<template>
  <BModal
    ref="modalRef"
    title="設定"
    @close="closeModal"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <form class="modal-body">
      <h3 class="fs-6 mb-3">ゲーム設定：</h3>
      <div class="mb-3">
        <label class="form-label" for="next-queue-mode">
          ミノ順:
          <select
            id="next-queue-mode"
            class="form-select"
            :value="tempSettings.gameSettings.nextQueueMode"
            @change="changeTempSettings('gameSettings.nextQueueMode', $event)"
          >
            <option :value="QUEUE_GEN_MODE.RANDOM">完全ランダム</option>
            <option :value="QUEUE_GEN_MODE.SEVEN_BAG_PURE">7種一巡</option>
            <option :value="QUEUE_GEN_MODE.SEVEN_BAG_RANDOM">7種一巡（ランダムスタート）</option>
          </select>
        </label>
      </div>
    </form>

    <form class="modal-body">
      <h3 class="fs-6 mb-3">AI：</h3>
      <div class="mb-3">
        <label class="form-label" for="ai-weights-name">
          使用する重み:
          <select
            id="ai-weights-name"
            class="form-select"
            :value="tempSettings.aiSettings.weightsName"
            @change="changeTempSettings('aiSettings.weightsName', $event)"
          >
            <option value="freybot">freybot</option>
            <option value="rightWellFlat">右端空け平積み</option>
            <option value="cc_standard_like">cold clear(standard) like</option>
            <option value="cc_fast_like">cold clear(fast-ver) like</option>
          </select>
        </label>
      </div>
      <div class="mb-3">
        <label class="form-label d-flex flex-column" for="ai-search-time">
          1手当たりの思考時間 [秒]:
          <div class="d-flex align-items-center">
            <input
              id="ai-search-time"
              type="range"
              class="form-range flex-grow-1"
              min="0"
              max="1"
              step="0.1"
              :value="tempSettings.aiSettings.searchTime"
              @input="changeTempSettings('aiSettings.searchTime', $event)"
            />
            <output for="ai-search-time" class="badge bg-secondary ms-2">
              {{ tempSettings.aiSettings.searchTime }}
            </output>
          </div>
        </label>
      </div>
      <div class="mb-3">
        <label class="form-label d-flex flex-column" for="ai-moves-count">
          算出手数:
          <div class="d-flex align-items-center">
            <input
              id="ai-moves-count"
              type="range"
              class="form-range flex-grow-1"
              min="5"
              max="60"
              step="5"
              :value="tempSettings.aiSettings.movesCount"
              @input="changeTempSettings('aiSettings.movesCount', $event)"
            />
            <output for="ai-moves-count" class="badge bg-secondary ms-2">
              {{ tempSettings.aiSettings.movesCount }}
            </output>
          </div>
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
import { QUEUE_GEN_MODE } from '@/utils/tetrisDef';

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
  const value = target.type === 'range' ? Number(target.value) : target.value;

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
