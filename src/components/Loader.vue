<template>
    <div class="spinner_wrapper">
        <font-awesome-icon spin :icon="['far', spinnerIcon]" :size="size || '3x'" />
    </div>
</template>

<script>
export default {
    name: 'Loader',
    props: {
        size: String,
        icon: String
    },
    computed: {
        spinnerIcon() {
            return this.icon || 'spinner-third';
        }
    }
};
</script>

<style >
.fa-spin {
    animation: fa-spin 0.7s infinite linear;
}
</style>
<style scoped>
.spinner_wrapper {
    height: 100%;
    width: 100%;
    z-index: 5000;
    position: absolute;
    top: 0;
    left: 0;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
}
</style>