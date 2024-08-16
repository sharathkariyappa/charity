<script lang='ts' >
  import { onMount } from 'svelte';
  export let form;
  export let data;
  let verificationCode = 0; 
  let code = 0;

  let name = '';
  let email = '';
  let password = '';
  let passwordConfirm = '';
  let errorMessage = '';
  let showVerificationModal = false;
  let showSuccessModal = false;

  async function verification(event){
    event.preventDefault();
    if (password !== passwordConfirm) {
      errorMessage = 'Passwords do not match.';
      return;
    }
    verificationCode = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    const response = await fetch('/auth/verification', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, verificationCode })
    });

    const result = await response.json();

    if (!response.ok) {
      errorMessage = result.message;
      return;
    }

   

    showVerificationModal = true;
    console.log('Verification code sent:', verificationCode);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(verificationCode,code,email,password);
    if (verificationCode === code) {
      try {
        const response = await fetch('/auth/register', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, password,passwordConfirm })
        });

        const result = await response.json();

        if (!response.ok) {
          errorMessage = result.message;
          return;
        }

        // Show success modal
        showSuccessModal = true;
        console.log('Registration successful:', result);
      } catch (error) {
        console.error('Error:', error);
        errorMessage = 'Something went wrong. Please try again.';
      }
    } else {
      errorMessage = 'Code is not verified.';
    }
  }

  function closeModal() {
    showVerificationModal = false;
  }
</script>

<style>
  .modal123 {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal-content123 {
    background: white;
    padding: 2rem;
    border-radius: 0.5rem;
    text-align: center;
  }

  
</style>



{#if showVerificationModal}
  <div class="modal123">
    <div class="modal-content123">
      <h3 class="text-2xl font-bold mb-4">Verification</h3>
      <p>Please enter the 6 digit verification code.</p>
      <form on:submit={handleSubmit}>
        <input type="number" bind:value={code} class="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" required>
        <button  type="submit" class="   hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mt-4">
          Verify
        </button>
      </form>
    </div>
  </div>
{/if}

{#if showSuccessModal}
  <div class="modal123">
    <div class="modal-content123">
      <h3 class="text-2xl font-bold mb-4">Success!</h3>
      <p>Registration completed successfully.</p>
      <a href="/details" class="bg-slate-900 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mt-4" on:click={() => showSuccessModal = false}>
        Next 
      </a>
    </div>
  </div>
{/if}






<div class="hero bg-base-200 min-h-screen " style="background-image: url(https://images.stockcake.com/public/3/1/f/31fa6dfc-6376-4b0a-a2ee-a53c84e81856_large/joyful-charity-run-stockcake.jpg);">
  <div class="hero-overlay bg-opacity-60"></div>
  <div class="hero-content justify-between   flex-col lg:flex-row-reverse">
    <div class="text-center w-[30%]  font-bold lg:text-left">
      
      
        <h1 class="text-5xl font-bold">Login now!</h1>
      <p class="py-6">
        Charity is the selfless act of giving to those in need, driven by compassion and the desire to make a positive impact in the world.
      </p>
    </div>
    <div class="text-base-content w-[50%] flex items-center justify-center h-screen">
      <div class="w-full max-w-md bg-base-100 p-8 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-6  text-center">Register</h2>
        <form on:submit={verification}>
          <div class="mb-4">
            <label for="name" class="block  text-sm font-bold mb-2">Name</label>
            <input type="text" id="name" name="name" bind:value={name} class="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your name" required>
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-bold mb-2">Email</label>
            <input type="email" id="email" name="email" bind:value={email} class="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your email" required>
          </div>
          <div class="mb-4">
            <label for="password" class="block  text-sm font-bold mb-2">Password</label>
            <input type="password" id="password" name="password" bind:value={password} class="shadow appearance-none border rounded w-full py-2 px-3   leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your password" required>
          </div>
          <div class="mb-6">
            <label for="confirmPassword" class="block  text-sm font-bold mb-2">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" bind:value={passwordConfirm} class="shadow appearance-none border rounded w-full py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="Confirm your password" required>
          </div>
          {#if errorMessage}
            <p class="text-red-500 text-xs italic mb-4">{errorMessage}</p>
          {/if}
          <div class="flex items-center justify-between">
            <button type="submit" class=" bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>






