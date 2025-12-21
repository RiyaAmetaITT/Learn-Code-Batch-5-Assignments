// Customer interface definition
interface Customer {
    CustomerID: string;
    CompanyName: string;
    ContactName: string;
    Country: string;
}

// Database interface abstraction
interface CustomerDatabase {
    customers: Customer[];
}

// Search criteria interface
interface SearchCriteria {
    field: 'Country' | 'CompanyName' | 'ContactName';
    value: string;
}

class CustomerSearch {
    private db: CustomerDatabase;

    constructor(database: CustomerDatabase) {
        this.db = database;
    }

    // Search customer by country
    public searchByCountry(country: string): Customer[] {
        const criteria: SearchCriteria = { field: 'Country', value: country };
        return this.searchCustomers(criteria);
    }

    // Search customer by company name
    public searchByCompanyName(company: string): Customer[] {
        const criteria: SearchCriteria = { field: 'CompanyName', value: company };
        return this.searchCustomers(criteria);
    }

    // Search customer by contact person
    public searchByContact(contact: string): Customer[] {
        const criteria: SearchCriteria = { field: 'ContactName', value: contact };
        return this.searchCustomers(criteria);
    }

    // Generic search method to eliminate duplication
    private searchCustomers(criteria: SearchCriteria): Customer[] {
        const query = this.db.customers
            .filter(customer => this.matchesField(customer, criteria))
            .sort((a, b) => a.CustomerID.localeCompare(b.CustomerID));

        return query;
    }

    // Helper method to check if customer matches search criteria
    private matchesField(customer: Customer, criteria: SearchCriteria): boolean {
        const fieldValue = this.getFieldValue(customer, criteria.field);
        return fieldValue.toLowerCase().includes(criteria.value.toLowerCase());
    }

    // Helper method to get field value from customer
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

    // Export customers to CSV format
    public exportToCSV(customers: Customer[]): string {
        const csvLines = customers.map(customer => 
            this.formatCustomerRow(customer)
        );
        return csvLines.join('\n');
    }

    // Helper method to format a single customer row
    private formatCustomerRow(customer: Customer): string {
        return `${customer.CustomerID},${customer.CompanyName},${customer.ContactName},${customer.Country}`;
    }
}

