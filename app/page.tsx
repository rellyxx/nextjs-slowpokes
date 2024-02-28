"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount, useContractWrite } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import {ContractConfig} from "~~/contractConfig/index"
import { useEffect, useState } from "react";
import { notification } from "~~/utils/scaffold-eth";
import scaffoldConfig from "~~/scaffold.config";
import BigNumber from "bignumber.js";


const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [playerwonCount,setPlayerwonCount] = useState<number>(0)

  const {
    isLoading: writeMintIsLoading,
    isSuccess: writeMintIsSuccess,
    write: writeMint,
    error: writeMintError,
    isError: writeMintIsError,
} = useContractWrite({
    ...ContractConfig,
    functionName: "play",
    value: BigInt(0),
})

  const handleMint = () =>{
    console.log(connectedAddress);
    writeMint()
  }

  useEffect(()=>{
    console.log(writeMintIsLoading);
    
  },[writeMintIsLoading])

  useEffect(()=>{
    const fetchData =  () => {
      try {
        const url = "/api/playerwon"
        fetch(url).then(async(res)=>{
          const data = await res.json();
          console.log(data.count);
          setPlayerwonCount(data.count)
        })
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  },[])


  return (
    <>
      <div className="flex items-center flex-col flex-grow ">
        <div className="flex-grow bg-base-300 w-full px-8 py-12">
          <div className="flex justify-center  gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 w-2/3  rounded-3xl">
              <h4  style={{fontSize:26}}>First Mint for Slowpokes</h4>
              <p>- There are two rounds of minting each lasting for upto 7000 blocks</p>
              <p>- Only one mint per block wins, there is 7000 blocks, every valid mint get 2,100,000 Tokens</p>
              <p>- The mint will last at least 3h48m for each round, no need to rush</p>
              <p>- The tokens will be batch minted after each round is ended</p>
              <p>- All the fees collected with the mint will be added to an AMM pool</p>
              <p>- An $SLOW token will be batch minted to your wallet once each round is completed</p>
              <p>- Data is refreshed automatically on the page every second, no need to manually refresh the page, your mint result will show up below for your wallet</p>
              <p>- There is no refund of the fees if you lost a mint in a block, it's added to the AMM pool</p>
              <p>- Discord will open in 2 days, all communications are on Twitter</p>
            </div>
            <div className="flex flex-col gap-2 bg-base-100 px-10 py-10 w-1/3 rounded-3xl">
              <h3 style={{fontSize:26}}>SLOW Token</h3>
              <div className="flex justify-between text-gray-400">
                <div>Type:</div>
                <div>ERC20</div>
              </div>
              <div className="flex justify-between text-gray-400">
                <div>Mint Price:</div>
                <div>0.001ETH</div>
              </div>
              <div className="flex justify-between text-gray-400">
                <div>Tokens Per Mint:</div>
                <div>2,100,000</div>
              </div>
              <div className="flex justify-between text-gray-400">
                <div>Supply:</div>
                <div>{BigNumber(scaffoldConfig.Supply).decimalPlaces(2).toFormat(0)}</div>
              </div>
              <div className="flex justify-between text-gray-400">
                <div>Supply Minted:</div>
                <div>{scaffoldConfig.TokensPerMint * playerwonCount}</div>
              </div>
              <div className="flex mt-1 justify-between text-gray-400 items-center">
                <div>Progress:</div>
                <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-500 ml-2 rounded-2xl">
                  <div className="h-4 bg-primary rounded-2xl" style={{width:`${scaffoldConfig.TokensPerMint * playerwonCount*100/scaffoldConfig.Supply}%`}}></div>
                </div>
              </div>
              
             
              <button
                type="button"
                onClick={handleMint}
                className="inline-block mt-3 rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                Mint{writeMintIsLoading?"...":""}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
