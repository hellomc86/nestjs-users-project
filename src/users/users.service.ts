import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(private dataSource: DataSource) { }

    async resetProblemsFlag(): Promise<any> {
        return this.dataSource.transaction(async (manager) => {
            const start = Date.now();

            const result = await manager.query(
                `WITH updated AS (
          UPDATE users
          SET "hasProblems" = false
          WHERE "hasProblems" = true
          RETURNING 1
        )
        SELECT COUNT(*) FROM updated;`
            );

            const end = Date.now();
            const del = (end - start) / 1000;


            return { updatedUsersCount: parseInt(result[0].count, 10), executionTime: `${del} seconds`};
        });
    }
}