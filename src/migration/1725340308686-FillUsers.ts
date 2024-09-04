import { MigrationInterface, QueryRunner } from "typeorm";

export class FillUsers1725340308686 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const users = [];

    for (let i = 0; i < 1000000; i++) {
      users.push({
        firstName: `FirstName${i}`,
        lastName: `LastName${i}`,
        age: Math.floor(Math.random() * 100),
        gender: Math.random() > 0.5 ? 'male' : 'female',
        hasProblems: Math.random() > 0.5,
      });

      // Perform bulk insert every 10,000 records to avoid excessive memory usage
      if (users.length >= 10000) {
        await queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into('users')
          .values(users)
          .execute();
        users.length = 0; // Clear the array
      }
    }

    // Insert any remaining records
    if (users.length > 0) {
      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into('users')
        .values(users)
        .execute();
    }
        
        /* 
        
        for (let i = 0; i < 1000000; i++) {
          await queryRunner.query(
            `INSERT INTO users ("firstName", "lastName", "age", "gender", "hasProblems") VALUES ('FirstName${i}', 'LastName${i}', ${Math.floor(Math.random() * 100)}, '${Math.random() > 0.5 ? 'male' : 'female'}', ${Math.random() > 0.5})`
          );
        } */
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM users`);
      }

}
