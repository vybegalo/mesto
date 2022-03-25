export default class UserInfo {
    constructor({ userName, userInfo }) {
        this._userName = userName;
        this._userInfo = userInfo;
    }

    getUserInfo() {
        return {
            userName: this._userName.textContent,
            userInfo: this._userInfo.textContent
        };
    }

    setUserInfo(userData) {
        this._userName.textContent = userData.userName;
        this._userInfo.textContent = userData.userInfo;
    }

}