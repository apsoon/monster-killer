import { Enums } from "./util/Enums.js";
import Player from "./player/Player.js";

let INIT_MISSILE_POOL_COUNT = 10;
let INIT_MONSTER_POOL_COUNT = 10;

cc.Class({
    extends: cc.Component,

    properties: {
        // 分数展示
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        // 玩家
        player: {
            default: null,
            type: Player
        },
        // 子弹
        missilePrefab: {
            default: null,
            type: cc.Prefab
        },
        // 怪物
        monsterPrefab: {
            default: null,
            type: cc.Prefab,
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

    // initMonsterGenerator: function () {
    //     let that = this;
    //     // that.monster
    // },

    onLoad() {
        let that = this;
        // 初始化
        that.initMoveButton();
        that.initShotButton();
        that.initMissilePool();
        that.initMonsterPool();
        that.score = 0;
        that.scoreDisplay.string = 'Score: ' + this.score.toString();
        // 生成怪物
        that.schedule(function () {
            let rand = Math.floor(Math.random() * 4) + 1,
                seed = Math.random(),
                abs = Math.random(),
                monsterX = 0,
                monsterY = 0;
            abs = abs > 0.5 ? 1 : -1;
            switch (rand) {
                case 1: // up
                    monsterX = abs * seed * that.node.width / 2;
                    monsterY = that.node.height / 2 - 100;
                    break;
                case 2: // RIGHT
                    monsterX = that.node.width / 2 - 100;
                    monsterY = abs * seed * that.node.height / 2;
                    break;
                case 3: // DOWN
                    monsterX = abs * seed * that.node.width / 2;
                    monsterY = - that.node.height / 2 + 100;
                    break;
                case 4: // LEFT
                    monsterX = -that.node.width / 2 + 100;
                    monsterY = abs * seed * that.node.height / 2;
                    break;
            }
            that.createMonster(that.node, monsterX, monsterY);
        }, 3);
    },

    addScore: function (score) {
        let that = this;
        that.score += score;
        that.scoreDisplay.string = 'Score: ' + this.score.toString();
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
            that.createMissile(that.node, Enums.Direction.UP);
        });
        that.buttonX.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            that.player.shotAction(Enums.Direction.DOWN)
            that.createMissile(that.node, Enums.Direction.DOWN);
        });
        that.buttonA.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            that.player.shotAction(Enums.Direction.LEFT);
            that.createMissile(that.node, Enums.Direction.LEFT);
        });
        that.buttonY.node.on(cc.Node.EventType.TOUCH_START, (event) => {
            that.player.shotAction(Enums.Direction.RIGHT);
            that.createMissile(that.node, Enums.Direction.RIGHT);
        });
    },

    /**
     * 初始化子弹对象池
     */
    initMissilePool: function () {
        let that = this;
        that.missilePool = new cc.NodePool();
        for (let i = 0; i < INIT_MISSILE_POOL_COUNT; i++) {
            let missile = cc.instantiate(that.missilePrefab); // 创建节点
            that.missilePool.put(missile); // 通过 putInPool 接口放入对象池
        }
    },

    /**
     * 创建子弹
     * @param {*} parentNode 
     */
    createMissile: function (parentNode, direction) {
        let that = this;
        let missile = null;
        if (that.missilePool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            missile = that.missilePool.get();
        } else {  // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            missile = cc.instantiate(that.missilePrefab);
        }
        missile.parent = parentNode;  // 将生成的子弹加入节点树
        missile.getComponent("Missile").init(that, that.player.node.x, that.player.node.y, direction);  //接下来就可以调用 missile 身上的脚本进行初始化
    },

    /**
     * 子弹失效 超出边界或击中敌人
     */
    onMissileUsed: function (missile) {
        let that = this;
        that.missilePool.put(missile); // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent
    },

    /**
     * 初始化怪物对象池
     */
    initMonsterPool: function () {
        let that = this;
        that.monsterPool = new cc.NodePool();
        for (let i = 0; i < INIT_MONSTER_POOL_COUNT; i++) {
            let monster = cc.instantiate(that.monsterPrefab);
            that.monsterPool.put(monster);
        }
    },

    /**
     * 创建怪物
     */
    createMonster: function (parentNode, x, y) {
        let that = this;
        let monster = null;
        if (that.monsterPool.size() > 0) {
            monster = that.monsterPool.get();
        } else {
            monster = cc.instantiate(that.monsterPrefab);
        }
        monster.parent = parentNode;
        monster.getComponent("Monster").init(that, x, y);
    },

    /**
     * 怪物死亡
     */
    onMonsterKilled: function (monster) {
        let that = this;
        that.monsterPool.put(monster);
    }
});
