export const adminLteConf = {
  skin: 'purple',
  // skin: 'purple', ('blue' | 'black' | 'purple' | 'green' | 'red' | 'yellow'
  // | 'blue-light' | 'black-light' | 'purple-light' | 'green-light' | 'red-light' | 'yellow-light')
  isSidebarLeftCollapsed: true,
  // isSidebarLeftMouseOver: false,
  // isSidebarLeftMini: true,
  // sidebarRightSkin: 'dark', ('dark' | 'light')
  // isSidebarRightCollapsed: true,
  // isSidebarRightOverContent: true,
  // layout: 'normal', ('normal' | 'boxed' | 'fixed')
  layout: 'fixed',
  sidebarLeftMenu: [
    {
      label: '比赛配置', iconClasses: 'glyphicon glyphicon-list-alt', route: '/game-configure'
    },
    {
      label: '比赛历史', iconClasses: 'glyphicon glyphicon-calendar', route: '/game-history'
    },
    {
      label: '商城配置', iconClasses: 'glyphicon glyphicon-gift', route: '/gift-configure'
    },
    {
      label: '兑换记录', iconClasses: 'glyphicon glyphicon-transfer', route: '/gift-history'
    },
    {
      label: '用户反馈', iconClasses: 'glyphicon glyphicon-comment', route: '/admin-comment'
    },
    {
      label: '广告上传', iconClasses: 'glyphicon glyphicon-picture', route: '/ad-configure'
    },
    {
      label: '派彩配置', iconClasses: 'glyphicon glyphicon-tasks', route: '/proportion-configure'
    },
    {
      label: '账户管理', iconClasses: 'glyphicon glyphicon-user', route: '/account-management'
    },
    {
      label: '操作记录', iconClasses: 'glyphicon glyphicon-list-alt', route: '/operation-record'
    },
  ]
};
