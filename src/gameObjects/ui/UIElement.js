class UIElement extends GameObject {
    constructor(point, width, height) {
        super();
        this.point = point;
        this.width = width;
        this.height = height;
    }

    update() {
        super.update();
    }

    draw(ctx) {
    }

    onClick(gp, point) {
        // console.log("clicked");
        // console.log(this);
    }
}
