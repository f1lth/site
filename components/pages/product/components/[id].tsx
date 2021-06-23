import styled from "styled-components";
import Link from "next/link";

import { DesktopOnly } from "components/shared/responsive/desktop-only";
import { MobileOnly } from "components/shared/responsive/mobile-only";
import { mediaQueries } from "styles/media-queries";

import { MenuDocument, Category } from "api/queries/menu.graphql";
import { initializeApollo } from "api/apollo";
import { useMenuQuery } from "api/queries/products.graphql";
import { HomePageMenuDocument } from "api/queries/home-page-menu.graphql";
import { GetStaticProps } from "next";
import {
  getAllPostIds,
  getPostData,
} from "components/pages/product/components/util";

export function Post() {
  getStaticPaths();
  return (
    <div>
      <br />
    </div>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
  // Return a list of possible value for id
}

export async function getStaticProps({ params }) {
  const postData = getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
