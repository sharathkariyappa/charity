<script lang="ts">
    import { TabContent, TabPane } from '@sveltestrap/sveltestrap';
    import RegisterComp from '../charity/register-charity/+page.svelte';
    import Login from '../charity/login-charity/+page.svelte';
  </script>
  
  <!-- <TabContent>
    <TabPane tabId="alpha" tab="Login" active>
     
    </TabPane>
    <TabPane tabId="bravo" tab="register">
        <h2 class="text-content">Register</h2>
        
        <RegisterComp/>
    </TabPane>
    
  </TabContent> -->

  <!-- hellooo -->



  <div  role="tablist" class="tabs bg-base-300 text-base-content tabs-lifted">
    <input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="Tab 1" />
    <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
      <h2 class="text-content">Register</h2>
        
        <RegisterComp/>
    </div>
  
    <input
      type="radio"
      name="my_tabs_2"
      role="tab"
      class="tab"
      aria-label="Tab 2"
      checked="checked" />
    <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
      <h2 class="text-content">Login</h2>
      
      <Login/>
    </div>
  
  </div>