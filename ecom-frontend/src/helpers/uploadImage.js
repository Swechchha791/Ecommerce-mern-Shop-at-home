const uploadImage = async (image) => {
  const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`;

  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "ecom-mern-product"); // upload preset to the cloudinary server

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // console.log("Upload successful:", data);
    return data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export default uploadImage;

// // API to upload an image asset to the cloudinary
// const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/:image/upload`;

// const uploadImage = async (image) => {
//   const formData = new FormData();
//   formData.append("file", image);
//   formData.append("upload_preset", "ecom-mern-product"); // name of an unsigned upload preset that you defined for unsigned uploading.

//   const dataResponse = await fetch(url, {
//     method: "post",
//     body: formData,
//   });

//   return dataResponse.json();
// };

// export default uploadImage;
