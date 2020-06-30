create table users (
    user_id serial primary key,
    username varchar(25),
    password varchar (25),
    profile_pic text
):

create table posts (
    post_id serial primary key,
    title varchar(45),
    img text,
    content text,
    author_id integer references users(user_id)
);

alter table users 
alter column password set data type text;