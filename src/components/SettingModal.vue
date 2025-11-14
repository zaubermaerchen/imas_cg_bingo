<script setup lang="ts">
import Setting from '@/models/setting.ts'

const setting = defineModel<Setting>({ required: true })
</script>

<template>
  <section class="setting-modal">
    <el-form label-position="right" label-width="100px">
      <el-form-item label="ビンゴ枠数">
        <el-col v-bind:span="11">
          <el-select v-model.number="setting.row" name="row">
            <el-option v-for="n in 10" v-bind:key="n" v-bind:value="n" v-bind:label="`${n}行`" />
          </el-select>
        </el-col>
        <el-col v-bind:span="2" style="text-align: center"> x </el-col>
        <el-col v-bind:span="11">
          <el-select v-model.number="setting.column" name="column">
            <el-option v-for="n in 10" v-bind:key="n" v-bind:value="n" v-bind:label="`${n}列`" />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="カードサイズ">
        <el-select v-model="setting.cardSize" name="card_size">
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
  </section>
</template>

<style>
section.setting-modal {
  padding: 2em;
  color: black;
  background-color: white;
  width: 500px;
}
</style>
