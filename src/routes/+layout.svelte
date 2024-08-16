<script>
       import '../app.css';
       import Footer from '../lib/components/footer.svelte';
       import { Styles } from '@sveltestrap/sveltestrap';
       import Nav from '../lib/components/nav.svelte';
       import { page } from '$app/stores';
     </script>
     
     <style>
       @import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css';
     </style>
     
     <Styles />
     
     {#if $page.url.pathname !== '/donor'}
       <Nav />
     {/if}
     
     <slot></slot>
     <Footer />
     