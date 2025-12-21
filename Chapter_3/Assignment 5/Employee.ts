class Employee {
    private id: number;
    private name: string;
    private department: string;
    private working: boolean;

    constructor(employeeId: number, employeeName: string, employeeDepartment: string) {
        this.id = employeeId;
        this.name = employeeName;
        this.department = employeeDepartment;
        this.working = true;
    }

    public saveEmployeeToDatabase(): boolean {
        let saveResult: boolean = false;
        try {
            // Database save logic: await databaseContext.employees.add(...);
            saveResult = true;
        } catch (exception) {
            saveResult = false;
        }
        return saveResult;
    }

    public printEmployeeDetailReportXML(): string {
        let xmlReport: string = '';
        xmlReport = '<Employee>\n';
        xmlReport = xmlReport + '  <Id>' + this.id + '</Id>\n';
        xmlReport = xmlReport + '  <Name>' + this.name + '</Name>\n';
        xmlReport = xmlReport + '  <Department>' + this.department + '</Department>\n';
        xmlReport = xmlReport + '  <IsWorking>' + this.working + '</IsWorking>\n';
        xmlReport = xmlReport + '</Employee>';
        return xmlReport;
    }

    public printEmployeeDetailReportCSV(): string {
        let csvReport: string = '';
        csvReport = this.id + ',' + this.name + ',' + this.department + ',' + this.working;
        return csvReport;
    }

    public terminateEmployee(): void {
        if (this.working === true) {
            this.working = false;
        }
    }

    public isWorking(): boolean {
        let workingStatus: boolean = false;
        workingStatus = this.working;
        return workingStatus;
    }
}

export { Employee };
