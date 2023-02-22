from app.models import db, PinBoard, environment, SCHEMA

def seed_pinboards():
  pinboard1 = PinBoard(
    ownerId=1, name="Air Jordan 1 Retro High OG 'Dark Mocha'")

  pinboard2 = PinBoard(
    ownerId=2, name="Nike Dunk Low 'Michigan State'")




  all_pinboards = [pin1, pin2]
  add_pinboards = [db.session.add(pinboard) for pinboard in all_pinboards]
  db.session.commit()


def undo_pinboards():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.pinboards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM pinboards")

    db.session.commit()
