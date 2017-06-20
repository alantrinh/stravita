DROP TABLE IF EXISTS activities;
DROP TABLE IF EXISTS follower_requests;
DROP TABLE IF EXISTS athletes;

CREATE TABLE athletes (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(60) NOT NULL,
    image_url VARCHAR(300),
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE follower_requests (
    id SERIAL PRIMARY KEY,
    recipient_id INTEGER NOT NULL,
    sender_id INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE activities (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    title VARCHAR(255),
    description TEXT,
    file_name VARCHAR(300) NOT NULL,
    data JSONB NOT NULL
);
