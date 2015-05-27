///<reference path='../typings/tsd.d.ts' />

import request = require('request');
import querystring = require('querystring');
import crypto = require('crypto');

class Wanba{
    //var wanba = {};

    private wanba_api_host:string = 'http://119.147.19.43';//玩吧测试环境
    //var wanba_api_host = wanbaConfig.wanba_api_host || 'http://openapi.tencentyun.com';
    private wanba_api_version:string;

    private wanbaConfig:any = null;

    constructor(config:{}) {
        this.wanbaConfig = config;
        this.wanba_api_version = this.wanbaConfig.wanba_api_version || 'v3';
    }

    private rawStr(obj) {
        var keys = Object.keys(obj);
        keys = keys.sort()
        var newObj = {};
        keys.forEach(function (key) {
            //if(obj[key]){
            newObj[key.toLowerCase()] = obj[key];
            //}
        });

        var string = '';
        for (var k in newObj) {
            string += '&' + k + '=' + newObj[k];
        }
        string = string.substr(1);
        return string;
    }

    public getSignStr(method:string, uri:string, args:any) {
        var str = method + '&' + encodeURIComponent(uri) + '&' + encodeURIComponent(this.rawStr(args));
        console.log(str);
        var key = this.wanbaConfig.appkey + '&';
        var sign = crypto.createHmac('sha1', key).update(str).digest().toString('base64');
        return sign;
    }

