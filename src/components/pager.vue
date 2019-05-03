<template>
    <ul class="pager" v-if="getPages() > 1">
        <li><button v-on:click="firstPage()"  v-bind:disabled="isFirstPage()">&lt;&lt;</button></li>
        <li><button v-on:click="prevPage()" v-bind:disabled="isFirstPage()">&lt;</button></li>
        <li>
            <input type="number" id="page" class="page" value="1" min="1" v-model="page" v-bind:max="getPages()" v-on:change="editPage()" />
            /
            <span>{{ getPages() }}</span>
        </li>
        <li><button v-on:click="nextPage()" v-bind:disabled="isLastPage()">&gt;</button></li>
        <li><button v-on:click="lastPage()" v-bind:disabled="isLastPage()">&gt;&gt;</button></li>
    </ul>
</template>

<script lang="ts">
    export default {
        data: function () {
            return {
                page: 1,
            };
        },
        props: [
            "count",
            "limit"
        ],
        methods: {
            getPages(): number { return Math.ceil(this.count / this.limit); },
            isFirstPage(): boolean { return (this.page == 1); },
            isLastPage(): boolean { return (this.page == this.getPages());  },
            getOffset(): number { return (this.page - 1) * this.limit; },
            prevPage(): void { this.changePage(this.page - 1); },
            nextPage(): void { this.changePage(this.page + 1); },
            firstPage(): void { this.changePage(1); },
            lastPage(): void { this.changePage(this.getPages()); },
            editPage() : void { this.changePage(this.page) },
            changePage(page: number): void {
                if(page < 1) {
                    page = 1;
                }
                if(page > this.getPages()) {
                    page = this.getPages();
                }
                this.page = page;
                this.$emit('change', this.getOffset());
            }
        }
    }
</script>

<style scoped>
    ul.pager {
        margin: 0;
        padding: 0;
        display: -webkit-flex;
        display: flex;
        justify-content: center;
    }

    ul.pager > li {
        list-style-type: none;
        display: inline;
        padding: 0 0.3em;
    }
    ul.pager > li > button {
        border-radius: 3px;
        box-shadow: none;
        border: 1px solid #bbbbbb;
        width: 4em;
        height: 3em;
        padding: 3px 3px;
    }
    ul.pager > li > input[type="number"] {
        border-radius: 3px;
        box-shadow: none;
        border: 1px solid #bbbbbb;
        width: 3em;
        height: 2em;
        text-align: right;
        margin: 2px 0;
        padding: 3px 5px;
    }
</style>
