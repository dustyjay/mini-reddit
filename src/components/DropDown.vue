<template>
  <component
    @click="showTip"
    tabindex="0"
    :is="tag"
    class="dropdown__box"
    @blur="hideTip"
    ref="element"
  >
    <!-- <span v-html="title"></span> -->
    <input
      type="text"
      v-model="selectedRange"
      class="dropdown__input"
      :placeholder="placeholder"
    />
    <transition name="dropdown" mode="out-in">
      <ul v-if="show || stayOpen" class="dropdown" role="alert">
        <li
          v-for="(option, i) in options"
          :key="i"
          class="dropdown__item"
          @click="selectRange(i)"
        >
          {{ option.min | number }} - {{ option.max | number }}
          <span v-if="i + 1 === options.length">+</span>
        </li>
        <li class="dropdown__item dropdown__item--inputs">
          <div class="dropdown__item--input-box">
            <input
              class="dropdown__item--input"
              type="number"
              v-model="min"
              @input="emitRange"
              @focus="emitRange"
              @blur="closeRange"
              ref="min"
              placeholder="Min Upvote"
            />
            <input
              class="dropdown__item--input"
              type="number"
              v-model="max"
              @input="emitRange"
              @focus="emitRange"
              @blur="closeRange"
              ref="max"
              placeholder="Max Upvote"
            />
          </div>
        </li>
      </ul>
    </transition>
  </component>
</template>

<script>
export default {
  name: "dropdown",
  props: {
    tag: {
      type: String,
      default: "div"
    },
    title: {
      type: String,
      default: () => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 1C4.13438 1 1 4.13438 1 8C1 11.8656 4.13438 15 8 15C11.8656 15 15 11.8656 15 8C15 4.13438 11.8656 1 8 1ZM8 13.8125C4.79063 13.8125 2.1875 11.2094 2.1875 8C2.1875 4.79063 4.79063 2.1875 8 2.1875C11.2094 2.1875 13.8125 4.79063 13.8125 8C13.8125 11.2094 11.2094 13.8125 8 13.8125Z" fill="#8A939A"/>
                <path d="M7.25 5.25C7.25 5.44891 7.32902 5.63968 7.46967 5.78033C7.61032 5.92098 7.80109 6 8 6C8.19891 6 8.38968 5.92098 8.53033 5.78033C8.67098 5.63968 8.75 5.44891 8.75 5.25C8.75 5.05109 8.67098 4.86032 8.53033 4.71967C8.38968 4.57902 8.19891 4.5 8 4.5C7.80109 4.5 7.61032 4.57902 7.46967 4.71967C7.32902 4.86032 7.25 5.05109 7.25 5.25V5.25ZM8.375 7H7.625C7.55625 7 7.5 7.05625 7.5 7.125V11.375C7.5 11.4438 7.55625 11.5 7.625 11.5H8.375C8.44375 11.5 8.5 11.4438 8.5 11.375V7.125C8.5 7.05625 8.44375 7 8.375 7Z" fill="#8A939A"/>
                </svg>
            `
    },
    options: {
      type: Array
    },
    placeholder: {
      type: String
    }
  },
  data() {
    return {
      show: false,
      stayOpen: false,
      selectedRange: "",
      min: "",
      max: ""
    };
  },
  methods: {
    showTip() {
      if (!this.isInputFocused()) {
        this.$refs.element.focus();
      }
      this.show = true;
    },
    hideTip() {
      setTimeout(() => {
        if (this.isInputFocused()) {
          this.stayOpen = true;
        } else {
          this.$refs.element.blur();
          this.stayOpen = false;
        }
        this.show = false;
      }, 500);
    },
    selectRange(index) {
      const option = this.options[index];
      this.min = option.min;
      this.max = option.max;
      this.emitToParent();
      this.hideTip();
    },
    emitToParent() {
      this.selectedRange = `${this.$options.filters.number(this.min)} - ${
        this.max ? this.$options.filters.number(this.max) : "∞"
      } Upvotes`;
      this.$emit("range", { min: this.min, max: this.max });
    },
    emitRange() {
      this.stayOpen = true;
      this.emitToParent();
    },
    closeRange() {
      console.log(this.isInputFocused());
      this.hideTip();
    },
    isInputFocused() {
      const minInput = this.$refs.min;
      const maxInput = this.$refs.max;
      return (
        document.activeElement === minInput ||
        document.activeElement === maxInput
      );
    }
  },
  mounted() {
    this.$refs.element.focus();
  }
};
</script>
