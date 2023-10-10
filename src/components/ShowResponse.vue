<script setup >
defineProps(['result'])
</script>

<template>
    <div>
        <div v-if="result === 'delete'" class="mb-0 alert alert-danger alert-dismissible fade show" role="alert">
            <p class="m-0">Address deleted successfully</p>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <div v-else-if="result === 'put'" class="mb-0 alert alert-success alert-dismissible fade show" role="alert">
            <p class="m-0">Address updated successfully</p>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <div v-else-if="result === 'post'" class="mb-0 alert alert-success alert-dismissible fade show" role="alert">
            <p class="m-0">Address added successfully</p>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    </div>
</template>

<style scoped>

</style>