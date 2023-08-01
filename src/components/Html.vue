<template>
    <div v-html="element.html"></div>
</template>
<script>
    export default {
        name:'Html',
        props:{
            element:{
                required: true,
                type: Object
            }
        },
    }
</script>