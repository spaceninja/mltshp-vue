<template>
  <div>
    <template v-if="shakes.length > 1">
      <button
        :aria-expanded="!isHidden"
        :disabled="saved"
        @click="toggleShakeMenu"
      >
        {{ saved ? 'Saved!' : 'Save' }}
      </button>
      <ul :hidden="isHidden">
        <li v-for="(shake, index) in shakes" :key="shake.id">
          <button
            :aria-describedby="error ? 'save-button-error' : null"
            @click="saveToShake(index)"
          >
            Save to
            {{ shake.type === 'user' ? 'Your Shake' : shake.name }}
          </button>
        </li>
      </ul>
    </template>
    <template v-else-if="shakes.length === 1">
      <button
        :disabled="saved"
        :aria-describedby="error ? 'save-button-error' : null"
        @click="saveToShake(0)"
      >
        {{ saved ? 'Saved!' : 'Save' }}
      </button>
    </template>
    <span v-if="error" id="save-button-error" class="error">{{ error }}</span>
  </div>
</template>

<script>
export default {
  props: {
    sharekey: {
      type: String,
      required: true,
    },
    saved: {
      type: Boolean,
      default: false,
    },
    shakes: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      error: null,
      isHidden: true,
    };
  },
  methods: {
    toggleShakeMenu() {
      this.isHidden = !this.isHidden;
    },
    saveToShake(index) {
      console.log(
        `Save ${this.sharekey} in ${this.shake && this.shakes[index].id}`
      );
      this.$store
        .dispatch('post/toggleSave', {
          sharekey: this.sharekey,
          shakeId: this.shakes[index].id,
        })
        .then(() => (this.isHidden = true))
        .catch(error => (this.error = error));
    },
  },
};
</script>
