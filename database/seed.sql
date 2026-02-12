INSERT INTO service_categories (name, description)
VALUES
  ('Home Cleaning', 'Apartment and villa cleaning services'),
  ('Salon At Home', 'Beauty services at your doorstep'),
  ('Electrical', 'Electrical repairs and installations')
ON CONFLICT (name) DO NOTHING;

WITH cleaning AS (
  SELECT id FROM service_categories WHERE name = 'Home Cleaning'
), salon AS (
  SELECT id FROM service_categories WHERE name = 'Salon At Home'
), electrical AS (
  SELECT id FROM service_categories WHERE name = 'Electrical'
)
INSERT INTO services (category_id, name, description, base_price, estimated_duration_minutes)
SELECT cleaning.id, 'Deep Home Cleaning', 'Full home cleaning with equipment', 1999, 180 FROM cleaning
UNION ALL
SELECT salon.id, 'Bridal Makeup', 'Professional makeup for events', 4999, 150 FROM salon
UNION ALL
SELECT electrical.id, 'Fan Installation', 'Ceiling fan installation service', 699, 60 FROM electrical
ON CONFLICT (category_id, name) DO NOTHING;

INSERT INTO technicians (full_name, phone, email)
VALUES
  ('Arun Kumar', '+919900000001', 'arun.tech@namma.local'),
  ('Meena Ravi', '+919900000002', 'meena.tech@namma.local')
ON CONFLICT (phone) DO NOTHING;

INSERT INTO admin_users (email, password_hash, role)
VALUES ('admin@nammacompany.com', '$2b$10$PmgQddBr8AbUX8TYdlhK8.QygDEeFuNmXt8ZlssWExINEGOuMMoSu', 'admin')
ON CONFLICT (email) DO NOTHING;

INSERT INTO technician_services (technician_id, service_id)
SELECT t.id, s.id
FROM technicians t
JOIN services s ON s.name = 'Deep Home Cleaning'
WHERE t.phone = '+919900000001'
ON CONFLICT (technician_id, service_id) DO NOTHING;

INSERT INTO technician_services (technician_id, service_id)
SELECT t.id, s.id
FROM technicians t
JOIN services s ON s.name = 'Bridal Makeup'
WHERE t.phone = '+919900000002'
ON CONFLICT (technician_id, service_id) DO NOTHING;
