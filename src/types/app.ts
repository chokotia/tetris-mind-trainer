import { APP_MODE } from '../utils/app';

export type AppModeType = typeof APP_MODE[keyof typeof APP_MODE];

export default AppModeType;
