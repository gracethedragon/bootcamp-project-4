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

    const categories = [
      {
        name:'city',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name:'outdoor',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]
    
    const trips = 
      [{
        category_id: 1,
        data: JSON.stringify({
          "name": "urban adventure",
          "data" : [
            {
            Stop: 0,
            Location: "hotel",
            Transport: null,
            Time: 0.5,
            Type: "accommodation"
            },
            {
            Stop: 1,
            Location: "museum",
            Transport: "bus",
            Time: 1,
            Type: "museum"
            }, 
            {
            Stop: 2,
            Location: "cafe",
            Transport: "walk",
            Time: 1,
            Type: "fnb"
            }
        ]}),
        created_at: new Date(),
        updated_at: new Date(),
      }]
    const tripUsers = [{
      trip_id: 1,
      user_id: 1
    }]

    await queryInterface.bulkInsert('users', users);
    await  queryInterface.bulkInsert('categories', categories);
    await queryInterface.bulkInsert('trips', trips);
    queryInterface.bulkInsert('trip_users', tripUsers);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('trip_users', null);
    await queryInterface.bulkDelete('trips', null);
    await queryInterface.bulkDelete('categories', null);
    await queryInterface.bulkDelete('users', null);
  },
};