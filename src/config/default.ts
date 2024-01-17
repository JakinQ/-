interface IConfig {
    port: number;
    database: {
        host: string;
        port: number;
        user: string;
        password: string;
        database: string;
    };
}
export const config: IConfig = {
    port: 8091,
    database: {
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: 3306,
        database: 'qh_wall'
    }
}