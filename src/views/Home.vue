<template>
  <div>
    <div class="loader" v-if="loading">
      <div>
        <img src="@/assets/img/loader.jpeg" alt="Just a minute" />
        <p>Just a minute 🙂</p>
      </div>
    </div>
    <template v-else>
      <div class="search__box">
        <form @submit.prevent="searchPosts">
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
          There are no posts related to
          <strong>{{ search }}</strong>
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
      search: ""
    };
  },
  computed: {
    ...mapGetters(["getPosts"]),
    filteredPosts() {
      if (!this.search) return this.getPosts;
      return this.getPosts.filter(post =>
        post.data.name.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },
  methods: {
    ...mapActions(["GET_POSTS"]),
    sortCategories() {
      this.categories = [];
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
    searchPosts() {
      this.sortCategories();
    }
  },
  async mounted() {
    this.loading = true;
    await this.GET_POSTS();
    this.loading = false;
    this.sortCategories();
  }
};
</script>
