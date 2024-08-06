# Calculator API

## Introduction

Calculator API is a robust backend service for a web-based calculator application. It provides secure, scalable, and efficient calculation services with user authentication and balance management.

## Description

This API offers various mathematical operations including addition, subtraction, multiplication, division, square root, and random string generation. Each operation has an associated cost, which is deducted from the user's balance upon execution. The API is built with Node.js and Express, uses MongoDB for data persistence, and implements JWT for authentication.

Key features:
- User authentication and authorization
- Balance management for users
- Various mathematical operations
- Random string generation using a third-party service
- Operation history tracking

## Installation

### Prerequisites

- Node.js (v16.17.0 or later)
- MongoDB (v4.0 or later)
- npm (v6.0.0 or later)

### Steps

<b>1. Clone the repository:</b>
* git clone https://github.com/Timon0219/calculator-backend .git
* cd calculator-api

<b>2. Install dependencies:</b>
* npm install

<b>3. Start Server:</b>
* cd calculator-backend/src
* node app.js