import { initializeApollo } from "api/apollo";
import { useMenuQuery } from "api/queries/products.graphql";

export function getAllPostIds() {
  const data = useMenuQuery({});

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  console.log("getAllPostIDS", data);
  return data.map((data) => {
    return {
      params: {
        id: data.replace(/\.md$/, ""),
      },
    };
  });
}

export function getPostData(product_id) {
  const { data } = useMenuQuery({
    description: product_id,
    image: product_id,
  });
  // Combine the data with the id
  return {
    product_id,
    ...data,
  };
}
