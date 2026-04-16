<script setup lang="ts">
import { computed, ref, watch } from 'vue'

type Item = Record<string, string>

const props = defineProps<{
  kind: 'managed' | 'discovered'
  items: Item[]
}>()

const pageSizeOptions = [10, 20, 50, 100]
const pageSize = ref(20)
const currentPage = ref(1)

const totalPages = computed(() => {
  const total = Math.ceil((props.items?.length || 0) / pageSize.value)
  return Math.max(total, 1)
})

const pagedItems = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return (props.items || []).slice(start, start + pageSize.value)
})

watch(pageSize, () => {
  currentPage.value = 1
})

watch(totalPages, (tp) => {
  if (currentPage.value > tp) currentPage.value = tp
})

function prevPage() {
  if (currentPage.value > 1) currentPage.value -= 1
}

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value += 1
}
</script>

<template>
  <div class="scripts-pager">
    <div class="scripts-pager__toolbar">
      <div>
        共 <strong>{{ items.length }}</strong> 条
      </div>
      <label>
        每页条数
        <select v-model.number="pageSize">
          <option v-for="n in pageSizeOptions" :key="n" :value="n">{{ n }}</option>
        </select>
      </label>
      <div class="scripts-pager__nav">
        <button :disabled="currentPage <= 1" @click="prevPage">上一页</button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button :disabled="currentPage >= totalPages" @click="nextPage">下一页</button>
      </div>
    </div>

    <div class="table-overflow">
      <table>
        <thead>
          <tr v-if="kind === 'managed'">
            <th>风险</th>
            <th>脚本</th>
            <th>版本</th>
            <th>适用网站</th>
            <th>风险说明</th>
          </tr>
          <tr v-else>
            <th>风险</th>
            <th>脚本</th>
            <th>来源</th>
            <th>平台</th>
            <th>风险说明</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in pagedItems" :key="item.link || idx">
            <td>{{ item.risk }}</td>
            <td>
              <a :href="item.link">{{ item.name }}</a>
            </td>
            <td v-if="kind === 'managed'">{{ item.version }}</td>
            <td v-if="kind === 'managed'">{{ item.sites }}</td>
            <td v-if="kind === 'discovered'">
              <a v-if="item.source_link" :href="item.source_link" target="_blank" rel="noopener noreferrer">
                {{ item.source_name }}
              </a>
              <span v-else>{{ item.source_name }}</span>
            </td>
            <td v-if="kind === 'discovered'">{{ item.platform }}</td>
            <td class="risk-details">{{ item.risk_details }}</td>
          </tr>
          <tr v-if="!pagedItems.length">
            <td colspan="5">暂无数据</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
