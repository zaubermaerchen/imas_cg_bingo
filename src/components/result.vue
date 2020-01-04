<template>
    <section>
        <div>
            <canvas ref="canvas"></canvas>
            <img v-bind:src="image_path" />
        </div>
    </section>

</template>

<script lang="ts">
    export default {
        name: "result",
        props: [
            "idols",
            "column",
            "row",
            "size",
        ],
        data: function () {
            return {
                image_path: "",
                settings: {
                    s:  { width: 130, height: 163},
                    m:  { width: 220, height: 275},
                    m2: { width: 375, height: 469},
                    l:  { width: 640, height: 800},
                    l2: { width: 640, height: 800},
                    ls: { width: 120, height: 375},
                    xs: { width: 100, height: 100},
                }
            };
        },
        mounted: function (): void {
            this.drawCanvas();
        },
        methods: {
            drawCanvas: function (): void {
                let canvas: HTMLCanvasElement = this.$refs.canvas;
                canvas.width = this.column * this.settings[this.size].width;
                canvas.height = this.row * this.settings[this.size].height;

                let ctx: CanvasRenderingContext2D = canvas.getContext('2d');
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                ctx.fillStyle = "rgb(0, 0, 0)";
                ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

                let promises: Promise<any>[] = [];
                for (let i = 0; i < this.row; i++) {
                    for (let j = 0; j < this.column; j++) {
                        const index: number = i * this.column + j;
                        if (this.idols[index] == 0) {
                            continue;
                        }
                        const path: string = "https://zaubermaerchen.info/imas_cg/image/idol/" + this.size + "/" + this.idols[index] + "/";
                        const x = this.settings[this.size].width * j;
                        const y = this.settings[this.size].height * i;
                        promises.push(this.drawImage(ctx, x, y, path);
                    }
                }
                Promise.all(promises).then(() => {
                    canvas.toBlob((blob) => {
                        this.image_path = URL.createObjectURL(blob);
                    });
                });
            },
            drawImage: function (ctx: CanvasRenderingContext2D, x: number, y: number, path: string): Promise<any> {
                return new Promise((resolve: (value?: any | PromiseLike<any>) => void, reject: (reason?: any) => void) => {
                    let image = new Image();
                    image.src = path;
                    image.crossOrigin = "anonymous";
                    image.onload = function () {
                        ctx.drawImage(image, x, y, image.width, image.height);
                        resolve();
                    };
                });
            }

        }
    }
</script>

<style scoped>
    section {
        display: flex;
        justify-content: center;
        max-width: calc(100% - 60px);
    }
    section > div {
        position: relative;
    }
    section > div > canvas {
        width: 100%;
        object-fit: contain;
    }
    section > div > img {
        width: 100%;
        object-fit: contain;
        position: absolute;
        top: 0;
        left: 0;
    }
</style>