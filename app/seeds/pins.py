from app.models import db, Pin, environment, SCHEMA

def seed_pins():
  pin1 = Pin(
    owner_id=1, title="Air Jordan 1 Retro High OG 'Dark Mocha'", description="Jordan Brand continued their Black Toe design theme in 2020 and released the Jordan 1 High Dark Mocha, now available on StockX.", imageUrl = "https://cdn.shopify.com/s/files/1/0496/3971/9073/products/mocha.jpg", destinationLink = 'https://www.goat.com/sneakers/air-jordan-1-retro-high-og-555088-105')

    # The Dark Mocha 1 was one of the most anticipated releases in 2020 due to its familiar colorblocking that referenced two of the greatest Jordan 1s of all-time, the Jordan 1 Travis Scott and the Jordan 1 Black Toe. The upper of the Jordan 1 High Dark Mocha features a Sail leather base with black leather surrounding the toe box and Mocha suede on the heel and ankle. A black leather Swoosh, Jordan Wings logo on the ankle, and Nike Air branding on the tongue pays homage to branding that can be found on the original 1985 Jordan 1.

  pin2 = Pin(
    owner_id=2, title="Nike Dunk Low 'Michigan State'", description="The Nike Dunk 'Low Michigan State' delivers a low-top version of the Michigan State Dunk from 2020. Like its predecessor, the shoe features a two-tone all-leather upper rendered in classic 'Be True to Your School' color blocking.", imageUrl = "https://cdn.shopify.com/s/files/1/0565/7182/2285/products/nike-dunk-low-michigan-state-dd1391-101-pair_1024x1024.jpg", destinationLink = 'https://www.goat.com/sneakers/dunk-low-michigan-state-dd1391-101')

  pin3 = Pin(
    owner_id=3, title="Air Jordan 1 High 'Seafoam'", description="The Air Jordan 1 Retro High OG PS 'Seafoam' delivers a subtle two-tone colorway of the 1985 sneaker that started it all. The all-leather upper features a crisp white base with contrasting overlays in a soft green finish.", imageUrl = "https://sneakernews.com/wp-content/uploads/2021/08/Air-Jordan-1-Seafoam-Beauty-Shots-0.jpg", destinationLink = 'https://www.goat.com/sneakers/wmns-air-jordan-1-retro-high-og-seafoam-cd0461-002')

    # The pastel hue is repeated on the sneaker's branding elements, which include the signature Swoosh and Nike Air tongue tag. Contrasting color arrives via Healing Orange trim on the flat woven laces. The high-top is anchored by a durable rubber cupsole with encapsulated Air sole cushioning in the heel.

  pin4 = Pin(
    owner_id=4, title="Air Jordan 4 Retro 'White Oreo'", description="The Air Jordan 4 Retro 'White Oreo' features a design theme that recalls the original 'Oreo' AJ4 from 1999. The black tumbled leather upper of the older shoe is replaced by a clean white finish, though the speckled molded eyelets in Tech Grey remain the same. The neutral hue is repeated on the Jumpman heel logo and polyurethane midsole, featuring encapsulated Air cushioning in the forefoot and a visible unit under the heel.", imageUrl = "https://cdn.shopify.com/s/files/1/0255/9429/8467/products/air-jordan-4-retro-white-oreo-2021-CT8527-100_2_fwbhqs.jpg", destinationLink = 'https://www.goat.com/sneakers/air-jordan-4-retro-oreo-ct8527-100')

  pin5 = Pin(
    owner_id=5, title="Air Jordan 4 Retro OG 'Fire Red'", description="The 2020 edition of the Air Jordan 4 Retro OG 'Fire Red' brings back the classic colorway first released in 1989, complete with the iconic Nike Air logo emblazoned on the heel. The rest of the build is recreated faithfully, highlighted by a white leather upper with Fire Red detailing on the molded eyelets and outsole.", imageUrl = "https://i.ebayimg.com/images/g/9RMAAOSwtJdiuwaP/s-l1600.jpg", destinationLink = 'https://www.goat.com/sneakers/air-jordan-4-retro-og-fire-red-2020-dc7770-160')

  pin6 = Pin(
    owner_id=6, title="Air Jordan 11 'Jubilee'", description="The Air Jordan 11 'Jubilee', also known as the Air Jordan 11 '25th Anniversary', celebrates the classic silhouette's quarter-century birthday with a monochrome black finish throughout the upper, constructed from a traditional blend of ballistic mesh and patent leather. In keeping with the shoe's silver anniversary, a 3D metallic Jumpman and matching '23' branding decorate the heel, while 'Jordan' is spelled out in stylized silver lettering on each of the sneaker's eyelets.", imageUrl = "https://cdn.shopify.com/s/files/1/0565/7182/2285/products/Air-Jordan-11-Jubilee-CT8012-011-5_1024x1024.jpg", destinationLink = 'https://www.goat.com/sneakers/air-jordan-11-retro-clear-black-ct8012-011')

  pin7 = Pin(
    owner_id=7, title="Air Jordan 3 Retro 'Cardinal Red'", description="The Air Jordan 3 Retro 'Cardinal Red' showcases a distinctive palette influenced by an OG colorway of the Air Jordan 7. The sneaker's titular hue appears on the collar lining, molded eyelets, and raised Jumpman branding at the heel, all of which are contrasted by a white tumbled leather upper. A second Jumpman icon adorns the tongue in orange embroidery, while the 3's signature elephant print overlays reinforce the forefoot and heel.", imageUrl = "https://sneakernews.com/wp-content/uploads/2021/12/jordan-3-cardinal-CT8532-126-4.jpg", destinationLink = 'https://www.goat.com/sneakers/air-jordan-3-retro-cardinal-red-ct8532-126')

  pin8 = Pin(
    owner_id=8, title="Monstera Deliciosa", description="Monstera Deliciosa is a joy to care for, propagate and grow as a houseplant indoors. They are easy care, they grow fast and the new leaves are such an exciting event with their unfurling.", imageUrl = "https://i.pinimg.com/564x/e5/5b/2f/e55b2f46c8b575aff2d240b9442a6a79.jpg", destinationLink = 'https://hometoheather.com/monstera-deliciosa-care/')

  pin9 = Pin(
    owner_id=9, title="Plants and Butterflies", description="Key West butterfly and nature conservatory BEST PLACE EVER!", imageUrl = "https://i.pinimg.com/750x/b4/ea/20/b4ea20f154c14fac2d41ac1f0b5bf351.jpg", destinationLink = 'https://keywestbutterfly.com/')

  pin10 = Pin(
    owner_id=10, title="String Of Pearls", description="String succulents are exactly what their name implies- succulents that are growing in a form of creeping strings or chains. All of these plants have somewhat similar characteristics, with pendant stems and green and fleshy leaves. Strings are formed by multiplying rows of leaves or forming a vine. String succulents do not require much care, which makes them perfect for outdoor and indoor hanging displays, as well as vertical gardens.", imageUrl = "https://i.pinimg.com/564x/e7/7a/7c/e77a7c223d43f7a77fb806b4bbdd683e.jpg", destinationLink = 'https://www.etsy.com/listing/1093034215/string-of-pearls-plants-succulents-sop?epik=dj0yJnU9dzYtRmc2TTBiM1U5alItMTZkczlOc3BaV2htYkVRb3ImcD0wJm49dXk2cjFUczBtWjB1V3FpYXJzcHJHdyZ0PUFBQUFBR1A0QkI0')

  pin11 = Pin(
    owner_id=11, title="Bonsai Green Weeping Willow Tree ", description="BEAUTIFUL DWARF TREE: Weeping Willow Cutting. Vibrant Green Bark. Fast growing, a unique specimen indeed.", imageUrl = "https://i.pinimg.com/564x/15/bc/23/15bc23e55ce96118c78376054091a5a7.jpg", destinationLink ='https://www.etsy.com/listing/856495829/bonsai-green-weeping-willow-tree-thick?ref=sim_anchor&epik=dj0yJnU9ZnM4OXZxOU1IYWllMVVTS1pNSWhoYlMyOVVnRG9yN00mcD0wJm49NWtTMlNoZmx2VzRMdU13dzI0eTJCZyZ0PUFBQUFBR1A0Qko0')

  pin12= Pin(
    owner_id=12, title="Hanging Plant Flower Glass Ball Vase Terrarium Wall Fish Tank Aquarium Decor", description="Quality is the first with best service. customers all are our friends. Fashion design,100% Brand New,high quality! Material: Glass, Color: transparent, Style: Fashion, Casual, Diameter: approx. 10cm/ 12cm/ 15cm, There is 2-3% difference according to manual measurement. please check the measurement chart carefully before you buy the item.", imageUrl = "https://i.pinimg.com/736x/cc/27/1c/cc271cc34b572bbf0c9ccded63725e50.jpg", destinationLink = 'https://www.walmart.com/ip/Hanging-Plant-Flower-Glass-Ball-Vase-Terrarium-Wall-Fish-Tank-Aquarium-Decor-UK/273398227')

  pin13 = Pin(
    owner_id=13, title="Plant Heaven At Botanical Gardens Meise - Curate And Display", description="Giant lily pads and trailing plants inside the botanical gardens Meise", imageUrl = "https://i.pinimg.com/564x/db/d0/06/dbd0062f58da736ed26b22f9adaebed8.jpg", destinationLink = 'https://curateanddisplay.co.uk/plant-heaven-at-botanical-gardens-meise/')

  pin14 = Pin(
    owner_id=14, title="12 Aesthetic Plants That Don't Require Sunlight And Can Beautify Your House", description="Are you one of those who wants to brighten up the home/office ambience by having plants around? But does insufficient lighting dissuade you from doing that? Well, fret not! These plant varieties do well even in darkened rooms and places impregnable by sunlight. Yes, you may thank us later!", imageUrl = "https://i.pinimg.com/564x/a0/f9/f4/a0f9f4ff90ef907e5e28b4ad6475e625.jpg", destinationLink = 'https://www.scoopwhoop.com/life/12-indoor-plants-that-dont-require-sunlight-to-grow/')


  db.session.add(pin1)
  db.session.add(pin2)
  db.session.add(pin3)
  db.session.add(pin4)
  db.session.add(pin5)
  db.session.add(pin6)
  db.session.add(pin7)
  db.session.add(pin8)
  db.session.add(pin9)
  db.session.add(pin10)
  db.session.add(pin11)
  db.session.add(pin12)
  db.session.add(pin13)
  db.session.add(pin14)


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
