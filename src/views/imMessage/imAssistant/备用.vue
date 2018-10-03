<template>
    <!--
    :class="{'hide': !}"

    border: 1px solid rgb(169, 169, 169);

    助理给用户推荐咨询师：102

    发送评价请求：

    104: 助理点击私信去找用户，系统发送一条消息


    articleId: window.location.pathname.split('/')[2],

    !!this.articleId && this.getArticleDetail(`articleId=${this.articleId}`)

    // !!this.drivingUserID && (console.log(this.drivingUserID))
            // // 先判断是否是好友，如果不是直接加为好友
            // let _this = this
            // if (this.friendsIdsList.indexOf(this.drivingUserID) ===  -1) {
            //     nim.addFriend({
            //         account: _this.drivingUserID,
            //         ps: '业务需要直接加为好友',
            //         done: addFriendDone
            //     })
            //
            //
            //     function addFriendDone(error, obj) {
            //         console.log(error);
            //         console.log(obj);
            //         console.log('直接加为好友' + (!error?'成功':'失败'));
            //         if (!error) {
            //             onAddFriend(obj.friend);
            //         }
            //     }
            //
            //     function onAddFriend(friend) {
            //         _this.friends = nim.mergeFriends(_this.friends, friend);
            //
            //         if (_this.friends.length) {
            //             // 获取好友列表账号
            //             _this.friends.forEach((item) => {
            //                 _this.friendsIdsList.push(item.account)
            //             });
            //
            //
            //
            //             //根据账号获取用户组信息
            //             nim.getUsers({
            //                 accounts:  _this.friendsIdsList,
            //                 done: getUsersDone
            //             });
            //         }
            //
            //
            //     }
            //
            //
            //     function getUsersDone(error, users) {
            //         console.log(error);
            //         console.log(users);
            //         // console.log('获取用户资料数组' + (!error?'成功':'失败'));
            //         if (!error) {
            //             onUsersFriends(users);
            //         }
            //     }
            //
            //     function onUsersFriends(users) {
            //         _this.friendsInfoList = nim.mergeUsers(data.users, users);
            //     }
            //
            //
            // }





    -->
</template>