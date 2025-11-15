<script setup lang="ts">
import { ref } from 'vue'
import { useSettingStore, type Setting } from '@/stores/setting.ts'

interface Emits {
  (e: 'confirm'): void
  (e: 'cancel'): void
}

const emits = defineEmits<Emits>()
const setting = useSettingStore()
const _setting = ref<Setting>({ ...setting.$state })

const confirm = () => {
  setting.$state = _setting.value
  emits('confirm')
}
const apply = () => {
  setting.$state = _setting.value
}
const cancel = () => {
  emits('cancel')
}
</script>

<template>
  <el-container class="setting-modal">
    <el-header>
      <h2>設定</h2>
    </el-header>
    <el-main>
      <el-form label-position="right" label-width="100px">
        <el-form-item label="ビンゴ枠数">
          <el-col v-bind:span="11">
            <el-select v-model.number="_setting.row" name="row">
              <el-option v-for="n in 10" v-bind:key="n" v-bind:value="n" v-bind:label="`${n}行`" />
            </el-select>
          </el-col>
          <el-col v-bind:span="2" style="text-align: center"> x </el-col>
          <el-col v-bind:span="11">
            <el-select v-model.number="_setting.column" name="column">
              <el-option v-for="n in 10" v-bind:key="n" v-bind:value="n" v-bind:label="`${n}列`" />
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="カードサイズ">
          <el-select v-model="_setting.cardSize" name="card_size">
            <el-option value="s" label="Sサイズ" />
            <el-option value="m" label="Mサイズ" />
            <el-option value="m2" label="M2サイズ" />
            <el-option value="l" label="Lサイズ" />
            <el-option value="l_noframe" label="Lサイズ(SR枠無し)" />
            <el-option value="xs" label="正方形" />
            <el-option value="ls" label="短冊" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-main>
    <el-footer>
      <el-button v-on:click="confirm">OK</el-button>
      <el-button v-on:click="apply">適用</el-button>
      <el-button v-on:click="cancel">キャンセル</el-button>
    </el-footer>
  </el-container>
</template>

<style>
.setting-modal {
  color: black;
  background-color: white;
  width: 500px;
}
.setting-modal .el-footer {
  text-align: right;
}
</style>
