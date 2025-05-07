import { CustomerInterface } from "../../interface/customer.interface"

export class Customer implements CustomerInterface {
    id : string
    name: string
    
    private membershipExpiryDate: Date | null

    constructor(id: string,name: string, membershipExpiryDate?: Date){
        this.id = id
        this.name = name
        this.membershipExpiryDate = membershipExpiryDate ?? null
    }

    isMembership(): boolean{
        if(!this.membershipExpiryDate) {
            return false
        }

        return this.membershipExpiryDate.getTime() >= new Date().getTime()
    }
}