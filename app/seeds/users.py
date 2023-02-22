from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', first_name='Demo', last_name='Lition', age=20)
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', first_name='Marnie', last_name='Lopez', age=21)
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', first_name='Bobbie', last_name='Shmurda', age=22)
    george = User(
        username='george', email='george@aa.io', password='password', first_name='George', last_name='Dua', age=23)
    alex = User(
        username='alex', email='alex@aa.io', password='password', first_name='Alex', last_name='Garcia', age=24)
    dior = User(
        username='dior', email='dior@aa.io', password='password', first_name='Dior', last_name='Caliz', age=25)
    ryder = User(
        username='ryder', email='ryder@aa.io', password='password', first_name='Ryder', last_name='Dane', age=26)
    blaze = User(
        username='blaze', email='blaze@aa.io', password='password', first_name='Blaze', last_name='Emerius', age=27)
    tiara = User(
        username='tiara', email='tiara@aa.io', password='password', first_name='Tiara', last_name='Louelle', age=28)



    userList = [demo, marnie, bobbie, george, alex, dior, ryder,
                blaze, tiara]

    add_users = [db.session.add(user) for user in userList]
    # db.session.add(demo)
    # db.session.add(marnie)
    # db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
