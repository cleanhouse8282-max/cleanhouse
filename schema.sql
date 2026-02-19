CREATE TABLE reservations (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 date TEXT NOT NULL,
 time_slot TEXT NOT NULL,
 category TEXT,
 size INTEGER,
 price INTEGER,
 name TEXT,
 address TEXT,
 phone TEXT,
 request TEXT,
 status TEXT DEFAULT 'pending',
 created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admin (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 username TEXT UNIQUE,
 password TEXT
);

INSERT INTO admin (username,password)
VALUES ('admin','admin');