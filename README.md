# FlightBookingApp
The Flight Booking Management System is a modern, full-stack web application designed to simplify flight search, booking, and ticket management. The application provides a secure and user-friendly interface for passengers to search available flights and manage bookings, while enabling administrators to manage flight data efficiently.

## Features Implemented
| **Requirement**                            | **Status** | **Enforcement / Layer**        |
| ------------------------------------------ | ---------- | ------------------------------ |
| Add Flights (Admin only)                   | Completed  | Backend + UI                   |
| RBAC (Admin role only, no self-assignment) | Enforced   | Gateway + Backend              |
| Seeded Admin User                          | Completed  | Database                       |
| Environment-specific Properties            | Completed  | Local & Docker Config Files    |
| Optimized Dockerfile                       | Completed  | Multi-stage Docker Build       |
| Change Password (Logged-in user only)      | Completed  | Backend API + UI               |
| Source & Destination Dropdowns             | Completed  | Angular UI                     |
| Block Past Dates in Date Picker            | Completed  | Angular Validation             |
| Booking Sorting by Status                  | Completed  | Backend + UI                   |
| Admin Cannot Book Flights                  | Enforced   | Role-based UI Logic            |
| Reusable Navbar Component                  | Completed  | Angular Component Architecture |

• Implemented Add Flight functionality allowing admins to create and manage flight inventory.

• Enforced Role-Based Access Control (RBAC) to restrict flight management operations to admin users only.

    1. Admin has been seeded in the database
    2. Admin role cant be self assigned
• Configured environment-specific properties using separate configuration files for Local and Docker deployments.

• Optimized Dockerfiles to improve image size, build time, and container startup performance.

• Implemented Change Password functionality with validation and secure credential handling.

    1. Added new api endpoint in the backend
    2. Password can only be changed by a logging in user
    
• Additional data:

    1. Implemented dropdown for all source and destinations
    2. Blocked past dates from date picker
    3. Arranged current booking by status (confirmed first, then cancelled)
    4. Admin can access search flight, but cant book them (select flight button wont be visible)
    5. Separated the navbar into its own component to reduce code duplication

## Role-Based Authorization – Add Flight Page

| Layer                  | Implementation                                                                        |
| ---------------------- | ------------------------------------------------------------------------------------- |
| Frontend (Angular)     | Add Flight navigation and UI components are conditionally rendered based on user role |
| Backend (API)          | Endpoints are secured to allow access only to users with `ADMIN` role                 |
| Database               | Admin role is pre-seeded and cannot be self-assigned                                  |
| API Gateway / Security | Prevents direct API access via Postman or bypass attempts                             |


Admins are seeded into the database, they cannot be self-assiged
<img width="1805" height="939" alt="Screenshot 2025-12-23 022452" src="https://github.com/user-attachments/assets/85d76b65-4368-4fbb-8d3b-62f0f699753f" />

The Add-Flight page is accessible to the admin only
<img width="1919" height="1079" alt="Screenshot 2025-12-23 084650" src="https://github.com/user-attachments/assets/157cbbd8-bae5-4185-9e8d-d4dc2eb482e0" />

<img width="1919" height="1079" alt="Screenshot 2025-12-23 012041" src="https://github.com/user-attachments/assets/662b260c-9829-42ef-8330-24202e40c999" />


## User Profile & Password Management
The application provides a secure Profile module that allows authenticated users to view their account details and update their password while enforcing strict security rules.
| Feature            | Description                                             |
| ------------------ | ------------------------------------------------------- |
| User Profile       | Displays logged-in user details (username, email, role) |
| Change Password    | Allows users to securely update their password          |
| Session Validation | Only authenticated users can access profile features    |

Profile Page
<img width="1918" height="831" alt="Screenshot 2025-12-23 015151" src="https://github.com/user-attachments/assets/0b6c80da-2834-43dd-94b2-9a1b467f68d4" />

Change Password Feature
<img width="1918" height="942" alt="Screenshot 2025-12-23 015536" src="https://github.com/user-attachments/assets/fad86bcf-d36c-4686-a3c8-a475eb5cbbe2" />

Successful Password Change
<img width="1914" height="944" alt="Screenshot 2025-12-23 015635" src="https://github.com/user-attachments/assets/86d27430-f74c-40bd-b1a3-96bdfcc15c9d" />

### Security Highlights
Password updates require an active authenticated session

Users cannot change passwords for other accounts

Backend validation prevents API misuse via Postman or direct calls

Ensures consistency between UI and backend authorization

## Booking History & Cancel Flight

