from flask.cli import AppGroup
from .users import seed_users, undo_users
from .pins import seed_pins, undo_pins
from .pinboards import seed_pinboards, undo_pinboards
from .jointable import seed_pins_boards_table, undo_pins_boards_table

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_pins_boards_table()
        undo_pinboards()
        undo_pins()
        undo_users()

    # seed_users()
    # print('users seeded')
    # seed_pins()
    # print('pins seeded')
    # seed_pinboards()
    # print('pinboards seeded')
    seed_pins_boards_table()
    # print('join table seeded')
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_pins_boards_table()
    # undo_pinboards()
    # undo_pins()
    # undo_users()
    # Add other undo functions here
