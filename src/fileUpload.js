{/* <script>
  import { onMount } from 'svelte';
  import axios from 'axios';
  import { writable } from 'svelte/store';

  export let contract;
  export let account;
  export let provider;

  let file = null;
  let fileName = 'No image selected';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const resFile = await axios({
          method: 'post',
          url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
          data: formData,
          headers: {
            pinata_api_key: '1b5dcc66b56a5a074c09',
            pinata_secret_api_key: '7e5a00875cd18e1232e1054452d8b3e0d2bae48572556d99c4f62c6b657a05e0',
            'Content-Type': 'multipart/form-data',
          },
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        await contract.add(account, ImgHash);

        alert('Successfully Image Uploaded');
        fileName = 'No image selected';
        file = null;
      } catch (e) {
        alert('Unable to upload image to Pinata');
      }
    }
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      file = data;
    };
    fileName = data.name;
    e.preventDefault();
  };
</script>

<style>
  .top {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .choose {
    margin-bottom: 10px;
    cursor: pointer;
  }

  .textArea {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .upload {
    margin-top: 10px;
  }
</style>

<div class="top">
  <form class="form" on:submit={handleSubmit}>
    <label for="file-upload" class="choose">Choose Image</label>
    <input
      disabled={!account}
      type="file"
      id="file-upload"
      name="data"
      on:change={retrieveFile}
    />
    <span class="textArea">Image: {fileName}</span>
    <button type="submit" class="upload" disabled={!file}>Upload File</button>
  </form>
</div> */}
