# 📚 BCS Noteswala

BCS Noteswala is a full-stack MERN web application where students can access, search, and download BCS study materials and PDF notes for:

- First Year (FY)
- Second Year (SY)
- Third Year (TY)

The platform includes:

- User Authentication with Email OTP Verification
- Forgot Password & Reset Password
- Admin Dashboard
- Add PDF Notes
- Search Notes by Subject
- Responsive UI

---

# 🚀 Features

## 👨‍🎓 User Features

- User Signup/Login
- Email OTP Verification
- Forgot Password using OTP
- View PDF Notes
- Search Notes
- Responsive Design

---

## 👨‍💻 Admin Features

- Admin Login
- Add FY/SY/TY PDFs
- Manage Notes
- Secure Admin Access

---

# 🛠️ Tech Stack

## Frontend
- React.js
- React Router DOM
- Axios
- Bootstrap
- SweetAlert

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Nodemailer
- Bcrypt

---

# 📂 Project Structure

```bash
BCS-NOTESWALA/
│
├── client/
│   ├── src/
│   │   ├── Admin/
│   │   ├── components/
│   │   ├── views/
│   │   ├── util/
│   │   └── App.js
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── index.js
│
└── README.md
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/bcs-noteswala.git
```

---

## 2️⃣ Install Dependencies

### Client

```bash
cd client
npm install
```

### Server

```bash
cd server
npm install
```

---

# 🔑 Environment Variables

Create `.env` file inside `server/`

```env
PORT=5000

MONGODB_URL=your_mongodb_url

JWT_SECRET=your_secret_key

EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_app_password
```

---

# ▶️ Run Project

## Start Backend

```bash
cd server
npm start
```

## Start Frontend

```bash
cd client
npm start
```

---

# 👨‍💻 Default Admin Access

Update admin role directly in MongoDB:

```js
db.users.updateOne(
  { email: "your-email@gmail.com" },
  {
    $set: {
      role: "admin"
    }
  }
)
```

---

# 🔐 Authentication Flow

## Signup
1. User creates account
2. OTP sent to email
3. Verify OTP
4. Account activated

---

## Login
1. User logs in
2. JWT token generated
3. User session stored in localStorage

---

## Forgot Password
1. Send reset OTP
2. Verify OTP
3. Set new password

---

# 📚 PDF APIs

## Add PDFs

```http
POST /createFyPdf
POST /createSyPdf
POST /createTyPdf
```

---

## Fetch PDFs

```http
GET /FyallPdfs
GET /SyallPdfs
GET /TyallPdfs
```

---

## Search PDFs

```http
GET /Fypdfsbytitle?title=
GET /Sypdfsbytitle?title=
GET /Typdfsbytitle?title=
```

---

# 🧠 Important Fixes Added

✅ OTP Authentication  
✅ Password Hashing  
✅ Auto Login after OTP Verification  
✅ Forgot Password System  
✅ Admin Protection  
✅ Null CurrentUser Fix  
✅ API Error Handling  
✅ Search Functionality  
✅ Dynamic PDF Loading  
✅ Admin Default Access Logic  

---

# 📸 Screens Included

- Home Page
- Login Page
- Signup Page
- OTP Verification
- Admin Dashboard
- PDF Listing Pages

---

# 🌐 Future Improvements

- PDF Upload System
- Notes Categories
- User Profile
- Dark Mode

---

# ❤️ Thank You

Thank you for using BCS Noteswala.  
Happy Learning 🚀
