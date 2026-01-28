/**
 * Database Seeder
 * Populates database with sample data for development
 */

require('dotenv').config();

const { initDatabase, getDatabase } = require('./index');
const { User, Post, Like, Comment } = require('../models');

async function seed() {
  console.log('🌱 Seeding database...\n');

  initDatabase();

  // Sample users
  const users = [
    { email: 'amina@example.com', password: 'password123', name: 'Amina', country: 'Kenya', bio: 'Small business starter. Loves helping others grow.' },
    { email: 'daniel@example.com', password: 'password123', name: 'Daniel', country: 'Ghana', bio: 'Student and future teacher. Learning every day.' },
    { email: 'liza@example.com', password: 'password123', name: 'Liza', country: 'Philippines', bio: 'Online seller and proud mom of 2.' },
    { email: 'yusuf@example.com', password: 'password123', name: 'Yusuf', country: 'Nigeria', bio: 'Entrepreneur and tech enthusiast.' },
    { email: 'putri@example.com', password: 'password123', name: 'Putri', country: 'Indonesia', bio: 'Small business owner. Making handmade crafts.' }
  ];

  const createdUsers = [];

  for (const userData of users) {
    try {
      const user = await User.create(userData);
      createdUsers.push(user);
      console.log(`✅ Created user: ${user.name} (${user.country})`);
    } catch (e) {
      console.log(`⚠️ User ${userData.email} already exists`);
      createdUsers.push(User.findByEmail(userData.email));
    }
  }

  // Sample posts
  const posts = [
    { userId: 0, content: 'Used SimplyLouie to write my first business proposal! The AI helped me organize my ideas and now I\'m talking to suppliers. This movement is real!' },
    { userId: 1, content: 'It helped me pass my English exam! I practiced essays with SimplyLouie and finally passed. My mom cried happy tears.' },
    { userId: 2, content: 'My first online sale! SimplyLouie helped me write my product descriptions and customer messages. Someone bought from me today!' },
    { userId: 3, content: 'I\'m learning something new every day. SimplyLouie helps me with coding questions, business ideas, and even writing emails. For $2? This is incredible.' },
    { userId: 4, content: 'Finally, an AI app that doesn\'t treat us like second-class users. The $2 price means everyone in my village can afford it. This feels like family.' },
    { userId: 0, content: 'Just helped my neighbor set up her account. She\'s already using it for her tailoring business. The movement is growing!' },
    { userId: 1, content: 'Preparing for my teaching certification exam. SimplyLouie explains concepts so clearly. I finally understand pedagogy!' },
    { userId: 3, content: 'Built my first website with help from SimplyLouie! It walked me through every step. Dreams are coming true.' }
  ];

  const createdPosts = [];

  for (const postData of posts) {
    const user = createdUsers[postData.userId];
    if (user) {
      const post = Post.create(user.id, postData.content);
      createdPosts.push(post);
      console.log(`✅ Created post by ${user.name}`);
    }
  }

  // Sample likes
  console.log('\n📥 Adding likes...');
  for (const post of createdPosts) {
    // Random users like each post
    const likerCount = Math.floor(Math.random() * 4) + 1;
    const shuffled = [...createdUsers].sort(() => Math.random() - 0.5);

    for (let i = 0; i < likerCount; i++) {
      try {
        Like.toggle(shuffled[i].id, post.id);
      } catch (e) {
        // Ignore duplicate likes
      }
    }
  }
  console.log('✅ Likes added');

  // Sample comments
  const comments = [
    { postIndex: 0, userIndex: 1, content: 'Congratulations! This is amazing!' },
    { postIndex: 0, userIndex: 2, content: 'So proud of you! Keep going!' },
    { postIndex: 1, userIndex: 0, content: 'Your mom must be so proud! Well done!' },
    { postIndex: 2, userIndex: 3, content: 'First of many! The movement supports you!' },
    { postIndex: 2, userIndex: 4, content: 'This is what it\'s all about! Congrats!' },
    { postIndex: 4, userIndex: 0, content: 'Welcome to the family! We\'re all in this together.' },
    { postIndex: 4, userIndex: 1, content: 'This is why we built SimplyLouie. For real people.' }
  ];

  console.log('\n💬 Adding comments...');
  for (const commentData of comments) {
    const post = createdPosts[commentData.postIndex];
    const user = createdUsers[commentData.userIndex];

    if (post && user) {
      Comment.create(user.id, post.id, commentData.content);
    }
  }
  console.log('✅ Comments added');

  console.log('\n🎉 Seeding complete!\n');
  console.log('Test accounts:');
  console.log('  Email: amina@example.com');
  console.log('  Password: password123');
  console.log('');

  process.exit(0);
}

seed().catch(err => {
  console.error('Seeding error:', err);
  process.exit(1);
});
