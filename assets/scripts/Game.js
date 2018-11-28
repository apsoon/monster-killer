// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
const Player = require('Player');
const Common = require('Common');

import DataBus from "../DataBus.js";
import { Enums } from "./util/Enums.js";

let dataBus = DataBus.instance;


cc.Class({
    extends: cc.Component,

    properties: {

        player: {
            default: null,
            type: Player
        },
        // 按钮A
        buttonA: {
            default: null,
            type: cc.Button
        },
        // 按钮B
        buttonB: {
            default: null,
            type: cc.Button
        },
        buttonX: {
            default: null,
            type: cc.Button
        },
        buttonY: {
            default: null,
            type: cc.Button
        },
        buttonUp: {
            default: null,
            type: cc.Button
        },
        buttonDown: {
            default: null,
            type: cc.Button
        },
        buttonLeft: {
            default: null,
            type: cc.Button
        },
        buttonRight: {
            default: null,
            type: cc.Button
        },
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
        // 移动
        that.buttonUp.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            console.info(" [ Game.js ] =============== onLoad >>>>> dataBus.data = ", dataBus.data123);
            dataBus.data123 = 111;
            console.info(" [ Game.js ] =============== onLoad >>>>> dataBus.data = ", dataBus.data123);
            that.player.moveAction("UP", "START");
        });
        that.buttonUp.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            that.player.moveAction("UP", "STOP");
        });
        that.buttonDown.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            dataBus.data123 = 222;
            console.info(" [ Game.js ] =============== onLoad >>>>> dataBus.data = ", dataBus.data123);
            that.player.moveAction("DOWN", "START");
        });
        that.buttonDown.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            that.player.moveAction("DOWN", "STOP");
        });
        that.buttonLeft.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            dataBus.data123 = 333;
            console.info(" [ Game.js ] =============== onLoad >>>>> dataBus.data = ", dataBus.data123);
            that.player.moveAction("LEFT", "START");
        });
        that.buttonLeft.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            that.player.moveAction("LEFT", "STOP");
        });
        that.buttonRight.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            dataBus.data123 = 444;
            console.info(" [ Game.js ] =============== onLoad >>>>> dataBus.data = ", dataBus.data123);
            that.player.moveAction("RIGHT", "START");
        });
        that.buttonRight.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            that.player.moveAction("RIGHT", "STOP");
        });
        // 攻击
        that.buttonUp.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            that.player.shotAction("UP");
        });
        that.buttonDown.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            that.player.shotAction("DOWN");
        });
        that.buttonLeft.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            that.player.shotAction("LEFT");
        });
        that.buttonRight.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            that.player.shotAction("RIGHT");
        });
    },

    // 按钮A事件
    onArrowClicked: function (event, data) {
        console.info(" button A ");
        this.player.moveAction(data);
    },

    onOptionClicked: function (event, data) {
        console.info(" option button clicked Oritation is ", event, data);
        this.player.shotAction(data);
    },

    start() {

    },

    // update (dt) {},
});
