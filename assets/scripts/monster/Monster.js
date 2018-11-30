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
        that.anim = that.getComponent(cc.Animation);
        console.info(" [ Monster.js ] =================== onLoad >>>>> this = ", that);
        console.info(" [ Monster.js ] =================== onLoad >>>>> this.anim = ", that.anim);
        if(that.anim){
            that.anim.playAdditive("bat_down");
        }
    },

    start() {

    },

    update(dt) {
        let that = this,
            rand = Math.floor(Math.random() * 4) + 1;
        switch (rand) {
            case 1: // up
                that.node.x += that.speed * dt;
                // that.anim.playAdditive("bat_up");
                break;
            case 2: // RIGHT
                that.node.y += that.speed * dt;
                // that.anim.playAdditive("bat_right");
                break;
            case 3: // DOWN
                that.node.y -= that.speed * dt;
                break;
            case 4: // LEFT
                that.node.x -= that.speed * dt;
                // that.anim.playAdditive("bat_left");
                break;
        }
        // console.info(" [ Monster.js ] ================ update >>>>> that =  ", that.game);

    },

    onCollisionEnter: function (other, self) {
        // 被子弹打中扣一滴血 如果血为0 怪物消失 得一分
        if (other.node.group == "missile") {
            let that = this;
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
