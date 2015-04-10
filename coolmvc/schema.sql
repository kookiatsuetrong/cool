create database db default charset=utf8;
create user 'user'@'localhost' identified by 'password';
grant all on db.* to 'user'@'localhost';
-- set password for 'user'@'localhost' = password('');

use db;
-- drop table if exists users;
create table users (
  id         serial,                       -- merchant id
  email      nvarchar(255) unique,         -- merchant email
  password   varchar(2047),                -- password
  name       nvarchar(2047)                -- merchant name
);


insert into users(email, password)
  values('cool@programming.language', sha2('password', 256));


-- end
