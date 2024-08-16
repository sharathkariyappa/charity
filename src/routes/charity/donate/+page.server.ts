import NeucronSDK from "neucron-sdk";
import { prisma } from '$lib/server/prisma';
import { Donation } from "../../../contracts/charity"; // Adjust the path as needed
import { DefaultProvider, bsv, byteString2Int } from "scrypt-ts";
import { NeucronSigner } from "neucron-signer";
import artifact from "../../../../artifacts/charity.json";
const provider = new DefaultProvider({ network: bsv.Networks.mainnet });
const signer = new NeucronSigner(provider);

await signer.login("mominrauf33@gmail.com", "Momin123000"); // Replace with actual credentials
await Donation.loadArtifact(artifact);
let instance: Donation;


/** @type {import('./$types').Actions} */
export const actions = {

    login: async ({ request }) => {
        try {
            const data = await request.formData();

            const neucron = new NeucronSDK();
            const authModule = neucron.authentication;
            const walletModule = neucron.wallet;

            const loginResponse = await authModule.login({
                email: data.get('email'),
                password: data.get('password')
            });

            console.log(loginResponse);

            // For Default wallet balance
            const DefaultWalletBalance = await walletModule.getWalletBalance({});
            console.log(DefaultWalletBalance);

            return {
                success: true,
                balance: DefaultWalletBalance.data.balance.summary
            };
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                error: 'Login failed. Please try again.'
            };
        }
    },

    pay: async ({ request, locals }) => {
        try {
            const data = await request.formData();

            const neucron = new NeucronSDK();
            const authModule = neucron.authentication;
            const walletModule = neucron.wallet;

            const loginResponse = await authModule.login({
                email: data.get('email'),
                password: data.get('password')
            });

            console.log(loginResponse);

            const options = {
                outputs: [
                    {
                        address: data.get('paymail'),
                        note: 'donations',
                        amount: Number(data.get('amount'))
                    }
                ]
            };
            console.log(options);

            const payResponse = await neucron.pay.txSpend(options);
            console.log(payResponse);

            const user = locals.user;
            if (!user) {
                throw new Error('User not authenticated');
            }

            // let amountContract: bigint = BigInt(Number(data.get('amount')));
            
            // let donorContract: bigint = BigInt(user.id);
            // console.log(typeof(user.id.toString()));

            // console.log('deploying');
            // instance = new Donation(data.get('paymail') , donorContract, amountContract );
            // await instance.connect(signer);
            // const deployTx = await instance.deploy();
            // console.log(
            //     "Smart contract deployed: https://whatsonchain.com/tx/" + deployTx.id
            // );

            // const { tx: unlockTx } = await instance.methods.unlock(String(user.id));
            // console.log(
            //     "Contract unlocked successfully: https://whatsonchain.com/tx/" + unlockTx.id
            // );

            const donation = await prisma.donor.create({
                data: {
                    charity_id: String(data.get('paymail')),
                    donor_id: String(user.name),
                    amount:data.get('amount'),
                    id: payResponse.data.txid,
                    
                }
            });

            console.log(donation);

            return {
                success: true,
                payment: payResponse.data.txid
            };
        } catch (error) {
            console.error('Payment error:', error);
            return {
                success: false,
                error: 'Payment failed. Please try again.'
            };
        }
    }
};
