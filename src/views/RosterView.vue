<script setup lang="ts">
import { ref } from 'vue'
import { roster, type Player } from '@/data/roster'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const expandedRows = ref<Player[]>([])

const toggleRow = (player: Player) => {
  const index = expandedRows.value.indexOf(player)
  if (index > -1) {
    expandedRows.value.splice(index, 1)
  } else {
    expandedRows.value.push(player)
  }
}
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <main class="container mx-auto max-w-4xl space-y-12 px-4 py-12 md:px-8">
      <section>
        <h1 class="mb-8 text-center text-3xl font-bold text-white">ROSTER</h1>
        <div>
          <DataTable
            :value="roster"
            v-model:expanded-rows="expandedRows"
            unstyled
            :pt="{
              table: {
                class: 'w-full text-left text-xs text-white md:text-base',
              },
              headerRow: { class: 'border-b border-white/30' },
              bodyRow: { class: 'border-b border-white/10' },
              column: {
                headerCell: { class: 'pr-4 py-3' },
                bodyCell: { class: 'pr-4 py-3' },
                columnHeaderContent: {
                  class: 'flex gap-2 items-center leading-none',
                },
              },
            }"
          >
            <Column
              expander
              :pt="{
                headerCell: { class: 'w-8' },
                bodyCell: { class: 'w-8' },
              }"
            >
              <template #body="{ data }">
                <button
                  v-if="data.bio"
                  @click="toggleRow(data)"
                  class="text-orange-400 hover:text-orange-300"
                >
                  <i
                    :class="
                      expandedRows.includes(data)
                        ? 'pi pi-chevron-down'
                        : 'pi pi-chevron-right'
                    "
                  ></i>
                </button>
              </template>
            </Column>
            <Column field="name" header="PLAYER" sortable>
              <template #body="{ data }">
                <div class="leading-snug font-bold">{{ data.name }}</div>
              </template>
            </Column>
            <Column field="number" header="#"></Column>
            <Column field="position" header="POS" sortable></Column>
            <Column field="shoots" header="SH"></Column>
            <template #expansion="{ data }">
              <div
                v-if="data.bio"
                class="space-y-2 border-b border-white/10 py-3 md:ml-12"
              >
                <h2 class="font-bold text-orange-400">PLAYER BIO</h2>
                <p class="text-sm text-gray-300">
                  {{ data.bio }}
                </p>
              </div>
            </template>
          </DataTable>
        </div>
      </section>
    </main>
  </div>
</template>
