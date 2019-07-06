<template>
    <section>
        <img v-bind:src="image_path" />
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
            };
        },
        mounted: function (): void {
            this.createImage();
        },
        methods: {
            createImage: function (): void {
                const url = new URL("https://zaubermaerchen.info/imas_cg/image_creator.php");
                url.searchParams.append("size", this.size);
                url.searchParams.append("row", this.row);
                url.searchParams.append("column", this.column);
                for (let i = 0; i < this.row; i++) {
                    for (let j = 0; j < this.column; j++) {
                        const index: number = i * this.column + j;
                        if (this.idols[index] == 0) {
                            continue;
                        }
                        url.searchParams.append("idol" + index, this.idols[index]);
                    }
                }
                this.image_path = url.href;
            }
        }
    }
</script>

<style scoped>
    section {
        text-align: center;
    }
    img {
        max-width: 100%;
        object-fit: contain;
    }
</style>