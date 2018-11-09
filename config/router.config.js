export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      // Member
      { path: '/', redirect: '/data/data-center' },
      {
        path:'/data/data-center',
        name:'datalist',
        icon:'',
        component:'./Data/DataCenter'
      },
      {
        path:'/member/member-list',
        name:'memberlist',
        icon:'',
        component:'./Member/MemberList'
      },
      {
        path:'/eliminate/eliminate-list',
        name:'eliminatelist',
        icon:'',
        component:'./Eliminate/EliminateList'
      },
      {
        path:'/achievement/achievement-list',
        name:'achievementlist',
        icon:'',
        component:'./Achievement/AchievementList'
      },
      {
        path:'/finance/finance-list',
        name:'financelist',
        icon:'',
        component:'./Finance/FinanceList'
      },
      {
        path:'/configure/configure-list',
        name:'configurelist',
        icon:'',
        component:'./Configure/ConfigureList'
      },
      {
        component: '404',
      },
    ],
  },
];
