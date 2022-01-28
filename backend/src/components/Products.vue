<template>
  <div>
    <h2>Products ({{ productService.products.length }})</h2>

    <div class="card">
      <Toolbar class="mb-4">
        <template #start>
          <Button label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
          <Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
        </template>

        <template #end>
          <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" />
          <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV()"  />
        </template>
      </Toolbar>

      <DataTable
        ref="dt"
        :value="productService.products"
        v-model:selection="selectedProducts"
        dataKey="id"
        :paginator="true"
        :rows="10"
        :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5,10,25]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
        responsiveLayout="scroll"
      >
        <template #header>
          <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
            <h5 class="mb-2 md:m-0 p-as-md-center">Manage Products</h5>
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="filters['global'].value" @keyup.esc="filters['global'].value=''" placeholder="Search..." />
            </span>
          </div>
        </template>

        <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
        <Column field="name" header="Name" :sortable="true" style="min-width:16rem"></Column>
        <Column header="Image">
            <template #body="slotProps">
            <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" :alt="slotProps.data.image" class="product-image" />
          </template>
        </Column>
        <Column field="price" header="Price" :sortable="true" style="min-width:8rem">
          <template #body="slotProps">
            {{formatCurrency(slotProps.data.price)}}
          </template>
        </Column>
        <Column field="inventoryStatus" header="Status" :sortable="true" style="min-width:12rem">
          <template #body="slotProps">
            <Badge :severity="inventoryStatusSeverityMap[slotProps.data.inventoryStatus as 'instock' | 'lowstock' | 'outofstock'] || '' ">
              {{ slotProps.data.inventoryStatus || 'unknown' }}
            </Badge>
          </template>
        </Column>
        <Column :exportable="false" style="min-width:8rem">
          <template #body="slotProps">
            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editProduct(slotProps.data)" />
            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteProduct(slotProps.data)" />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog v-model:visible="productDialog" :style="{width: '450px'}" header="Product Details" :modal="true" class="p-fluid">
      <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" :alt="product.image" class="product-image" v-if="product.image" />
      <div class="field">
        <label for="name">Name</label>
        <InputText id="name" v-model.trim="product.name" required="true" autofocus :class="{'p-invalid': submitted && !product.name}" />
        <small class="p-error" v-if="submitted && !product.name">Name is required.</small>
      </div>
      <div class="field">
        <label for="description">Description</label>
        <Textarea id="description" v-model="product.description" required="true" rows="3" cols="20" />
      </div>

      <div class="field">
        <label for="inventoryStatus" class="mb-3">Inventory Status</label>
        <Dropdown id="inventoryStatus" v-model="product.inventoryStatus" :options="statuses" optionLabel="label" placeholder="Select a Status">
          <template #value="slotProps">
            <div v-if="slotProps.value && slotProps.value.value">
              <span :class="'product-badge status-' +slotProps.value.value">{{slotProps.value.label}}</span>
            </div>
            <div v-else-if="slotProps.value && !slotProps.value.value">
              <span :class="'product-badge status-' +slotProps.value.toLowerCase()">{{slotProps.value}}</span>
            </div>
            <span v-else>
              {{slotProps.placeholder}}
            </span>
          </template>
        </Dropdown>
      </div>

      <div class="formgrid grid">
        <div class="field col">
          <label for="price">Price</label>
          <InputNumber id="price" v-model="product.price" mode="currency" currency="USD" locale="en-US" />
        </div>
        <div class="field col">
          <label for="quantity">Quantity</label>
          <InputNumber id="quantity" v-model="product.quantity" integeronly />
        </div>
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
      </template>
    </Dialog>

    <Dialog v-model:visible="deleteProductDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="product">Are you sure you want to delete <b>{{product.name}}</b>?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductDialog = false"/>
        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteProduct" />
      </template>
    </Dialog>

    <Dialog v-model:visible="deleteProductsDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="product">Are you sure you want to delete the selected products?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductsDialog = false"/>
        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteSelectedProducts" />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useToast } from 'primevue/usetoast';
