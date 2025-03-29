<template>
  <div
    class="modal fade"
    id="settings-modal"
    tabindex="-1"
    aria-labelledby="settingsModalLabel"
    aria-hidden="true"
    role="dialog"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title fs-5" id="settingsModalLabel">設定</h2>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="設定を閉じる"
            @click="closeModal"
          ></button>
        </div>
        <form class="modal-body">
          <h3 class="fs-6 mb-3">盤面設定</h3>
          <div class="mb-3">
            <label class="form-label" for="board-width">
              幅:
              <input
                id="board-width"
                type="range"
                class="form-range flex-grow-1"
                min="3"
                max="10"
                :value="settings.boardSettings.width"
                @input="updateBoardSetting('width', $event)"
              />
              <output for="board-width" class="badge bg-secondary">
                {{ settings.boardSettings.width }}
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
                min="6"
                max="20"
                :value="settings.boardSettings.height"
                @input="updateBoardSetting('height', $event)"
              />
              <output for="board-height" class="badge bg-secondary">
                {{ settings.boardSettings.height }}
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
                min="2"
                max="10"
                :value="settings.boardSettings.nextCount"
                @input="updateBoardSetting('nextCount', $event)"
              />
              <output for="board-next-count" class="badge bg-secondary">
                {{ settings.boardSettings.nextCount }}
              </output>
            </label>
          </div>
          <div class="mb-3">
            <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
            <label class="form-label" for="board-block-range">ランダム初期配置ブロック数:</label>
            <div
              id="board-block-range"
              role="slider"
              aria-valuemin="1"
              aria-valuemax="5"
              aria-valuenow="3"
              aria-labelledby="board-block-range-label"
              tabindex="0"
            ></div>
            <output for="board-block-range" class="badge bg-secondary mt-2">
              {{ settings.boardSettings.blockRange.min }} -
              {{ settings.boardSettings.blockRange.max }}
            </output>
          </div>
          <div class="mb-3">
            <label class="form-label" for="board-mino-mode">
              ネクストミノ順:
              <select
                id="board-mino-mode"
                class="form-select"
                :value="settings.boardSettings.MINO_MODE"
                @change="updateBoardSetting('MINO_MODE', $event)"
              >
                <option value="random">完全ランダム</option>
                <option value="7bag-random">7種一巡（ランダムスタート）</option>
                <option value="7bag-pure">7種一巡</option>
              </select>
            </label>
          </div>

          <hr />
          <h3 class="fs-6 mb-3">AI設定</h3>
          <div class="mb-3">
            <label class="form-label" for="ai-weights-name">
              重み設定:
              <select
                id="ai-weights-name"
                class="form-select"
                :value="settings.aiSettings.weightsName"
                @change="updateAISetting('weightsName', $event)"
              >
                <option value="default">デフォルト</option>
                <option value="rightWellFlat">右端空け平積み</option>
                <option value="stableStack">安定積み（試験中）</option>
                <option value="cc_standard_like">CC_STANDARD_LIKE</option>
                <option value="cc_fast_like">CC_FAST_LIKE</option>
              </select>
            </label>
          </div>
          <div class="mb-3">
            <label class="form-label" for="ai-search-time">
              探索時間 (秒):
              <input
                id="ai-search-time"
                type="range"
                class="form-range flex-grow-1"
                min="0.5"
                max="10"
                step="0.5"
                :value="settings.aiSettings.searchTime"
                @input="updateAISetting('searchTime', $event)"
              />
              <output for="ai-search-time" class="badge bg-secondary">
                {{ settings.aiSettings.searchTime }}
              </output>
            </label>
          </div>
          <div class="mb-3">
            <label class="form-label" for="ai-moves-count">
              計算する手数:
              <input
                id="ai-moves-count"
                type="range"
                class="form-range flex-grow-1"
                min="1"
                max="20"
                :value="settings.aiSettings.movesCount"
                @input="updateAISetting('movesCount', $event)"
              />
              <output for="ai-moves-count" class="badge bg-secondary">
                {{ settings.aiSettings.movesCount }}
              </output>
            </label>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, onMounted, ref, computed,
} from 'vue';
import { useStore } from 'vuex';
import type { API as NoUiSliderAPI } from 'nouislider';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import '@/types/bootstrap';

interface BoardSettings {
  width: number;
  height: number;
  nextCount: number;
  blockRange: {
    min: number;
    max: number;
  };
  MINO_MODE: string;
}

interface AISettings {
  searchTime: number;
  movesCount: number;
  weightsName: string;
}

interface Settings {
  boardSettings: BoardSettings;
  aiSettings: AISettings;
}

export default defineComponent({
  name: 'SettingsModal',
  setup() {
    const store = useStore();
    const blockRangeSlider = ref<NoUiSliderAPI | null>(null);
    const settings = computed(() => store.state.settings as Settings);

    const updateBoardSetting = (key: keyof BoardSettings, event: Event) => {
      const target = event.target as HTMLInputElement;
      const value = key === 'MINO_MODE' ? target.value : Number(target.value);
      store.commit('updateBoardSetting', { key, value });
    };

    const updateAISetting = (key: keyof AISettings, event: Event) => {
      const target = event.target as HTMLInputElement;
      const value = key === 'weightsName' ? target.value : Number(target.value);
      store.commit('updateAISetting', { key, value });
    };

    const closeModal = () => {
      const modalElement = document.getElementById('settings-modal');
      if (modalElement && window.bootstrap?.Modal) {
        const modal = window.bootstrap.Modal.getInstance(modalElement);
        modal?.hide();
      }
    };

    onMounted(() => {
      const blockRangeElement = document.getElementById('board-block-range');
      if (blockRangeElement) {
        blockRangeSlider.value = noUiSlider.create(blockRangeElement, {
          start: [
            settings.value.boardSettings.blockRange.min,
            settings.value.boardSettings.blockRange.max,
          ],
          connect: true,
          range: {
            min: 1,
            max: 5,
          },
          step: 1,
        });

        blockRangeSlider.value.on('update', (values: (string | number)[]) => {
          store.commit('updateBoardSetting', {
            key: 'blockRange',
            value: {
              min: Number(values[0]),
              max: Number(values[1]),
            },
          });
        });
      }
    });

    return {
      settings,
      updateBoardSetting,
      updateAISetting,
      closeModal,
    };
  },
});
</script>

<style scoped>
.modal {
  z-index: 1050;
}
</style>
