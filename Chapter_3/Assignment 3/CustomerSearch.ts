interface Customer {
    CustomerID: string;
    CompanyName: string;
    ContactName: string;
    Country: string;
}

interface CustomerDatabase {
    customers: Customer[];
}

interface SearchCriteria {
    field: 'Country' | 'CompanyName' | 'ContactName';
    value: string;
}

class CustomerSearch {
    private db: CustomerDatabase;

    constructor(database: CustomerDatabase) {
        this.db = database;
    }

    public searchByCountry(country: string): Customer[] {
        const criteria: SearchCriteria = { field: 'Country', value: country };
        return this.searchCustomers(criteria);
    }

    public searchByCompanyName(company: string): Customer[] {
        const criteria: SearchCriteria = { field: 'CompanyName', value: company };
        return this.searchCustomers(criteria);
    }

    public searchByContact(contact: string): Customer[] {
        const criteria: SearchCriteria = { field: 'ContactName', value: contact };
        return this.searchCustomers(criteria);
    }

    private searchCustomers(criteria: SearchCriteria): Customer[] {
        const query = this.db.customers
            .filter(customer => this.matchesField(customer, criteria))
            .sort((a, b) => a.CustomerID.localeCompare(b.CustomerID));

        return query;
    }

    private matchesField(customer: Customer, criteria: SearchCriteria): boolean {
        const fieldValue = this.getFieldValue(customer, criteria.field);
        return fieldValue.toLowerCase().includes(criteria.value.toLowerCase());
    }

    private getFieldValue(customer: Customer, field: SearchCriteria['field']): string {
        switch (field) {
            case 'Country':
                return customer.Country;
            case 'CompanyName':
                return customer.CompanyName;
            case 'ContactName':
                return customer.ContactName;
            default:
                return '';
        }
    }

    public exportToCSV(customers: Customer[]): string {
        const csvLines = customers.map(customer => 
            this.formatCustomerRow(customer)
        );
        return csvLines.join('\n');
    }

    private formatCustomerRow(customer: Customer): string {
        return `${customer.CustomerID},${customer.CompanyName},${customer.ContactName},${customer.Country}`;
    }
}

