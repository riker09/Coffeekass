<template>
  <h2>Sales</h2>

  <div class="card">
    <Toolbar class="mb-4">
      <template #start>
        <!-- <Button label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" /> -->
        <!-- <Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" /> -->
      </template>

      <template #end>
        <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV()"  />
      </template>
    </Toolbar>

    <DataTable
      ref="dt"
      dataKey="id"
      v-model:expandedRows="expandedRows"
      :value="salesService.sales"
      :paginator="true"
      :rows="10"
      :filters="filters"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[5,10,25]"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
      responsiveLayout="scroll"
    >
      <template #header>
        <div class="table-header flex flex-column md:flex-row md:justify-content-between">
          <span class="p-input-icon-left">
            <i class="pi pi-search"></i>
            <InputText v-model="filters['global'].value" @keyup.esc="filters['global'].value=''" placeholder="Search..." />
          </span>
        </div>
      </template>

      <Column :expander="true" :exportable="false" headerStyle="width: 3rem" />

      <Column field="createdAt" header="Created At" :sortable="true">
        <template #body="slotProps">
          {{ formatDateTime(slotProps.data.createdAt) }}
        </template>
      </Column>

      <Column field="totalNbProducts" header="Nb. Products" :sortable="true"></Column>

      <Column field="total" header="Total" :sortable="true">
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.total) }}
        </template>
      </Column>

      <!-- Expandable row -->
      <template #expansion="slotProps">
        <div class="orders-subtable">
          <h5>Products</h5>
          <DataTable :value="slotProps.data.items" responsiveLayout="scroll">
            <Column field="product.name" header="Product"></Column>
            <Column field="product.price" header="Price">
              <template #body="priceSlotProps">
                {{ formatCurrency(priceSlotProps.data.product.price) }}
              </template>
            </Column>
            <Column field="qty" header="Qty"></Column>
            <Column header="Row Total">
              <template #body="priceSlotProps">
                {{ formatCurrency(priceSlotProps.data.product.price * priceSlotProps.data.qty) }}
              </template>
            </Column>
          </DataTable>
        </div>
      </template>

    </DataTable>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import salesService from '../service/SalesService';
import { FilterMatchMode } from 'primevue/api';
import { DataTableFilterMetaData } from 'primevue/datatable';
import { formatCurrency, formatDateTime } from '../helpers';

const dt = ref();
const filters = ref({
  global: {
    value: '',
    matchMode: FilterMatchMode.CONTAINS,
  } as DataTableFilterMetaData,
});
const expandedRows = ref([]);

const exportCSV = () => {
  dt.value.exportCSV();
};

</script>
