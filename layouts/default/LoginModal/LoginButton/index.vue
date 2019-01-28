<template>
  <div class="login-button" @click=onClick>
    <div>
      <div class="icon">
        <div v-if="type === 'facebook'" class="facebook-icon"></div>
        <div v-if="type === 'google'" class="google-icon"></div>
        <a-icon v-if="type === 'twitter'" type="twitter" class="twitter-icon"></a-icon>
        <a-icon v-if="type === 'email'" type="mail" class="email-icon"></a-icon>
      </div>
      <span class="title">{{ title }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login-button",
    props: {
      type: String, // "facebook", "google", "twitter", "email"
      title: {
        type: String
      },
    },
    methods: {
      onClick() {
        if (this.type === 'facebook') {
          this.$mobx.account.loginByFacebook()
        } else if (this.type === 'google') {
          this.$mobx.account.loginByGoogle()
        } else if (this.type === 'twitter') {
          this.$mobx.account.loginByTwitter()
        } else {
          this.$emit('on-click')
        }
      }
    }
  }
</script>

<style lang="less">
  .login-button {
    background-color: #fff;
    padding: 3px 10px;
    display: inline-block;
    border-radius: 5px;
    border: 1px solid #d9d9d9;
    cursor: pointer;
    margin-bottom: 10px;

    > div {
      width: 250px;
      height: 35px;
      flex-direction: row;
      justify-content: stretch;
      align-items: center;
      display: flex;
      padding-left: 35px;

      .title {
        text-align: left;
        flex: 1;
        font-weight: 500;
      }

      .icon {
        margin: 5px 5px 0 0;
      }

      .facebook-icon {
        background-image: url('/static/images/facebook-icon.png');
        background-size: contain;
        width: 18px;
        height: 18px;
        margin: -2px 3px 0 3px;
      }

      .google-icon {
        background-image: url('/static/images/google-icon.png');
        background-size: contain;
        width: 24px;
        height: 24px;
        margin: -2px 0px 0 0px;
      }

      .twitter-icon {
        color: rgb(8, 160, 233);
        font-size: 18px;
        margin: -2px 3px 0 3px;
      }

      .email-icon {
        font-size: 18px;
        margin: -2px 3px 0 3px;
      }

    }
    
  }
</style>
