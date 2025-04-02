This project is a private club messaging platform where users can sign up, create messages, and interact within a restricted community. The application enforces different user roles and permissions, ensuring controlled access to message content.

Users sign up with a full name, username (email), and password, but do not automatically gain membership.

To become a member, users must enter a secret passcode, granting them access to view message authors and timestamps.

Members can create messages with a title, timestamp, and text, which are displayed on the home page.

An admin role allows certain users to delete messages. Admins are assigned either via a second passcode page or an admin checkbox during signup.

User authentication is handled using Passport.js, and passwords are securely stored with bcrypt.

The app is built with PostgreSQL as the database and deployed on a cloud platform for accessibility.
