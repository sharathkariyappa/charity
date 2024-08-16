<script lang="ts">
  import { Button, ButtonGroup, Modal, ModalBody, ModalFooter, ModalHeader, TabContent, TabPane } from '@sveltestrap/sveltestrap';
  export let form;

  
  let open = false;
  let size: 'xl' | undefined;

  const toggleXl = () => {
    size = 'xl';
    open = !open;
  };

  const toggle = () => {
    size = undefined;
    open = !open;
  };
</script>

<div>
  


  
</div>
