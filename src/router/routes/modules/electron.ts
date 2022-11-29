import type { AppRouteModule } from '/@/router/types';

import { getParentLayout, LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const electron: AppRouteModule = {
  path: '/electron',
  name: 'Electron',
  component: LAYOUT,
  redirect: '/electron/process/ipc',
  meta: {
    orderNo: 1999,
    icon: 'ant-design:share-alt-outlined',
    title: t('routes.electron.RouteName'),
  },
  children: [
    {
      path: 'Process',
      name: 'ElectronProcess',
      component: getParentLayout('ElectronProcess'),
      meta: {
        title: t('routes.electron.Process'),
      },
      redirect: '/electron/process/ipc',
      children: [
        {
          path: 'ipc',
          name: 'ElectronIPC',
          meta: {
            title: t('routes.electron.InterProcessCommunication'),
          },
          component: () => import('/@/views/electron/process/Ipc.vue'),
        },
      ],
    },
  ],
};

export default electron;