import productService from '../service/ProductService';
import { InventoryStatusType, IProduct } from '../interfaces/i-product';
import { DataTableFilterMetaData, DataTableOperatorFilterMetaData } from 'primevue/datatable';

class Product implements IProduct {
  id: string = '';
  name: string = '';
  description?: string;
  image?: string;
  price: number = 0;
  quantity: number = 0;
  inventoryStatus?: 'instock' | 'lowstock' | 'outofstock';
}

const dt = ref();
const toast = useToast();
const products = ref<Product[]>([]);
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref<Product>(new Product());
const selectedProducts = ref();
// const filters = ref({
//   global: { value: '', matchMode: FilterMatchMode.CONTAINS },
// });
const filters = ref({
  global: {
    value: '',
    matchMode: FilterMatchMode.CONTAINS,
  } as DataTableFilterMetaData,
});
const submitted = ref(false);
const statuses = ref([
  { label: 'INSTOCK', value: 'instock' },
  { label: 'LOWSTOCK', value: 'lowstock' },
  { label: 'OUTOFSTOCK', value: 'outofstock '}
]);

type InventoryStatusMapType = { [key in InventoryStatusType]: 'success'|'warning'|'danger' };
const inventoryStatusSeverityMap: InventoryStatusMapType = {
  instock: 'success',
  lowstock: 'warning',
  outofstock: 'danger',
};

const formatCurrency = (value: string) => {
  if (value) {
    // return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return value.toLocaleString();
  }
  return;
};

const openNew = () => {
  product.value = new Product();
  submitted.value = false;
  productDialog.value = true;
};

const hideDialog = () => {
  productDialog.value = false;
  submitted.value = false;
};

const saveProduct = () => {
  submitted.value = true;

  if (product.value.name.trim()) {
    if (product.value.id) {
      products.value[findIndexById(product.value.id)] = product.value;
      toast.add({
        severity:'success',
        summary: 'Successful',
        detail: 'Product Updated',
        life: 3000
      });
    } else {
      product.value.id = createId();
      product.value.image = 'product-placeholder.svg';
      products.value.push(product.value);
      toast.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
    }

    productDialog.value = false;
    product.value = new Product();
  }
};

const editProduct = (prod: IProduct) => {
  product.value = { ...prod };
  productDialog.value = true;
};

const confirmDeleteProduct = (prod: IProduct) => {
  product.value = prod;
  deleteProductDialog.value = true;
};

const deleteProduct = () => {
  products.value = products.value.filter(val => val.id !== product.value.id);
  deleteProductDialog.value = false;
  product.value = new Product();
  toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
};

const findIndexById = (id: string) => {
  let index = -1;
  for (let i = 0; i < products.value.length; i++) {
    if (products.value[i].id === id) {
      index = i;
      break;
    }
  }

  return index;
};

const createId = () => {
  let id = '';
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for ( var i = 0; i < 5; i++ ) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

const exportCSV = () => {
  dt.value.exportCSV();
};

const confirmDeleteSelected = () => {
  deleteProductsDialog.value = true;
};

const deleteSelectedProducts = () => {
  products.value = products.value.filter(val => !selectedProducts.value.includes(val));
  deleteProductsDialog.value = false;
  selectedProducts.value = null;
  toast.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
};
</script>

<style lang="scss" scoped>
.table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 960px) {
        align-items: start;
  }
}

.product-image {
    width: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .product-image {
    width: 50px;
    margin: 0 auto 2rem auto;
    display: block;
}

.confirmation-content {
    display: flex;
    align-items: center;
    justify-content: center;
}
@media screen and (max-width: 960px) {
  ::v-deep(.p-toolbar) {
    flex-wrap: wrap;

    .p-button {
            margin-bottom: 0.25rem;
        }
  }
}

.p-badge {
  border-radius: 2px;
  text-transform: uppercase;
  background: #ddd;
}
</style>
