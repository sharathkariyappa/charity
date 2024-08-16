<script>
  import { onMount } from 'svelte';
  export let form;
  export let data;

  let email = '';
  let password = '';
  let errorMessage = '';
  let showSuccessModal = false;

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();

      if (!response.ok) {
        errorMessage = result.message;
        return;
      }

      // Show success modal
      showSuccessModal = true;
      console.log('Login successful:', result,showSuccessModal);
      window.location.href = '/donor';
    } catch (error) {
      console.error('Error:', error);
      errorMessage = 'Something went wrong. Please try again.';
    }
  }

  function closeModal() {
    showSuccessModal = false;
  }
</script>

<style>
  
</style>







<div class="hero bg-base-200 min-h-screen " style="background-image: url(https://images.stockcake.com/public/3/1/f/31fa6dfc-6376-4b0a-a2ee-a53c84e81856_large/joyful-charity-run-stockcake.jpg);">
  <div class="hero-overlay bg-opacity-60"></div>
  <div class="hero-content justify-between   flex-col lg:flex-row-reverse">
    <div class="text-center w-[30%]  font-bold lg:text-left">
      
      
        <h1 class="text-5xl font-bold">Login now!</h1>
      <p class="py-6">
        Charity is the selfless act of giving to those in need, driven by compassion and the desire to make a positive impact in the world.
      </p>
    </div>
    <div class=" text-base-content text-white  bg-base-100 ml-10 p-10  w-[100%]  max-w-sm shrink-0 shadow-2xl">
      <form class="bg-base-100 text-base-content" on:submit|preventDefault={handleSubmit}>
        <div class="mb-4">
          <label for="email" class="block  text-sm font-bold mb-2">Email</label>
          <input type="email" id="email" name="email" bind:value={email} class="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your email" required>
        </div>
        <div class="mb-6">
          <label for="password" class="block  text-sm font-bold mb-2">Password</label>
          <input type="password" id="password" name="password" bind:value={password} class="shadow appearance-none border rounded w-full py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your password" required>
        </div>
        {#if errorMessage}
          <p class="text-red-500 text-xs italic mb-4">{errorMessage}</p>
        {/if}
        <div class="flex items-center justify-between">
          <button type="submit" class="bg-slate-900 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Login
          </button>
        </div>
      </form>
   
    </div>
  </div>
</div>