    public getUserInfo(options, callback) {

        var args:any = {
            openid: options.openid,
            openkey: options.openkey,
            appid: this.wanbaConfig.appid,
            pf: "wanba_ts",
            format: 'json',
            userip: options.userip || '0.0.0.0'
        }

        var uri = '/' + this.wanba_api_version + '/user/get_info';
        args.sig = this.getSignStr('GET', uri, args);
        var queryurl = this.wanba_api_host + uri + '?' + querystring.stringify(args);
        console.log(queryurl);
        request.get(queryurl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                callback(null, JSON.parse(body)); // Show the HTML for the Google homepage.
            } else {
                callback(error);
            }
        })
    }


    public getUserMutiInfo(options, callback) {
        var args:any = {
            openid: options.openid,
            openkey: options.openkey,
            appid: this.wanbaConfig.appid,
            pf: "wanba_ts",
            format: 'json',
            userip: options.userip || '0.0.0.0',
            fopenids: ''
        }

        for (var i in options.fopenids) {
            args.fopenids += '_' + options.fopenids[i];
        }
        args.fopenids.substr(1);

        var uri = '/' + this.wanba_api_version + '/user/get_multi_info';
        args.sig = this.getSignStr('GET', uri, args);
        var queryurl = this.wanba_api_host + uri + '?' + querystring.stringify(args);
        console.log(queryurl);
        request.get(queryurl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                callback(null, JSON.parse(body)); // Show the HTML for the Google homepage.
            } else {
                callback(error);
            }
        })
    }

    public getUserAppFriends(options, callback) {

        var args:any = {
            openid: options.openid,
            openkey: options.openkey,
            appid: this.wanbaConfig.appid,
            pf: "wanba_ts",
            format: 'json',
            userip: options.userip || '0.0.0.0'
        }

        var uri = '/' + this.wanba_api_version + '/relation/get_app_friends';
        args.sig = this.getSignStr('GET', uri, args);
        var queryurl = this.wanba_api_host + uri + '?' + querystring.stringify(args);
        console.log(queryurl);
        request.get(queryurl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                callback(null, JSON.parse(body)); // Show the HTML for the Google homepage.
            } else {
                callback(error);
            }
        })
    }

    //好友游戏积分上报
    public setUserAchievement(options, callback) {
        var args:any = {
            openid: options.openid,
            openkey: options.openkey,
            appid: this.wanbaConfig.appid,
            pf: "wanba_ts",
            format: 'json',
            userip: options.userip || '0.0.0.0'
        }
        /*JSON.stringify(options.user_attr)*/
        args.user_attr = JSON.stringify(options.user_attr);
        var uri = '/' + this.wanba_api_version + '/user/set_achievement';
        args.sig = this.getSignStr('GET', uri, args);
        var queryurl = this.wanba_api_host + uri + '?' + querystring.stringify(args);
        console.log(queryurl);
        request.get(queryurl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                callback(null, JSON.parse(body)); // Show the HTML for the Google homepage.
            } else {
                callback(error);
            }
        })
    }

    //拉取排行榜
    public getUserGamebarRanklist(options, callback) {
        var args:any = {
            openid: options.openid,
            openkey: options.openkey,
            appid: this.wanbaConfig.appid,
            pf: "wanba_ts",
            format: 'json',
            userip: options.userip || '0.0.0.0',
            rankdim: options.rankdim,
            rank_start: options.rank_start,
            pull_cnt: options.pull_cnt,
            direction: options.direction
        }

        var uri = '/' + this.wanba_api_version + '/user/get_gamebar_ranklist';
        args.sig = this.getSignStr('GET', uri, args);
        var queryurl = this.wanba_api_host + uri + '?' + querystring.stringify(args);
        console.log(queryurl);
        request.get(queryurl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                callback(null, JSON.parse(body)); // Show the HTML for the Google homepage.
            } else {
                callback(error);
            }
        })
    }

    //查询游戏用户信息和达人包月信息
    public getPlayzoneUserinfo(options, callback) {
        var args:any = {
            openid: options.openid,
            openkey: options.openkey,
            appid: this.wanbaConfig.appid,
            pf: "wanba_ts",
            format: 'json',
            zoneid: options.zoneid,
            userip: options.userip || '0.0.0.0'
        }

        var uri = '/' + this.wanba_api_version + '/user/get_playzone_userinfo';
        args.sig = this.getSignStr('GET', uri, args);
        var queryurl = this.wanba_api_host + uri + '?' + querystring.stringify(args);
        console.log(queryurl);
        request.get(queryurl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                callback(null, JSON.parse(body)); // Show the HTML for the Google homepage.
            } else {
                callback(error);
            }
        })
    }

    //发送玩吧消息
    public sendGamebarMsg(options, callback) {
        var args:any = {
            openid: options.openid,
            openkey: options.openkey,
            appid: this.wanbaConfig.appid,
            pf: "wanba_ts",
            format: 'json',
            zoneid: options.zoneid,
            frd: options.frd,//好友openid
            msgtype: options.msgtype,//消息类型，1-pk消息，2-送心消息，3-超越消息
            content: options.content,//超越消息的积分文字，形如“10秒”，“100分”之类
            qua: options.qua,//手机空间版本标识，例如：V1_AND_QZ_4.9.3_148_RDM_T
            userip: options.userip || '0.0.0.0'
        }

        var uri = '/' + this.wanba_api_version + '/user/send_gamebar_msg';
        args.sig = this.getSignStr('GET', uri, args);
        var queryurl = this.wanba_api_host + uri + '?' + querystring.stringify(args);
        console.log(queryurl);
        request.get(queryurl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                callback(null, JSON.parse(body)); // Show the HTML for the Google homepage.
            } else {
                callback(error);
            }
        })
    }

    //玩吧支付接口,积分兑换道具
    //http://wiki.open.qq.com/wiki/v3/user/buy_playzone_item
    public buyPlayzoneItem(options, callback) {
        var args:any = {
            openid: options.openid,
            zoneid: options.zoneid || 1,
            openkey: options.openkey,
            appid: this.wanbaConfig.appid,
            itemid: options.itemid,
            count: options.count || 1,
            pf: "wanba_ts",
            format: 'json',
            userip: options.userip || '0.0.0.0'
        }

        var uri = '/' + this.wanba_api_version + '/user/buy_playzone_item';
        args.sig = this.getSignStr('GET', uri, args);
        var queryurl = this.wanba_api_host + uri + '?' + querystring.stringify(args);
        console.log(queryurl);
        request.get(queryurl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                callback(null, JSON.parse(body)); // Show the HTML for the Google homepage.
            } else {
                callback(error);
            }
        })
    }

    public getUrlMethodMap() {
        return {
            'user_get_info': this.getUserInfo,
            'relation_get_app_friends': this.getUserAppFriends,
            'user_get_multi_info': this.getUserMutiInfo,
            'user_set_achievement': this.setUserAchievement,
            'user_get_gamebar_ranklist': this.getUserGamebarRanklist,
            'user_buy_playzone_item': this.getPlayzoneUserinfo,
            'user_get_playzone_userinfo': this.getPlayzoneUserinfo,
            'user_send_gamebar_msg': this.sendGamebarMsg
        }
    }

    public getMethodByUrl(url:string) {
        return this.getUrlMethodMap()[url];
    }

}


module.exports = Wanba;