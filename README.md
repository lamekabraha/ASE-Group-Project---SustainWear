[README.md](https://github.com/user-attachments/files/24202138/README.md)

# SustainWear

A role-based system aiming to promote sustainability by creating a streamlined process of donating, categorising and redistributing clothing. The system allows the users to track donations, manage inventories and monitor sustainability.




## Tech Stack

### Frontend

- **Framework:** Next.js 15 (App Router)

- **Language:** TypeScript 

- **Styling:** Tailwind CSS v4

- **Icons:** Lucide React

- **Charts:** Recharts

### Backend:

- **Database:** MySQL

- **ORM:** Prisma

- **Authentication:** NextAuth (Credentials Provider)

- **Password Hashing:** bcrypt.js


## Features
### Donors
- **Easy Donation Process:** Submit items for donation with photos and donation information (category, size, gender and condition)
- **Impact Tracking:** Visualise your contribution to sustainability 
- **History:** View a log of your donations and thier status
- **Profile Management:** Manage personal details

### Staff Members
- **Dashboard:** Overview of total inventory, pending donations and distribution status
- **Inventory Management:** View, edit and manage stock levels of donated items.
- **Pending Donatons:** Review and approve or reject incoming donation requests
- **Distribution:** Fulfill distribution requests made by partnered charities.

### Administrators
- **Master Dashboard:** High-level analytics including monthly activity and inventory stats.
- **User Management:** View, Search, and delete user accounts.
- **Reports:** Generate and view data on category breakdowns and environmental impact.
- **System Oversight:** Full access to inventory and distribution logs.

## Prerequisites
- Node.js
- MySQL Database

## Installation
```bash
    git clone https://github.com/your-username/sustainwear.git
```
```bash
    cd sustainwear
```

## Install Dependencies
```bash
    npm install
```
*You may need to run ```npm audit fix``` if you come across any vulnerabilities* 

```bash
    npx prisma generate
```

```bash
    npm run dev
```


## Project Structure
```bash
    ASE-Group-Project---SustainWear/
    |--sustainwear/             <--Main project found here
        |--...
        |--src/                 
        |   |--app/
        |       |--admin/       <--Contains the admin dashboard 
        |       |--api/         <--Constains the backend api routes
        |       |--auth/        <--Contains the login and registration pages
        |       |--Components/  <--Contains the reusable components
        |       |--context/     <--Contains the context for the alert card
        |       |--donor/       <--Contains the donor dashboard pages
        |       |--staff/       <--Contains the staff dashboard pages
        |       |--utils/       <--Contains the utility for the alert card
        |--lib/
        |   |--prisma.ts        <--Prisma client instance
        |--middlewear/          <--NextAuth middlewear protection
```
## Usage

**Register:** Create a new account as a donor via ```/auth/register```

**Sign In:** login as a donor, staff member or administor, using these credentials:

- Donor
```bash
    email: priya.singh1979@outlook.com
    password: Pass123!
```

- Staff
```bash
    email: aisha.pattel1945@outlook.com
    password: Pass123
```

- Admin
```bash
    email: carlos.rodriguiz1973@outlook.com
    password: Pass123
```
# Contributors

This project was developed by:
    
- lamekabraha
- hamadabdul1499
- Zeeshan1021
- Omer453
- Raheel654
