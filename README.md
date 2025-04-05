# tetris-mind-trainer

脳内テトリスのトレーニングツール。AIが考えた手を再現することで、脳内テトリスのスキルを向上させます。

## 概要

このアプリケーションは、テトリスプレイヤーが「脳内テトリス」（頭の中でテトリスを想像してプレイする能力）を向上させるためのトレーニングツールです。

主な機能：
- 盤面を指定し、AIに最適な手を読んでもらう
- AIが考えた手順を頭の中で再現する練習

このトレーニングを積むことで、脳内テトリスの自由度が向上し、invisibleモード（見えない状態でのプレイ）でより多様な配置ができるようになります。

脳内だけでテトリスをプレイしていると配置パターンに偏りが生じがちですが、AIの多様な手を参考にすることで、より柔軟な思考とイメージングスキルを養うことができます。

## デモサイト

以下のURLで実際に動作確認ができます：
[https://chokotia.github.io/tetris-mind-trainer/](https://chokotia.github.io/tetris-mind-trainer/)

## 開発環境のセットアップ

```
npm install
```

### 開発サーバーの起動（ホットリロード対応）
```
npm run serve
```

### プロダクションビルド
```
npm run build
```

### Lint実行
```
npm run lint
```

## 技術スタック

- Vue.js
- TypeScript
- PWA対応

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
