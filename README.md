# 🏠 Airbnb Clone — *Next.js 14 App Router Edition*

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.0-blue?logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com/)

A fully-functional Airbnb clone — built with cutting-edge full-stack technologies and modern design practices.

---

## ✨ Features

- 🔐 **Google & GitHub Authentication** using NextAuth.js  
- 🏡 **Host Your Own Listings** — Create, edit, and manage property listings  
- 🖼️ **Image Uploads** powered by Cloudinary  
- 📍 **Search Listings** with location autocomplete and date filters  
- 📆 **Bookings** with real-time availability and Stripe checkout  
- 🗺️ **Map Integration** using Google Maps API  
- 📱 **Mobile Responsive** & elegant dark mode  
- 🧑‍💼 **User Dashboard** to manage bookings & hosted properties  

---

## 📸 Preview

> *(Add your screenshots or a demo GIF here)*

![Airbnb Clone Preview](https://your-cdn-link.com/preview.png)

---

## 🚀 Getting Started

### 📦 1. Clone the Repository

```bash
git clone https://github.com/yourusername/airbnb-clone.git
cd airbnb-clone


🧱 2. Install Dependencies
bash
Copy
Edit
npm install
# or
yarn
⚙️ 3. Set Environment Variables
Create a .env.local file in the root and fill it with:

env
Copy
Edit
# Database
DATABASE_URL=mongodb+srv://...

# Auth
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_ID=your-google-id
GOOGLE_SECRET=your-google-secret
GITHUB_ID=your-github-id
GITHUB_SECRET=your-github-secret

# Cloudinary
CLOUD_NAME=your-cloud-name
CLOUD_API_KEY=your-api-key
CLOUD_API_SECRET=your-api-secret

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-api-key
🧪 4. Setup Prisma
bash
Copy
Edit
npx prisma generate
npx prisma db push
🖥️ 5. Run Development Server
bash
Copy
Edit
npm run dev
Visit: http://localhost:3000

🗂️ Project Structure
vbnet
Copy
Edit
app/
├── api/                  → API routes (auth, listings, bookings, etc.)
├── auth/                 → Login & register pages
├── host/                 → Host property flow
├── listings/             → View & explore listings
├── profile/              → Dashboard for user & host
├── trips/                → User's booked trips
├── layout.tsx            → Global layout (header/footer)
└── page.tsx              → Home with search & featured listings
🧰 Tech Stack
Feature	Stack/Library
Frontend	Next.js 14 App Router, Tailwind CSS, TypeScript
Auth	NextAuth.js (Google & GitHub providers)
Database	MongoDB via Prisma ORM
Image Uploads	Cloudinary
Payments	Stripe Checkout
Maps	Google Maps API
Hosting	Vercel

📦 Deploy to Vercel
Click below to instantly deploy your own version:


🙌 Contributing
Found a bug or have a feature request? Feel free to:

⭐ Star this repo

🐛 Submit an issue

📥 Create a pull request

📄 License
This project is open-source under the MIT License.

💬 Contact
Built by @yourgithubusername — feel free to connect!

yaml
Copy
Edit

---

### 📝 Tips

- Replace placeholder links (`your-cdn-link.com`, `yourgithubusername`) with your actual GitHub/CDN assets.
- Add 2–3 demo screenshots or a GIF for visual appeal.
- Pin this README to the top of your GitHub repo!

Would you like me to also generate the `.env.local.example` file and a starter repo structure zip?