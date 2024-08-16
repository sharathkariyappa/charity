import {
    SmartContract,
    assert,
    method,
    prop,
} from 'scrypt-ts';

export class Donation extends SmartContract {
    @prop()
    charity: string; // The charity's identifier

    @prop()
    donor: bigint;   // The donor's identifier

    @prop()
    amount: bigint;  // The donation amount

    constructor(charity: string, donor: bigint, amount: bigint) {
        super(...arguments);
        this.charity = charity;
        this.donor = donor;
        this.amount = amount;
    }

    @method()
    public unlock(donor: bigint) {
        // Verify that the donor is correct
        assert(this.donor === donor, 'incorrect donor');
    }
}
