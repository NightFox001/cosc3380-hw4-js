import { connection, Sequelize } from '../../models'

const handler = async (req, res) => {
    const limit = req.query?.limit || "20"
    const flights = await connection.query(`SELECT flight_id FROM flights LIMIT ${limit}`, {
        type: Sequelize.QueryTypes.SELECT
    });

    // sequelize.transaction(async transaction => {
    //     try {
    //       await sequelize.query(
    //         `
    //         UPDATE Balances
    //         SET amount = @amount := amount - ${10}
    //         WHERE userId=${1}`,
    //         {
    //           type: Sequelize.QueryTypes.UPDATE,
    //           transaction,
    //           raw: true
    //         },
    //       )
    
    //       await sequelize.query(
    //         `
    //         UPDATE Balances
    //         SET amount = @amount := amount - ${10}
    //         WHERE userId=${2}`,
    //         {
    //           type: Sequelize.QueryTypes.UPDATE,
    //           transaction,
    //           raw: true
    //         },
    //       )
    
    //     } catch (error) {
    //       transaction.rollback();
    //       throw `TRANSACTION_ERROR`;
    //     }
    //   })

    return res.json(flights)
}

export default handler