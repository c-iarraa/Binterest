from app.models import db, pins_boards_table, environment, SCHEMA

def seed_pins_boards_table():
    jointable_1 = pins_boards_table.insert().values(pinboard_id=1, pin_id=2)
    jointable_2 = pins_boards_table.insert().values(pinboard_id=1, pin_id=6)
    jointable_3 = pins_boards_table.insert().values(pinboard_id=2, pin_id=8)
    jointable_4 = pins_boards_table.insert().values(pinboard_id=2, pin_id=12)



    db.session.execute(jointable_1)
    db.session.execute(jointable_2)
    db.session.execute(jointable_3)
    db.session.execute(jointable_4)


    db.session.commit()


    # all_jointables = [jointable_1]
    # add_jointables = [db.session.add(jointable) for jointable in all_jointables]
    # db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_pins_boards_table():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.pins_boards_table RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM pins_boards_table")

    db.session.commit()
