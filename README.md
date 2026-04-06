# 🚗 DriveNow – Vehicle Rental Frontend

This is the **frontend application** for the DriveNow Vehicle Rental Platform built using **React.js**.  
It allows users to browse cars, book vehicles, make payments, request to become a host, and manage bookings.

---

# 📦 Tech Stack

- React.js
- React Router
- Tailwind CSS
- Axios
- Razorpay Checkout
- Context / LocalStorage Authentication

---

# ⚙️ Installation

Clone the repository 

git clone "http://github.com/maharichu30/vehical-rental-client"

Navigate to frontend folder

cd client

Install dependencies

npm install

Run the project

npm run dev

Frontend runs on:

http://localhost:5173

---

# 🔑 Test Login Credentials

Admin Login

Email: admin@gmail.com  
Password: admin12345

Admin has full control over the platform.

---

# 👤 User Flow

## 1️⃣ Register

1. Open the website
2. Click **Login**
3. Click **Register**
4. Enter:
   - Name
   - Email
   - Mobile
   - Password
5. Submit the form
6. Account will be created successfully

---

## 2️⃣ Login

1. Click **Login**
2. Enter email and password
3. Click **Login**
4. User will be redirected to the home page

After login users can:

- View cars
- Book cars
- Add reviews
- Add cars to wishlist
- View bookings

---

## 3️⃣ Forgot Password

If user forgets password:

1. Click **Forgot Password**
2. Enter registered email
3. A reset link will be sent to email
4. Click the link
5. Enter new password
6. Password will be updated

---

## 4️⃣ Browse Cars

Users can:

- View all cars
- Search cars by location
- Filter cars by:
  - price
  - fuel type
  - seats
  - transmission

---

## 5️⃣ Car Booking

Steps to book a car:

1. Open car details page
2. Select start date
3. Select end date
4. Click **Book Now**
5. Complete payment using **Razorpay**
6. Booking will be confirmed

Users can view bookings in:

**My Bookings**

Users can also:

- Cancel booking
- Download booking invoice

---

# ⭐ Become a Host

Normal users can become car owners.

Steps:

1. Login as user
2. Click **Become a Host** button in Navbar
3. Fill the host request form
   - Name
   - Email
   - Mobile
   - Message
4. Submit request

The request will be sent to **Admin Email**.

Admin will review the request and update the user role within **24 hours**.

Once approved, the user becomes **Owner**.

---

# 🚘 Owner Flow

When admin approves host request, user role becomes **Owner**.

Owner can:

- Access **Owner Dashboard**
- Add cars
- Update cars
- Delete cars
- View bookings for their cars

Steps:

1. Login as owner
2. Open **Owner Dashboard**
3. Click **Add Car**
4. Enter car details
5. Upload car image
6. Save the car

The car will appear in the public car listing.

---

# 🛠 Admin Flow

Admin manages the entire platform.

Admin login:

Email: admin@gmail.com  
Password: admin12345

Admin can:

- View Admin Dashboard
- View total users
- View total cars
- View total bookings
- View total revenue

Admin can also:

- Manage users
- Promote user → owner
- Delete users
- Manage cars
- View bookings
- Review host requests

---

# 📧 Host Request Email

When a user submits **Become Host form**, the request will be sent to the admin email.

The email contains:

- User Name
- Email
- Mobile Number
- Message
- User ID

Admin reviews the request and updates the user role.

---

# ❤️ Wishlist

Users can:

- Add cars to wishlist
- Remove cars from wishlist
- View saved cars

---

# ⭐ Reviews

Users can:

- Give star rating
- Write review
- View reviews from other users

---

# 📄 Invoice

After booking confirmation, users can download **PDF invoice** containing:

- Customer details
- Car details
- Booking dates
- Payment summary

---

# 🔒 Security

- JWT authentication
- Protected routes
- Role-based access control
- Secure payment verification

---

# 👨‍💻 Author

Developed by **Mahalakshmi R**  
MERN Stack Developer

---

# 📜 License

This project is licensed under the **MIT License**.
