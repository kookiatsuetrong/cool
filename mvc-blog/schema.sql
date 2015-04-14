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

-- drop table if exists blogs;
create table blogs (
  id         serial,
  title      nvarchar(255),
  info       mediumtext,
  date       date
);

insert into blogs set date="2015-04-01", title="Title-1", info="blog detail 1";
insert into blogs set date="2015-04-02", title="Title-2", info="blog detail 2";
insert into blogs set date="2015-04-03", title="Title-3", info="blog detail 3";

-- end
