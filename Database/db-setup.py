import os
import psycopg2
from psycopg2 import sql
from dotenv import load_dotenv
import time
import logging

# Load environment variables from the .env file
load_dotenv()

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Database credentials from environment variables
db_host = os.getenv("POSTGRES_HOST", "postgres")
db_user = os.getenv("POSTGRES_USER")
db_password = os.getenv("POSTGRES_PASSWORD")
db_name = os.getenv("POSTGRES_DB")
db_port = os.getenv("POSTGRES_PORT", "5432")
db_retries = int(os.getenv("DB_RETRIES", 5))  # Get retry count from environment variable

# Function to connect with retries
def connect_with_retries(dbname):
    for i in range(db_retries):
        try:
            conn = psycopg2.connect(
                dbname=dbname,
                user=db_user,
                password=db_password,
                host=db_host,
                port=db_port,
            )
            return conn
        except psycopg2.OperationalError as e:
            logger.warning(f"Connection attempt {i + 1} failed: {e}. Retrying...")
            time.sleep(5)  # Increase wait time before retrying
    logger.error(f"Could not connect to the database after {db_retries} attempts.")
    raise Exception(f"Could not connect to the database after {db_retries} attempts.")

# Step 1: Connect to the default 'postgres' database to create the new database
conn = None
try:
    conn = connect_with_retries("postgres")
    conn.autocommit = True
    cursor = conn.cursor()
    try:
        cursor.execute(sql.SQL("CREATE DATABASE {}").format(sql.Identifier(db_name)))
        logger.info(f"Database {db_name} created successfully.")
    except psycopg2.errors.DuplicateDatabase:
        logger.info(f"Database {db_name} already exists, skipping creation.")
    except psycopg2.Error as e:
        logger.error(f"Error creating database: {e}")
finally:
    if conn:
        cursor.close()
        conn.close()

# Step 2: Connect to the new 'personal_finance_db' database and set up the tables
conn = None  # Re-initialize conn for the second connection
try:
    conn = connect_with_retries(db_name)
    cursor = conn.cursor()

    # Create User table
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(32) NOT NULL UNIQUE,
            email VARCHAR(128) NOT NULL UNIQUE,
            password VARCHAR(128) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
        );
        """
    )

    # Create Accounts table
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS accounts (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            account_type VARCHAR(32) NOT NULL,
            balance DECIMAL(10, 2) NOT NULL DEFAULT 0,
            created_at TIMESTAMP DEFAULT NOW()
        );
        """
    )

    # Create Transactions table
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS transactions (
            id SERIAL PRIMARY KEY,
            account_id INTEGER REFERENCES accounts(id) ON DELETE CASCADE,
            amount DECIMAL(10, 2) NOT NULL,
            transaction_type VARCHAR(32) NOT NULL, -- e.g., "deposit", "withdrawal"
            transaction_date TIMESTAMP DEFAULT NOW(),
            description VARCHAR(255)
        );
        """
    )

    # Create Budget Items table
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS budget_items (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            item_name VARCHAR(64) NOT NULL,
            amount DECIMAL(10, 2) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
        );
        """
    )

    # Create Savings Goals table
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS savings_goals (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            goal_name VARCHAR(64) NOT NULL,
            target_amount DECIMAL(10, 2) NOT NULL,
            saved_amount DECIMAL(10, 2) DEFAULT 0.00,
            deadline TIMESTAMP,
            created_at TIMESTAMP DEFAULT NOW()
        );
        """
    )

    # Create Financial Summary table
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS financial_summary (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            total_income DECIMAL(10, 2),
            total_expenses DECIMAL(10, 2),
            total_savings DECIMAL(10, 2),
            created_at TIMESTAMP DEFAULT NOW()
        );
        """
    )

    # Create Income Breakdown table
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS income_breakdown (
            id SERIAL PRIMARY KEY,
            source VARCHAR(255) NOT NULL,
            amount DECIMAL(10, 2),
            financial_summary_id INTEGER REFERENCES financial_summary(id) ON DELETE CASCADE
        );
        """
    )

    # Create Expense Breakdown table
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS expense_breakdown (
            id SERIAL PRIMARY KEY,
            category VARCHAR(255) NOT NULL,
            amount DECIMAL(10, 2),
            financial_summary_id INTEGER REFERENCES financial_summary(id) ON DELETE CASCADE
        );
        """
    )

    # Insert default users into users table (for example purposes)
    users = [
        ("chichi", "chichitee@gmail.com", "password1"),
    ]
    
    insert_user_query = sql.SQL(
        "INSERT INTO users (username, email, password) VALUES (%s, %s, %s) ON CONFLICT DO NOTHING"
    )

    for user in users:
        cursor.execute(insert_user_query, user)

    conn.commit()
    logger.info("Tables created and default users inserted successfully.")
except psycopg2.Error as e:
    logger.error(f"Error setting up tables: {e}")
finally:
    if conn:
        cursor.close()
        conn.close()
