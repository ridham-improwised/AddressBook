<script setup>
import { provide, ref, watch } from 'vue';
import CardData from './components/CardData.vue';
const update = ref();
provide('update', update);

watch(update, () => {
    console.log("update ", update);
})

</script>

<template>
    <div class="container gap-2 d-flex flex-column justify-content-center" style="min-height: 100vh;">
        <div class="position-relative">
            <h1 class="text-center mb-0 py-3">Address Book</h1>

            <button class="btn btn-primary position-absolute add-button" @click="update = false" data-bs-toggle="modal"
                data-bs-target="#exampleModal">
                Add
            </button>
        </div>
        <CardData />
    </div>
</template>

<style scoped>
.add-button {
    top: 50%;
    transform: translateY(-50%);
    right: 0;
}
</style>




