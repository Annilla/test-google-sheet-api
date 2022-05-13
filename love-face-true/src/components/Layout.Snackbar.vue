<template>
  <v-snackbar v-model="snackbar">
    <span class="text-white">{{ text }}</span>

    <template v-slot:actions>
      <v-btn color="primary" variant="text" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    snackbar: false,
    text: "",
  }),
  watch: {
    message: {
      handler(newVal) {
        if (newVal) {
          this.show(newVal);
        }
      },
    },
  },
  methods: {
    show(e) {
      this.snackbar = false;
      setTimeout(()=>{
        this.text = e.text;
        this.snackbar = true;
      }, 500);
    },
  },
};
</script>