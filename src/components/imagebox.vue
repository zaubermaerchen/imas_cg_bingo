<template>
    <img v-bind:src="getImagePath()" v-on:click="click" width="100" height="100" />
</template>

<script lang="ts">
    export default {
        name: "imagebox",
        props: [
            "id",
        ],
        methods: {
            getImagePath(): string {
                if (this.id > 0) {
                    return "https://zaubermaerchen.info/imas_cg/image/idol/xs/" + this.id + "/";
                } else {
                    return "images/blank.jpg";
                }
            },
            click(): void {
                this.$emit("click", this.id);
            }
        }
    }
</script>

<style scoped>
    img {
        vertical-align: bottom;
    }
</style>