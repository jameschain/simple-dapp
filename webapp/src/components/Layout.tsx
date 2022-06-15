import React, { ReactNode } from "react";
import { Text, Center, Container, useColorModeValue } from "@chakra-ui/react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

export const Layout = (props: Props) => (
  <div>
    <Header />
    <Container maxW="container.md" h="85vh" py="8">
      {props.children}
    </Container>
    <Center as="footer" bg={useColorModeValue("gray.100", "gray.700")} p={6}>
      <Text fontSize="md">SHEESHA DAPP (TEST) BY JAMES</Text>
    </Center>
  </div>
);
