class ParticipatingObject extends GameObject {
    constructor(gp, hex) {
        super(gp);

        this.hex = hex;
        this.imageAnchor = null;
        this.image = null;

        // this.standingAnimation = new Animation(sprites, 1000, Animation.TYPE_LOOP);
        this.isMoving = false;
        this.moveStartTime = null;
        this.moveDuration = 200;   // ms
        this.movements = [];
        // this.funcs = [];
    }

    update(now) {
        // if (this.movements.length > 0) console.log(this.movements[0]);
        super.update();

        const cameraPosition = this.gp.camera.position;

        let centerPoint = Hex.hexToPoint(cameraPosition, this.hex).toIso(cameraPosition);
        if (this.movements.length > 0) {
            // move
            if (this instanceof Torque) console.log(this.movements);
            const endHex = this.movements[0];
            // if (this.constructor.name == "Torque") debugger;

            const cameraMode = this.gp.camera.getMode();
            if (cameraMode == Camera.MODE_ISOMETRIC) {
                if (this.moveStartTime == null) {
                    // start movement step
                    this.moveStartTime = Date.now();
                    this.gp.activeClickBlockers.push(this);
                }

                if (this.image != null) {
                    if (this.moveStartTime != null) {
                        const startPoint = centerPoint;
                        const endPoint = Hex.hexToPoint(cameraPosition, endHex).toIso(cameraPosition);

                        const dx = endPoint.x - startPoint.x;
                        const dy = endPoint.y - startPoint.y;

                        const runningTime = now - this.moveStartTime;

                        if (runningTime >= this.moveDuration) {
                            console.log("end movement");
                            console.log(this.movements[0]);
                            centerPoint = endPoint;
                            this.hex = endHex;
                            this.movements = this.movements.slice(1);
                            this.moveStartTime = null;
                            const index = this.gp.activeClickBlockers.indexOf(this);
                            if (index >= -1) {
                                this.gp.activeClickBlockers.splice(index, 1);
                            }
                        } else {
                            const x = startPoint.x + (dx / this.moveDuration * runningTime);
                            const y = startPoint.y + (dy / this.moveDuration * runningTime);
                            centerPoint = new Point(x, y);
                        }
                    }
                }
            } else {
                this.hex = hex;
            }
        } else {
            this.isMoving = false;

            // if (this.funcs.length > 0) {
            //     this.funcs.forEach(f => f());
            // }
        }

        this.center = centerPoint;
    }

    draw(ctx) {
        super.draw(ctx)
    }

    onClick() {
        // console.log(this);
    }

    addMovement(steps) {    //, func
        // "steps" can be a single Hex object or an array of it
        // "func" is a function called after the last step of "steps" is finished (this will be moved if other steps are added before the spool is empty)

        // const steps1 = [
        //     steps,
        //     new Hex(steps.q+1, steps.r),
        //     new Hex(steps.q+2, steps.r-1),
        //     new Hex(steps.q+3, steps.r-1),
        // ];
        // if (!(this.movements.length > 0 && steps.equals(this.movements[this.movements.length-1]))) {
            this.movements = this.movements.concat(steps);
            console.log("move added to " + this.constructor.name);
            console.log(steps);
            this.isMoving = true;
        // }
        // if (typeof func == "function") this.funcs = this.funcs.concat(func);

    }
}
