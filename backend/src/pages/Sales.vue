<template>
  <h2>Sales</h2>

  <div class="card">
    <Toolbar class="mb-4">
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
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[5,10,25]"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
      responsiveLayout="scroll"
    >
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
