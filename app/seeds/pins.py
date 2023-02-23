from app.models import db, Pin, environment, SCHEMA

def seed_pins():
  pin1 = Pin(
    owner_id=1, board_id=1, title="Air Jordan 1 Retro High OG 'Dark Mocha'", description="Jordan Brand continued their Black Toe design theme in 2020 and released the Jordan 1 High Dark Mocha, now available on StockX. The Dark Mocha 1 was one of the most anticipated releases in 2020 due to its familiar colorblocking that referenced two of the greatest Jordan 1s of all-time, the Jordan 1 Travis Scott and the Jordan 1 Black Toe. The upper of the Jordan 1 High Dark Mocha features a Sail leather base with black leather surrounding the toe box and Mocha suede on the heel and ankle. A black leather Swoosh, Jordan Wings logo on the ankle, and Nike Air branding on the tongue pays homage to branding that can be found on the original 1985 Jordan 1. A Sail midsole and black outsole complete this Black Toe design. The Jordan 1 High Dark Mocha released in October of 2020 and retailed for $175.", imageUrl = "https://cdn.shopify.com/s/files/1/0565/7182/2285/products/air-jordan-1-dark-mocha-555088-105-release-date_1024x1024.jpg")

  pin2 = Pin(
    owner_id=2, board_id=1, title="Nike Dunk Low 'Michigan State", description="The Nike Dunk 'Low Michigan State' delivers a low-top version of the Michigan State Dunk from 2020. Like its predecessor, the shoe features a two-tone all-leather upper rendered in classic 'Be True to Your School' color blocking. A stark white finish is contrasted by a dark green Swoosh and matching overlays at the toe and heel. Standard Nike branding hits decorate the heel and nylon tongue. The low-top is mounted on a durable rubber outsole, complete with a traction pattern originally developed for the hardwood.", imageUrl = "https://cdn.shopify.com/s/files/1/0565/7182/2285/products/nike-dunk-low-michigan-state-dd1391-101-pair_1024x1024.jpg")

  pin3 = Pin(
    owner_id=3, board_id=1, title="Air Jordan 1 High 'Seafoam'", description="Crafted for little kids, the Air Jordan 1 Retro High OG PS 'Seafoam' updates the iconic silhouette with a two-tone palette geared for the warm weather months. The upper is constructed from clean white leather with contrasting nubuck overlays in a pale green finish. The same pastel hue is repeated on the signature Swoosh, Nike branded tongue tag and durable rubber outsole. Woven white laces are outlined in reddish bronze for an unexpected pop of contrasting color.", imageUrl = "https://sneakernews.com/wp-content/uploads/2021/08/Air-Jordan-1-Seafoam-Beauty-Shots-0.jpg")

  pin4 = Pin(
    owner_id=4, board_id=1, title="Air Jordan 4 Retro 'White Oreo'", description="The Air Jordan 4 Retro 'White Oreo' features a design theme that recalls the original 'Oreo' AJ4 from 1999. The black tumbled leather upper of the older shoe is replaced by a clean white finish, though the speckled molded eyelets in Tech Grey remain the same. The neutral hue is repeated on the Jumpman heel logo and polyurethane midsole, featuring encapsulated Air cushioning in the forefoot and a visible unit under the heel. A second Jumpman adorns the tongue in a contrasting pop of Fire Red.", imageUrl = "https://cdn.shopify.com/s/files/1/0255/9429/8467/products/air-jordan-4-retro-white-oreo-2021-CT8527-100_2_fwbhqs.jpg")

  pin5 = Pin(
    owner_id=5, board_id=1, title="Air Jordan 4 Retro OG 'Fire Red'", description="The 2020 edition of the Air Jordan 4 Retro OG 'Fire Red' brings back the classic colorway first released in 1989, complete with the iconic Nike Air logo emblazoned on the heel. The rest of the build is recreated faithfully, highlighted by a white leather upper with Fire Red detailing on the molded eyelets and outsole. Other original details include a visible Air sole unit and tongue patch with a Jumpman logo and Flight script graphic. ", imageUrl = "https://i.ebayimg.com/images/g/9RMAAOSwtJdiuwaP/s-l1600.jpg")

  pin6 = Pin(
    owner_id=6, board_id=1, title="Air Jordan 11 'Jubilee'", description="The Air Jordan 11 'Jubilee', also known as the Air Jordan 11 '25th Anniversary', celebrates the classic silhouette's quarter-century birthday with a monochrome black finish throughout the upper, constructed from a traditional blend of ballistic mesh and patent leather. In keeping with the shoe's silver anniversary, a 3D metallic Jumpman and matching '23' branding decorate the heel, while 'Jordan' is spelled out in stylized silver lettering on each of the sneaker's eyelets. The mid-top rides on a classic white foam midsole, supported by a translucent rubber outsole.", imageUrl = "https://cdn.shopify.com/s/files/1/0565/7182/2285/products/Air-Jordan-11-Jubilee-CT8012-011-5_1024x1024.jpg")

  pin7 = Pin(
    owner_id=7, board_id=1, title="Air Jordan 3 Retro 'Cardinal Red'", description="The Air Jordan 3 Retro 'Cardinal Red' showcases a distinctive palette influenced by an OG colorway of the Air Jordan 7. The sneaker's titular hue appears on the collar lining, molded eyelets, and raised Jumpman branding at the heel, all of which are contrasted by a white tumbled leather upper. A second Jumpman icon adorns the tongue in orange embroidery, while the 3's signature elephant print overlays reinforce the forefoot and heel. The mid-top is mounted on a two-tone polyurethane midsole with a visible Air-sole unit nestled under the heel.", imageUrl = "https://sneakernews.com/wp-content/uploads/2021/12/jordan-3-cardinal-CT8532-126-4.jpg")

  pin8 = Pin(
    owner_id=8, board_id=2, title="Monstera Deliciosa", description="Monstera Deliciosa is a joy to care for, propagate and grow as a houseplant indoors. They are easy care, they grow fast and the new leaves are such an exciting event with their unfurling.", imageUrl = "https://i.pinimg.com/564x/e5/5b/2f/e55b2f46c8b575aff2d240b9442a6a79.jpg")

  pin9 = Pin(
    owner_id=9, board_id=2, title="Plants and Butterflies", description="Key West butterfly and nature conservatory BEST PLACE EVER!", imageUrl = "https://i.pinimg.com/750x/b4/ea/20/b4ea20f154c14fac2d41ac1f0b5bf351.jpg")

  pin10 = Pin(
    owner_id=10, board_id=2, title="String Of Pearls", description="String succulents are exactly what their name implies- succulents that are growing in a form of creeping strings or chains. All of these plants have somewhat similar characteristics, with pendant stems and green and fleshy leaves. Strings are formed by multiplying rows of leaves or forming a vine. String succulents do not require much care, which makes them perfect for outdoor and indoor hanging displays, as well as vertical gardens.", imageUrl = "https://i.pinimg.com/564x/e7/7a/7c/e77a7c223d43f7a77fb806b4bbdd683e.jpg")

  pin11 = Pin(
    owner_id=11, board_id=2, title="Bonsai Green Weeping Willow Tree ", description="BEAUTIFUL DWARF TREE: Weeping Willow Cutting. Vibrant Green Bark. Fast growing, a unique specimen indeed.", imageUrl = "https://i.pinimg.com/564x/15/bc/23/15bc23e55ce96118c78376054091a5a7.jpg")

  pin12= Pin(
    owner_id=12, board_id=2, title="Hanging Plant Flower Glass Ball Vase Terrarium Wall Fish Tank Aquarium Decor", description="Quality is the first with best service. customers all are our friends. Fashion design,100% Brand New,high quality! Material: Glass, Color: transparent, Style: Fashion, Casual, Diameter: approx. 10cm/ 12cm/ 15cm, There is 2-3% difference according to manual measurement. please check the measurement chart carefully before you buy the item.", imageUrl = "https://i.pinimg.com/736x/cc/27/1c/cc271cc34b572bbf0c9ccded63725e50.jpg")

  pin13 = Pin(
    owner_id=13, board_id=2, title="Indoor garden house", description="This is the green house of my dreams!!!", imageUrl = "https://i.pinimg.com/564x/19/4d/d2/194dd2f33bde5f7adc04698a2b6d8c98.jpg")

  pin14 = Pin(
    owner_id=14, board_id=2, title="12 Aesthetic Plants That Don't Require Sunlight And Can Beautify Your House", description="Are you one of those who wants to brighten up the home/office ambience by having plants around? But does insufficient lighting dissuade you from doing that? Well, fret not! These plant varieties do well even in darkened rooms and places impregnable by sunlight. Yes, you may thank us later!", imageUrl = "https://i.pinimg.com/564x/a0/f9/f4/a0f9f4ff90ef907e5e28b4ad6475e625.jpg")

  all_pins = [pin1, pin2, pin3, pin4, pin5, pin6, pin7, pin8, pin9, pin10, pin11, pin12, pin13, pin14]
  add_pins = [db.session.add(pin) for pin in all_pins]
  db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_pins():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM pins")

    db.session.commit()
