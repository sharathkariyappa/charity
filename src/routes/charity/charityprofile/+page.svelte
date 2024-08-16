<script lang="ts">
  import { writable } from 'svelte/store';
  import axios from 'axios';
  import { onMount } from 'svelte';

  const logout = async () => {
    try {
      const response = await fetch('/auth/logout', { method: 'POST' });
      const result = await response.json();

      if (response.status !== 200) {
        alert('Logout error: ' + result.message);
      } else {
        alert('Logout successful');
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('Logout error');
    }
  };

  let isOpen = false;
  const toggle = () => {
    isOpen = !isOpen;
  };

  export let data;
  let index = 1;

  const { info } = data;
  const Data = writable([]);
  Data.set(info);

  let file = '';
  let fileName = 'No image selected';
  let proof = '';
  let txid = '';

  const handleSubmit = async (e: SubmitEvent, txid: any) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const resFile = await axios.post(
          'https://api.pinata.cloud/pinning/pinFileToIPFS',
          formData,
          {
            headers: {
              pinata_api_key: '1b5dcc66b56a5a074c09',
              pinata_secret_api_key: '7e5a00875cd18e1232e1054452d8b3e0d2bae48572556d99c4f62c6b657a05e0',
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        fileName = 'No image selected';
        file = '';
        proof = ImgHash.toString();

        const upload = await fetch('/updateDonation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ txid, proof }),
        });

        const res = await upload.json();
        console.log(res);
        alert('Successfully Image Uploaded');
      } catch (e) {
        alert('Unable to upload image to Pinata');
      }
    }
  };

  const retrieveFile = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const data = target.files?.[0];
    if (data) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(data);
      reader.onloadend = () => {
        file = data;
      };
      fileName = data.name;
    }
    e.preventDefault();
  };
</script>

{#if isOpen}
<form class="bg-base-300 text-base-content" method="POST" action="/userprofile/wallet?/signup">
  <h2 class="text-content">Sign up</h2>
  <label for="signup-email">Email:</label>
  <input type="text" name="email" id="email" required />

  <label for="signup-password">Password:</label>
  <input type="text" name="password" id="password" required />
  
  <button class="btn btn-primary" type='submit' color='success'>Sign up</button>
</form>
{/if}

<div class="overflow-x-auto bg-base-300 h-auto pb-8 pt-24 text-base-content">
  <h1 class="bg-base-300 text-base-content">Donations</h1>
  <table class="table bg-base-300 w-[100%] text-base-content">
    <!-- head -->
    <thead>
      <tr>
        <th></th>
        <th>index</th>
        <th>Donor Name</th>
        <th>Satoshis Donated</th>
        <th>TxID</th>
        <th>Upload Proof</th>
      </tr>
    </thead>
    <tbody class="w-[100%]">
      {#each $Data as donor, i}
      <tr class="bg-base-200">
        <th></th>
        <td>{i + 1}</td>
        <td>{donor.donor_id}</td>
        <td>{donor.amount}</td>
        <td><a href="https://whatsonchain.com/tx/{donor.id}">click here to see</a></td>
        <td>
          <form on:submit={e => handleSubmit(e, donor.id)}>
            <label for="file-upload">Choose Image</label>
            <input
              type="file"
              name="data"
              on:change={retrieveFile}
            />
            <span class="textArea">Image: {fileName}</span>
            <button type="submit" class="btn btn-primary" disabled={!file}>Upload File</button>
          </form>
        </td>
      </tr>
      {/each}
    </tbody>
  </table>
</div>

<div class="bg-base-100">
  <button class="btn btn-primary m-4" color="dark" on:click={toggle}>Create wallet</button>
  <button class="btn btn-primary m-4" color="dark" on:click={logout}>logout</button>
</div>
