from app.models import db, PinBoard, environment, SCHEMA

def seed_pinboards():
  pinboard1 = PinBoard(
    owner_id=1, name="shoes")

  pinboard2 = PinBoard(
    owner_id=2, name="plant inspo")

  pinboard3 = PinBoard(
    owner_id=3, name="test board")



  db.session.add(pinboard1)
  db.session.add(pinboard2)
  db.session.add(pinboard3)

  db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_pinboards():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.pinboards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM pinboards")

    db.session.commit()
