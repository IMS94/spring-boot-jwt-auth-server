import {client} from "./client";

const listProducts = async () => {
  try {
    let response = await client.get("/products");
    return response.data;
  } catch (e) {
    console.log(e);
  }
  return [];
};

export {
  listProducts
}
