// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

import { Enums } from "../util/Enums.js";

cc.Class({
    extends: cc.Component,

    properties: {
        speed: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    init: function (x, y, dirction) {
        let that = this;
        that.node.x = x;
        that.node.y = y;
        that.direction = dirction;
    },

    start() {

    },

    update(dt) {
        let that = this;
        switch (that.dirction) {
            case Enums.Direction.UP:
                // console.info(" [ Player.js ] =============== update >>>>> x before = ", that.node.x, ", y before = ", that.node.y);
                that.node.y += that.speed * dt;
                // if (that.node.y > that.maxPosY) that.node.y = that.maxPosY;
                break;
            case Enums.Direction.DOWN:
                that.node.y -= that.speed * dt;
                // if (that.node.y < that.minPosY) that.node.y = that.minPosY;
                break;
            case Enums.Direction.LEFT:
                that.node.x -= that.speed * dt;
                // if (that.node.x < that.minPosX) that.node.x = that.minPosX;
                break;
            case Enums.Direction.RIGHT:
                that.node.x += that.speed * dt;
                // if (that.node.x > that.maxPosX) that.node.x = that.maxPosX;
                break;
            default: break;
        }
    },
});
