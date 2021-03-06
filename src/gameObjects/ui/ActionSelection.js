class ActionSelection extends Popup {
    constructor(gp, player) {
        super(new Point(760, 410), 450, 260);

        this.player = player;

        this.buttonStandUp = player.isBashed() ? new Button(null, 450, 60, "stand up", this.standUp, {player}) : null;

        this.buttonRun = !player.isBashed() ? new Button(null, 450, 60, "run", this.run, {player}) : null;

        const tempThrowAction = new ThrowAction(gp, player);
        const throwingIsPossible = player.holdsTorque() && tempThrowAction.possibleTargetFields.length > 0;
        this.buttonThrow = !player.isBashed() && throwingIsPossible ? new Button(null, 450, 60, "throw", this.throwTorque, {player}) : null;

        const tempBashAction = new BashAction(gp, player);
        const bashingIsPossible = player.canBash() && tempBashAction.possibleTargets.length > 0;
        this.buttonBash = !player.isBashed() && bashingIsPossible ? new Button(null, 450, 60, "bash", this.bash, {player}) : null;

        const tempStealAction = new StealAction(gp, player);
        const stealingIsPossible = player.canHoldTorque() && tempStealAction.possibleTargets.length > 0;
        this.buttonSteal = !player.isBashed() && stealingIsPossible ? new Button(null, 450, 60, "steal", this.steal, {player}) : null;

        this.height += 0 + (this.buttonStandUp ? this.buttonStandUp.height : 0) + (this.buttonRun ? this.buttonRun.height : 0) + (this.buttonThrow ? this.buttonThrow.height : 0) + (this.buttonBash ? this.buttonBash.height : 0) + (this.buttonSteal ? this.buttonSteal.height : 0);
        this.point.y -= 0 + (this.buttonStandUp ? this.buttonStandUp.height : 0) + (this.buttonRun ? this.buttonRun.height : 0) + (this.buttonThrow ? this.buttonThrow.height : 0) + (this.buttonBash ? this.buttonBash.height : 0) + (this.buttonSteal ? this.buttonSteal.height : 0);
    }

    update() {
        super.update();
    }

    draw(ctx) {
        const cv = ctx.canvas;
        ctx.globalAlpha = 0.5;
        ctx.fillStyle="black";
        ctx.fillRect(0, 0, cv.width, cv.height);
        ctx.globalAlpha = 1;

        const tCv = document.createElement("canvas");
        tCv.width = this.width;
        tCv.height = this.height;
        const tCtx = tCv.getContext("2d");

        tCtx.fillStyle = Color.UI_BACKGROUND;
        tCtx.fillRect(0, 0, tCv.width, tCv.height);
        tCtx.fillStyle = "black";
        tCtx.font="40px Arial";
        let textY = this.buttonStandUp ? this.buttonStandUp.height : this.buttonRun.height;
        tCtx.fillText("Name: " + this.player.name,10,textY);
        textY+=50;
        tCtx.fillText("Role: " + this.player.role,10,textY);
        textY+=50;
        tCtx.fillText("Rank: " + this.player.rank,10,textY);
        textY+=50;
        tCtx.fillText("Stats: " + this.player.stats,10,textY);
        textY+=50;
        tCtx.fillText("Skills: " + this.player.skills,10,textY);

        tCtx.strokeStyle = "black";
        tCtx.lineWidth = 5;
        tCtx.rect(0, 0, tCv.width, tCv.height);
        tCtx.stroke();

        ctx.drawImage(tCv, this.point.x, this.point.y + (this.buttonStandUp ? this.buttonStandUp.height : 0) + (this.buttonRun ? this.buttonRun.height : 0) + (this.buttonThrow ? this.buttonThrow.height : 0) + (this.buttonBash ? this.buttonBash.height : 0) + (this.buttonSteal ? this.buttonSteal.height : 0), tCv.width, tCv.height);

        let buttonMargin = 0;
        if (this.buttonStandUp) {
            this.buttonStandUp.draw(ctx, new Point(this.point.x, this.point.y + buttonMargin));   // above the info
            buttonMargin += 60;
        }
        if (this.buttonRun) {
            this.buttonRun.draw(ctx, new Point(this.point.x, this.point.y + buttonMargin));   // above the info
            buttonMargin += 60;
        }
        if (this.buttonThrow) {
            this.buttonThrow.draw(ctx, new Point(this.point.x, this.point.y + buttonMargin));   // above the info
            buttonMargin += 60;
        }
        if (this.buttonBash) {
            this.buttonBash.draw(ctx, new Point(this.point.x, this.point.y + buttonMargin));   // above the info
            buttonMargin += 60;
        }
        if (this.buttonSteal) {
            this.buttonSteal.draw(ctx, new Point(this.point.x, this.point.y + buttonMargin));   // above the info
            buttonMargin += 60;
        }
    }

    standUp(gp, params) {
        const player = params.player;
        gp.closeTopPopup();
        gp.setAction(new StandUpAction(gp, player));
    }

    run(gp, params) {
        const player = params.player;
        gp.closeTopPopup();
        gp.setAction(new RunAction(gp, player));
    }

    throwTorque(gp, params) {
        const player = params.player;
        if (player.holdsTorque()) {
            gp.closeTopPopup();
            gp.setAction(new ThrowAction(gp, player));
        } else {
            console.log("Can't throw without holding the torque");
        }
    }

    bash(gp, params) {
        const player = params.player;
        gp.closeTopPopup();
        gp.setAction(new BashAction(gp, player));
    }

    steal(gp, params) {
        const player = params.player;
        gp.closeTopPopup();
        gp.setAction(new StealAction(gp, player));
    }

    onClick(gp, point) {
        const su = this.buttonStandUp;
        const r = this.buttonRun;
        const t = this.buttonThrow;
        const b = this.buttonBash;
        const st = this.buttonSteal;
        if (su && point.hits(su.point, su.width, su.height)) {
            su.onClick(gp);
        } else if (r && point.hits(r.point, r.width, r.height)) {
            r.onClick(gp);
        } else if(t && point.hits(t.point, t.width, t.height)) {
            t.onClick(gp);
        } else if(b && point.hits(b.point, b.width, b.height)) {
            b.onClick(gp);
        } else if(st && point.hits(st.point, st.width, st.height)) {
            st.onClick(gp);
        }
    }
}
