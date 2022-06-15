import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Box, Button, Heading, HStack, Input, Text } from "@chakra-ui/react";
import { useGreeterContract } from "hooks";

const Claim = () => {
  const [claimableBalance, setClaimableBalance] = useState<
    string | undefined
  >();
  const [balance, setBalance] = useState<string | undefined>();

  const [account, setAccount] = useState<string | undefined>();
  const [amount, setAmount] = useState("");
  const [isClaiming, setIsClaiming] = useState<boolean>(false);
  const handleChange = (event: any) => setAmount(event.target.value);

  const greeterContract = useGreeterContract();

  useEffect(() => {
    const fetchBalance = async () => {
      const _claimableBalance = await greeterContract?.claimableBalance(
        account
      );
      const _balance = await greeterContract?.balanceOf(account);

      setClaimableBalance(ethers.utils.formatEther(_claimableBalance));
      setBalance(ethers.utils.formatEther(_balance));
    };
    if (greeterContract) fetchBalance();
  }, [account, greeterContract, isClaiming]);

  const handleConnect = () => {
    if (!window.ethereum) {
      console.log("please install MetaMask");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    provider
      .send("eth_requestAccounts", [])
      .then((accounts) => {
        if (accounts.length > 0) setAccount(accounts[0]);
      })
      .catch((e) => console.log(e));
  };
  const handleDisconnect = () => {
    setClaimableBalance(undefined);
    setAccount(undefined);
  };
  const handleClaim = async () => {
    setIsClaiming(true);

    const tx = await greeterContract?.claim(ethers.utils.parseEther(amount));
    await tx.wait();

    setIsClaiming(false);
  };

  return (
    <>
      <Box w="100%" my={4}>
        {account ? (
          <Button type="button" w="100%" onClick={handleDisconnect}>
            Account:{account}
          </Button>
        ) : (
          <Button type="button" w="100%" onClick={handleConnect}>
            Connect MetaMask
          </Button>
        )}
      </Box>
      {account ? (
        <Box mb={0} p={4} w="100%" borderWidth="1px" borderRadius="lg">
          <Heading my={4} fontSize="xl">
            Claim Your SS Tokens
          </Heading>
          <HStack justify="space-between">
            <Box>
              <Text mb="8px">Claimable Balance: {claimableBalance}</Text>
            </Box>
            <Box>
              <Text mb="8px">Current Balance: {balance}</Text>
            </Box>
          </HStack>
          <HStack>
            <Input
              value={amount}
              onChange={handleChange}
              placeholder="Please input the amount to claim"
              type="number"
            />
            <Button
              disabled={
                Number(claimableBalance) < Number(amount) ||
                amount.length === 0 ||
                isClaiming
              }
              onClick={handleClaim}
            >
              {isClaiming ? "Claiming..." : "Claim"}
            </Button>
          </HStack>
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};

export default Claim;
