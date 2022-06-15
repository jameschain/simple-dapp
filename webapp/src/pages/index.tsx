import type { NextPage } from "next";
import Head from "next/head";

import Claim from "components/Claim";
import { Box, VStack } from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>SHEESHA DAPP</title>
        <meta name="description" content="Simple Dapp by James" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <VStack>
        <Claim />
      </VStack>
    </>
  );
};

export default Home;
