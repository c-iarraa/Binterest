from app.models import db, Comment, environment, SCHEMA
from datetime import datetime

def seed_comments():
    comment1 = Comment(
         user_id = 2, pin_id = 5, comment = "Dawg these shoes are so nice. I want these so bad")

    comment2 = Comment(
        user_id = 3, pin_id = 4, comment = "nice!")

    comment3 = Comment(
        user_id = 2, pin_id = 4, comment = "Cookie Monster gonna love these fr")

    # comment4 = Comment(
    #     comment = "4's are my favorite. I'm tryna get these", user_id = 1, pin_id = 5)

    # comment5 = Comment(
    #     comment = "Mochas were trending a lot back in 2020, I'd still buy them", user_id = 1, pin_id = 1)

    # comment6 = Comment(
    #     comment = "This colorway goes crazy", user_id = 3, pin_id = 1)

    # comment7 = Comment(
    #     comment = "This color is so nice", user_id = 4, pin_id = 2)

    # comment8 = Comment(
    #     comment = "I'd fasho cop 100%", user_id = 5, pin_id = 2)

    # comment9 = Comment(
    #     comment = "This plant is so beautiful!!! I can't wait til I get one for my home.", user_id = 6, pin_id = 8)

    # comment10 = Comment(
    #     comment = "I got a pair of these when they first dropped. They're so comfortable and they remind me a little of the space jams", user_id = 8, pin_id = 6)

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    # db.session.add(comment4)
    # db.session.add(comment5)
    # db.session.add(comment6)
    # db.session.add(comment7)
    # db.session.add(comment8)
    # db.session.add(comment9)
    # db.session.add(comment10)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
