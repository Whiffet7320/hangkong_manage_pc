import axios from 'axios';
import Vue from 'vue'
import router from '../router.js';
import urls from './url.js';
const vue = new Vue()
axios.defaults.headers['Content-Type'] = "application/json;charset=UTF-8";
let myPost = axios.create({
    baseURL: urls.baseUrl,
    method: 'post',
})
let myGet = axios.create({
    baseURL: urls.baseUrl,
    method: 'get',
})
let myDelete = axios.create({
    baseURL: urls.baseUrl,
    method: 'delete',
})
let myPut = axios.create({
    baseURL: urls.baseUrl,
    method: 'put',
})

myPut.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            'token': sessionStorage.getItem("token"),
            // 'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})
myDelete.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            'token': sessionStorage.getItem("token"),
            // 'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
            // 'Access-Control-Allow-Origin': '*',
            // "access-control-allow-credentials": "true"
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})
myPost.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            'token': sessionStorage.getItem("token"),
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})

myGet.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            'token': sessionStorage.getItem("token"),
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})
myPost.interceptors.response.use(response => {
    // console.log(response)
    if (response.status === 200) {
        return response.data
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //错误跳转
    console.log(error)
    if (error.response.status === 500) {
        console.log(vue)
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({
            path: "/"
        })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('页面不存在', '404错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('请求次数限制', '402错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    }
})
myGet.interceptors.response.use(response => {
    if (response.status === 200) {
        return response.data
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //错误跳转
    console.log(error);
    if (error.response.status === 500) {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({
            path: "/"
        })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('页面不存在', '404错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('请求次数限制', '402错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    }
})
myPut.interceptors.response.use(response => {
    // console.log(response)
    if (response.status === 200) {
        return response.data
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //错误跳转
    console.log(error)
    if (error.response.status === 500) {
        console.log(vue)
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({
            path: "/"
        })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('页面不存在', '404错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('请求次数限制', '402错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    }
})
myDelete.interceptors.response.use(response => {
    // console.log(response)
    if (response.status === 200) {
        return response.data
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //错误跳转
    console.log(error)
    if (error.response.status === 500) {
        console.log(vue)
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({
            path: "/"
        })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('页面不存在', '404错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('请求次数限制', '402错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    }
})

export default {
    login(obj) {
        return myPost({
            url: urls.login,
            data: {
                ...obj
            }
        })
    },
    user_list(obj) {
        return myPost({
            url: urls.user_list,
            data: {
                ...obj
            }
        })
    },
    userpost_list(obj) {
        return myPost({
            url: urls.userpost_list,
            data: {
                ...obj
            }
        })
    },
    add_userpost(obj) {
        return myPost({
            url: urls.add_userpost,
            data: {
                ...obj
            }
        })
    },
    add_users(obj) {
        return myPost({
            url: urls.add_users,
            data: {
                ...obj
            }
        })
    },
    user_menu(obj) {
        return myPost({
            url: urls.user_menu,
            data: {
                ...obj
            }
        })
    },
    update_users(obj) {
        return myPost({
            url: urls.update_users,
            data: {
                ...obj
            }
        })
    },
    del_users(obj) {
        return myPost({
            url: urls.del_users,
            data: {
                ...obj
            }
        })
    },
    add_usergroups(obj) {
        return myPost({
            url: urls.add_usergroups,
            data: {
                ...obj
            }
        })
    },
    usergroups_list(obj) {
        return myPost({
            url: urls.usergroups_list,
            data: {
                ...obj
            }
        })
    },
    update_usergroups(obj) {
        return myPost({
            url: urls.update_usergroups,
            data: {
                ...obj
            }
        })
    },
    del_usergroups(obj) {
        return myPost({
            url: urls.del_usergroups,
            data: {
                ...obj
            }
        })
    },
    del_userpost(obj) {
        return myPost({
            url: urls.del_userpost,
            data: {
                ...obj
            }
        })
    },
    update_userpost(obj) {
        return myPost({
            url: urls.update_userpost,
            data: {
                ...obj
            }
        })
    },
    set_userstatus(obj) {
        return myPost({
            url: urls.set_userstatus,
            data: {
                ...obj
            }
        })
    },
    customer_attributecode(obj) {
        return myPost({
            url: urls.customer_attributecode,
            data: {
                ...obj
            }
        })
    },
    customer_type(obj) {
        return myPost({
            url: urls.customer_type,
            data: {
                ...obj
            }
        })
    },
    customer_list(obj) {
        return myPost({
            url: urls.customer_list,
            data: {
                ...obj
            }
        })
    },
    create_costtypes(obj) {
        return myPost({
            url: urls.create_costtypes,
            data: {
                ...obj
            }
        })
    },
    create_currency(obj) {
        return myPost({
            url: urls.create_currency,
            data: {
                ...obj
            }
        })
    },
    currency_list(obj) {
        return myPost({
            url: urls.currency_list,
            data: {
                ...obj
            }
        })
    },
    update_currency(obj) {
        return myPost({
            url: urls.update_currency,
            data: {
                ...obj
            }
        })
    },
    del_currency(obj) {
        return myPost({
            url: urls.del_currency,
            data: {
                ...obj
            }
        })
    },
    list_costtypes(obj) {
        return myPost({
            url: urls.list_costtypes,
            data: {
                ...obj
            }
        })
    },
    update_costtypes(obj) {
        return myPost({
            url: urls.update_costtypes,
            data: {
                ...obj
            }
        })
    },
    del_costtypes(obj) {
        return myPost({
            url: urls.del_costtypes,
            data: {
                ...obj
            }
        })
    },
    create_exchangerate(obj) {
        return myPost({
            url: urls.create_exchangerate,
            data: {
                ...obj
            }
        })
    },
    exchangerate_list(obj) {
        return myPost({
            url: urls.exchangerate_list,
            data: {
                ...obj
            }
        })
    },
    update_exchangerate(obj) {
        return myPost({
            url: urls.update_exchangerate,
            data: {
                ...obj
            }
        })
    },
    del_exchangerate(obj) {
        return myPost({
            url: urls.del_exchangerate,
            data: {
                ...obj
            }
        })
    },
    create_flight(obj) {
        return myPost({
            url: urls.create_flight,
            data: {
                ...obj
            }
        })
    },
    flight_list(obj) {
        return myPost({
            url: urls.flight_list,
            data: {
                ...obj
            }
        })
    },
    update_goods(obj) {
        return myPost({
            url: urls.update_goods,
            data: {
                ...obj
            }
        })
    },
    create_goods(obj) {
        return myPost({
            url: urls.create_goods,
            data: {
                ...obj
            }
        })
    },
    goods_list(obj) {
        return myPost({
            url: urls.goods_list,
            data: {
                ...obj
            }
        })
    },
    del_goods(obj) {
        return myPost({
            url: urls.del_goods,
            data: {
                ...obj
            }
        })
    },
    create_country(obj) {
        return myPost({
            url: urls.create_country,
            data: {
                ...obj
            }
        })
    },
    update_country(obj) {
        return myPost({
            url: urls.update_country,
            data: {
                ...obj
            }
        })
    },
    del_country(obj) {
        return myPost({
            url: urls.del_country,
            data: {
                ...obj
            }
        })
    },
    country_list(obj) {
        return myPost({
            url: urls.country_list,
            data: {
                ...obj
            }
        })
    },
    create_customer(obj) {
        return myPost({
            url: urls.create_customer,
            data: {
                ...obj
            }
        })
    },
    update_customer(obj) {
        return myPost({
            url: urls.update_customer,
            data: {
                ...obj
            }
        })
    },
    set_customerstatus(obj) {
        return myPost({
            url: urls.set_customerstatus,
            data: {
                ...obj
            }
        })
    },
    del_customer(obj) {
        return myPost({
            url: urls.del_customer,
            data: {
                ...obj
            }
        })
    },
    create_airport(obj) {
        return myPost({
            url: urls.create_airport,
            data: {
                ...obj
            }
        })
    },
    list_airport(obj) {
        return myPost({
            url: urls.list_airport,
            data: {
                ...obj
            }
        })
    },
    update_airport(obj) {
        return myPost({
            url: urls.update_airport,
            data: {
                ...obj
            }
        })
    },
    del_airport(obj) {
        return myPost({
            url: urls.del_airport,
            data: {
                ...obj
            }
        })
    },
    create_airroute(obj) {
        return myPost({
            url: urls.create_airroute,
            data: {
                ...obj
            }
        })
    },
    airroute_list(obj) {
        return myPost({
            url: urls.airroute_list,
            data: {
                ...obj
            }
        })
    },
    update_airroute(obj) {
        return myPost({
            url: urls.update_airroute,
            data: {
                ...obj
            }
        })
    },
    del_airroute(obj) {
        return myPost({
            url: urls.del_airroute,
            data: {
                ...obj
            }
        })
    },
    create_companybank(obj) {
        return myPost({
            url: urls.create_companybank,
            data: {
                ...obj
            }
        })
    },
    list_companybank(obj) {
        return myPost({
            url: urls.list_companybank,
            data: {
                ...obj
            }
        })
    },
    update_companybank(obj) {
        return myPost({
            url: urls.update_companybank,
            data: {
                ...obj
            }
        })
    },
    del_companybank(obj) {
        return myPost({
            url: urls.del_companybank,
            data: {
                ...obj
            }
        })
    },
    update_companyinfo(obj) {
        return myPost({
            url: urls.update_companyinfo,
            data: {
                ...obj
            }
        })
    },
    companyinfo(obj) {
        return myPost({
            url: urls.companyinfo,
            data: {
                ...obj
            }
        })
    },
    sensitivegoods_list(obj) {
        return myPost({
            url: urls.sensitivegoods_list,
            data: {
                ...obj
            }
        })
    },
    create_sensitivegoods(obj) {
        return myPost({
            url: urls.create_sensitivegoods,
            data: {
                ...obj
            }
        })
    },
    del_sensitivegoods(obj) {
        return myPost({
            url: urls.del_sensitivegoods,
            data: {
                ...obj
            }
        })
    },
    update_flight(obj) {
        return myPost({
            url: urls.update_flight,
            data: {
                ...obj
            }
        })
    },
    del_flight(obj) {
        return myPost({
            url: urls.del_flight,
            data: {
                ...obj
            }
        })
    },
    set_receivingbulkcargostatus(obj) {
        return myPost({
            url: urls.set_receivingbulkcargostatus,
            data: {
                ...obj
            }
        })
    },
    set_receivetraystatus(obj) {
        return myPost({
            url: urls.set_receivetraystatus,
            data: {
                ...obj
            }
        })
    },
    create_taxrate(obj) {
        return myPost({
            url: urls.create_taxrate,
            data: {
                ...obj
            }
        })
    },
    taxrate_list(obj) {
        return myPost({
            url: urls.taxrate_list,
            data: {
                ...obj
            }
        })
    },
    update_taxrate(obj) {
        return myPost({
            url: urls.update_taxrate,
            data: {
                ...obj
            }
        })
    },
    del_taxrate(obj) {
        return myPost({
            url: urls.del_taxrate,
            data: {
                ...obj
            }
        })
    },
    workno_list(obj) {
        return myPost({
            url: urls.workno_list,
            data: {
                ...obj
            }
        })
    },
    update_workno(obj) {
        return myPost({
            url: urls.update_workno,
            data: {
                ...obj
            }
        })
    },
    del_workno(obj) {
        return myPost({
            url: urls.del_workno,
            data: {
                ...obj
            }
        })
    },
    create_workno(obj) {
        return myPost({
            url: urls.create_workno,
            data: {
                ...obj
            }
        })
    },
    create_userorderidentifier(obj) {
        return myPost({
            url: urls.create_userorderidentifier,
            data: {
                ...obj
            }
        })
    },
    create_userorder(obj) {
        return myPost({
            url: urls.create_userorder,
            data: {
                ...obj
            }
        })
    },
    update_userorder(obj) {
        return myPost({
            url: urls.update_userorder,
            data: {
                ...obj
            }
        })
    },
    read_userinfo(obj) {
        return myPost({
            url: urls.read_userinfo,
            data: {
                ...obj
            }
        })
    },
    view_userorder(obj) {
        return myPost({
            url: urls.view_userorder,
            data: {
                ...obj
            }
        })
    },
    package(obj) {
        return myPost({
            url: urls.package,
            data: {
                ...obj
            }
        })
    },
    delivery_method(obj) {
        return myPost({
            url: urls.delivery_method,
            data: {
                ...obj
            }
        })
    },
    customs_method(obj) {
        return myPost({
            url: urls.customs_method,
            data: {
                ...obj
            }
        })
    },
    business_type(obj) {
        return myPost({
            url: urls.business_type,
            data: {
                ...obj
            }
        })
    },
    check_orderprimaryno(obj) {
        return myPost({
            url: urls.check_orderprimaryno,
            data: {
                ...obj
            }
        })
    },
    product_type(obj) {
        return myPost({
            url: urls.product_type,
            data: {
                ...obj
            }
        })
    },
    user_signature(obj) {
        return myPost({
            url: urls.user_signature,
            data: {
                ...obj
            }
        })
    },
    operate_procedure(obj) {
        return myPost({
            url: urls.operate_procedure,
            data: {
                ...obj
            }
        })
    },
    price_confirmationview(obj) {
        return myPost({
            url: urls.price_confirmationview,
            data: {
                ...obj
            }
        })
    },
    price_confirmation(obj) {
        return myPost({
            url: urls.price_confirmation,
            data: {
                ...obj
            }
        })
    },
    takeoff_confirmationview(obj) {
        return myPost({
            url: urls.takeoff_confirmationview,
            data: {
                ...obj
            }
        })
    },
    takeoff_confirmation(obj) {
        return myPost({
            url: urls.takeoff_confirmation,
            data: {
                ...obj
            }
        })
    },
    transshipment_confirmationview(obj) {
        return myPost({
            url: urls.transshipment_confirmationview,
            data: {
                ...obj
            }
        })
    },
    transshipment_confirmation(obj) {
        return myPost({
            url: urls.transshipment_confirmation,
            data: {
                ...obj
            }
        })
    },
    goods_arrivalconfirmationview(obj) {
        return myPost({
            url: urls.goods_arrivalconfirmationview,
            data: {
                ...obj
            }
        })
    },
    goods_arrivalconfirmation(obj) {
        return myPost({
            url: urls.goods_arrivalconfirmation,
            data: {
                ...obj
            }
        })
    },
    async upload_pic(image) {
        var configs = {
            headers: {
                "Content-Type": "multipart/form-data;charse=UTF-8",
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
            },
        };
        const res = await axios
            .post(`${urls.baseUrl}/admin/upload_pic`, image, configs)
        return res.data
    },
    async upload_banner(image) {
        var configs = {
            headers: {
                "Content-Type": "multipart/form-data;charse=UTF-8",
                'token': sessionStorage.getItem("token"),
            },
        };
        const res = await axios
            .post(`${urls.baseUrl}/admin/upload_banner`, image, configs)
        return res.data
    },
}