<template>
  <div>
    <div class="loader" v-if="loading">
      <div>
        <img src="@/assets/img/loader.jpeg" alt="Just a minute" />
        <p>Just a minute 🙂</p>
      </div>
    </div>
    <PostCategory
      v-else
      :category="category"
      v-for="(category, i) in categories"
      :key="i"
    />
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
      categoryTitles: [],
      loading: false
    };
  },
  computed: {
    ...mapGetters(["getPosts"])
  },
  methods: {
    ...mapActions(["GET_POSTS"]),
    sortCategories() {
      this.getPosts.map(post => {
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
      console.log(this.categories, this.categories.length);
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
