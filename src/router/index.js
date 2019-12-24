import Vue from 'vue'
import Router from 'vue-router'


const Login = () => import("../components/Login/Login");
const LogReg = () => import("../components/Login/LogReg");
const Sidebar = () => import("../components/Index/Sidebar");
const fgdNav = () => import("@/components/Flash_Group_Directory/Nav");
const Nav = () => import("@/components/Index/Nav");
const BlogPart = () => import("../components/Index/BlogPart");
const HelloWorld = () => import("@/components/HelloWorld");

const Register = () => import("../components/Login/Register");
const person = () => import("../components/person");
const Garden = () => import("../components/userInfo/Garden");
const Active = () => import("../components/userInfo/Active");


const NewsRecieved = () => import("../components/userInfo/News-Recieved");
const News = () => import("../components/userInfo/News");
const Follow = () => import("../components/userInfo/Follow");
const Focus = () => import("../components/userInfo/Focus");

const newBlogPart = () => import("../components/Index/newBlogPart");
const QustionHolding = () => import("../components/userInfo/QustionHolding");
const Question = () => import("../components/userInfo/Question");
const MyBlog = () => import("../components/Blog/MyBlog");


const Report = () => import("../components/userInfo/Report");

const show = () => import("../components/Index/show");

const Post = () => import("../components/userInfo/Post");

const MyBlogMainPart = () => import("../components/Blog/MyBlogMainPart");

const Questions = () => import("../components/userInfo/Questions");
const writeQuestion = () => import("../components/userInfo/writeQuestion");
const Settings = () => import("../components/userInfo/Settings");
const Theme = () => import("../components/Index/Theme");
const BlogShow = () => import("../components/Blog/BlogShow");
const WriteBlog = () => import("../components/Blog/WriteBlog");
const WriteNews = () => import("../components/userInfo/WriteNews");

const Group_all = () => import("../components/Flash_Group_Directory/Group_all");
const Group_MyGroup = () => import("../components/Flash_Group_Directory/Group_MyGroup");
const GroupMain = () => import("../components/Flash_Group_Directory/GroupMain");
const Group_Main = () => import("../components/Flash_Group_Directory/Group_Main");
const Flash_Main = () => import("../components/Flash_Group_Directory/Flash_Main");


const Group_Detail = () => import("../components/Flash_Group_Directory/Group_Detail");

const Group_Set = () => import("../components/Flash_Group_Directory/Group_Set");

const WriteTopic = () => import("../components/Flash_Group_Directory/WriteTopic");

const Topic = () => import("../components/Flash_Group_Directory/Topic");

const Group_Gonggao = () => import("../components/Flash_Group_Directory/Group_Gonggao");

const Group_Topics = () => import("../components/Flash_Group_Directory/Group_Topics");

const Group_Member = () => import("../components/Flash_Group_Directory/Group_Member");

const Group_ChangeInfo = () => import("../components/Flash_Group_Directory/Group_ChangeInfo");

const Directory = () => import("../components/Flash_Group_Directory/Directory");

const Employ = () => import("../components/Flash_Group_Directory/Employ");
const Employ_jobs = () => import("../components/Flash_Group_Directory/Employ_jobs");
const Employ_jd = () => import("../components/Flash_Group_Directory/Employ_jd");
const Employ_HC = () => import("../components/Flash_Group_Directory/Employ_HC");
const Employ_JDP = () => import("../components/Flash_Group_Directory/Employ_JDP");
const HC = () => import("../components/Flash_Group_Directory/Group_HCdetail");
const JD = () => import("../components/Flash_Group_Directory/Group_JDdetail");
const Find = () => import("../components/Flash_Group_Directory/Find");
const newIndex = () => import("../components/Index/newIndex");
const blogIndex = () => import("../components/Blog/blogIndex");
const NotFound = () => import("../components/NotFound");
const UserActiveShow = () => import("../components/Index/UserActiveShow");
const AdminController = () => import("../components/AdminController");

const MyBlogMainPart2 = () => import("../components/Blog/MyBlogMainPart2");

