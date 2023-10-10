<script setup>
import { inject, onMounted, provide, ref, watch } from 'vue';
import useAddress from './composables/address'
import ModalComponent from './ModalComponent.vue';
import ShowResponse from './ShowResponse.vue'
const { addresses, error, getAddress, deleteAddress } = useAddress();


onMounted(() => {
    getAddress();
})

const check = ref(false) ;
provide('check', check) ;
watch(check, () => {
   getAddress() ;
})

const update = inject('update')
watch(update, () => {
    console.log("update", update);
})

const serverRes = ref(null) ;
provide('serverRes', serverRes)

async function deleteData(id) {
    const { response } = await deleteAddress(id);
    serverRes.value = response.config.method ;
    await getAddress();
}

</script>

<template>
    <div class="d-flex flex-column align-items-center justify-content-center gap-2 card-container">

        <!-- Modal -->
        <ModalComponent/>
        
        <ShowResponse  :result="serverRes"/>

        <div v-if="addresses" class="d-flex flex-column align-items-center gap-4 w-100 py-3">

            <div class="card text-center border-info card-width" v-for="(address) in addresses" :key="address.id">
                <div class="card-body">
                    <h5 class="card-title">{{ address.firstName }} {{ address.lastName }} </h5>
                    <p class="card-text mb-0">{{ address.street1 }}, {{ address.street2 }},</p>
                    <p class="card-text mb-0">{{ address.city }} - {{ address.pincode }}.</p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <div class="btn btn-success" data-bs-toggle="modal" @click="update = address" data-bs-target="#exampleModal">Update</div>
                    <div class="btn btn-danger" @click="deleteData(address.id)">Delete</div>
                </div>
            </div>
        </div>

        <div v-else-if="error">
            {{ error.message }}
        </div>

        <div v-else>
            <button class="btn btn-primary" type="button" disabled>
                <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                <span role="status">Loading...</span>
            </button>
        </div>
    </div>
</template>

<style scoped>
/* .card-container {
    min-height: calc(100vh -80px);
} */

.card-width {
    width: 100%;
}

@media screen and (min-width: 576px) {
    .card-width {
        width: 30rem;
    }
}
</style>