The Booking History module allows users to view all their bookings, while the Cancel Flight feature enables secure cancellation of eligible bookings with proper authorization and validation.
| Feature               | Description                                                     |
| --------------------- | --------------------------------------------------------------- |
| View Bookings         | Displays all bookings of the logged-in user                     |
| Status-based Ordering | Bookings are sorted by status (Confirmed first, then Cancelled) |
| Booking Details       | Shows flight details, passenger count, booking date, and status |
| Role Awareness        | Admin users can view flights but cannot perform booking and hence can't view Booking History        |

Status based ordering
<img width="1915" height="945" alt="Screenshot 2025-12-23 014621" src="https://github.com/user-attachments/assets/bf88c4c9-7051-4a61-ad7b-bac276d4cbea" />

<img width="1919" height="950" alt="Screenshot 2025-12-23 014700" src="https://github.com/user-attachments/assets/009e2c46-6f67-46fb-9771-42f251b02c90" />

### Business Rules

Only the logged-in user can cancel their own bookings

Cancelled bookings cannot be cancelled again

Bookings cannot be cancelled before 24 hours of the flight

Cancellation is blocked for invalid or unauthorized PNRs

Cancel Booking Dialog: Asks for confirmation
<img width="1916" height="942" alt="Screenshot 2025-12-23 014814" src="https://github.com/user-attachments/assets/b3a7aba5-2a69-44e7-8feb-0f37705ed816" />

Bookings cannot be cancelled after journey has started, or before 24 hours of the flight
<img width="1916" height="947" alt="Screenshot 2025-12-23 015038" src="https://github.com/user-attachments/assets/4d152e80-77cf-4720-bc1d-02664c592dd4" />

Successful cancellation: Immediately change the booking status
<img width="1919" height="939" alt="Screenshot 2025-12-23 014931" src="https://github.com/user-attachments/assets/3c2c04d7-1cfd-4a66-aa62-f6743b7cb7db" />

### Search Flight & Booking Module
The Search Flight & Booking module allows users to search for available flights and securely book selected flights while enforcing role-based access and business validations.
| Validation                    | Description                                                    | Enforcement Layer   |
| ----------------------------- | -------------------------------------------------------------- | ------------------- |
| Source & Destination Required | Users must select both source and destination before searching | Angular UI          |
| Source ≠ Destination          | Prevents selecting the same city for both fields               | Angular UI          |
| Valid Travel Date             | Only present or future dates are allowed                       | Angular Date Picker |
| Empty Search Prevention       | Search or Booking cannot be triggered with incomplete filters             | Angular UI          |
| Role Awareness                | Admin can search flights but cannot proceed to booking         | UI Logic            |


Search flights
<img width="1919" height="949" alt="Screenshot 2025-12-23 012916" src="https://github.com/user-attachments/assets/8cb91817-6ba7-479f-9cc6-13fc5227a170" />
<img width="1919" height="956" alt="Screenshot 2025-12-23 013005" src="https://github.com/user-attachments/assets/1ae9eb66-7ee5-4ffc-b33b-e0c9260c4f5b" />

Book the flight
<img width="1919" height="947" alt="Screenshot 2025-12-23 013537" src="https://github.com/user-attachments/assets/51bcffe3-8c67-4fd5-b210-3f55bf69cd3c" />

Booking details page
<img width="1910" height="946" alt="Screenshot 2025-12-23 013927" src="https://github.com/user-attachments/assets/8a0d6031-238b-45ce-9e74-145c782ff2ff" />


### Registration & Login Module
The Registration & Login module handles user authentication using JWT-based security, ensuring only valid users can access protected features while enforcing role-based restrictions from the start.

| Feature                 | Description                                                     |
| ----------------------- | --------------------------------------------------------------- |
| User Signup             | Allows new users to register with username, email, and password |
| Default Role Assignment | All newly registered users are assigned the `USER` role         |
| Role Safety             | Admin role cannot be self-assigned during registration          |
| Input Validation        | Ensures clean and valid user data                               |

Register Page
<img width="1914" height="945" alt="Screenshot 2025-12-23 020046" src="https://github.com/user-attachments/assets/9d2e9838-a44d-4aab-9886-c7d2394940b3" />

Login Page
<img width="1916" height="944" alt="Screenshot 2025-12-23 020656" src="https://github.com/user-attachments/assets/4210f096-61ee-410e-b554-7a2a06111b3f" />

| **Validation**   | **Description**                                | **Layer**         |
| ---------------- | ---------------------------------------------- | ----------------- |
| Required Fields  | Username, email, password cannot be empty      | UI + Backend      |
| Email Format     | Valid email structure enforced                 | UI                |
| Duplicate User   | Prevents duplicate username/email registration | Backend           |
| Role Restriction | Admin role cannot be assigned at signup        | Backend           |
| Credential Check | Username/password must match                   | Backend           |

