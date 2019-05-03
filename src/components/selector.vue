<template>
    <section>
        <h2>アイドル選択</h2>
        <p>
            <input type="search" placeholder="アイドル絞り込み" v-model="keyword" v-on:change="search" />
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
            "name",
        ],
        data: function () {
            return {
                keyword: "",
                idols: [],
                count: 0,
                limit: 10,
            };
        },
        mounted: function (): void {
            this.keyword = this.name;
            this.search();
        },
        methods: {
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
            changePage: function(offset: number): void {
                this.search(offset);
            },
            click(idol_id: number): void {
                this.$emit("click", idol_id);
            }
        },
        watch: {
            name: {
                handler(val: string) {
                    this.keyword = val;
                    this.search();
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