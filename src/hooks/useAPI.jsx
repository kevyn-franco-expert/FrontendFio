
const handleSubmit = async (url, data) => {

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log('Success!');
    } else {
      console.log('Not successful!');
    }
  } catch (error) {
    console.log(error);
  }
};

export default {handleSubmit};