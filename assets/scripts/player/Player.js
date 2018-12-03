import { Enums } from "../util/Enums.js";
import DataBus from "../DataBus.js";

const dataBus = DataBus.instance;

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
        // 设置当前运动边界
        that.borderUp = dataBus.borderUp - that.node.height / 2;
        that.borderRight = dataBus.borderRight - that.node.width / 2;
        that.borderDown = dataBus.borderDown + that.node.height / 2;
        that.borderLeft = dataBus.borderLeft + that.node.width / 2;
        // 动画
        that.onMove = false;
        that.moveDirection = Enums.Direction.DOWN;
        that.anim = that.getComponent(cc.Animation);
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
    moveAction: function (direction, order) {
        console.info(" [ Player.js ] ================= moveAction >>>>>> order = ", order);
        let that = this;
        that.moveDirection = direction;
        // 移动状态
        if (order == Enums.StatusOrder.START) {
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
    },

    start() {

    },

    update(dt) {
        let that = this;
        if (that.onMove) {
            switch (that.moveDirection) {
                case Enums.Direction.UP:
                    that.node.y += that.speed * dt;
                    if (that.node.y > that.borderUp) that.node.y = that.borderUp;
                    break;
                case Enums.Direction.DOWN:
                    that.node.y -= that.speed * dt;
                    if (that.node.y < that.borderDown) that.node.y = that.borderDown;
                    break;
                case Enums.Direction.LEFT:
                    that.node.x -= that.speed * dt;
                    if (that.node.x < that.borderLeft) that.node.x = that.borderLeft;
                    break;
                case Enums.Direction.RIGHT:
                    that.node.x += that.speed * dt;
                    if (that.node.x > that.borderRight) that.node.x = that.borderRight;
                    break;
                default: break;
            }
        }
    },

    onCollisionEnter: function (other, self) {
        let that = this;
        if (other.node.group == "monster") {
            that.health -= 1;
            // if (that.health <= 0) {

            // }
        }
    },
});
