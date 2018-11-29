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
