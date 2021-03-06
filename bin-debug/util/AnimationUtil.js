var AnimationUtil = (function () {
    function AnimationUtil() {
    }
    var d = __define,c=AnimationUtil,p=c.prototype;
    AnimationUtil.makeAni = function (effectFile) {
        var jsondata = RES.getRes(effectFile + "_json");
        var texture = RES.getRes(effectFile + "_png");
        if (!jsondata || !texture) {
            console.log("动画文件有问题" + effectFile);
            return null;
        }
        else {
            var effectMcFactory = new egret.MovieClipDataFactory(jsondata, texture);
            var effectMc = new egret.MovieClip(effectMcFactory.generateMovieClipData("ani"));
            //effectMc.frameRate = 10;
            return effectMc;
        }
    };
    AnimationUtil.makeDB = function (dbDataJson, dbTextureJson, dbTexturePng, armature) {
        var data = RES.getRes(dbDataJson);
        var textureData = RES.getRes(dbTextureJson);
        var texture = RES.getRes(dbTexturePng);
        if (data && textureData && texture) {
            var dragonFactory = new dragonBones.EgretFactory();
            dragonFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(data));
            dragonFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
            var arm = dragonFactory.buildArmature(armature);
            dragonBones.WorldClock.clock.add(arm);
            egret.Ticker.getInstance().register(this.onDBTrick, this);
            return arm;
        }
        return null;
    };
    AnimationUtil.cleanDB = function (db) {
        dragonBones.WorldClock.clock.remove(db);
        egret.Ticker.getInstance().unregister(this.onDBTrick, this);
    };
    AnimationUtil.onDBTrick = function (frameTime) {
        dragonBones.WorldClock.clock.advanceTime(0.01);
    };
    AnimationUtil.shake = function (shakeTarget) {
        var scale = 1.02;
        var spaceTime = 60;
        egret.Tween.removeTweens(shakeTarget);
        var tw = egret.Tween.get(shakeTarget);
        var w = 800 * (scale - 1);
        var h = 800 * (scale - 1);
        egret.log("w:" + w.toString() + ", h" + h.toString());
        tw.to({ scaleX: scale, scaleY: scale }, 50)
            .to({ x: -Util.random(w), y: -Util.random(h) }, spaceTime)
            .to({ x: -Util.random(w), y: -Util.random(h) }, spaceTime)
            .to({ x: -Util.random(w), y: -Util.random(h) }, spaceTime)
            .to({ x: -Util.random(w), y: -Util.random(h) }, spaceTime)
            .to({ x: -Util.random(w), y: -Util.random(h) }, spaceTime)
            .to({ x: -Util.random(w), y: -Util.random(h) }, spaceTime)
            .to({ x: -Util.random(w), y: -Util.random(h) }, spaceTime)
            .to({ scaleX: 1, scaleY: 1, x: 0, y: 0 }, 60);
    };
    return AnimationUtil;
}());
egret.registerClass(AnimationUtil,'AnimationUtil');
