export default class UserInfo {
    constructor({ userName, userInfo, userAvatar }) {
        this._userName = userName;
        this._userInfo = userInfo;
        this._userAvatar = userAvatar;
        this._userID = 0;
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

    getUserID() {
        return this._userID;
    }

    setUserID(id) {
        this._userID = id;
    }

    getUserAvatar() {
        return this._userAvatar.src;
    }

    setUserAvatar(link) {
        this._userAvatar.src = link;
    }

}