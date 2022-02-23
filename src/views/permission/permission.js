import Vue from 'vue'

/**权限指令**/
const has = Vue.directive('has', {
    inserted: function (el, binding, vnode) {
        //console.log(binding)
        // 获取页面按钮权限
        if (!Vue.prototype.$_has(binding.arg)) {
            el.parentNode.removeChild(el);
        }
    }
});


// 权限检查方法
Vue.prototype.$_has = function (value) {
    let allow = false;
    // 获取用户按钮权限
    let authUser = JSON.parse(localStorage.getItem("auth-user"))
    //获取角色
    let roles = authUser.roles;
    //无角色不允许访问
    if (roles.length == 0) {
        return false;
    }
    //包含管理员角色不限制
    let isAdmin = authUser.roles.some(function (item, index) {
        return item.name === "admin";
    });

    if (isAdmin) {
        return true;
    }


    for (let i = 0; i < roles.length; i++) {
        let eachRole = roles[i];
        if(eachRole.permissionNames == null){
            return false;
        } else {
            allow = eachRole.permissionNames.some(function (item, index) {
                return item === value;
            });

            if (allow) {
                return true;
            }
        }
    }
    return allow;
};
export { has }