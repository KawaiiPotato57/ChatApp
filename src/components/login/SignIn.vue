<template>
  <div class="container">
    <div class="logo-container">
      <img :src="ChatIcon" alt="Chat App Logo" class="logo" />
      <h1>Chat App</h1>
      <p style="font-weight: 400; font-size: small">Sign in to start chating.. :)</p>
    </div>
    <form @submit.prevent="handleSubmit" class="login-form">
      <div class="form-group">
        <label for="mobile">Mobile Number:</label>
        <input type="text" v-model="user.userMobileNo" id="mobile" name="mobile" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" v-model="user.password" id="password" name="password" required />
      </div>
      <div style="display: flex; justify-content: end">
        <button type="submit">Sign In</button>
      </div>
    </form>

    <div style="margin-top: 20px; text-align: center">
      <router-link to="/signup"
        ><span class="routerLink">Don't have an account? Sign Up </span></router-link
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import ChatIcon from '@/assets/chatIcon.png';
const router = useRouter();

const store = useStore();
interface User {
  userMobileNo: string;
  password: string;
}
const user = ref<User>({
  userMobileNo: '',
  password: ''
});

const handleSubmit = () => {
  try {
    store.dispatch('loginUser', user.value).then(() => {
      router.push('/');
    });
    user.value = {
      userMobileNo: '',
      password: ''
    };
  } catch (error) {
    console.log('Error in sign-in catch: ', error);
  }
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f1f1f1;
}
.routerLink {
  color: #0054ad;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
}
.container {
  margin: auto;
  padding: auto;
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.logo-container {
  text-align: center;
  margin-bottom: 20px;
}

.logo {
  width: 50px;
  height: 50px;
}

.login-form .form-group {
  margin-bottom: 15px;
}

.login-form label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.login-form input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-form button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
@media (max-width: 1200px) {
  .container {
    max-width: 90%;
  }
}

/* Medium screens, typically tablets */
@media (max-width: 992px) {
  .container {
    max-width: 85%;
    max-height: 80%;
  }
}

/* Small screens, typically large mobile devices */
@media (max-width: 768px) {
  .container {
    max-width: 80%;
    max-height: 80%;
  }
}

/* Extra-small screens, typically small mobile devices */
@media (max-width: 576px) {
  .container {
    padding-top: 30px;
    margin-top: 30px;
    max-width: 80%;
    max-height: 100%;
    margin-right: 45px;
  }

  .login-form input,
  .login-form button {
    padding: 6px;
  }

  .login-form .form-group {
    margin-bottom: 10px;
  }

  .logo {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 320px) {
  .container {
    padding-top: 30px;
    max-width: 70%;
    max-height: 100%;
  }

  .logo-container {
    margin-bottom: 15px;
  }

  .login-form label {
    font-size: 12px;
  }

  .logo {
    width: 30px;
    height: 30px;
  }
}
</style>
