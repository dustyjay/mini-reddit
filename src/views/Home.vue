<template>
  <div>
    <div class="loader" v-if="loading">
      <div>
        <img src="@/assets/img/loader.jpeg" alt="Just a minute" />
        <p>Just a minute 🙂</p>
      </div>
    </div>
    <template v-else>
      <div class="filters">
        <div class="search__box">
          <form @submit.prevent="searchPosts" class="search__form">
            <input
              type="search"
              class="search__input"
              placeholder="Search posts...."
              name="search"
              id="search"
              v-model="search"
              @input="searchPosts"
            />
          </form>
          <div class="search__advanced">
            <button class="" @click="toggleFilters">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.38985 5.92302C4.57841 6.19588 4.52204 5.96851 4.52204 11.4073C4.52204 11.894 5.07732 12.1726 5.46868 11.8815C7.14101 10.6206 7.47514 10.5114 7.47514 9.92164C7.47514 5.95827 7.42894 6.18116 7.60733 5.92302L10.323 2.2265H1.67419L4.38985 5.92302Z"
                  fill="white"
                />
                <path
                  d="M11.3489 0.301406C11.2519 0.115547 11.0616 0 10.8521 0H1.1453C0.692838 0 0.426611 0.510398 0.686158 0.88125C0.688291 0.884812 0.656697 0.84157 1.15772 1.52344H10.8396C11.2666 0.942352 11.552 0.691289 11.3489 0.301406Z"
                  fill="white"
                />
              </svg>

              <span>ADVANCED FILTERS</span>
            </button>
          </div>
        </div>
        <div class="filters__box" :class="{ active: showFilter }">
          <div class="filters__input">
            <input
              type="date"
              name="startDate"
              v-model="startDate"
              @change="searchPosts"
            />
          </div>
          <div class="filters__input">
            <input
              type="date"
              name="endDate"
              v-model="endDate"
              @change="searchPosts"
            />
          </div>
          <div class="filters__input">
            <input
              type="number"
              placeholder="Set Upvotes"
              name="upvote"
              v-model="minUpVote"
              @input="searchPosts"
            />
          </div>
        </div>
      </div>
      <template v-if="categories.length > 0">
        <PostCategory
          :category="category"
          v-for="(category, i) in categories"
          :key="i"
        />
      </template>
      <template v-else>
        <h3 class="form__empty">
          There are no posts
          {{
            this.showFilter
              ? "within the selected filters"
              : `with name ${search}`
          }}
        </h3>
      </template>
    </template>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    PostCategory: () => import("@/components/PostCategory.vue")
  },

  data() {
    return {
      categories: [],
      loading: false,
      search: "",
      startDate: "",
      endDate: "",
      minUpVote: "",
      showFilter: false,
      filteredPosts: []
    };
  },

  computed: {
    ...mapGetters(["getPosts"])
  },

  methods: {
    ...mapActions(["GET_POSTS"]),
    async sortCategories() {
      this.categories = [];
      await this.filterPosts();

      this.filteredPosts.map(post => {
        const title = post.data.subreddit;
        const index = this.categories.findIndex(post => post.title === title);

        if (index === -1) {
          const payload = {
            title,
            posts: [post]
          };

          this.categories.push(payload);
        } else {
          const item = this.categories[index];

          const payload = {
            title,
            posts: [...item.posts, post]
          };

          this.categories[index] = payload;
        }
      });
    },

    filterPosts() {
      this.filteredPosts = this.getPosts.filter(
        post =>
          post.data.name.toLowerCase().includes(this.search.toLowerCase()) &&
          this.compareStartDate(post.data.created * 1000) &&
          this.compareEndDate(post.data.created * 1000) &&
          post.data.ups >= +this.minUpVote
      );
    },

    compareStartDate(createdDate) {
      const start = new Date(new Date(createdDate).getTime());
      const stop = new Date(new Date(this.startDate).getTime()).setHours(
        0,
        0,
        0,
        0
      );
      return start >= stop;
    },

    compareEndDate(createdDate) {
      const start = new Date(new Date(createdDate).getTime()).setHours(
        0,
        0,
        0,
        0
      );
      const stop = new Date(this.endDate).getTime();
      return start <= stop;
    },

    searchPosts() {
      this.sortCategories();
    },
    toggleFilters() {
      this.showFilter = !this.showFilter;
    }
  },

  async mounted() {
    this.loading = true;
    const date = new Date();
    const fromDate = date.setDate(date.getDate() - 30);
    const today = new Date(new Date().setHours(23, 59, 59, 999)).toUTCString();
    this.startDate = this.$options.filters.inputDate(new Date(fromDate));
    this.endDate = this.$options.filters.inputDate(new Date(today));
    await this.GET_POSTS();
    this.loading = false;
    this.sortCategories();
    setTimeout(() => {
      this.showFilter = true;
    }, 1000);
    setTimeout(() => {
      this.showFilter = false;
    }, 3000);
  }
};
</script>
