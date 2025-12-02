const mongoose = require('mongoose');

beforeAll(async () => {
  // Connect to a specific TEST database on your local machine
  // We use '127.0.0.1' instead of 'localhost' to avoid common DNS issues on Windows
  const uri = 'mongodb://127.0.0.1:27017/Fingrow-DB';
  
  await mongoose.connect(uri);
});

// Clear data after each test so every test starts with a clean slate
afterEach(async () => {
  if (mongoose.connection.readyState !== 0) {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany();
    }
  }
});

// Close connection after all tests are done
afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    // Optional: Drop the database to clean up completely
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }
});