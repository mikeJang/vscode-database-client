import { SqlDialect } from "./sqlDialect";

export class MssqlDIalect implements SqlDialect {
    showColumns(database: string,table:string): string {
        return `SELECT COLUMN_NAME name,DATA_TYPE simpleType,COLUMN_TYPE type,COLUMN_COMMENT comment,COLUMN_KEY \`key\`,IS_NULLABLE nullable,CHARACTER_MAXIMUM_LENGTH maxLength,COLUMN_DEFAULT defaultValue,EXTRA extra FROM information_schema.columns WHERE TABLE_CATALOG = '${database}' AND table_name = '${table}' ORDER BY ORDINAL_POSITION;`;
    }
    showTriggers(database: string): string {
        // throw new Error("Unimplments!")
        // https://stackoverflow.com/questions/4305691/need-to-list-all-triggers-in-sql-server-database-with-table-name-and-tables-sch
        return `SELECT OBJECT_NAME(parent_id) as Table_Name, * FROM [${database}].sys.triggers`;
    }
    showProcedures(database: string): string {
        return `SELECT ROUTINE_NAME FROM information_schema.routines WHERE SPECIFIC_CATALOG = '${database}' and ROUTINE_TYPE='PROCEDURE'`;
    }
    showFunctions(database: string): string {
        return `SELECT ROUTINE_NAME FROM information_schema.routines WHERE SPECIFIC_CATALOG = '${database}' and ROUTINE_TYPE='FUNCTION'`;
    }
    showViews(database: string): string {
        return `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.VIEWS  WHERE TABLE_CATALOG = '${database}' `;
    }
    buildPageSql(database: string, table: string, pageSize: number): string {
        return  `SELECT TOP ${pageSize} * FROM ${table};`;
    }
    showTables(database: string): string {
        return `SELECT TABLE_NAME tableName FROM master.INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'  AND TABLE_CATALOG='${database}'`
    }
    showDatabases(): string {
        return "SELECT name 'Database' FROM master.sys.databases"
    }

}