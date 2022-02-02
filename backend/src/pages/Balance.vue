<template>
  <h2>Balance</h2>

  <div class="card">
    <Toolbar class="mb-4">
      <template #start>
        <!-- <Button label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" /> -->
        <!-- <Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" /> -->
      </template>

      <template #end>
        <Button label="Balance to 0€" icon="pi pi-exclamation-triangle" class="p-button-warning mr-2" @click="confirmBalanceSelected" :disabled="!selectedItems || !selectedItems.length" />
        <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV()"  />
      </template>
    </Toolbar>

    <DataTable
      ref="dt"
      dataKey="id"
      :value="peopleService.people"
      v-model:selection="selectedItems"
      :paginator="true"
      :rows="10"
      :filters="filters"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[5,10,25]"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} people"
      responsiveLayout="scroll"
    >
      <template #header>
        <div class="table-header flex flex-column md:flex-row md:justify-content-between">
          <h5 class="mb-2 md:m-0 p-as-md-center">Manage People</h5>
          <span class="p-input-icon-left">
            <i class="pi pi-search"></i>
            <InputText v-model="filters['global'].value" @keyup.esc="filters['global'].value=''" placeholder="Search..." />
          </span>
        </div>
      </template>

      <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>

      <Column field="name" header="Name" :sortable="true" style="min-width:16rem"></Column>

      <Column field="balance" header="Balance" :sortable="true">
        <template #body="slotProps">
          <div :class="balanceClass(slotProps.data.balance)" class="balance cell-content">{{ formatCurrency(slotProps.data.balance) }}</div>
        </template>
      </Column>
    </DataTable>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../service/Firebase';
import peopleService from '../service/PeopleService';
import { IPerson } from '../interfaces/i-person';

import { FilterMatchMode } from 'primevue/api';
import { DataTableFilterMetaData } from 'primevue/datatable';

const dt = ref();
const toast = useToast();
const selectedItems = ref<IPerson[]>([]);
const filters = ref({
  global: {
    value: '',
    matchMode: FilterMatchMode.CONTAINS,
  } as DataTableFilterMetaData,
});

const formatCurrency = (value?: number) => {
  if (value === undefined) {
    return;
  }
  return value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
};

const exportCSV = () => {
  dt.value.exportCSV();
};

const balanceClass = (balance: number) => {
  console.debug('balance', balance);
  return `balance-${balance > 0 ? 'positive' : balance < 0 ? 'negative' : 'neutral'}`;
};

const confirmBalanceSelected = async () => {
  const userChoiceTrue = confirm('Set balance for selected items to 0,00 €?');
  if (userChoiceTrue) {
    const ids = selectedItems.value.map((person) => person.id);
    const callableFn = httpsCallable(functions, 'balance');
    const balance = ids.map(id => {
      return {
        id,
        balance: 0,
      }
    });
    try {
      await callableFn(balance);
      selectedItems.value = [];
    } catch (err) {
      toast.add({
        severity: 'error',
        summary: 'Error while setting balance',
        detail: (err as Error).message,
        life: 5000,
      });
    }
  }
};

</script>

<style scoped lang="scss">
.cell-content {
  width: 5vw;
  text-align: right;
}

.balance {
  font-weight: 700;
}

.balance-positive {
  color: #66BB6A;
}
.balance-negative {
  color: #FF5252;
}
</style>