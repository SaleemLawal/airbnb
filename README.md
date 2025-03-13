# Airbnb Clone 🏡

<p align="center">
    <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" align="center" width="30%">
</p>
<p align="center"><h1 align="center">AIRBNB</h1></p>
<p align="center">
	<em><code>Next.js-powered Airbnb Clone</code></em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/SaleemLawal/airbnb?style=default&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/SaleemLawal/airbnb?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/SaleemLawal/airbnb?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/SaleemLawal/airbnb?style=default&color=0080ff" alt="repo-language-count">
</p>

## 🚀 Overview

This project is an Airbnb clone built using modern web technologies to replicate core features of the vacation rental platform. Users can browse, book, and list properties for short-term rentals.

## 🚀 Features

- **User Authentication**: Secure login and sign-up with NextAuth.js.
- **Property Listings**: Users can browse, filter, and search properties by price, location, and amenities.
- **Property Booking**: Book available properties for selected dates.
- **Host Features**: Property owners can create, update, and delete property listings.
- **User Profiles**: Each user has a profile displaying their bookings and listed properties.
- **Ratings and Reviews**: Users can rate and review properties.
- **Google Maps Integration**: Interactive maps for property locations.
- **Responsive Design**: Optimized for both desktop and mobile views.

## 🔧 Tech Stack

### Frontend:
- **Next.js**: Server-side rendering and API routes.
- **TypeScript**: For static type checking.
- **Tailwind CSS**: Utility-first CSS framework.

### Backend:
- **Next.js API Routes**: Handles API endpoints.
- **Prisma**: ORM for database interactions.
- **MongoDB**: NoSQL database for storing data.
- **NextAuth.js**: Authentication.

## 🛠️ Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/SaleemLawal/airbnb.git
   ```
2. **Navigate to the project directory**:
   ```sh
   cd airbnb
   ```
3. **Install dependencies**:
   ```sh
   npm install
   ```
4. **Set up environment variables**:
   ```sh
   DATABASE_URL=your_mongo_database_url
   NEXTAUTH_SECRET=your_nextauth_secret_key
   ```
5. **Run the development server**:
   ```sh
   npm run dev
   ```
   Your application should now be running at [http://localhost:3000](http://localhost:3000).

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎉 Acknowledgments

Special thanks to:
- **Next.js** for UI and API handling.
- **Prisma** for database interactions.
- **MongoDB** for data storage.
- **NextAuth.js** for authentication.

For more details, visit the [GitHub repository](https://github.com/SaleemLawal/airbnb).
