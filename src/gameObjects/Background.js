class Background extends GameObject {
    constructor(image = null, color = null) {
        super();

        this.image = image;
        this.color = color;
    }
    update() {
    }

    draw(ctx, anchor) {
        const tempCanvas = document.createElement("canvas"),
        tCtx = tempCanvas.getContext("2d");

        const width = this.image.width * Camera.scale;
        const height = this.image.height * Camera.scale;
        tempCanvas.width = width;
        tempCanvas.height = height;
        tCtx.drawImage(this.image, 0, 0, width, height);

        ctx.fillStyle = ctx.createPattern(tempCanvas, "repeat");

        // anchor the pattern in the center
        const canvas = ctx.canvas;
        // ctx.translate(anchor.x/2, anchor.xy/2);
        ctx.fill();
        // ctx.translate(-anchor.x/2, -anchor.xy/2);
    }
}
