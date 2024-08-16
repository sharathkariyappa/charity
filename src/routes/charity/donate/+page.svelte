<script lang="ts">

/** @type {import('./$types').ActionData} */
    export let form;
    </script>
    
  
    <div
    class="mt-10 pt-10 w-full max-w-xl p-12 mx-auto rounded-lg shadow-xl bg-base-100 text-base-content ring-1 backdrop-blur-lg"
  >
    <form class="bg-base-100 text-base-content" method="POST" action="?/login">
      <h1>Balance Check</h1>
      <p>check you balance before donating</p>
      <div class="flex flex-row  items-end -mx-3 mb-2">
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide  text-xs font-bold mb-2"
                for="email"
              >
                Email
              </label>
              <input
                class="appearance-none block w-full border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="email"
                type="text"
                placeholder="Enter email"
                name="email"
              />
          </div>
          
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide  text-xs font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            class="appearance-none block w-full  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="password"
            type="text"
            placeholder="Enter password"
            name="password"
          />
          
        </div>
        <button
        type="submit"
        class="btn btn-primary font-bold mt-3 h-auto rounded "
      >
        Check
      </button>
       
      </div>
      
    </form>
    {#if form?.success}
      <p class="pt-2">Logged in. Your balance is {form?.balance}!</p>
    {/if}
  </div>
  
  <div
    class="m-20 pt-10 w-full max-w-xl p-12 mx-auto rounded-lg shadow-xl bg-base-100 text-base-content backdrop-blur-lg"
  >
    <form method="POST" action="?/pay">
      <div class="flex flex-wrap items-end -mx-3 mb-2">
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide  text-xs font-bold mb-2"
                for="email"
              >
                Email
              </label>
              <input
                class="appearance-none block w-full  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="email"
                type="text"
                placeholder="Enter email"
                name="email"
              />
          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide  text-xs font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            class="appearance-none block w-full  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="password"
            type="text"
            placeholder="Enter password"
            name="password"
          />
      
        </div>
        <!-- <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                Email
              </label>
            </div> -->
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide  text-xs font-bold mb-2"
                for="paymail"
              >
                Paymail
              </label>
              <input
                class="appearance-none block w-full  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="paymail"
                type="text"
                placeholder="Enter paymail"
                name="paymail"
              />
          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide  text-xs font-bold mb-2"
            for="amount"
          >
            amount
          </label>
          <input
            class="appearance-none block w-full  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="amount"
            type="text"
            placeholder="Enter amount"
            name="amount"
          />
      
        </div>
  
        <button
          type="submit"
          class="btn btn-primary w-16 font-bold mt-5 ml-2 px-2 rounded "
        >
          Donate
        </button>
      </div>
    </form>
    {#if form?.success}
      <!-- this message is ephemeral; it exists because the page was rendered in
             response to a form submission. it will vanish if the user reloads -->
      <p class="pt-2">The payment was successful. Here is your <a href="https://whatsonchain.com/tx/{form?.payment}">transaction</a>!</p>
    {/if}
  </div>
   