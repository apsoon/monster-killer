
import { Enums } from "./util/Enums.js";

let INIT_MISSILE_POOL_COUNT = 10; // 子弹线程池初始大小
let INIT_MONSTER_POOL_COUNT = 10; // 怪物线程池初始大小

/**
 * 数据总线
 */
var DataBus = cc.Class({

    extends: cc.Component,

    /**
     * 使用单例
     */
    statics: {
        instance: null
    },

    properties: {

    },

    /**
     * 构造函数
     */
    ctor: function () {
        let that = this;
        // 对象池
        that.createMissilePool(); // 初始化怪物对象池
        that.createMonsterPool(); // 初始化子弹对象池 
        // 游戏边界
        that.borderUp;
        that.borderRight;
        that.borderDown;
        that.borderLeft;
        // 重置游戏状态数据
        that.reset();
    },

    // init(windowWidth, windowHeight) {

    // },

    /**
     * 重制全局数据
     */
    reset() {
        let that = this;
        that.gameStatus = Enums.GameStatus.NEW;
        that.score = 0;
        // that.playerHealth = 0;
    },

    // --------------------------------------------------------------------------- 子弹 ---------------------------------------------------------------------------
    /**
     * 初始化子弹对象池
     */
    createMissilePool: function () {
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
    createMissile: function (parentNode, x, y, direction, ) {
        let that = this;
        let missile = null;
        if (that.missilePool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            missile = that.missilePool.get();
        } else {  // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            missile = cc.instantiate(that.missilePrefab);
        }
        missile.parent = parentNode;  // 将生成的子弹加入节点树
        missile.getComponent("Missile").init(x, y, direction, parentNode);  //接下来就可以调用 missile 身上的脚本进行初始化
    },

    /**
     * 子弹失效 超出边界或击中敌人
     */
    recoverMissile: function (missile) {
        let that = this;
        that.missilePool.put(missile); // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent
    },

    // --------------------------------------------------------------------------- 怪物 ---------------------------------------------------------------------------
    /**
     * 初始化怪物对象池
     */
    createMonsterPool: function () {
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
    recoverMonster: function (monster) {
        let that = this;
        that.monsterPool.put(monster);
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    // update (dt) {},
});

DataBus.instance = new DataBus();

module.exports = DataBus;