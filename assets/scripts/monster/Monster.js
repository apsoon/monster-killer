
import { Enums } from "../util/Enums.js";
const UP_SUFFIX = "_up";
const RIGHT_SUFFIX = "_right";
const DOWN_SUFFIX = "_down";
const LEFT_SUFFIX = "_left";
cc.Class({
    extends: cc.Component,

    properties: {
        speed: 0,
        health: 0,
    },

    init: function (game, x, y) {
        let that = this;
        that.game = game
        that.node.x = x;
        that.node.y = y;
        that.onMove = true;
        // console.info(" [ Monster.js ] ================ init >>>>> width ", game.width);
        // console.info(" [ Monster.js ] ================ init >>>>> right ", game.height);
        // 边界

        that.borderR = (that.game.node.width - that.node.width) / 2;
        that.borderL = -that.borderR;
        that.borderU = (that.game.node.height - that.node.height) / 2;
        that.borderD = -that.borderU;
        // 动画
        that.anim = that.getComponent(cc.Animation);
        that.anim.playAdditive(that.node.name + DOWN_SUFFIX);
        that.schedule(function () {
            let that = this,
                rand = Math.floor(Math.random() * 4) + 1;
            that.anim.stop();
            switch (rand) {
                case 1: // u
                    that.moveDirection = Enums.Direction.UP;
                    that.anim.playAdditive(that.node.name + UP_SUFFIX);
                    break;
                case 2: // RIGHT
                    that.moveDirection = Enums.Direction.RIGHT;
                    that.anim.playAdditive(that.node.name + RIGHT_SUFFIX);
                    break;
                case 3: // DOWN
                    that.moveDirection = Enums.Direction.DOWN;
                    that.anim.playAdditive(that.node.name + DOWN_SUFFIX);
                    break;
                case 4: // LEFT
                    that.moveDirection = Enums.Direction.LEFT;
                    that.anim.playAdditive(that.node.name + LEFT_SUFFIX);
                    break;
            }
        }, 3);
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        let that = this;
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        that.onMove = false;
        that.moveDirection = Enums.Direction.DOWN;
    },

    start() {

    },

    update(dt) {
        let that = this;
        if (that.onMove) {
            switch (that.moveDirection) {
                case Enums.Direction.RIGHT:
                    that.node.x += that.speed * dt;
                    if (that.node.x > that.borderR) that.node.x = that.borderR;
                    break;
                case Enums.Direction.UP:
                    that.node.y += that.speed * dt;
                    if (that.node.y > that.borderU) that.node.y = that.borderU;
                    break;
                case Enums.Direction.DOWN:
                    that.node.y -= that.speed * dt;
                    if (that.node.y < that.borderD) that.node.y = that.borderD;
                    break;
                case Enums.Direction.LEFT:
                    that.node.x -= that.speed * dt;
                    if (that.node.x < that.borderL) that.node.x = that.borderL;
                    break;
                default: break;
            }
        }
    },

    onCollisionEnter: function (other, self) {
        let that = this;
        console.info(" [ Monster.js ] ==================== onCollisionEnter >>>>> health = ", that.health);
        // 被子弹打中扣一滴血 如果血为0 怪物消失 得一分
        if (other.node.group == "missile") {
            that.health -= 1;
            if (that.health <= 0) {
                that.game.onMonsterKilled(that.node);
                that.game.addScore(1);
            }
        }
    },

    /**
     * 移动动作
     */
    move: function () {

    }
});
