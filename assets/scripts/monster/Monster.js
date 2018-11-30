// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        let that = this;
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

    start() {

    },

    update(dt) {
        let that = this,
            rand = Math.floor(Math.random() * 4) + 1;
        switch (rand) {
            case 1: // up
                that.node.x += that.speed * dt;
                break;
            case 2: // RIGHT
                that.node.y += that.speed * dt;
                break;
            case 3: // DOWN
                that.node.y -= that.speed * dt;
                break;
            case 4: // LEFT
                that.node.x -= that.speed * dt;
                break;
        }
        // console.info(" [ Monster.js ] ================ update >>>>> that =  ", that.game);

    },

    onCollisionEnter: function (other, self) {
        console.info(" [ Monster.js ] ================== onCollisionEnter >>>>> other = ", other, ", self = ", self);
        let that = this;
        // 被子弹打中扣一滴血 如果血为0 怪物消失 得一分
        that.health -= 1;
        if (that.health <= 0) {
            that.game.onMonsterKilled(that.node);
            that.game.addScore(1);
        }
    },

    /**
     * 移动动作
     */
    move: function () {

    }
});
