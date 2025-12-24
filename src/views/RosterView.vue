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
        <h1 class="mb-8 text-center text-4xl font-bold text-white">ROSTER</h1>
        <div class="clip-corners bg-orange-400 p-0.5">
          <DataTable
            :value="roster"
            v-model:expandedRows="expandedRows"
            unstyled
            :pt="{
              table: { class: 'w-full clip-corners text-sm md:text-base' },
              headerRow: {
                class: 'border-b-2 border-orange-400 bg-purple-900',
              },
              bodyRow: { class: 'border-t border-b border-orange-400' },
              column: {
                headerCell: { class: 'p-4 text-left align-top' },
                bodyCell: {
                  class: 'p-4 text-left align-top bg-purple-950',
                },
                columnHeaderContent: {
                  class: 'flex gap-2 items-center leading-none',
                },
              },
            }"
          >
            <Column
              expander
              :pt="{
                headerCell: { class: 'w-2' },
                bodyCell: { class: 'w-2' },
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
              <div v-if="data.bio" class="ml-12 space-y-2 py-2">
                <h2 class="font-bold">PLAYER BIO</h2>
                <p>
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
