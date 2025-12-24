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
        <DataTable :value="roster" v-model:expandedRows="expandedRows">
          <Column expander :pt="{ headerCell: { class: 'w-4' } }">
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
              <div class="font-bold">{{ data.name }}</div>
            </template>
          </Column>
          <Column field="number" header="#" sortable></Column>
          <Column field="position" header="Position" sortable></Column>
          <Column field="shoots" header="Shoots" sortable></Column>
          <template #expansion="{ data }">
            <div v-if="data.bio" class="ml-12 space-y-2 py-2">
              <h2 class="font-bold">PLAYER BIO</h2>
              <p>
                {{ data.bio }}
              </p>
            </div>
          </template>
        </DataTable>
      </section>
    </main>
  </div>
</template>
