// 方向
const Direction = cc.Enum({
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3,
});

// 碰撞对象分组
const CollisionGroup = cc.Enum({
    PLAYER: 0,
    MONSTER: 1,
    MISSILE: 2
});

// 状态命令
const StatusOrder = cc.Enum({
    STOP: 0,
    START: 1,
    PAUSE: 2,
    RESUME: 3,
});

// 游戏状态
const GameStatus = cc.Enum({
    NEW: 0,
    RUNNING: 1,
    PAUSE: 2,
    OVER: 3,
});

export const Enums = { Direction, CollisionGroup, StatusOrder, GameStatus }