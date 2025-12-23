CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL,
    transaction_type VARCHAR(20) NOT NULL CHECK (transaction_type IN ('deposit', 'withdraw', 'case_open', 'case_win')),
    amount DECIMAL(10, 2) NOT NULL,
    balance_after DECIMAL(10, 2) NOT NULL,
    case_name VARCHAR(100),
    item_name VARCHAR(100),
    item_rarity VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_type ON transactions(transaction_type);
CREATE INDEX idx_transactions_created_at ON transactions(created_at DESC);

CREATE TABLE site_statistics (
    id SERIAL PRIMARY KEY,
    total_deposits DECIMAL(15, 2) DEFAULT 0,
    total_withdraws DECIMAL(15, 2) DEFAULT 0,
    total_case_opens DECIMAL(15, 2) DEFAULT 0,
    total_case_wins DECIMAL(15, 2) DEFAULT 0,
    profit DECIMAL(15, 2) GENERATED ALWAYS AS (total_deposits + total_case_opens - total_withdraws - total_case_wins) STORED,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO site_statistics (total_deposits, total_withdraws, total_case_opens, total_case_wins) 
VALUES (0, 0, 0, 0);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(100) UNIQUE NOT NULL,
    username VARCHAR(100) NOT NULL,
    balance DECIMAL(10, 2) DEFAULT 0,
    total_deposited DECIMAL(10, 2) DEFAULT 0,
    total_withdrawn DECIMAL(10, 2) DEFAULT 0,
    total_won DECIMAL(10, 2) DEFAULT 0,
    cases_opened INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_user_id ON users(user_id);
CREATE INDEX idx_users_total_won ON users(total_won DESC);