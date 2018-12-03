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
    routes: [
      // Member
      { path: '/', redirect: '/data-list' },
      {
        path:'/data-list',
        name:'datalist',
        icon:'dashboard',
        component:'./Data/DataCenter'
      },
      {
        path:'/member',
        name:'member',
        icon:'table',
        routes:[
          {
            path:'/member/member-list',
            name:'memberlist',
            component:'./Member/MemberList/MemberList',
          },
          {
            path:'/member/potential',
            name:'potential',
            component:'./Member/Potential/Potential'
          },
          {
            path:'/member/member-list/detail',
            component:'./Member/MemberList/MemberDetail',
            routes:[
              {
                path: '/member/member-list/detail',
                redirect: '/member/member-list/detail/sign',
              },
              {
                path:'/member/member-list/detail/leave',
                component:'./Member/MemberList/LeaveList',
              },
              {
                path:'/member/member-list/detail/consume',
                component:'./Member/MemberList/ConsumeList',
              },
              {
                path:'/member/member-list/detail/sign',
                component:'./Member/MemberList/SignList',
              },
              {
                path:'/member/member-list/detail/elimination',
                component:'./Member/MemberList/EliminationList',
              },
              {
                path:'/member/member-list/detail/private',
                component:'./Member/MemberList/PrivateList',
              },
              {
                path:'/member/member-list/detail/recharge',
                component:'./Member/MemberList/RechargeList',
              },
            ]
          },
        ]
      },
      {
        path:'/member-sign',
        name:'memberSignIn',
        icon:'usergroup-add',
        component:'./MemberSignIn/MemberSignIn'
      },
      {
        path:'/eliminate-list',
        name:'eliminatelist',
        icon:'profile',
        component:'./Eliminate/EliminateList'
      },
      {
        path:'order-list',
        name:'orderlist',
        icon:'form',
        component:'./Order/OrderList'
      },
      {
        path:'/achievement-list',
        name:'achievementlist',
        icon:'warning',
        component:'./Achievement/AchievementList'
      },
      {
        path:'/finance-list',
        name:'financelist',
        icon:'table',
        component:'./Finance/FinanceList'
      },
      {
        path:'/configure-list',
        name:'configurelist',
        icon:'user',
        component:'./Configure/ConfigureList'
      },
      {
        component: '404',
      },
    ],
  },
];
