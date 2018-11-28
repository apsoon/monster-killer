// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

// const DataBus = require("DataBus");
import DataBus from "../DataBus.js";
let dataBus = DataBus.instance;;

cc.Class({
    extends: cc.Component,

    properties: {
        // 血量
        health: 0,
        // 速度
        speed: 0,
        // 朝向
        // moveDirection: "DOWN",

        // missileDirection: "DOWN",

        // onFire: false,

        // onMove: false,
        // 子弹资源
        missilePrefab: {
            default: null,
            type: cc.Prefab
        }
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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        let that = this;
        that.minPosY = - that.node.parent.width / 2;
        that.maxPosY = that.node.parent.width / 2;
        that.minPosX = - that.node.parent.height / 2;
        that.maxPosX = that.node.parent.height / 2;
    },

    // 射击动作
    shotAction: function (orientation) {
        let that = this;
        console.info(" palyer.shot ");
        let x = this.node.x,
            y = this.node.y,
            missle = cc.instantiate(this.missilePrefab);

        console.info(this.node.x);
    },
    /**
     * 
     * @param {*} direction 
     * @param {*} status 
     */
    moveAction: function (direction, status) {
        // console.info(" [ Player.js ] ================ moveAction >>>>> direction = ", direction, ", status = ", status);
        console.info(" [ Player.js ] ================ moveAction >>>>>  DataBase.data = ", dataBus.data123);
        // console.info(" [ Player.js ] ================ moveAction >>>>>  DataBase.object = ", dataBus);
        let that = this;
        // 移动状态
        if (status == "START") {
            that.onMove = true;
        } else {
            that.onMove = false;
        }
        // 移动方向
        that.moveDirection = direction;
    },

    start() {

    },

    update(dt) {
        let that = this;
        if (that.onMove) {
            // console.info(" [ Player.js ] =============== update >>>>> x before = ", that.node.x, ", y before = ", that.node.y);
            switch (that.moveDirection) {
                case "UP":
                    // console.info(" [ Player.js ] =============== update >>>>> x before = ", that.node.x, ", y before = ", that.node.y);
                    that.node.y += that.speed * dt;
                    if (that.node.y > that.maxPosY) that.node.y = that.maxPosY;
                    break;
                case "DOWN":
                    that.node.y -= that.speed * dt;
                    if (that.node.y < that.minPosY) that.node.y = that.minPosY;
                    break;
                case "LEFT":
                    that.node.x -= that.speed * dt;
                    if (that.node.x < that.minPosX) that.node.x = that.minPosX;
                    break;
                case "RIGHT":
                    that.node.x += that.speed * dt;
                    if (that.node.x > that.maxPosX) that.node.x = that.maxPosX;
                    break;
                default: break;
            }
            // console.info(" [ Player.js ] =============== update >>>>> x after = ", that.node.x, ", y after = ", that.node.y);
        }
    },
});
