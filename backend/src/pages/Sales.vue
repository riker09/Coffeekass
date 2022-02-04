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
      v-model:filters="filters"
      filterDisplay="menu"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[5,10,25]"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
      responsiveLayout="scroll"
    >
      <Column :expander="true" :exportable="false" headerStyle="width: 3rem" />

      <Column filterField="createdAt" dataType="date" header="Created At" sortable>
        <template #body="slotProps">
          {{ formatDateTime(slotProps.data.createdAt) }}
        </template>

        <template #filter="{filterModel}">
          <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />
        </template>
      </Column>

      <Column field="totalNbProducts" filterField="totalNbProducts" dataType="numeric" header="Nb. Products" sortable>
        <template #filter="{filterModel}">
          <InputNumber v-model="filterModel.value" decimal="numeric" />
        </template>
      </Column>

      <Column filterField="total" dataType="numeric" header="Total" sortable>
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.total) }}
        </template>

        <template #filter="{filterModel}">
          <InputNumber v-model="filterModel.value" mode="currency" currency="EUR" locale="de-DE" />
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
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { formatCurrency, formatDateTime } from '../helpers';

const dt = ref();
const filters = ref({
  'createdAt': { operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.DATE_IS}] },
  'totalNbProducts': { operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}] },
  'total': { operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}] },
});
const expandedRows = ref([]);

const exportCSV = () => {
  dt.value.exportCSV();
};

</script>
