<template>
    <section>
        <h2>アイドル選択</h2>
        <p>
            <input type="search" placeholder="アイドル検索" v-model="keyword" v-on:keyup="inputText" v-on:change="search" v-on:search="search" />
        </p>
        <div class="pager">
            <el-input-number v-model="page" v-if="getPages() > 1" v-bind:min="1" v-bind:max="getPages()" v-on:change="changePage()" />
        </div>
        <ul>
            <li v-for="idol in idols"><imagebox v-bind:id="idol.idol_id" v-on:click="click"></imagebox></li>
            <li><imagebox v-bind:id="0" v-on:click="click"></imagebox></li>
        </ul>
    </section>
</template>

<script lang="ts">
    import imagebox from './imagebox.vue';
    import * as api from './api.ts';

    export default {
        name: "selector",
        components: {
            imagebox
        },
        props: [
            "idol_id",
        ],
        data: function () {
            return {
                keyword: "",
                idols: [],
                page: 1,
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
                        this.page = 1;
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
                    if (offset == 0) {
                        this.page = 1;
                    }
                })
            },
            inputText: function(event: any) {
                if (event.isComposing) {
                    return;
                }
                this.search();
            },
            getPages(): number { return Math.ceil(this.count / this.limit); },
            getOffset(): number { return (this.page - 1) * this.limit; },
            changePage: function(): void {
                this.search(this.getOffset());
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
    .pager {
        display: flex;
        justify-content: center;
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