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
      { path: '/', redirect: '/data-list' },
      {
        path:'/data-list',
        name:'datalist',
        icon:'',
        component:'./Data/DataCenter'
      },
      {
        path:'/member-list',
        name:'memberlist',
        icon:'',
        component:'./Member/MemberList',
      },
      {
        path:'/member-list/detail',
        component:'./Member/MemberDetail',
        routes:[
          {
            path: '/member-list/detail',
            redirect: '/member-list/detail/stamina',
          },
          {
            path:'/member-list/detail/stamina',
            component:'./Member/StaminaList',
          },
          {
            path:'/member-list/detail/heart',
            component:'./Member/HeartList',
          },
          {
            path:'/member-list/detail/sign',
            component:'./Member/SignList',
          },
          {
            path:'/member-list/detail/elimination',
            component:'./Member/EliminationList',
          },
          {
            path:'/member-list/detail/private',
            component:'./Member/PrivateList',
          },
          {
            path:'/member-list/detail/ship',
            component:'./Member/ShipList',
          },
        ]
      },
      {
        path:'/member-sign',
        name:'memberSignIn',
        icon:'',
        component:'./MemberSignIn/MemberSignIn'
      },
      {
        path:'/eliminate-list',
        name:'eliminatelist',
        icon:'',
        component:'./Eliminate/EliminateList'
      },
      {
        path:'order-list',
        name:'orderlist',
        icon:'',
        component:'./Order/OrderList'
      },
      {
        path:'/achievement-list',
        name:'achievementlist',
        icon:'',
        component:'./Achievement/AchievementList'
      },
      {
        path:'/finance-list',
        name:'financelist',
        icon:'',
        component:'./Finance/FinanceList'
      },
      {
        path:'/configure-list',
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
