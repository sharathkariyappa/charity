<script>
    import logo from '$lib//favicon.png';
    import chain from '$lib//chain.jpg';
    import jar from '$lib//jar.jpg';
    import jar2 from '$lib//jar2.jpg';
 
    import donation from '$lib//donation.jpeg';
    import cookies from 'js-cookie';
    import { onMount } from 'svelte';
  
    let token = '';
    let token1 = '';
   
  
    // Retrieve the token on mount
    onMount(() => {
      token = cookies.get('token') || '';
      token1 = cookies.get('donor') || '';
    });
</script>

<style>
  a{
    text-decoration: none;
  }
</style>
<svelte:head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
</svelte:head>



<div  class=" bg-base-100 text-base-content  p-5  hero min-h-screen shadow-lg shadow-black flex flex-col justify-start items-center m-0 h-[100vh]" >
    
    <div class="w-[70%] p-3 bg-base-300 ring-2 rounded-2xl artboard artboard-horizontal phone-5 h-[70vh] justify-between flex flex-row  mt-12 " >
        <div class="w-[40%] bg-base-300 rounded-xl   p-4 " >
            <h1 class="mt-12 font-bold text-2xl" >
                Secure Blockchain Donations
            </h1>
            <p>
                Transform your giving experience with our blockchain donation app. Ensure transparency, security, and impact with every contribution.
            </p>
           <section class="flex  justify-center items-center  flex-row  md:mt-24 gap-5" >
           {#if !token}
           <a href="/auth/login"
           class="   text-white  rounded-xl py-2 w-[35%] text-center bg-slate-800"
           id="button"
         >Login</a>
         <a href="/auth/register"
         class="bg-slate-800 text-white w-[35%] text-center py-2 rounded-xl"
         id="button"
       >Sign up</a>
       <a href="/charity" class="bg-slate-800 text-white w-[35%] text-center py-2 rounded-xl" >Charity</a>
         {/if}

         {#if token && (token1 != 'false')}
            <a href="/donor" class="cursor-pointer shadow-md shadow-black [border:none] py-[6px] bottom-3 relative px-[12px] text-white bg-slate-900 rounded-md flex flex-row items-start justify-start z-[2] hover:bg-darkslategray-100">donate</a>
         {/if}

         {#if token && (token1 === 'false')}
         <a href="/charity/charityprofile" class="cursor-pointer shadow-md shadow-black [border:none] py-[6px] bottom-3 relative px-[12px] text-white bg-slate-900 rounded-md flex flex-row items-start justify-start z-[2] hover:bg-darkslategray-100">Manage Donations</a>
      {/if}
         

           </section>
        </div>
        <img src={'https://img.freepik.com/free-photo/bottles-cash-with-coins-saving-money-concept_1150-12569.jpg?t=st=1722683128~exp=1722686728~hmac=7f93498013820c905048f20a05fd67eb1d1cf4ad33918379ce64e093e33539d2&w=826'} alt="" class='w-[50%] shadow-sm shadow-black rounded-2xl ' >
      
    </div>
</div>


<div  class=" bg-base-300  p-10 text-white flex flex-col  h-[100vh]" >
 
 <div class="bg-slate-400 absolute z-20 p-3 w-[65%]" >
  <h2>
    Revolutionizing Philanthropy: The Rise of Blockchain-Based Charity Applications
  </h2>

  <p>In recent years, blockchain technology has emerged as a transformative force across various industries, and the realm of philanthropy is no exception. Blockchain-based charity applications are redefining the way donations are managed, ensuring transparency, accountability, and efficiency. This innovative approach promises to build greater trust between donors and recipients, potentially increasing the overall impact of charitable efforts.
  </p>
 </div>

 <div class="w-[39%] bg-slate-500  z-10 h-[500px] relative  top-10 ml-auto" >
  <img class="h-[500px]" src={donation} alt="">
 </div>
 <div class="w-[50%] bg-slate-600 h-[800px] text-white  flex flex-col relative pt-[100px]  bottom-[300px] left-[150px] px-6 mr-auto" >
  
  <p>Blockchain ensures that all transactions are publicly recorded and immutable. Donors can trace their contributions from the moment they are made to the point of their utilization, fostering a sense of trust and confidence in the system. This transparency eliminates concerns about mismanagement and fraud.</p>
 </div>
 
  

</div>

<div  class="h-[100vh] bg-base-100 flex flex-col justify-center items-center text-base-content p-5" >
<fieldset class="w-[100%] ring-1 border-[1px] p-4 border-black shadow-md shadow-black  rounded-md" >
  <legend>Contact us</legend>
<label class="input input-bordered w-[70%] flex items-center gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    class="h-4 w-4 opacity-70">
    <path
      d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
    <path
      d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
  </svg>
  <input type="text" class="grow" placeholder="Email" />
</label>

<textarea
  placeholder="Write your message"
  class="textarea  h-[200px]  textarea w-[70%] border-[.1px] border-black mt-6"></textarea>

</fieldset>
</div>