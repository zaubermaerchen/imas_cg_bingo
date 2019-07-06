<template>
    <section>

        <table>
            <tbody>
            <tr>
                <th>ビンゴ枠数</th>
                <td>
                    <select name="row" v-model="row" v-on:change="changeSize">
                        <option value="1">1行</option>
                        <option value="2">2行</option>
                        <option value="3">3行</option>
                        <option value="4">4行</option>
                        <option value="5">5行</option>
                    </select>
                    ×
                    <select name="column" v-model="column" v-on:change="changeSize">
                        <option value="1">1列</option>
                        <option value="2">2列</option>
                        <option value="3">3列</option>
                        <option value="4">4列</option>
                        <option value="5">5列</option>
                    </select>
                </td>
            </tr>
            <tr>
                <th>カードサイズ</th>
                <td>
                    <select name="size" v-model="size">
                        <option value="s">Sサイズ</option>
                        <option value="m" selected="selected">Mサイズ</option>
                        <option value="m2">M2サイズ</option>
                        <option value="l">Lサイズ</option>
                        <option value="l2">Lサイズ(SR枠無し)</option>
                        <option value="ls">短冊</option>
                        <option value="xs">正方形</option>
                    </select>
                </td>
            </tr>
            <tr>
                <th>ランダム選択</th>
                <td>
                    <select name="select_type" v-model="select_type">
                        <option value="-1" selected="selected">すべての属性</option>
                        <option value="0">キュート</option>
                        <option value="1">クール</option>
                        <option value="2">パッション</option>
                    </select>
                    <select name="select_rarity" v-model="select_rarity">
                        <option value="-1" selected="selected">すべてのレアリティ</option>
                        <option value="0">ノーマル</option>
                        <option value="1">ノーマル+</option>
                        <option value="2">レア</option>
                        <option value="3">レア+</option>
                        <option value="4">Sレア</option>
                        <option value="5">Sレア+</option>
                    </select>
                    <button v-on:click="random">選択</button>
                </td>
            </tr>
            </tbody>
        </table>

        <draggable class="bingo" v-bind:style="{ width: column * 100 + 'px' }" v-model="idols" v-bind:element="'ul'" v-on:start="drag=true" v-on:end="drag=false">
            <li v-for="(idol_id, index) in idols"><imagebox v-bind:id="idol_id" v-on:click="click(index, idol_id)"></imagebox></li>
        </draggable>

        <button v-on:click="createImage">画像生成</button>

        <modal name="selector">
            <selector v-bind:name="selected_name" v-on:click="selectIdol"></selector>
        </modal>

        <modal name="result">
            <result v-bind:idols="idols" v-bind:row="row" v-bind:column="column" v-bind:size="size"></result>
        </modal>
    </section>
</template>

<script lang="ts">
    import draggable from 'vuedraggable'
    import imagebox from './components/imagebox.vue';
    import selector from './components/selector.vue';
    import result from './components/result.vue';
    import * as api from './components/api.ts';

    export default {
        name: "app",
        components: {
            draggable,
            imagebox,
            selector,
            result,
        },
        data: function () {
            return {
                selected_index: 0,
                selected_name: "",
                size: "s",
                row: 3,
                column: 3,
                select_type: -1,
                select_rarity: -1,
                idols: [],
                image_path: ""
            };
        },
        mounted: function (): void {
            this.changeSize();
        },
        methods: {
            click: function (index: number, idol_id: number): void {
                this.selected_index = index;
                if (idol_id == 0) {
                    this.selected_name = "";
                    this.$modal.push("selector");
                } else {
                    api.getIdol(idol_id).then((json: any) => {
                        this.selected_name = json.name;
                        this.$modal.push("selector");
                    })
                }

            },
            selectIdol: function (idol_id: number): void {
                let idols = this.idols.concat();
                idols[this.selected_index] = idol_id;
                this.idols = idols;
                this.$modal.pop()
            },
            changeSize: function (): void {
                const count = this.row * this.column;
                if (this.idols.length > count) {
                    this.idols = this.idols.slice(0, count);
                } else if(this.idols.length < count) {
                    this.idols = this.idols.concat((new Array(count - this.idols.length)).fill(0));
                }
            },
            createImage: function (): void {
                this.$modal.push("result");
            },
            random: function (): void {
                let type: number | null = this.select_type != -1 ? this.select_type : null;
                let rarity: number | null = this.select_rarity != -1 ? this.select_rarity : null;
                api.searchIdol(null, type, rarity, 1).then((json: any) => {
                    const length = json.count;
                    let promises: Promise<any>[] = [];
                    for (let i = 0; i < this.idols.length; i++) {
                        const offset = Math.floor(Math.random() * (length - 1));
                        promises.push(api.searchIdol(null, type, rarity, 1, offset));
                    }
                    Promise.all(promises).then((results: any[]) => {
                        let idols: number[] = [];
                        for (let i = 0; i < results.length; i++) {
                            idols.push(results[i].results[0].idol_id);
                        }
                        this.idols = idols;
                    });
                });
            }
        }
    }
</script>

<style scoped>
    ul.bingo {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        max-width: 500px;
        padding: 0;
    }
    tr {
        height: 2.5em;
    }
    select {
        font-size: 16px;
    }
    button {
        font-size: 16px;
        border-radius: 3px;
        box-shadow: none;
        padding: .5em 2em;
        border: 1px solid #bbb;
    }
</style>