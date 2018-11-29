import { Enums } from "../util/Enums.js";

cc.Class({
    extends: cc.Component,

    properties: {
        // 血量
        health: 0,
        // 速度
        speed: 0,
        // 朝向
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        let that = this;
        that.minPosY = - that.node.parent.width / 2;
        that.maxPosY = that.node.parent.width / 2;
        that.minPosX = - that.node.parent.height / 2;
        that.maxPosX = that.node.parent.height / 2;
        // 动画
        that.anim = that.getComponent(cc.Animation);
        console.info(that);
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

    // 射击动作
    shotAction: function (direction) {
        let that = this;
    },

    /**
     * 
     * @param {*} direction 
     * @param {*} status 
     */
    moveAction: function (direction, status) {
        let that = this;
        // 移动状态
        if (status == Enums.RunningAction.START) {
            that.onMove = true;
            switch (that.moveDirection) {
                case Enums.Direction.UP:
                    that.anim.playAdditive("ribaiasu_up");
                    break;
                case Enums.Direction.DOWN:
                    that.anim.playAdditive("ribaiasu_down");
                    break;
                case Enums.Direction.LEFT:
                    that.anim.playAdditive("ribaiasu_left");
                    break;
                case Enums.Direction.RIGHT:
                    that.anim.playAdditive("ribaiasu_right");
                    break;
                default: break;
            }
        } else {
            that.onMove = false;
            that.anim.stop();
            // switch (that.moveDirection) {
            //     case Enums.Direction.UP:
            //         // that.anim.stop("ribaiasu_up");
            //         that.anim.stop()
            //         break;
            //     case Enums.Direction.DOWN:
            //         that.anim.stop("ribaiasu_down");
            //         break;
            //     case Enums.Direction.LEFT:
            //         that.anim.stop("ribaiasu_left");
            //         break;
            //     case Enums.Direction.RIGHT:
            //         that.anim.stop("ribaiasu_right");
            //         break;
            //     default: break;
            // }
        }
        // 移动方向
        that.moveDirection = direction;
    },

    start() {

    },

    update(dt) {
        let that = this;
        if (that.onMove) {
            switch (that.moveDirection) {
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
        }
    },

    onCollisionEnter: function (other, self) {
        console.info(" [ Player.js ] ================== onCollisionEnter >>>>> other = ", other, ", self = ", self);
    },
});
