import { createApp } from 'vue';
import VueRouter from './router';
import App from './App.vue';

// PrimeVue
import PrimeVue from 'primevue/config';
import Badge from 'primevue/badge';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import DropDown from 'primevue/dropdown';
import FileUpload from 'primevue/fileupload';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Toolbar from 'primevue/toolbar';

import 'primevue/resources/themes/bootstrap4-dark-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

const app = createApp(App);

app.use(VueRouter);
app.use(PrimeVue);
app.use(ToastService);

app.component('Badge', Badge);
app.component('Button', Button);
app.component('Card', Card);
app.component('Column', Column);
app.component('DataTable', DataTable);
app.component('Dialog', Dialog);
app.component('Dropdown', DropDown);
app.component('FileUpload', FileUpload);
app.component('InputNumber', InputNumber);
app.component('InputText', InputText);
app.component('Password', Password);
app.component('Textarea', Textarea);
app.component('Toast', Toast);
app.component('Toolbar', Toolbar);


app.mount('#app')
