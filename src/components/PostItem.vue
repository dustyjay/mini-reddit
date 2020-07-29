<template>
  <div class="post__item">
    <img class="post__item--img" :src="image" :alt="post.data.title" />
    <div class="post__item--text">
      <h4 class="post__item--title">{{ post.data.title }}</h4>
      <div class="post__item--sub">
        <div class="post__item--detail">
          <svg
            width="15"
            height="14"
            viewBox="0 0 15 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0)">
              <path
                d="M2.33589 6.125C1.53206 6.125 0.877563 6.7795 0.877563 7.58332V12.25C0.877563 13.0538 1.53206 13.7083 2.33589 13.7083H4.08589C4.41431 13.7083 4.71646 13.5975 4.96089 13.4131V6.125H2.33589Z"
                fill="#F93737"
              />
              <path
                d="M14.8776 8.3125C14.8776 7.96193 14.7388 7.63525 14.4978 7.39433C14.7703 7.09625 14.9091 6.69665 14.8711 6.28075C14.8029 5.53933 14.135 4.95833 13.3498 4.95833H9.74657C9.92507 4.4164 10.2109 3.423 10.2109 2.625C10.2109 1.35975 9.13582 0.291679 8.4609 0.291679C7.85482 0.291679 7.42197 0.632929 7.40332 0.646929C7.3345 0.702355 7.29425 0.786355 7.29425 0.875004V2.85308L5.61425 6.4925L5.54425 6.52808V12.7803C6.01907 13.0043 6.6199 13.125 7.00257 13.125H12.357C12.9923 13.125 13.5482 12.6968 13.6788 12.1059C13.7459 11.802 13.7068 11.4958 13.5733 11.2298C14.0043 11.0128 14.2943 10.5688 14.2943 10.0625C14.2943 9.856 14.247 9.65825 14.1572 9.47918C14.5883 9.26218 14.8776 8.81825 14.8776 8.3125Z"
                fill="#F93737"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect
                  width="14"
                  height="14"
                  fill="white"
                  transform="translate(0.877563)"
                />
              </clipPath>
            </defs>
          </svg>
          {{ post.data.ups }}
        </div>
        <div class="post__item--detail">
          {{ post.data.created | date }}
        </div>
      </div>
      <a
        :href="link"
        target="_blank"
        class="post__item--link"
        ref="noopener noreferrer"
      >
        View Post
        <svg
          width="15"
          height="14"
          viewBox="0 0 15 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0)">
            <path
              d="M13.9639 6.61289C13.9637 6.61273 13.9636 6.61254 13.9634 6.61237L11.1384 3.76863C10.9268 3.55559 10.5845 3.55638 10.3738 3.77048C10.1632 3.98456 10.164 4.33081 10.3756 4.54387L12.2723 6.45312H0.822625C0.524028 6.45312 0.281982 6.69796 0.281982 7C0.281982 7.30204 0.524028 7.54687 0.822625 7.54687H12.2723L10.3756 9.45612C10.164 9.66919 10.1632 10.0154 10.3738 10.2295C10.5845 10.4436 10.9268 10.4444 11.1384 10.2314L13.9634 7.38762C13.9636 7.38746 13.9637 7.38727 13.9639 7.3871C14.1756 7.17333 14.175 6.82596 13.9639 6.61289Z"
              fill="#F93737"
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect
                width="13.8404"
                height="14"
                fill="white"
                transform="translate(0.281982)"
              />
            </clipPath>
          </defs>
        </svg>
      </a>
    </div>
  </div>
</template>

<script>
import defaultImage from "@/assets/img/default.png";
export default {
  name: "PostItem",
  props: {
    post: Object
  },
  computed: {
    hasImage() {
      return (
        this.post.data.url.endsWith(".jpg") ||
        this.post.data.url.endsWith(".png")
      );
    },
    image() {
      if (this.hasImage) return this.post.data.url;
      return defaultImage;
    },
    link() {
      return `https://reddit.com${this.post.data.permalink}`;
    }
  }
};
</script>
