class ErrorAnswerLayer extends eui.Component {
    private bg:eui.Image;
    private text:eui.Label;
    private timer;

    public constructor() {
        super();
        EventMgr.getInstance().dispatchEventWith(MsgMgr.data.StopGameTimer, false, []);
        this.skinName = "ErrorAnswerLayerSkin";
        this.bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);

        this.text.text = JsonFileMgr.getErrorWordByIndex(GameData.countError);
        this.timer = new egret.Timer(1000, 3);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onClose, this);
        this.timer.start();
    }

    private onClose() {
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }

        Director.getInstance().popScene();
        EventMgr.getInstance().dispatchEventWith(MsgMgr.data.ResumeGame, false, []);
    }

}
