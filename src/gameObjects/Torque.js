class Torque extends ParticipatingObject {
    constructor(gp, hex) {
        super(gp, hex);

        this.color = Color.TORQUE;
        this.image = resources.torque;
    }

    update(now) {
        super.update(now);
    }

    draw(ctx) {
        const gp = this.gp;
        const cameraMode = gp.camera.getMode();
        const cameraPosition = gp.camera.position;
        const scaledSize = GameObject.BASE_SIZE * Camera.scale;

        const center = Hex.hexToPoint(cameraPosition, this.hex);

        // calc corner points
        let p0 = new Point(center.x, center.y - scaledSize);                                            // top
        let p1 = new Point(center.x + Math.getTrianglesHeight(scaledSize), center.y - scaledSize/2);    // top right
        let p2 = new Point(center.x + Math.getTrianglesHeight(scaledSize), center.y + scaledSize/2);    // bottom right
        let p3 = new Point(center.x, center.y + scaledSize);                                            // bottom
        let p4 = new Point(center.x - Math.getTrianglesHeight(scaledSize), center.y + scaledSize/2);    // bottom left
        let p5 = new Point(center.x - Math.getTrianglesHeight(scaledSize), center.y - scaledSize/2);    // top left
        if (cameraMode == Camera.MODE_ISOMETRIC) {
            p0 = p0.toIso(cameraPosition);
            p1 = p1.toIso(cameraPosition);
            p2 = p2.toIso(cameraPosition);
            p3 = p3.toIso(cameraPosition);
            p4 = p4.toIso(cameraPosition);
            p5 = p5.toIso(cameraPosition);
        }

        // define border
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.lineTo(p4.x, p4.y);
        ctx.lineTo(p5.x, p5.y);
        ctx.closePath();

        const drawBorder = () => {
            // draw border
            if (this.isHighlighted) {
                ctx.lineWidth = Field.BORDER_WIDTH * Camera.scale * 5;
                ctx.strokeStyle = Color.BORDER_HIGHLIGHT;
            } else if (this.isHovered) {
                ctx.lineWidth = Field.BORDER_WIDTH * Camera.scale * 2;
                ctx.strokeStyle = Color.BORDER_HOVER;
            } else {
                ctx.lineWidth = Field.BORDER_WIDTH * Camera.scale;
                ctx.strokeStyle = Color.FIELD_BORDER_REGULAR;
            }
            ctx.stroke();
        }

        if (cameraMode == Camera.MODE_TOP_DOWN) {
            // fill area
            if (this.color) {
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            if (this.type == Field.TYPE_HOT_ZONE || this.type == Field.TYPE_SUPER_HOT_ZONE) {
                // draw inner circles
                ctx.beginPath();
                const lineWidth = Field.BORDER_WIDTH * Camera.scale;
                const radius = scaledSize/1.5;
                ctx.arc(center.x, center.y, lineWidth, 0, 2*Math.PI, false);
                ctx.strokeStyle = Color.FIELD_HOLE_CIRCLES;
                const amountOfCircles = 2;
                for (var i = 0; i < amountOfCircles; i++) {
                    ctx.lineWidth = radius * (i+1);
                    ctx.stroke();
                }
            }
            drawBorder();
        } else if (cameraMode == Camera.MODE_ISOMETRIC) {
            if (this.image != null) {
                const point = this.center;//center.toIso(cameraPosition);
                if (point != null) {
                    const width = this.image.width * Camera.scale;
                    const height = this.image.height * Camera.scale;
                    const anchor = new Point(point.x - width/2, point.y - height/2);
                    ctx.drawImage(this.image, anchor.x, anchor.y, width, height);
                }
            }
            // drawBorder();
        }
    }

    onClick() {
    }

    // move() {
    //     // set new position
    //     const vector = new Hex(this.vq, this.vr);
    //     this.hex = Hex.add(this.hex, vector);
    //
    //     // reset movement
    //     this.vq = 0;
    //     this.vr = 0;
    // }

    getField() {
        const fields = this.gp.layers.getBoardFields();
        const thisField = fields.filter(f => f.hex.equals(this.hex))[0];

        return thisField;
    }

    scatter() {
        if (!this.isMoving) {
            const amountOfFieldsScattering = Math.randomInt(Torque.SCATTERING_DISTANCE_MIN, Torque.SCATTERING_DISTANCE_MAX);
            let direction = Array.getRandomElement(Hex.ALL_DIRECTIONS);
            // console.log("scatter");
            // console.log(amountOfFieldsScattering + " " + direction);
            let batchHex = this.hex;
            for (var i = 0; i < amountOfFieldsScattering; i++) {
                const batchField = this.gp.layers.getBoardFields().filter(f => f.hex.equals(batchHex))[0];

                let neighborField = batchField.getNeighborAt(direction);
                if (neighborField == null) {
                    direction = batchField.getReboundDirection(direction);
                    neighborField = batchField.getNeighborAt(direction);
                }

                // if (!neighborField.isAccessible()) {
                //     // neighbor field is not accessible
                //
                //     if (neighborField.type == Field.TYPE_PIT) {
                //         // this.gp.respawnTorque();
                //         return;
                //     } else if (neighborField.type == Field.TYPE_HOLE) {
                //         // this.scatter();
                //         return;
                //     }
                // } else {
                    batchHex = new Hex(neighborField.hex.q, neighborField.hex.r);
                    this.addMovement(batchHex);

                    const playerOfNeighbor = neighborField.getParticipatingObjects().filter(go => go instanceof Player)[0];
                    if (playerOfNeighbor != null || neighborField.type == Field.TYPE_PIT || neighborField.type == Field.TYPE_HOLE) {
                        // torque got stopped by other player or special field
                        return;
                    }
                // }
            }
        }
    }
}

Torque.SCATTERING_DISTANCE_MIN = 1;
Torque.SCATTERING_DISTANCE_MAX = 6;
