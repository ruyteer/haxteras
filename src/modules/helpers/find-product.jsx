const url = import.meta.env.VITE_URL;

export const handleFindProduct = async (id) => {
  try {
    const response = await fetch(`${url}/product/${id}`);

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
