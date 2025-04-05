import { MINO, QUEUE_GEN_MODE } from './tetrisDef';

type MinoType = typeof MINO[keyof typeof MINO];
type QueueGenMode = typeof QUEUE_GEN_MODE[keyof typeof QUEUE_GEN_MODE];

/**
 * 完全ランダムなネクストキューを生成する
 * @param count 生成するミノの数
 * @returns ランダムなミノの配列
 */
export function generateRandomQueue(count: number): MinoType[] {
  const minoTypes = Object.values(MINO);
  const queue: MinoType[] = [];

  for (let i = 0; i < count; i += 1) {
    const randomIndex = Math.floor(Math.random() * minoTypes.length);
    queue.push(minoTypes[randomIndex] as MinoType);
  }

  return queue;
}

/**
 * 7種一巡（純粋な7バッグ）のネクストキューを生成する
 * @param count 生成するミノの数
 * @returns 7種一巡のミノの配列
 */
export function generateSevenBagPureQueue(count: number): MinoType[] {
  const minoTypes = Object.values(MINO);
  const queue: MinoType[] = [];

  let remainingCount = count;
  while (remainingCount > 0) {
    // 7種のミノをシャッフルする
    const bag = [...minoTypes].sort(() => Math.random() - 0.5);

    // カウント分だけキューに追加
    const addCount = Math.min(remainingCount, bag.length);
    for (let i = 0; i < addCount; i += 1) {
      queue.push(bag[i] as MinoType);
    }

    remainingCount -= addCount;
  }

  return queue;
}

/**
 * 7種一巡のランダムスタート（7バッグランダム）のネクストキューを生成する
 * @param count 生成するミノの数
 * @returns 7種一巡ランダムスタートのミノの配列
 */
export function generateSevenBagRandomQueue(count: number): MinoType[] {
  const minoTypes = Object.values(MINO);
  const queue: MinoType[] = [];

  // 最初のバッグを作成してシャッフル
  let bag = [...minoTypes].sort(() => Math.random() - 0.5);

  // ランダムな数のミノを最初のバッグから消費したとする
  const consumedCount = Math.floor(Math.random() * bag.length);
  bag = bag.slice(consumedCount);

  // カウント分だけキューに追加
  let remainingCount = count;

  // 最初の部分的なバッグを処理
  if (bag.length > 0 && remainingCount > 0) {
    const addCount = Math.min(remainingCount, bag.length);
    for (let i = 0; i < addCount; i += 1) {
      queue.push(bag[i] as MinoType);
    }
    remainingCount -= addCount;
  }

  // 残りのミノを7種一巡で生成
  while (remainingCount > 0) {
    bag = [...minoTypes].sort(() => Math.random() - 0.5);
    const addCount = Math.min(remainingCount, bag.length);
    for (let i = 0; i < addCount; i += 1) {
      queue.push(bag[i] as MinoType);
    }
    remainingCount -= addCount;
  }

  return queue;
}

/**
 * 指定されたモードに基づいてネクストキューを生成する
 * @param mode キュー生成モード
 * @param count 生成するミノの数
 * @returns 生成されたミノの配列
 */
export function generateQueue(mode: QueueGenMode, count: number): MinoType[] {
  switch (mode) {
    case QUEUE_GEN_MODE.RANDOM:
      return generateRandomQueue(count);
    case QUEUE_GEN_MODE.SEVEN_BAG_PURE:
      return generateSevenBagPureQueue(count);
    case QUEUE_GEN_MODE.SEVEN_BAG_RANDOM:
      return generateSevenBagRandomQueue(count);
    default:
      // デフォルトは完全ランダム
      return generateRandomQueue(count);
  }
}
