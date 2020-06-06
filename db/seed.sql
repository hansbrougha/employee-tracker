USE employees_db;

INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Poly", "Styrene", 1, NULL),
    ("Darby", "Crash", 2, 1),
    ("Bo", "Jackson", 3, NULL),
    ("Serena", "Williams", 4, 3),
    ("Charlie", "Kelly", 5, NULL),
    ("Frank", "Reynolds", 6, 5),
    ("Janelle", "Monae", 7, NULL),
    ("Sharon", "Jones", 8, 7);