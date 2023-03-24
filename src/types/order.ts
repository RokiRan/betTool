type OrderType = 'ipc' | 'ws';
type PlatformType = 'IPC' | 'mac' | 'linux';
interface BaseOrder {
  id: string;
  type: OrderType;
  origin: PlatformType;
  destination: PlatformType;
  needReplay: boolean;
}
interface IpcOrder extends BaseOrder {
  type: 'ipc';
}
export { BaseOrder, IpcOrder, OrderType };

// IPC 事件枚举
enum IpcEventEnum {
  // 事件名称
  EVENT_FROM_RENDERER_NEED_REPLAY = 'event_from_renderer_need_replay',
  EVENT_FROM_MAIN_REPLAY = 'event_from_main_replay',
}
export { IpcEventEnum };
