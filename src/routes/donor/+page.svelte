<script lang="ts">
	import { redirect } from '@sveltejs/kit';
  import { writable } from 'svelte/store';
  import {  ButtonGroup, Modal, ModalBody, ModalFooter, ModalHeader, TabContent, TabPane } from '@sveltestrap/sveltestrap';
  export let form;

  
  let open = false;
  let size: 'xl' | undefined;

  const toggleXl = () => {
    showWallet = !showWallet;
  };

 
  // import Wallet from './wallet/+page.svelte';
  let loader  = false;

  const randomImages = ["https://img.freepik.com/free-photo/people-holding-rubber-heart_1150-18576.jpg?t=st=1722460989~exp=1722464589~hmac=d2ec29336b30bd1ccf8fcae1be89b8ff76f29bc2b3c0586376434d70dd4b7f0a&w=826","https://img.freepik.com/free-photo/beggars-sitting-street-with-homeless-messages-please-help_1150-22965.jpg?t=st=1722461089~exp=1722464689~hmac=cd9e075d75ab1450bd8eba406eb9878d8b62c85c4dd81bf53d48955db1130254&w=826","https://img.freepik.com/free-photo/portrait-volunteers-workshop_1170-1801.jpg?t=st=1722461149~exp=1722464749~hmac=08a1589a2d01611bf89dedb56710ec33106dd7f7975b5f49ad1b27d4ea9ea26d&w=826","https://img.freepik.com/free-photo/friends-volunteers-stack-boxes-inspection-humanitarian-aid-donations-poor_1157-46648.jpg?t=st=1722461182~exp=1722464782~hmac=25150c6e147e8b0c23bcc20360d627b0b6bbba7b0ea4fb44b2efc2a0bb8c4762&w=826","https://img.freepik.com/free-photo/guy-girl-with-check-boxes-volunteers-masks-boxes-with-humanitarian-aid_1157-46587.jpg?t=st=1722461209~exp=1722464809~hmac=d4f3226811c6afc9ba23933c56b87447a7b6d04670ce3db3d80117d5f1f672b6&w=826"]
  import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardSubtitle,
    CardText,
    CardTitle,
    Offcanvas
  } from '@sveltestrap/sveltestrap';
  import { onMount } from 'svelte';

  // Define types for charity and user objects
  interface Charity {
    id: string;
    name: string;
    mission: string;
    // add other properties as needed
  }
  let showWallet = false;

  interface User {
    name: string;
    paymail?: string;
    address: string;
    phoneNumber: string;
    salary: string;
    employment: string;
    emailVerified: boolean;
    dateOfBirth: string;
    email: string;
  }

  let charities = writable<Charity[]>([]);
  
  let donationsdata = writable<Charity[]>([]);
  let users = writable<User[]>([]);
  let isOpen = false;

  const toggle = () => {
    isOpen = !isOpen;
  };

  const logout = async () => {
    try {
      const response = await fetch('/auth/logout', {
        method: 'POST',
      });

      const result = await response.json();

      if (response.status !== 200) {
        alert('Logout error: ' + result.message);
      } else {
        alert('Logout successful');
        users.set([]); // Clear the users store
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('Logout error');
    }
  };
  const getdonations= async () => {
    const data = await fetch('/donor');

    if (!data.ok) {
      alert('Error');
    }
    const response = await data.json();
    donationsdata.set(response);
    console.log(response);
    
  };
  const getCharity = async () => {
    const data = await fetch('/charity/getcharity');
    if (!data.ok) {
      alert('Error');
    }
    const response = await data.json();
    charities.set(response);
    
  };

  const fetchUserData = async () => {
    const response = await fetch('/auth/users');
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    const result = await response.json();
    if (result.data && typeof result.data === 'object' && !Array.isArray(result.data)) {
      users.set([result.data]);
    }
  };
  onMount(async () => {
    await getCharity();
    try {
      await getdonations();
      await fetchUserData();
      loader=true;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  });
</script>

<div class="navbar bg-base-300  shadow-white  text-base-content">
  <a href='/'  class="flex-1 text-2xl no-underline ml-2">
    TrueCharity
  </a>
  
  <div class="flex-none gap-2">
    <div class="">
      <input type="text" placeholder="Search" class=" shadow-md mb-1 shadow-white input input-bordered w-24 md:w-auto" />
    </div>
    {#if $users.length > 0 && !$users[0].paymail}
    
      <Button color="dark" on:click={toggleXl}>Create wallet</Button>
    
        {/if}
    <label class="swap  swap-rotate">
      <!-- this hidden checkbox controls the state -->
      <input type="checkbox" class="theme-controller" value="garden" />
    
      <!-- sun icon -->
      <svg
        class="swap-off h-10 w-10 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24">
        <path
          d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
      </svg>
    
      <!-- moon icon -->
      <svg
        class="swap-on h-10 w-10 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24">
        <path
          d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
      </svg>
    </label>
    <div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn mr-3 btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabindex="0"
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        
        <li><Button  class=' btn-neutral'  on:click={toggle}>Show User Details</Button> 
        </li> 
        <li><Button   on:click={logout} class="mt-2 btn-neutral block border-t">
          Logout
        </Button></li>
      
        
      </ul>
    </div>
  </div>
</div>




{#if loader===false}
<div class = "bg-base-100 text-base-content fixed z-10  h-[100vh] justify-center items-center flex flex-col border-[1px] border-black w-[100%]">
  
<span class="loading loading-ring w-[30%]  loading-lg"></span>
</div>
{/if}

{#if showWallet}

<div class="p-4  bg-base-100 text-base-content"  >
  <div class="p-4  bg-base-100 text-base-content"  >
<form class="flex flex-col gap-4" method="POST" action="/donor/wallet?/signup">
<h1>Create Neucron Wallet</h1>
          <section class='w-[25%]'>
          <label  class="w-[100%]" for="signup-email">Email:</label>
          <input class='w-[100%]  py-1 my-2 ' type="text" name="email" id="email" required />
</section>
         <section class='w-[25%]'>
          <label class='w-[100%]' for="signup-password">Password:</label>
          <input class='w-[100%] py-1 my-2 '  type="text" name="password" id="password" required />
         </section> 
          <Button type='submit' class='w-[30%]' color='success'>Sign up</Button>
        </form>

 
  </div>
</div>
    
{/if}

<div class="h-[140vh] bg-base-100 text-base-content ">
  <h1>Charities</h1>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
    {#each $charities as charity}
      <!-- <Card body theme='dark' inverse>
        <CardHeader>
          <CardTitle>{charity.name}</CardTitle>
        </CardHeader>
        <CardBody>
          <Button href='/charity/{charity.id}'>Show Details</Button>
        </CardBody>
      </Card> -->
      <div class="card card-compact bg-base-100 w-96 shadow-xl">
        <script>
        </script>
        <figure>
          <img
            src={
          randomImages[Math.floor(Math.random() * randomImages.length)]}
            alt="Shoes" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{charity.name}</h2>
          <p>{charity.mission}</p>
          <div class="card-actions justify-end">
            <Button href='/charity/{charity.id}'>Show Details</Button>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div> 

 <Offcanvas theme='dark' placement='end' header="User Details" {isOpen} {toggle}>
  <div>
    {#each $users as user}
      <div>
        <h2>Name: {user.name}</h2>
        {#if user.paymail}
          <span>Paymail: <p>{user.paymail}</p></span>
        {/if}
        <span>Address: <p>{user.address}</p></span>
        <span>Phone Number: <p>{user.phoneNumber}</p></span>
        <span>Salary: <p>{user.salary}</p></span>
        <span>Employment: <p>{user.employment}</p></span>
        <span>Verification: <p>{user.emailVerified}</p></span>
        <span class="block">DOB: {user.dateOfBirth.substring(0, 10)}</span>
        
        <strong class="block mt-7 font-medium">
          {#each $users as user}
            <h2 class="over-flow:hidden">{user.email}</h2>
          {/each}
        </strong>
        
      </div>
    {/each}
  </div>
</Offcanvas>





<h1>Donations</h1>
<table class="table bg-base-300 w-[100%] text-base-content">
  <!-- head -->
  <thead>
    <tr>
      <th></th>
      <th>index</th>
      <th>txid</th>
      <th>Charity</th>
      <th>Amount</th>
      <th>tx link</th>
      <th>Proof</th>
    </tr>
  </thead>
  <tbody class="w-[100%]">
    {#each $donationsdata as donation,i}

  
    <tr class="bg-base-200">
      <th></th>
      <td>{i + 1}</td>
      <td>{donation.id}</td>
      <td>{donation.charity_id}</td>
      <td>{donation.amount}</td>
      <td><a href="https://whatsonchain.com/tx/{donation.id}">click here to see</a></td>
      <td>
        <a href={donation.proof}>see the proof</a>
      </td>
    </tr>
    {/each}
  </tbody>
</table>