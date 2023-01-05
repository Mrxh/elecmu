import {
    Button,
    Table,
    Input,
    Row,
    Col,
    Modal,
    ConfigProvider,
    Spin,
    message,
    Layout,
    ButtonGroup,
    InputSearch,
    Popover,
    Menu,
    SubMenu,
    MenuItem,
    MenuItemGroup,
    Carousel,
    Progress,
    Tag
} from 'ant-design-vue';

export default function( app ){
    app.use(Input);
    app.use(Button);
    app.use(Table);
    app.use(Row);
    app.use(Col);
    app.use(Modal);
    app.use(ConfigProvider);
    app.use(Spin);
    app.use(Layout);
    app.use(ButtonGroup);
    app.use(InputSearch);
    app.use(Popover);
    app.use(Menu);
    app.use(SubMenu);
    app.use(MenuItem);
    app.use(MenuItemGroup);
    app.use(Carousel);
    app.use(Progress);
    app.use(Tag);
    app.config.globalProperties.$message = message;
}

