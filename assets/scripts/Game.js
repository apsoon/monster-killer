import { Enums } from "./util/Enums.js";
import Player from "./player/Player.js";

cc.Class({
    extends: cc.Component,

    properties: {
        // 子弹
        missilePrefab: {
            default: null,
            type: cc.Prefab
        },
        // 玩家
        player: {
            default: null,
            type: Player
        },
        // 射击按钮
        buttonA: {
            default: null,
            type: cc.Button
        },
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
        // 方向按钮
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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        let that = this;
        that.initMoveButton();
        that.initShotButton();
        // 攻击
    },

    start() {

    },

    // update (dt) {},

    /**
     * 初始化移动按钮监听
     */
    initMoveButton: function () {
        let that = this;
        that.buttonUp.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            that.player.moveAction(Enums.Direction.UP, Enums.RunningAction.START);
        });
        that.buttonUp.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            that.player.moveAction(Enums.Direction.UP, Enums.RunningAction.STOP);
        });
        that.buttonDown.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            that.player.moveAction(Enums.Direction.DOWN, Enums.RunningAction.START);
        });
        that.buttonDown.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            that.player.moveAction(Enums.Direction.DOWN, Enums.RunningAction.STOP);
        });
        that.buttonLeft.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            that.player.moveAction(Enums.Direction.LEFT, Enums.RunningAction.START);
        });
        that.buttonLeft.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            that.player.moveAction(Enums.Direction.LEFT, Enums.RunningAction.STOP);
        });
        that.buttonRight.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            that.player.moveAction(Enums.Direction.RIGHT, Enums.RunningAction.START);
        });
        that.buttonRight.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            that.player.moveAction(Enums.Direction.RIGHT, Enums.RunningAction.STOP);
        });
    },

    /**
     * 初始化攻击按钮
     */
    initShotButton: function () {
        let that = this;
        that.buttonB.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            that.player.shotAction(Enums.Direction.UP);
        });
        that.buttonX.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            that.player.shotAction(Enums.Direction.DOWN);
        });
        that.buttonA.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            that.player.shotAction(Enums.Direction.LEFT);
        });
        that.buttonY.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            that.player.shotAction(Enums.Direction.RIGHT);
        });
    },
});
