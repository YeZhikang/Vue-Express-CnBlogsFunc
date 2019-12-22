import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import BlogPart from "../components/Index/BlogPart";
import Nav from '@/components/Index/Nav'
import fgdNav from '@/components/Flash_Group_Directory/Nav'
import Sidebar from "../components/Index/Sidebar";
import Net from "../components/Net";
import LogReg from "../components/Login/LogReg";
import Login from "../components/Login/Login";
import Register from "../components/Login/Register";
import person from "../components/person";
import Garden from "../components/userInfo/Garden";
import Active from "../components/userInfo/Active";
import Focus from "../components/userInfo/Focus";
import Follow from "../components/userInfo/Follow";
import News from "../components/userInfo/News";
import NewsRecieved from '../components/userInfo/News-Recieved'
import MyBlog from "../components/Blog/MyBlog";
import Question from "../components/userInfo/Question";
import QustionHolding from "../components/userInfo/QustionHolding";
import newBlogPart from "../components/Index/newBlogPart";
import Report from "../components/userInfo/Report";
import show from "../components/Index/show";
import Post from "../components/userInfo/Post";
import MyBlogMainPart from "../components/Blog/MyBlogMainPart";
import WriteNews from "../components/userInfo/WriteNews";
import WriteBlog from "../components/Blog/WriteBlog";
import BlogShow from "../components/Blog/BlogShow";
import Theme from "../components/Index/Theme";
import Settings from "../components/userInfo/Settings";
import writeQuestion from "../components/userInfo/writeQuestion";
import Questions from "../components/userInfo/Questions";
import Flash_Main from "../components/Flash_Group_Directory/Flash_Main";
import Group_Main from "../components/Flash_Group_Directory/Group_Main";
import GroupMain from "../components/Flash_Group_Directory/GroupMain";
import Group_MyGroup from "../components/Flash_Group_Directory/Group_MyGroup";
import Group_all from "../components/Flash_Group_Directory/Group_all";
import Group_Detail from "../components/Flash_Group_Directory/Group_Detail";
import Group_Set from "../components/Flash_Group_Directory/Group_Set";
import WriteTopic from "../components/Flash_Group_Directory/WriteTopic";
import Topic from "../components/Flash_Group_Directory/Topic";
import Group_Gonggao from "../components/Flash_Group_Directory/Group_Gonggao";
import Group_Topics from "../components/Flash_Group_Directory/Group_Topics";
import Group_Member from "../components/Flash_Group_Directory/Group_Member";
import Group_ChangeInfo from "../components/Flash_Group_Directory/Group_ChangeInfo";
import Directory from "../components/Flash_Group_Directory/Directory";
import Employ from "../components/Flash_Group_Directory/Employ";
import Employ_jobs from "../components/Flash_Group_Directory/Employ_jobs";
import Employ_jd from "../components/Flash_Group_Directory/Employ_jd";
import Employ_HC from "../components/Flash_Group_Directory/Employ_HC";
import Employ_JDP from "../components/Flash_Group_Directory/Employ_JDP";
import HC from "../components/Flash_Group_Directory/Group_HCdetail";
import JD from "../components/Flash_Group_Directory/Group_JDdetail"
import Find from "../components/Flash_Group_Directory/Find";
import newIndex from "../components/Index/newIndex";
import blogIndex from "../components/Blog/blogIndex";
import NotFound from "../components/NotFound";
import UserActiveShow from "../components/Index/UserActiveShow";
import AdminController from "../components/AdminController";
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      redirect: '/newIndex',
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
      path: '/log/blog/:user',
      redirect: '/log/blog/:user/主页',
      children: [
        {
          path: '/log/blog/:user/p/:title',
          component: BlogShow,
          name:'detailBlog'
        },
        {
          path: '/log/blog/:user/主页',
          component: MyBlogMainPart,

        },

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
    }
  ]
}
);
// router.beforeEach(((to, from, next) => {
//   console.log(to);
//   console.log(from);
//   next();
// }));
export default router;
