import { Contract, ethers } from "ethers";
import GreeterABI from "contracts/Greeter.json";
import { useEffect, useState } from "react";

export const useGreeterContract = (): Contract | null => {
  const [contract, setContract] = useState<Contract | null>(null);

  useEffect(() => {
    const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
    const web3Signer = web3Provider.getSigner();

    const greeterContract = new ethers.Contract(
      process.env.NEXT_PUBLIC_GREETER_ADDRESS ||
        "0x5fbdb2315678afecb367f032d93f642f64180aa3",
      GreeterABI,
      web3Signer
    );

    setContract(greeterContract);
  }, []);

  return contract;
};
