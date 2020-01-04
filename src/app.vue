<template>
    <section>
        <table>
            <tbody>
            <tr>
                <th>ビンゴ枠数</th>
                <td>
                    <el-select name="row" v-model="row" placeholder="行" v-on:change="changeSize">
                        <el-option v-for="n in 10" v-bind:key="n" v-bind:value="n" v-bind:label="n + '行'"></el-option>
                    </el-select>
                    ×
                    <el-select name="column" v-model="column" placeholder="column" v-on:change="changeSize">
                        <el-option v-for="n in 10" v-bind:key="n" v-bind:value="n" v-bind:label="n + '列'"></el-option>
                    </el-select>
                </td>
            </tr>
            <tr>
                <th>カードサイズ</th>
                <td>
                    <el-select name="size" v-model="select_size" placeholder="カードサイズ">
                        <el-option v-for="size in sizes" v-bind:key="size.value" v-bind:value="size.value" v-bind:label="size.label"></el-option>
                    </el-select>
                </td>
            </tr>
            <tr>
                <th>ランダム選択</th>
                <td>
                    <el-select name="select_type" v-model="select_type" placeholder="属性">
                        <el-option v-for="type in types" v-bind:key="type.value" v-bind:value="type.value" v-bind:label="type.label"></el-option>
                    </el-select>
                    <el-select name="select_rarity" v-model="select_rarity" placeholder="レアリティ">
                        <el-option v-for="rarity in rarities" v-bind:key="rarity.value" v-bind:value="rarity.value" v-bind:label="rarity.label"></el-option>
                    </el-select>
                    <el-button v-on:click="random">選択</el-button>
                </td>
            </tr>
            </tbody>
        </table>

        <draggable class="bingo" v-bind:style="{ width: column * 100 + 'px' }" v-model="idols" v-bind:element="'ul'" v-on:start="drag=true" v-on:end="drag=false">
            <li v-for="(idol_id, index) in idols"><imagebox v-bind:id="idol_id" v-on:click="click(index, idol_id)"></imagebox></li>
        </draggable>

        <el-button type="primary" v-on:click="createImage">画像生成</el-button>

        <modal name="selector">
            <selector v-bind:idol_id="selected_id" v-on:click="selectIdol"></selector>
        </modal>

        <modal name="result">
            <result v-bind:idols="idols" v-bind:row="row" v-bind:column="column" v-bind:size="select_size"></result>
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
                selected_id: 0,
                select_size: "m",
                row: 3,
                column: 3,
                select_type: -1,
                select_rarity: -1,
                sizes: [{
                    value: "s",
                    label: "Sサイズ"
                }, {
                    value: "m",
                    label: "Mサイズ"
                }, {
                    value: "m2",
                    label: "M2サイズ"
                }, {
                    value: "l",
                    label: "Lサイズ"
                }, {
                    value: "l2",
                    label: "Lサイズ(SR枠無し)"
                }, {
                    value: "ls",
                    label: "短冊"
                }, {
                    value: "xs",
                    label: "正方形"
                }],
                types: [{
                    value: -1,
                    label: 'すべての属性'
                }, {
                    value: 0,
                    label: 'キュート'
                }, {
                    value: 1,
                    label: 'クール'
                }, {
                    value: 2,
                    label: 'パッション'
                }],
                rarities: [{
                    value: -1,
                    label: 'すべてのレアリティ'
                }, {
                    value: 0,
                    label: 'ノーマル'
                }, {
                    value: 1,
                    label: 'ノーマル+'
                }, {
                    value: 2,
                    label: 'レア'
                }, {
                    value: 3,
                    label: 'レア+'
                }, {
                    value: 4,
                    label: 'Sレア'
                }, {
                    value: 5,
                    label: 'Sレア+'
                }],
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
                this.selected_id = idol_id;
                setTimeout(() => {
                    this.$modal.push("selector");
                }, 100);
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
        max-width: 1000px;
        padding: 0;
    }
</style>