<script setup>
import { inject, onMounted, reactive, watch } from 'vue';
import useAddress from './composables/address'
const { addAddress, updateAddress } = useAddress() ;

onMounted(() => {
    const forms = document.querySelectorAll('.needs-validation')
   
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})

const formData = reactive({
    firstName: '',
    lastName: '',
    street1: '',
    street2: '',
    city: '',
    pincode: ''
})

const check = inject('check')
const update = inject('update')

watch(update, () => {
    
    formData.firstName = update.value.firstName ;
    formData.lastName = update.value.lastName ;
    formData.street1 = update.value.street1 ;
    formData.street2 = update.value.street2 ;
    formData.city = update.value.city ;
    formData.pincode = update.value.pincode ;
})

const serverRes = inject('serverRes')

async function handleSubmit() {
    const fields = document.querySelectorAll('input') ;
    function checkInput() {
        const res = Array.from(fields).every((field) => field.value.length > 0)
        return res ;
    }
    if(checkInput()) {
        const { response } = update.value === false ? await addAddress(formData) :  await updateAddress(formData, update.value.id) ;
        serverRes.value = response.config.method ;
        check.value = !check.value  ;
    } 
}

</script>

<template>
    <form class="row g-3 needs-validation" @submit.prevent="handleSubmit" novalidate>
        <div class="col-md-6">
            <label for="validationCustom01" class="form-label">First name</label>
            <input type="text" class="form-control" id="validationCustom01" v-model.trim="formData.firstName" required>
            <div class="invalid-feedback">
                Please provide first name.
            </div>
        </div>
        <div class="col-md-6">
            <label for="validationCustom02" class="form-label">Last name</label>
            <input type="text" class="form-control" id="validationCustom02" v-model="formData.lastName" required>
            <div class="invalid-feedback">
                Please provide last name.
            </div>
        </div>
        <div class="col-md-6">
            <label for="validationCustom03" class="form-label">Street 1</label>
            <input type="text" class="form-control" id="validationCustom03" v-model="formData.street1" required>
            <div class="invalid-feedback">
                Please provide street1.
            </div>
        </div>
        <div class="col-md-6">
            <label for="validationCustom04" class="form-label">Street 2</label>
            <input type="text" class="form-control" id="validationCustom04" v-model="formData.street2" required>
            <div class="invalid-feedback">
                Please provide street2.
            </div>
        </div>
        <div class="col-md-6">
            <label for="validationCustom05" class="form-label">City</label>
            <input type="text" class="form-control" id="validationCustom05" v-model="formData.city" required>
            <div class="invalid-feedback">
                Please provide a city.
            </div>
        </div>
        <div class="col-md-6">
            <label for="validationCustom06" class="form-label">Pincode</label>
            <input type="text" class="form-control" id="validationCustom06" v-model.number="formData.pincode" required>
            <div class="invalid-feedback">
                Please provide a pincode.
            </div>
        </div>
        <div class="col-12 d-flex justify-content-end pt-3">
            <button class="btn btn-primary" type="submit">Submit form</button>
        </div>
    </form>
</template>

<style scoped></style>