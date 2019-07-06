<template>
    <section>
        <h2>アイドル選択</h2>
        <p>
            <input type="search" placeholder="アイドル検索" v-model="keyword" v-on:keyup="inputText" v-on:change="search" v-on:search="search" />
        </p>
        <pager v-bind:count="count" v-bind:limit="limit" v-on:change="changePage"></pager>
        <ul>
            <li v-for="idol in idols"><imagebox v-bind:id="idol.idol_id" v-on:click="click"></imagebox></li>
            <li><imagebox v-bind:id="0" v-on:click="click"></imagebox></li>
        </ul>
    </section>
</template>

<script lang="ts">
    import imagebox from './imagebox.vue';
    import pager from './pager.vue';
    import * as api from './api.ts';

    export default {
        name: "selector",
        components: {
            imagebox,
            pager
        },
        props: [
            "idol_id",
        ],
        data: function () {
            return {
                keyword: "",
                idols: [],
                count: 0,
                limit: 10,
            };
        },
        created: function (): void {
            this.init();
        },
        methods: {
            init: function (): void {
                if (this.idol_id == 0) {
                    this.search();
                } else {
                    api.getIdol(this.idol_id).then((idol: any) => {
                        this.idols = [idol];
                        this.count = 1;
                    })
                }
            },
            search: function (offset: number = 0): void {
                let name: string | null = null;
                if (this.keyword.length > 0) {
                    name = this.keyword;
                }

                api.searchIdol(name, null, null, this.limit, offset).then((json: any) => {
                    this.idols = json.results;
                    this.count = json.count;
                })
            },
            inputText: function(event: any) {
                if (event.isComposing) {
                    return;
                }
                this.search();
            },
            changePage: function(offset: number): void {
                this.search(offset);
            },
            click(idol_id: number): void {
                this.$emit("click", idol_id);
            }
        },
        watch: {
            idol_id: {
                handler(val: number) {
                    this.init();
                }
            }
        }
    }
</script>

<style scoped>
    section {
        width: auto;
        max-width: 500px;
    }
    p {
        margin-bottom: 20px;
    }
    input[type="search"] {
        width: 100%;
        font-size: 16px;
        border-radius: 3px;
        box-shadow: none;
        padding: .5em;
        border: 1px solid #bbb;
    }
    ul {
        display: flex;
        flex-wrap: wrap;
        font-size: 0;
        margin-top: 20px;
        padding: 0;
    }
    ul > li {
        margin: 0;
        padding: 0;
    }

</style>