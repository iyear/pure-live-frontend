// import third-party modules
import Vue from 'vue'
import axios from "axios";
import {
    Dialog,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    MenuItem,
    MenuItemGroup,
    Input,
    Switch,
    Select,
    Option,
    OptionGroup,
    Button,
    ButtonGroup,
    Table,
    TableColumn,
    Tooltip,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Icon,
    Row,
    Col,
    Spinner,
    Card,
    Steps,
    Step,
    Container,
    Header,
    Aside,
    Main,
    Footer,
    Link,
    Divider,
    Image,
    Calendar,
    PageHeader,
    Loading,
    MessageBox,
    Message,
    Notification
} from 'element-ui';
import 'normalize.css/normalize.css';
// import local modules
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.use(Dialog);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Tooltip);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Spinner);
Vue.use(Card);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Link);
Vue.use(Divider);
Vue.use(Image);
Vue.use(Calendar);
Vue.use(PageHeader);

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
