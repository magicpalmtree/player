<template>
  <span @click="$emit('click')">
    <font-awesome-icon v-if="!loading" :icon="iconName" :size="size"/>
    <!-- <spinner v-else :size="spinnerSize" style="margin-right: 10px" :background="spinnerBg"/> -->
  </span>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    size: {
      type: String,
      description:
        'https://fontawesome.com/how-to-use/on-the-web/styling/sizing-icons',
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
    },
    icon: {
      type: Array,
      description:
        "When not using the regular font family use icon to pass in a array for the icon ex. ['fas', 'spinner'], when using this you need to import the icon in the icons library",
    },
    spinnerBg: { type: String },
  },
  computed: {
    spinnerSize() {
      switch (this.size) {
        case 'xs':
          return '.75em';
        case 'sm':
          return '.875em';
        case 'lg':
          return '1.33em';
        case '2x':
          return '2em';
        case '3x':
          return '3em';
        case '4x':
          return '4em';
        case '5x':
          return '5em';
        case '6x':
          return '6em';
        case '7x':
          return '7em';
        case '8x':
          return '8em';
        case '9x':
          return '9em';
        case '10x':
          return '10em';
        default:
          return '.75em';
      }
    },
    iconName() {
      const _icon = this.icon || this.name;
      if (Array.isArray(_icon) && _icon.length) return _icon;
      return ['far', _icon];
    },
  },
};
</script>
