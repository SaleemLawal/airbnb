# Airbnb Clone 🏡

This project is an Airbnb clone built with modern web technologies, designed to replicate the core features of the popular vacation rental platform. It allows users to browse, book, and list properties for short-term rentals.

## 🚀 Features

- **User Authentication**: Users can sign up, log in, and log out.
- **Property Listings**: Users can browse, filter, and search properties based on various criteria like price, location, and amenities.
- **Property Booking**: Users can book available properties for selected dates.
- **Host Features**: Property owners can create, update, and delete property listings.
- **User Profiles**: Each user has a personal profile page displaying their bookings and properties listed.
- **Ratings and Reviews**: Users can rate and review properties they've stayed in.
- **Responsive Design**: Optimized for both desktop and mobile views.

## 🛠️ Tech Stack

This project uses a combination of front-end and back-end technologies to offer a seamless experience for both users and hosts.

### Frontend:

- **Next.js**: A React framework for building server-side rendered applications.
- **TypeScript**: For static type checking and improved developer experience.
- **Tailwind CSS**: For utility-first CSS styling.

### Backend:

- **Next.js API Routes**: For building API endpoints within the Next.js framework.
- **Prisma**: An ORM (Object-Relational Mapping) tool for database interactions.
- **PostgreSQL**: NoSQL database for storing user data, property listings, and booking information.
- **NextAuth.js**: For user authentication and maintaining secure sessions.

## 🛠️ Installation

To get the project up and running locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/SaleemLawal/airbnb.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd airbnb
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Set up environment variables**:

   Create a `.env` file in the project root with the following variables:

   ```plaintext
   DATABASE_URL=your_mongo_database_url
   NEXTAUTH_SECRET=your_nextauth_secret_key
   ```

5. **Run the development server**:

   ```bash
   npm run dev
   ```

   Your application should now be running at [http://localhost:3000](http://localhost:3000).

## 🤝 Contributing

We welcome contributions! Feel free to fork the repository, create a branch, and submit a pull request.

1. **Fork the repo**.
2. **Clone your fork**:

   ```bash
   git clone https://github.com/your-username/airbnb.git
   ```

3. **Create a branch**:

   ```bash
   git checkout -b feature/your-feature
   ```

4. **Make your changes and commit them**:

   ```bash
   git commit -m "Add new feature"
   ```

5. **Push to your branch**:

   ```bash
   git push origin feature/your-feature
   ```

6. **Open a pull request** from your branch to `main`.

## 🌟 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎉 Acknowledgments

Special thanks to the following resources and libraries that made this project possible:
- **Next.js**: For building the user interface and handling server-side rendering.
- **Prisma**: For simplifying database interactions.
- **PostgreSQL**: For providing scalable data storage.
- **NextAuth.js**: For managing authentication.