Vue.use(Router);
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'newIndex',
      component: newIndex,
      beforeRouteUpdate(to, from, next) {
        this.$route.push(0)
      },
      children: [
        {
          path: '/main/:blogpart',
          component: newBlogPart,
        }
      ]
    },
    {
      path:'*',
      component:NotFound
    },
    {
      path: '/main',
      redirect: '/main/精华'
    },
    {
      path:'/newindex',
      component:newIndex
    },
    {
      path: '/report',
      component: Report,
      name: "Report",
      redirect: '/report/main',
      children: [
        {
          path: '/report/main',
          name: 'main',
          component: show
        },
        {
          path: '/report/post',
          name: 'post',
          component: Post
        },
        {
          path: '/report/theme',
          name: 'theme',
          component: Theme
        }
      ]
    },
    {
      path: '/nav',
      name: 'nav',
      component: Nav,
    },
    {
      path: '/sidebar',
      name: 'sidebar',
      component: Sidebar,
    },
    {
      path: '/log',
      name: 'LogReg',
      component: LogReg,
      redirect: {
        name: "Login"
      },
      children: [
        {
          path: '/log/login',
          component: Login,
          name: "Login"
        },
        {
          path: '/log/register',
          component: Register
        }
      ]
    },
    {
      name: 'person',
      path: '/log/user',
      component: person,
      redirect: {
        name: "Garden"
      },
      children: [
        {
          path: '/log/user/garden',
          component: Garden,
          name: "Garden",
          redirect: "/log/user/garden/最新动态",
          children: [
            {
              path: '/log/user/garden/:theme',
              component: Active,
              name: 'Active'
            }
          ]
        },
        {
          path: '/question',
          component: Question,
          name: "Question",
          redirect: '/question/问题列表',
          afterEnter: (to, from, next) => {
          },
          children: [
            {
              path: '/question/:theme',
              component: QustionHolding,
            }
          ]
        },
        {
          path:'/writequestion',
          component:writeQuestion
        },
        {
          path:'/questions/:id',
          component:Questions
        },
        {
          path:'/log/user/settings',
          component:Settings,
          name:"settings"
        },
        {
          path: '/log/user/look',
          name: "Look",
          redirect: "/log/user/garden/最新动态",
        },
        {
          path: '/log/user/news',
          name: "news",
          component: News,
          redirect: "/log/user/news/收件箱",
          children: [{
            path: '/log/user/news/:style',
            component: NewsRecieved
          }, {
            path: '/log/user/write',
            component: WriteNews
          }]
        },

        {
          path: '/log/user/focus',
          component: Focus,
          name: "Focus",
          redirect: "/log/user/focus/我关注的人",
          children: [
            {
              path: '/log/user/focus/:follow',
              component: Follow,
              name: 'Follow'
            }
          ]
        },
        {
          path: '/log/user/fans',
          component: Focus,
          name: "Focus",
          redirect: "/log/user/focus/我的粉丝",
          children: [
            {
              path: '/log/user/focus/:follow',
              component: Follow,
              name: 'Follow'
            }
          ]
        },
      ]
    },

    {
      name: "blogs",
      component: MyBlog,
      path: '/log/blog/:user/',
      children: [
        {
          path: 'p/:title/',
          component: BlogShow,
          name:'detailBlog'
        },
      ],
    },
    {
      name:'userBlogPage',
      component:MyBlogMainPart2,
      path:'/user/:user/',
      children:[
        {
          path:'p',
          component: MyBlogMainPart,
          name:"a1"
        }
      ]
    },
    {
      name: "write",
      component: WriteBlog,
      path: '/write',

    },
    {
      name: 'blog',
      path: '/blog/p/:id'
    },
    {
      name:'FGD',
      path:'/fgd',
      redirect:'/fgd/小组',
      component:fgdNav,
      children:[
        {
          path:'/fgd/小组',
          component:Group_Main,
          name:'小组',
          redirect:'/fgd/小组/最新话题',
          children:[
            {
              path:'/fgd/小组/最新话题',
              component:GroupMain
            },
            {
              path:'/fgd/小组/我的小组',
              component:Group_MyGroup
            },
            {
              path:'/fgd/小组/所有小组',
              component:Group_all,
            },
            {
              path:'/fgd/小组/所有小组/:group',
              component:Group_Detail
            },
            {
              path:'/fgd/小组/创建小组',
              component:Group_Set
            }
          ]
        },
        {
          path:'/fgd/收藏',
          component:Directory,
          name:'收藏'
        },
        {
          path:'/fgd/招聘',
          component:Employ,
          name:'招聘',
          redirect:'/fgd/招聘/职位信息',
          children:[
            {
              component:Employ_jobs,
              path:'/fgd/招聘/职位信息',
              name:'职位信息'
            },
            {
              component:Employ_jd,
              path:'/fgd/招聘/需要职位',
              name:'需要职位'
            },
            {
              component:Employ_HC,
              path:'/fgd/招聘/发布职位',
            },
            {
              component:Employ_JDP,
              path:'/fgd/招聘/我要求职'
            }
          ]
        },
        {
          path:'/fgd/找找看',
          component:Find,
          name:'找找看',
        },
        {
          path:'/fgd/topic/:id',
          component:Topic
        },
        {
          path:'/fgd/group/:id',
          component:Group_Detail,
          redirect:'/fgd/group/:id/小组公告',
          children:[
            {
              path:'/fgd/group/:id/小组公告',
              name:'小组公告',
              component:Group_Gonggao
            },
            {
              path:'/fgd/group/:id/小组话题',
              name:'小组话题',
              component:Group_Topics
            },
            {
              path:'/fgd/group/:id/小组成员',
              name:'小组成员',
              component:Group_Member
            },
            {
              path:'/fgd/group/:id/changeinfo',
              name:'修改信息',
              component:Group_ChangeInfo
            }
          ]
        }

      ]
    },
    {
      path:'/topicwrite',
      component:WriteTopic
    },
    {
      path:'/hc/:id',
      component:HC
    },
    {
      path:'/jd/:id',
      component:JD
    },
    {
      path:'/userChart',
      component:UserActiveShow
    },
    {
      path:'/admin',
      component:AdminController
    },

  ]
}
);
// router.beforeEach(((to, from, next) => {
//   console.log(to);
//   console.log(from);
//   next();
// }));
export default router;
