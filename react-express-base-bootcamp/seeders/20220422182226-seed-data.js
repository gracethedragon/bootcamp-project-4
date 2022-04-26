module.exports = {
  up: async (queryInterface) => {
    // Define category data
    const users = 
      [{
        email: 'admin',
        password: '123',
        created_at: new Date(),
        updated_at: new Date(),
      }]

    const trips = [
      {
        user_id: 1,
        name:'Sunny Singapore',
        length: 3,
        country: 'Singapore',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 1,
        name:'Nippon Fun',
        length: 1,
        country:'Japan',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]
    
    const days = 
      [{
        trip_id: 1,
        data: JSON.stringify(
          [{
            Location: "hotel",
            Transport: null,
            Time: 30,
            Type: "accommodation"
            },
            {
            Location: "museum",
            Transport: "bus",
            Time: 60,
            Type: "museum"
            }, 
            {
            Location: "cafe",
            Transport: "walk",
            Time: 20,
            Type: "food"
            }
        ]),
        created_at: new Date(),
        updated_at: new Date(),
      }]

    const tripDays = [{
      trip_id: 1,
      day_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    }]

    await queryInterface.bulkInsert('users', users);
    await  queryInterface.bulkInsert('trips', trips);
    await queryInterface.bulkInsert('days', days);
    await queryInterface.bulkInsert('trip_days', tripDays);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('trip_days', null);
    await queryInterface.bulkDelete('days', null);
    await queryInterface.bulkDelete('trips', null);
    await queryInterface.bulkDelete('users', null);
  },
};