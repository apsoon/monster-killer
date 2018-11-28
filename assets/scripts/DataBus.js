// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

let instance = null;

var DataBus = cc.Class({

    extends: cc.Component,

    statics: {

    },

    properties: {

        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        // data123: {
        //     get(){
        //         return this._bar;
        //     }

        // },
    },

    ctor: function () {
        if (instance) return instance;
        let that = this;
        instance = this;
        that.missilePool = new cc.NodePool();
        that.reset();
    },

    reset() {
        let that = this;
        that.data123 = 111;
    },

    removeEnemey: function () {

    },

    /**
     * 删除子弹
     */
    removeMissile: function (missile) {
        let that = this;
        let temp = that.missiles.shift();
        temp.visible = false;
        that.pool.recover('missile', missile);
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    // update (dt) {},
});
