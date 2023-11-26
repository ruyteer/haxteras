const url = import.meta.env.VITE_URL;

export async function handleGetProductOfCategory(category) {
  const categoryResponse = await fetch(`${url}/category`);
  const categories = await categoryResponse.json();
  const responseCategory = categories.filter(
    (result) => result.name === category
  );

  const categoryId = responseCategory.map((result) => result.id);

  try {
    const response = await fetch(`${url}/category/products/${categoryId[0]}`);

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function handleFindCategoryId(category) {
  try {
    const categoryResponse = await fetch(`${url}/category`);
    const categories = await categoryResponse.json();
    const responseCategory = categories.filter(
      (result) => result.name === category
    );

    const categoryId = responseCategory.map((result) => result.id);

    return categoryId[0];
  } catch (error) {
    console.log(error);
  }
}
