import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import store from './store';
import { AutoSave } from './utils/autoSave';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import '@/assets/styles/variables.scss';
import '@/assets/styles/mino-colors.scss';

const app = createApp(App);
app.use(store);

// 自動保存機能の初期化（30秒 = 30000ミリ秒ごとに保存）
const autoSave = new AutoSave(store, 30000);

// アプリ起動時にローカルストレージからデータを読み込む
autoSave.loadInitialData();

// 定期的な自動保存を開始
autoSave.startAutoSave();

// unloadイベント（ページ離脱時）の際にもデータを保存
window.addEventListener('beforeunload', () => {
  autoSave.saveAllData();
});

// アプリインスタンスをDOMにマウント
app.mount('#app');
