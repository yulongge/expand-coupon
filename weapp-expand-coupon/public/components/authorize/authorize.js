const app = getApp();

Component({
    properties: {
        authorizeMsg: String,
        authorizeBtn: String
    },
    methods: {
        onUserInfo(res) {
            const {errMsg} = res.detail;
            const isFail = errMsg !== 'getUserInfo:ok';
            if (isFail) return;
            wx.p.closeAuthorize();
            app.onUserinfoGot(res.detail);
        },
    }
})