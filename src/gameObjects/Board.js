class Board extends GameObject {
    constructor(gp) {
        super();

        this.gp = gp;
        this.background = new Background(resources.sand);
        this.selectedField = null;
        
        const fields = [
            new Field(gp, new Hex(11, -5)),
            new Field(gp, new Hex(11, -4)),
            new Field(gp, new Hex(11, -3)),
            new Field(gp, new Hex(11, -2)),
            new Field(gp, new Hex(11, -1)),
            new Field(gp, new Hex(11, 0)),
            new Field(gp, new Hex(10, -5)),
            new Field(gp, new Hex(10, -4)),
            new Field(gp, new Hex(10, -3)),
            new Field(gp, new Hex(10, -2)),
            new Field(gp, new Hex(10, -1)),
            new Field(gp, new Hex(10, 0), Field.TYPE_HOLE, Field.STRIKE_AREA_BACK),
            new Field(gp, new Hex(10, 1)),
            new Field(gp, new Hex(9, -5)),
            new Field(gp, new Hex(9, -4)),
            new Field(gp, new Hex(9, -3)),
            new Field(gp, new Hex(9, -2)),
            new Field(gp, new Hex(9, -1), Field.TYPE_HOT_ZONE, Field.STRIKE_AREA_BACK),
            new Field(gp, new Hex(9, 0), Field.TYPE_HOT_ZONE, Field.STRIKE_AREA_BACK),
            new Field(gp, new Hex(9, 1)),
            new Field(gp, new Hex(9, 2)),
            new Field(gp, new Hex(8, -5)),
            new Field(gp, new Hex(8, -4)),
            new Field(gp, new Hex(8, -3), Field.TYPE_HOLE, Field.STRIKE_AREA_LEFT),
            new Field(gp, new Hex(8, -2)),
            new Field(gp, new Hex(8, -1), Field.TYPE_HOT_ZONE, Field.STRIKE_AREA_BACK),
            new Field(gp, new Hex(8, 0), Field.TYPE_PIT, Field.STRIKE_AREA_BACK),
            new Field(gp, new Hex(8, 1), Field.TYPE_HOT_ZONE, Field.STRIKE_AREA_BACK),
            new Field(gp, new Hex(8, 2)),
            new Field(gp, new Hex(8, 3)),
            new Field(gp, new Hex(7, -5)),
            new Field(gp, new Hex(7, -4), Field.TYPE_HOT_ZONE, Field.STRIKE_AREA_LEFT),
            new Field(gp, new Hex(7, -3), Field.TYPE_HOT_ZONE, Field.STRIKE_AREA_LEFT),
            new Field(gp, new Hex(7, -2)),
            new Field(gp, new Hex(7, -1)),
            new Field(gp, new Hex(7, 0), Field.TYPE_HOT_ZONE, Field.STRIKE_AREA_BACK),
            new Field(gp, new Hex(7, 1), Field.TYPE_HOT_ZONE, Field.STRIKE_AREA_BACK),
            new Field(gp, new Hex(7, 2)),
            new Field(gp, new Hex(7, 3)),
            new Field(gp, new Hex(7, 4)),
            new Field(gp, new Hex(6, -5)),
            new Field(gp, new Hex(6, -4), Field.TYPE_HOT_ZONE, Field.STRIKE_AREA_LEFT),
            new Field(gp, new Hex(6, -3), Field.TYPE_PIT, Field.STRIKE_AREA_LEFT),
            new Field(gp, new Hex(6, -2), Field.TYPE_HOT_ZONE, Field.STRIKE_AREA_LEFT),
            new Field(gp, new Hex(6, -1)),
            new Field(gp, new Hex(6, 0), Field.TYPE_SUPER_HOT_ZONE, Field.STRIKE_AREA_BACK),
            new Field(gp, new Hex(6, 1)),
            new Field(gp, new Hex(6, 2)),
            new Field(gp, new Hex(6, 3)),
            new Field(gp, new Hex(6, 4)),
            new Field(gp, new Hex(6, 5)),
            new Field(gp, new Hex(5, -5)),
            new Field(gp, new Hex(5, -4)),
            new Field(gp, new Hex(5, -3), Field.TYPE_HOT_ZONE, Field.STRIKE_AREA_LEFT),
            new Field(gp, new Hex(5, -2), Field.TYPE_HOT_ZONE, Field.STRIKE_AREA_LEFT),
            new Field(gp, new Hex(5, -1)),
            new Field(gp, new Hex(5, 0)),
            new Field(gp, new Hex(5, 1)),
            new Field(gp, new Hex(5, 2)),
            new Field(gp, new Hex(5, 3), Field.TYPE_HOLE, Field.STRIKE_AREA_RIGHT),
            new Field(gp, new Hex(5, 4)),
            new Field(gp, new Hex(5, 5)),
            new Field(gp, new Hex(4, -5)),
            new Field(gp, new Hex(4, -4)),
            new Field(gp, new Hex(4, -3), Field.TYPE_SUPER_HOT_ZONE, Field.STRIKE_AREA_LEFT),
            new Field(gp, new Hex(4, -2)),
            new Field(gp, new Hex(4, -1)),
            new Field(gp, new Hex(4, 0)),
            new Field(gp, new Hex(4, 1)),
            new Field(gp, new Hex(4, 2), Field.TYPE_HOT_ZONE, Field.STRIKE_AREA_RIGHT),
            new Field(gp, new Hex(4, 3), Field.TYPE_HOT_ZONE, Field.STRIKE_AREA_RIGHT),
            new Field(gp, new Hex(4, 4)),
            new Field(gp, new Hex(4, 5)),
            // new Field(gp, new Hex(3, -6), Field.TYPE_RESPAWN),
            new Field(gp, new Hex(3, -5), Field.TYPE_MIDFIELD),
            new Field(gp, new Hex(3, -4)),
            new Field(gp, new Hex(3, -3)),
            new Field(gp, new Hex(3, -2)),
            new Field(gp, new Hex(3, -1)),
            new Field(gp, new Hex(3, 0)),
            new Field(gp, new Hex(3, 1)),
            new Field(gp, new Hex(3, 2), Field.TYPE_HOT_ZONE, Field.STRIKE_AREA_RIGHT),
            new Field(gp, new Hex(3, 3), Field.TYPE_PIT, Field.STRIKE_AREA_RIGHT),
            new Field(gp, new Hex(3, 4), Field.TYPE_HOT_ZONE, Field.STRIKE_AREA_RIGHT),
            new Field(gp, new Hex(3, 5)),
            new Field(gp, new Hex(2, -5), Field.TYPE_MIDFIELD),
            new Field(gp, new Hex(2, -4), Field.TYPE_MIDFIELD),
            new Field(gp, new Hex(2, -3), Field.TYPE_MIDFIELD),
            new Field(gp, new Hex(2, -2)),
            new Field(gp, new Hex(2, -1)),
            new Field(gp, new Hex(2, 0)),
            new Field(gp, new Hex(2, 1)),
            new Field(gp, new Hex(2, 2)),
            new Field(gp, new Hex(2, 3), Field.TYPE_HOT_ZONE, Field.STRIKE_AREA_RIGHT),
            new Field(gp, new Hex(2, 4), Field.TYPE_HOT_ZONE, Field.STRIKE_AREA_RIGHT),
            new Field(gp, new Hex(2, 5)),
            new Field(gp, new Hex(1, -5)),
            new Field(gp, new Hex(1, -4)),
            new Field(gp, new Hex(1, -3), Field.TYPE_MIDFIELD),
            new Field(gp, new Hex(1, -2), Field.TYPE_MIDFIELD),
            new Field(gp, new Hex(1, -1), Field.TYPE_MIDFIELD),
            new Field(gp, new Hex(1, 0)),
            new Field(gp, new Hex(1, 1)),
            new Field(gp, new Hex(1, 2)),
            new Field(gp, new Hex(1, 3), Field.TYPE_SUPER_HOT_ZONE, Field.STRIKE_AREA_RIGHT),
            new Field(gp, new Hex(1, 4)),
            new Field(gp, new Hex(1, 5)),
            new Field(gp, new Hex(0, -5)),
            new Field(gp, new Hex(0, -4)),
            new Field(gp, new Hex(0, -3)),
            new Field(gp, new Hex(0, -2)),
            new Field(gp, new Hex(0, -1), Field.TYPE_MIDFIELD),
            new Field(gp, new Hex(0, 0), Field.TYPE_MIDFIELD),
            new Field(gp, new Hex(0, 1), Field.TYPE_MIDFIELD),
            new Field(gp, new Hex(0, 2)),
            new Field(gp, new Hex(0, 3)),
            new Field(gp, new Hex(0, 4)),
            new Field(gp, new Hex(0, 5)),
            new Field(gp, new Hex(-1, -5)),
            new Field(gp, new Hex(-1, -4)),
            new Field(gp, new Hex(-1, -3), Field.TYPE_SUPER_HOT_ZONE, Field.STRIKE_AREA_RIGHT),
            new Field(gp, new Hex(-1, -2)),
            new Field(gp, new Hex(-1, -1)),
            new Field(gp, new Hex(-1, 0)),
            new Field(gp, new Hex(-1, 1), Field.TYPE_MIDFIELD),
            new Field(gp, new Hex(-1, 2), Field.TYPE_MIDFIELD),
            new Field(gp, new Hex(-1, 3), Field.TYPE_MIDFIELD),
            new Field(gp, new Hex(-1, 4)),
            new Field(gp, new Hex(-1, 5)),
            new Field(gp, new Hex(-2, -5)),
            new Field(gp, new Hex(-2, -4), Field.TYPE_HOT_ZONE, Field.STRIKE_AREA_RIGHT),
            new Field(gp, new Hex(-2, -3), Field.TYPE_HOT_ZONE, Field.STRIKE_AREA_RIGHT),
            new Field(gp, new Hex(-2, -2)),
            new Field(gp, new Hex(-2, -1)),
            new Field(gp, new Hex(-2, 0)),
            new Field(gp, new Hex(-2, 1)),
            new Field(gp, new Hex(-2, 2)),
            new Field(gp, new Hex(-2, 3), Field.TYPE_MIDFIELD),
            new Field(gp, new Hex(-2, 4), Field.TYPE_MIDFIELD),
            new Field(gp, new Hex(-2, 5), Field.TYPE_MIDFIELD),
            new Field(gp, new Hex(-3, -5)),
            new Field(gp, new Hex(-3, -4), Field.TYPE_HOT_ZONE, Field.STRIKE_AREA_RIGHT),
            new Field(gp, new Hex(-3, -3), Field.TYPE_PIT, Field.STRIKE_AREA_RIGHT),
            new Field(gp, new Hex(-3, -2), Field.TYPE_HOT_ZONE, Field.STRIKE_AREA_RIGHT),
            new Field(gp, new Hex(-3, -1)),
            new Field(gp, new Hex(-3, 0)),
            new Field(gp, new Hex(-3, 1)),
            new Field(gp, new Hex(-3, 2)),
            new Field(gp, new Hex(-3, 3)),
            new Field(gp, new Hex(-3, 4)),
            new Field(gp, new Hex(-3, 5), Field.TYPE_MIDFIELD),
            // new Field(gp, new Hex(-3, 6), Field.TYPE_RESPAWN),
            new Field(gp, new Hex(-4, -5)),
            new Field(gp, new Hex(-4, -4)),
            new Field(gp, new Hex(-4, -3), Field.TYPE_HOT_ZONE, Field.STRIKE_AREA_RIGHT),
            new Field(gp, new Hex(-4, -2), Field.TYPE_HOT_ZONE, Field.STRIKE_AREA_RIGHT),
            new Field(gp, new Hex(-4, -1)),
            new Field(gp, new Hex(-4, 0)),
            new Field(gp, new Hex(-4, 1)),
            new Field(gp, new Hex(-4, 2)),
            new Field(gp, new Hex(-4, 3), Field.TYPE_SUPER_HOT_ZONE, Field.STRIKE_AREA_LEFT),
            new Field(gp, new Hex(-4, 4)),
            new Field(gp, new Hex(-4, 5)),
            new Field(gp, new Hex(-5, -5)),
            new Field(gp, new Hex(-5, -4)),
            new Field(gp, new Hex(-5, -3), Field.TYPE_HOLE, Field.STRIKE_AREA_RIGHT),
            new Field(gp, new Hex(-5, -2)),
            new Field(gp, new Hex(-5, -1)),
            new Field(gp, new Hex(-5, 0)),
            new Field(gp, new Hex(-5, 1)),
            new Field(gp, new Hex(-5, 2), Field.TYPE_HOT_ZONE, Field.STRIKE_AREA_LEFT),
            new Field(gp, new Hex(-5, 3), Field.TYPE_HOT_ZONE, Field.STRIKE_AREA_LEFT),
            new Field(gp, new Hex(-5, 4)),
            new Field(gp, new Hex(-5, 5)),
            new Field(gp, new Hex(-6, -5)),
            new Field(gp, new Hex(-6, -4)),
            new Field(gp, new Hex(-6, -3)),
            new Field(gp, new Hex(-6, -2)),
            new Field(gp, new Hex(-6, -1)),
            new Field(gp, new Hex(-6, 0), Field.TYPE_SUPER_HOT_ZONE, Field.STRIKE_AREA_BACK),
            new Field(gp, new Hex(-6, 1)),
            new Field(gp, new Hex(-6, 2), Field.TYPE_HOT_ZONE, Field.STRIKE_AREA_LEFT),
            new Field(gp, new Hex(-6, 3), Field.TYPE_PIT, Field.STRIKE_AREA_LEFT),
            new Field(gp, new Hex(-6, 4), Field.TYPE_HOT_ZONE, Field.STRIKE_AREA_LEFT),
            new Field(gp, new Hex(-6, 5)),
            new Field(gp, new Hex(-7, -4)),
            new Field(gp, new Hex(-7, -3)),
            new Field(gp, new Hex(-7, -2)),
            new Field(gp, new Hex(-7, -1), Field.TYPE_HOT_ZONE, Field.STRIKE_AREA_BACK),
            new Field(gp, new Hex(-7, 0), Field.TYPE_HOT_ZONE, Field.STRIKE_AREA_BACK),
            new Field(gp, new Hex(-7, 1)),
            new Field(gp, new Hex(-7, 2)),
            new Field(gp, new Hex(-7, 3), Field.TYPE_HOT_ZONE, Field.STRIKE_AREA_LEFT),
            new Field(gp, new Hex(-7, 4), Field.TYPE_HOT_ZONE, Field.STRIKE_AREA_LEFT),
            new Field(gp, new Hex(-7, 5)),
            new Field(gp, new Hex(-8, -3)),
            new Field(gp, new Hex(-8, -2)),
            new Field(gp, new Hex(-8, -1), Field.TYPE_HOT_ZONE, Field.STRIKE_AREA_BACK),
            new Field(gp, new Hex(-8, 0), Field.TYPE_PIT, Field.STRIKE_AREA_BACK),
            new Field(gp, new Hex(-8, 1), Field.TYPE_HOT_ZONE, Field.STRIKE_AREA_BACK),
            new Field(gp, new Hex(-8, 2)),
            new Field(gp, new Hex(-8, 3), Field.TYPE_HOLE, Field.STRIKE_AREA_LEFT),
            new Field(gp, new Hex(-8, 4)),
            new Field(gp, new Hex(-8, 5)),
            new Field(gp, new Hex(-9, -2)),
            new Field(gp, new Hex(-9, -1)),
            new Field(gp, new Hex(-9, 0), Field.TYPE_HOT_ZONE, Field.STRIKE_AREA_BACK),
            new Field(gp, new Hex(-9, 1), Field.TYPE_HOT_ZONE, Field.STRIKE_AREA_BACK),
            new Field(gp, new Hex(-9, 2)),
            new Field(gp, new Hex(-9, 3)),
            new Field(gp, new Hex(-9, 4)),
            new Field(gp, new Hex(-9, 5)),
            new Field(gp, new Hex(-10, -1)),
            new Field(gp, new Hex(-10, 0), Field.TYPE_HOLE, Field.STRIKE_AREA_BACK),
            new Field(gp, new Hex(-10, 1)),
            new Field(gp, new Hex(-10, 2)),
            new Field(gp, new Hex(-10, 3)),
            new Field(gp, new Hex(-10, 4)),
            new Field(gp, new Hex(-10, 5)),
            new Field(gp, new Hex(-11, 0)),
            new Field(gp, new Hex(-11, 1)),
            new Field(gp, new Hex(-11, 2)),
            new Field(gp, new Hex(-11, 3)),
            new Field(gp, new Hex(-11, 4)),
            new Field(gp, new Hex(-11, 5)),
        ];
        this.fields = fields;//.sort(CanvasLayers.sortForDrawing);
    }

    update(gp) {
        // update background
        this.background.update();

        // // reset all fields' selected status
        // this.fields.forEach(f => f.isHighlighted = false);
        //
        // // set selected status of selected field's neighbors
        // this.fields.forEach(f => {
        //     if (
        //         f == this.selectedField
        //         // || (gp.action && gp.action.type == Action.TYPE_RUN && gp.action.data.player.hex)
        //     ) {
        //         const neighbors = f.getNeighbors();
        //         neighbors.forEach(n => n.isHighlighted = true);
        //     }
        // });

        // update fields
        this.fields.forEach(f => f.update());
    }

    draw(ctx) {
        const gp = this.gp;
        const cameraMode = gp.camera.getMode();
        const cameraPosition = gp.camera.position;
        // define path to fill with background's pattern
        ctx.beginPath();
        this.fields.forEach(f => {
            // if (f.type == Field.TYPE_RESPAWN) {
            //     return;
            // }

            const scaledSize = GameObject.BASE_SIZE * Camera.scale;

            // calc corner points
            const center = Hex.hexToPoint(cameraPosition, f.hex);
            let p0 = new Point(center.x, center.y - scaledSize);                                          // top
            let p1 = new Point(center.x + Math.getTrianglesHeight(scaledSize), center.y - scaledSize/2);  // top right
            let p2 = new Point(center.x + Math.getTrianglesHeight(scaledSize), center.y + scaledSize/2);  // bottom right
            let p3 = new Point(center.x, center.y + scaledSize);                                          // bottom
            let p4 = new Point(center.x - Math.getTrianglesHeight(scaledSize), center.y + scaledSize/2);  // bottom left
            let p5 = new Point(center.x - Math.getTrianglesHeight(scaledSize), center.y - scaledSize/2);  // top left
            if (cameraMode == Camera.MODE_ISOMETRIC) {
                p0 = p0.toIso(gp.camera.position);
                p1 = p1.toIso(gp.camera.position);
                p2 = p2.toIso(gp.camera.position);
                p3 = p3.toIso(gp.camera.position);
                p4 = p4.toIso(gp.camera.position);
                p5 = p5.toIso(gp.camera.position);
            }

            ctx.moveTo(p0.x, p0.y);
            ctx.lineTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.lineTo(p3.x, p3.y);
            ctx.lineTo(p4.x, p4.y);
            ctx.lineTo(p5.x, p5.y);
        });
        ctx.closePath();

        // draw background as pattern filling selected path
        const backgroundAnchor = Hex.hexToPoint(cameraPosition, this.fields[0].hex);
        this.background.draw(ctx, backgroundAnchor);

        this.fields.forEach(f => f.draw(ctx, gp));
    }
}
